import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetDisplayName,
  useSetDisplayName,
  useGetSessionProgress,
  useGetCallerRole,
} from '../hooks/useQueries';
import { UserRole } from '../backend';
import {
  User,
  LogIn,
  Edit2,
  Check,
  X,
  Trophy,
  BookOpen,
  Star,
  Copy,
  CheckCircle,
  Loader2,
} from 'lucide-react';

const ALL_BADGES = [
  { id: 'math-star', emoji: '🔢', label: 'Math Star' },
  { id: 'alphabet-ace', emoji: '🔤', label: 'Alphabet Ace' },
  { id: 'science-explorer', emoji: '🔬', label: 'Science Explorer' },
  { id: 'telugu-champion', emoji: '🌺', label: 'Telugu Champion' },
  { id: 'hindi-hero', emoji: '🙏', label: 'Hindi Hero' },
  { id: 'english-expert', emoji: '📖', label: 'English Expert' },
  { id: 'quiz-master', emoji: '❓', label: 'Quiz Master' },
  { id: 'game-wizard', emoji: '🎮', label: 'Game Wizard' },
  { id: 'speed-demon', emoji: '⚡', label: 'Speed Demon' },
  { id: 'perfect-score', emoji: '💯', label: 'Perfect Score' },
  { id: 'super-learner', emoji: '🌟', label: 'Super Learner' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const principalText = identity?.getPrincipal().toString();

  const { data: displayName, isLoading: nameLoading } = useGetDisplayName(principalText);
  const { mutateAsync: setDisplayName, isPending: isSaving } = useSetDisplayName();
  const { data: progress, isLoading: progressLoading } = useGetSessionProgress(principalText);
  const { data: role } = useGetCallerRole();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);

  useEffect(() => {
    if (displayName) {
      setNameInput(displayName);
    }
  }, [displayName]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    try {
      await setDisplayName(nameInput.trim());
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCancelEdit = () => {
    setNameInput(displayName ?? '');
    setIsEditing(false);
  };

  const handleCopyPrincipal = () => {
    if (!principalText) return;
    navigator.clipboard.writeText(principalText).catch(() => {});
    setCopiedPrincipal(true);
    setTimeout(() => setCopiedPrincipal(false), 2000);
  };

  const earnedBadges = new Set(progress?.earnedBadges ?? []);
  const completedLessons = progress?.completedLessons ?? [];
  const quizResults = progress?.quizResults ?? [];

  const totalScore = quizResults.reduce((sum, r) => sum + Number(r.score), 0);
  const totalPossible = quizResults.reduce((sum, r) => sum + Number(r.total), 0);
  const avgPercent = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  const roleLabel =
    role === UserRole.parent ? '👨‍👩‍👧 Parent' : '🎓 Student';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-sky-100 to-sunshine-100 flex items-center justify-center px-4">
        <div className="bg-white border-4 border-lavender-300 rounded-4xl p-10 shadow-fun-xl text-center max-w-md w-full">
          <div className="text-7xl mb-4">👤</div>
          <h1 className="font-fredoka text-3xl text-lavender-700 mb-2">My Profile</h1>
          <p className="font-nunito text-muted-foreground mb-6">
            Log in to view your profile, track your learning progress, and earn badges!
          </p>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="kid-btn bg-lavender-500 hover:bg-lavender-600 text-white px-8 py-3 text-lg border-4 border-lavender-700 shadow-fun flex items-center gap-2 mx-auto"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Login to Continue
              </>
            )}
          </button>
          <p className="font-nunito text-xs text-muted-foreground mt-4">
            Supports passkeys, Google, Apple, and Microsoft sign-in
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-sky-100 to-sunshine-100 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white border-4 border-lavender-300 rounded-4xl p-6 shadow-fun-xl">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-lavender-400 to-sky-400 flex items-center justify-center shrink-0 shadow-fun border-4 border-white">
              <User size={36} className="text-white" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Display Name */}
              <div className="mb-1">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      className="font-fredoka text-xl border-2 border-lavender-400 rounded-xl px-3 py-1 outline-none focus:border-lavender-600 w-full max-w-xs"
                      placeholder="Enter your name"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={isSaving || !nameInput.trim()}
                      className="p-1.5 rounded-xl bg-grass-400 hover:bg-grass-500 text-white disabled:opacity-50 transition-colors"
                      aria-label="Save name"
                    >
                      {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-1.5 rounded-xl bg-cherry-400 hover:bg-cherry-500 text-white transition-colors"
                      aria-label="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {nameLoading ? (
                      <div className="h-7 w-32 bg-lavender-100 rounded-lg animate-pulse" />
                    ) : (
                      <h1 className="font-fredoka text-2xl text-lavender-700 truncate">
                        {displayName ?? 'Set your name'}
                      </h1>
                    )}
                    <button
                      onClick={() => {
                        setNameInput(displayName ?? '');
                        setIsEditing(true);
                      }}
                      className="p-1.5 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-600 transition-colors"
                      aria-label="Edit name"
                    >
                      <Edit2 size={14} />
                    </button>
                    {saveSuccess && (
                      <span className="text-grass-600 font-nunito text-sm flex items-center gap-1">
                        <CheckCircle size={14} /> Saved!
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Role Badge */}
              <div className="inline-block bg-lavender-100 border-2 border-lavender-300 rounded-full px-3 py-0.5 mb-2">
                <span className="font-nunito text-sm font-bold text-lavender-700">{roleLabel}</span>
              </div>

              {/* Principal ID */}
              <div className="flex items-center gap-2 mt-1">
                <p className="font-nunito text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
                  {principalText}
                </p>
                <button
                  onClick={handleCopyPrincipal}
                  className="text-lavender-400 hover:text-lavender-600 transition-colors shrink-0"
                  aria-label="Copy principal ID"
                >
                  {copiedPrincipal ? <CheckCircle size={14} className="text-grass-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-4 pt-4 border-t-2 border-lavender-100 flex justify-end">
            <button
              onClick={handleLogout}
              className="font-nunito text-sm text-cherry-500 hover:text-cherry-700 transition-colors flex items-center gap-1"
            >
              <LogIn size={14} className="rotate-180" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <BookOpen size={24} />,
              value: completedLessons.length,
              label: 'Lessons Done',
              color: 'bg-sky-100 border-sky-300 text-sky-700',
            },
            {
              icon: <Trophy size={24} />,
              value: earnedBadges.size,
              label: 'Badges Earned',
              color: 'bg-sunshine-100 border-sunshine-300 text-sunshine-700',
            },
            {
              icon: <Star size={24} />,
              value: `${avgPercent}%`,
              label: 'Avg Quiz Score',
              color: 'bg-grass-100 border-grass-300 text-grass-700',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} border-4 rounded-3xl p-4 text-center shadow-fun`}
            >
              <div className="flex justify-center mb-1">{stat.icon}</div>
              {progressLoading ? (
                <div className="h-7 w-10 bg-white/60 rounded-lg animate-pulse mx-auto mb-1" />
              ) : (
                <p className="font-fredoka text-2xl">{stat.value}</p>
              )}
              <p className="font-nunito text-xs font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="bg-white border-4 border-sunshine-300 rounded-4xl p-6 shadow-fun-xl">
          <h2 className="font-fredoka text-2xl text-sunshine-700 mb-4 flex items-center gap-2">
            <Trophy size={24} /> My Badges
          </h2>
          {progressLoading ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="h-16 bg-sunshine-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {ALL_BADGES.map((badge) => {
                const earned = earnedBadges.has(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-all ${
                      earned
                        ? 'bg-sunshine-100 border-sunshine-400 shadow-fun'
                        : 'bg-gray-50 border-gray-200 opacity-40 grayscale'
                    }`}
                    title={badge.label}
                  >
                    <span className="text-2xl">{badge.emoji}</span>
                    <span className="font-nunito text-xs text-center leading-tight text-gray-700 hidden sm:block">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {!progressLoading && earnedBadges.size === 0 && (
            <p className="font-nunito text-muted-foreground text-sm text-center mt-3">
              Complete lessons and quizzes to earn badges! 🌟
            </p>
          )}
        </div>

        {/* Quiz Results */}
        {(progressLoading || quizResults.length > 0) && (
          <div className="bg-white border-4 border-grass-300 rounded-4xl p-6 shadow-fun-xl">
            <h2 className="font-fredoka text-2xl text-grass-700 mb-4 flex items-center gap-2">
              <Star size={24} /> Quiz Results
            </h2>
            {progressLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-grass-50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {quizResults.map((result, idx) => {
                  const pct = Number(result.total) > 0
                    ? Math.round((Number(result.score) / Number(result.total)) * 100)
                    : 0;
                  return (
                    <div
                      key={idx}
                      className="bg-grass-50 border-2 border-grass-200 rounded-2xl px-4 py-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-nunito font-bold text-grass-700 capitalize">
                          {result.subject}
                        </span>
                        <span className="font-fredoka text-grass-600">
                          {Number(result.score)}/{Number(result.total)} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-grass-200 rounded-full h-2">
                        <div
                          className="bg-grass-500 h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Completed Lessons */}
        {(progressLoading || completedLessons.length > 0) && (
          <div className="bg-white border-4 border-sky-300 rounded-4xl p-6 shadow-fun-xl">
            <h2 className="font-fredoka text-2xl text-sky-700 mb-4 flex items-center gap-2">
              <BookOpen size={24} /> Completed Lessons
            </h2>
            {progressLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-20 bg-sky-50 rounded-full animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {completedLessons.map((lessonId) => (
                  <span
                    key={String(lessonId)}
                    className="bg-sky-100 border-2 border-sky-300 rounded-full px-3 py-1 font-nunito text-sm font-bold text-sky-700"
                  >
                    Lesson {String(lessonId)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Donate CTA */}
        <div className="bg-gradient-to-r from-cherry-400 to-tangerine-400 border-4 border-cherry-500 rounded-4xl p-5 shadow-fun-xl text-center">
          <p className="font-fredoka text-xl text-white mb-2">❤️ Enjoying KidsLearn?</p>
          <p className="font-nunito text-white/90 text-sm mb-3">
            Support us to keep learning free for all children!
          </p>
          <button
            onClick={() => navigate({ to: '/donate' })}
            className="kid-btn bg-white hover:bg-cherry-50 text-cherry-600 px-6 py-2 text-base border-4 border-white shadow-fun"
          >
            💝 Donate
          </button>
        </div>

      </div>
    </div>
  );
}
