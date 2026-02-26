import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetKidsProfile, useGetSessionProgress, useVerifyKidsPin } from '../hooks/useQueries';
import { usePinLock } from '../hooks/usePinLock';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Shield, Edit2, Lock, Star, BookOpen, Trophy, Delete } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';
import { toast } from 'sonner';

const ALL_BADGES = [
  { id: 'first_lesson', label: 'First Lesson', emoji: '📚' },
  { id: 'quiz_master', label: 'Quiz Master', emoji: '🏆' },
  { id: 'math_star', label: 'Math Star', emoji: '⭐' },
  { id: 'alphabet_ace', label: 'Alphabet Ace', emoji: '🔤' },
  { id: 'science_explorer', label: 'Science Explorer', emoji: '🔬' },
  { id: 'language_learner', label: 'Language Learner', emoji: '🌍' },
  { id: 'perfect_score', label: 'Perfect Score', emoji: '💯' },
  { id: 'streak_3', label: '3-Day Streak', emoji: '🔥' },
  { id: 'game_champion', label: 'Game Champion', emoji: '🎮' },
  { id: 'curious_mind', label: 'Curious Mind', emoji: '🧠' },
  { id: 'super_learner', label: 'Super Learner', emoji: '🚀' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetKidsProfile();
  const { isPinUnlocked } = usePinLock();
  const verifyPin = useVerifyKidsPin();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinShaking, setPinShaking] = useState(false);

  const principal = identity?.getPrincipal() ?? null;
  const { data: progress, isLoading: progressLoading } = useGetSessionProgress(principal);

  const isAuthenticated = !!identity;

  const handleParentalControls = async () => {
    if (!isAuthenticated) {
      try {
        await login();
      } catch {
        toast.error('Login failed. Please try again.');
      }
      return;
    }
    navigate({ to: '/parental-controls' });
  };

  const handleEditProfile = () => {
    if (!isPinUnlocked) {
      setShowPinPrompt(true);
      setPinInput('');
      setPinError('');
    } else {
      setShowEditModal(true);
    }
  };

  const handlePinDigit = (digit: string) => {
    if (pinInput.length >= 4) return;
    const newPin = pinInput + digit;
    setPinInput(newPin);
    setPinError('');
    if (newPin.length === 4) {
      handlePinVerify(newPin);
    }
  };

  const handlePinVerify = async (pin: string) => {
    try {
      const ok = await verifyPin.mutateAsync(pin);
      if (ok) {
        setShowPinPrompt(false);
        setPinInput('');
        setShowEditModal(true);
      } else {
        setPinShaking(true);
        setPinError('Wrong PIN! Try again 😊');
        setTimeout(() => {
          setPinInput('');
          setPinShaking(false);
        }, 600);
      }
    } catch {
      setPinError('Something went wrong.');
      setPinInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sunshine-100 p-6">
        <div className="text-center bg-white rounded-3xl shadow-fun p-10 max-w-sm w-full">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-fredoka text-cherry-600 mb-2">Login to See Your Profile!</h2>
          <p className="text-muted-foreground font-nunito mb-6">Log in to view your badges and progress.</p>
          <Button
            onClick={login}
            disabled={loginStatus === 'logging-in'}
            className="bg-cherry-500 hover:bg-cherry-600 text-white rounded-2xl font-fredoka text-lg px-8 py-3"
          >
            {loginStatus === 'logging-in' ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Logging in...</>
            ) : (
              'Login 🚀'
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-cherry-500" />
      </div>
    );
  }

  const earnedBadges = progress?.earnedBadges ?? [];
  const completedLessons = progress?.completedLessons ?? [];
  const quizResults = progress?.quizResults ?? [];
  const avgScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((sum, r) => sum + (Number(r.total) > 0 ? (Number(r.score) / Number(r.total)) * 100 : 0), 0) /
            quizResults.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sunshine-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-fun p-6 text-center relative">
          <div className="text-7xl mb-3">{profile?.avatar || '🌟'}</div>
          <h1 className="text-3xl font-fredoka text-cherry-600">{profile?.name || 'Learner'}</h1>
          <p className="text-lg text-muted-foreground font-nunito">Age: {profile ? String(Number(profile.age)) : '?'}</p>

          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={handleEditProfile}
              variant="outline"
              className="rounded-xl font-fredoka border-2 border-sunshine-300 hover:bg-sunshine-50"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              onClick={handleParentalControls}
              className="rounded-xl font-fredoka bg-cherry-500 hover:bg-cherry-600 text-white"
              disabled={loginStatus === 'logging-in'}
            >
              {loginStatus === 'logging-in' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Shield className="mr-2 h-4 w-4" />
              )}
              Parental Controls
            </Button>
          </div>
        </div>

        {/* PIN Prompt */}
        {showPinPrompt && (
          <div className="bg-white rounded-3xl shadow-fun p-6 text-center">
            <Lock className="h-10 w-10 text-cherry-500 mx-auto mb-3" />
            <h3 className="text-xl font-fredoka text-cherry-600 mb-4">Enter your PIN to edit</h3>

            <div className={`flex justify-center gap-3 mb-4 ${pinShaking ? 'animate-bounce' : ''}`}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-4 transition-all ${
                    i < pinInput.length ? 'bg-cherry-400 border-cherry-300' : 'bg-gray-200 border-gray-300'
                  }`}
                />
              ))}
            </div>

            {pinError && <p className="text-cherry-500 text-sm font-nunito mb-3">{pinError}</p>}

            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {['1','2','3','4','5','6','7','8','9','','0','del'].map((d, i) => {
                if (d === '') return <div key={i} />;
                if (d === 'del') return (
                  <button key={i} onClick={() => setPinInput(p => p.slice(0, -1))}
                    className="h-14 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <Delete className="h-5 w-5" />
                  </button>
                );
                return (
                  <button key={i} onClick={() => handlePinDigit(d)}
                    disabled={verifyPin.isPending || pinInput.length >= 4}
                    className="h-14 rounded-xl bg-sunshine-100 hover:bg-sunshine-200 text-2xl font-fredoka text-gray-700 transition-all active:scale-95">
                    {d}
                  </button>
                );
              })}
            </div>

            <Button variant="ghost" onClick={() => setShowPinPrompt(false)} className="mt-3 font-nunito text-sm">
              Cancel
            </Button>
          </div>
        )}

        {/* Stats */}
        {progressLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-cherry-500" />
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-fun p-4 text-center">
                <BookOpen className="h-8 w-8 text-sky-500 mx-auto mb-1" />
                <div className="text-2xl font-fredoka text-sky-600">{completedLessons.length}</div>
                <div className="text-xs font-nunito text-muted-foreground">Lessons</div>
              </div>
              <div className="bg-white rounded-2xl shadow-fun p-4 text-center">
                <Trophy className="h-8 w-8 text-sunshine-500 mx-auto mb-1" />
                <div className="text-2xl font-fredoka text-sunshine-600">{quizResults.length}</div>
                <div className="text-xs font-nunito text-muted-foreground">Quizzes</div>
              </div>
              <div className="bg-white rounded-2xl shadow-fun p-4 text-center">
                <Star className="h-8 w-8 text-cherry-500 mx-auto mb-1" />
                <div className="text-2xl font-fredoka text-cherry-600">{avgScore}%</div>
                <div className="text-xs font-nunito text-muted-foreground">Avg Score</div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-3xl shadow-fun p-6">
              <h2 className="text-2xl font-fredoka text-cherry-600 mb-4">🏅 My Badges</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {ALL_BADGES.map((badge) => {
                  const earned = earnedBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                        earned
                          ? 'bg-sunshine-100 border-2 border-sunshine-300 shadow-sm'
                          : 'bg-gray-100 opacity-40 grayscale'
                      }`}
                    >
                      <span className="text-3xl mb-1">{badge.emoji}</span>
                      <span className="text-xs font-nunito text-center text-gray-700 leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quiz Results */}
            {quizResults.length > 0 && (
              <div className="bg-white rounded-3xl shadow-fun p-6">
                <h2 className="text-2xl font-fredoka text-cherry-600 mb-4">📊 Quiz Results</h2>
                <div className="space-y-3">
                  {quizResults.map((result, idx) => {
                    const pct = Number(result.total) > 0
                      ? Math.round((Number(result.score) / Number(result.total)) * 100)
                      : 0;
                    return (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="font-fredoka text-gray-700 capitalize">{result.subject}</span>
                          <span className="font-nunito text-sm text-muted-foreground">
                            {String(result.score)}/{String(result.total)} ({pct}%)
                          </span>
                        </div>
                        <Progress value={pct} className="h-3 rounded-full" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Completed Lessons */}
            {completedLessons.length > 0 && (
              <div className="bg-white rounded-3xl shadow-fun p-6">
                <h2 className="text-2xl font-fredoka text-cherry-600 mb-3">✅ Completed Lessons</h2>
                <div className="flex flex-wrap gap-2">
                  {completedLessons.map((id) => (
                    <span
                      key={String(id)}
                      className="bg-grass-100 text-grass-700 rounded-full px-3 py-1 text-sm font-nunito border border-grass-300"
                    >
                      Lesson {String(id)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Donate CTA */}
        <div className="bg-gradient-to-r from-cherry-100 to-tangerine-100 rounded-3xl p-6 text-center border-2 border-cherry-200">
          <p className="font-fredoka text-xl text-cherry-700 mb-3">❤️ Love KidsLearn? Support Us!</p>
          <Button
            onClick={() => navigate({ to: '/donate' })}
            className="bg-cherry-500 hover:bg-cherry-600 text-white rounded-2xl font-fredoka"
          >
            Donate 💝
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {profile && (
        <EditProfileModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
        />
      )}
    </div>
  );
}
