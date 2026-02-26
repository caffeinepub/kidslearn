import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useGetSessionProgress } from '../hooks/useQueries';
import { UserRole } from '../backend';
import { Loader2, Edit2, Check, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AVATAR_OPTIONS = [
  { id: 'lion', emoji: '🦁', label: 'Lion' },
  { id: 'panda', emoji: '🐼', label: 'Panda' },
  { id: 'fox', emoji: '🦊', label: 'Fox' },
  { id: 'frog', emoji: '🐸', label: 'Frog' },
  { id: 'octopus', emoji: '🐙', label: 'Octopus' },
  { id: 'unicorn', emoji: '🦄', label: 'Unicorn' },
  { id: 'bear', emoji: '🐻', label: 'Bear' },
  { id: 'koala', emoji: '🐨', label: 'Koala' },
  { id: 'tiger', emoji: '🐯', label: 'Tiger' },
  { id: 'penguin', emoji: '🐧', label: 'Penguin' },
  { id: 'rabbit', emoji: '🐰', label: 'Rabbit' },
  { id: 'dragon', emoji: '🐲', label: 'Dragon' },
];

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

function getLevelFromPoints(points: number): { level: number; title: string; emoji: string } {
  if (points >= 500) return { level: 5, title: 'Legend', emoji: '👑' };
  if (points >= 200) return { level: 4, title: 'Champion', emoji: '🏆' };
  if (points >= 100) return { level: 3, title: 'Explorer', emoji: '🚀' };
  if (points >= 50) return { level: 2, title: 'Learner', emoji: '📚' };
  return { level: 1, title: 'Beginner', emoji: '🌱' };
}

const PostLoginProfile: React.FC = () => {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const principalStr = identity?.getPrincipal().toString();

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { mutateAsync: saveProfile, isPending: isSaving } = useSaveCallerUserProfile();
  const { data: progress, isLoading: progressLoading } = useGetSessionProgress(principalStr);

  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [nameInput, setNameInput] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Populate from existing profile
  useEffect(() => {
    if (userProfile) {
      setNameInput(userProfile.name || '');
      setSelectedAvatar(userProfile.avatarId || 'lion');
    } else if (profileFetched && !userProfile) {
      setSelectedAvatar('lion');
    }
  }, [userProfile, profileFetched]);

  const earnedBadges = new Set(progress?.earnedBadges ?? []);
  const completedLessons = progress?.completedLessons ?? [];
  const quizResults = progress?.quizResults ?? [];
  const totalPoints = quizResults.reduce((sum, r) => sum + Number(r.score), 0);
  const levelInfo = getLevelFromPoints(totalPoints);

  const currentAvatar = AVATAR_OPTIONS.find((a) => a.id === selectedAvatar) ?? AVATAR_OPTIONS[0];

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    try {
      await saveProfile({
        name: nameInput.trim(),
        role: userProfile?.role ?? UserRole.student,
        avatarId: selectedAvatar,
      });
      setIsEditingName(false);
    } catch {
      // ignore
    }
  };

  const handleAvatarSelect = async (avatarId: string) => {
    setSelectedAvatar(avatarId);
    try {
      await saveProfile({
        name: nameInput.trim() || userProfile?.name || 'Explorer',
        role: userProfile?.role ?? UserRole.student,
        avatarId,
      });
    } catch {
      // ignore
    }
  };

  const handleStartLearning = async () => {
    // Save profile before navigating
    if (nameInput.trim()) {
      try {
        await saveProfile({
          name: nameInput.trim(),
          role: userProfile?.role ?? UserRole.student,
          avatarId: selectedAvatar,
        });
      } catch {
        // ignore
      }
    }
    setIsTransitioning(true);
    setTimeout(() => {
      navigate({ to: '/kids-dashboard' });
    }, 600);
  };

  if (!identity) {
    navigate({ to: '/' });
    return null;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-sunshine-100 via-lavender-100 to-sky-100 pb-12 px-4"
      style={{
        opacity: isTransitioning ? 0 : visible ? 1 : 0,
        transform: isTransitioning ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto pt-8 pb-4 text-center">
        <div className="text-6xl mb-2 animate-bounce">🌟</div>
        <h1 className="font-heading text-4xl md:text-5xl text-lavender-700 drop-shadow-sm">
          Your Profile
        </h1>
        <p className="font-body text-lg text-muted-foreground mt-1">
          Customize your look and track your progress!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* Avatar + Name Card */}
        <div className="bg-white border-4 border-lavender-300 rounded-4xl p-6 shadow-fun-xl">
          {profileLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-8 w-48 rounded-xl" />
            </div>
          ) : (
            <>
              {/* Current Avatar Display */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-lavender-200 to-sky-200 border-4 border-lavender-400 flex items-center justify-center text-6xl shadow-fun-xl mb-3 animate-pop">
                  {currentAvatar.emoji}
                </div>
                {/* Name Display / Edit */}
                <div className="flex items-center gap-2 mt-1">
                  {isEditingName ? (
                    <>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') setIsEditingName(false);
                        }}
                        className="font-heading text-2xl border-2 border-lavender-400 rounded-xl px-3 py-1 outline-none focus:border-lavender-600 text-center"
                        placeholder="Your name"
                        autoFocus
                        maxLength={30}
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={isSaving}
                        className="p-2 rounded-xl bg-grass-400 hover:bg-grass-500 text-white border-2 border-grass-600 shadow-fun"
                      >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="p-2 rounded-xl bg-cherry-200 hover:bg-cherry-300 text-cherry-700 border-2 border-cherry-400 shadow-fun"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="font-heading text-3xl text-lavender-700">
                        {nameInput || 'Explorer'}
                      </span>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="p-2 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-600 border-2 border-lavender-300 shadow-fun"
                      >
                        <Edit2 size={16} />
                      </button>
                    </>
                  )}
                </div>
                {!nameInput && !isEditingName && (
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    Tap ✏️ to add your name!
                  </p>
                )}
              </div>

              {/* Avatar Selector */}
              <div>
                <h3 className="font-heading text-xl text-sunshine-700 text-center mb-3">
                  🎨 Pick Your Avatar!
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => handleAvatarSelect(avatar.id)}
                      title={avatar.label}
                      className={`
                        w-full aspect-square rounded-2xl text-3xl flex items-center justify-center
                        border-4 transition-all duration-150 hover:scale-110 active:scale-95
                        ${selectedAvatar === avatar.id
                          ? 'border-lavender-500 bg-lavender-100 shadow-fun-lg scale-110'
                          : 'border-transparent bg-lavender-50 hover:border-lavender-300 hover:bg-lavender-100'
                        }
                      `}
                    >
                      {avatar.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Stats Card */}
        <div className="bg-white border-4 border-sunshine-300 rounded-4xl p-6 shadow-fun-xl">
          <h3 className="font-heading text-2xl text-sunshine-700 mb-4 text-center">
            📊 My Stats
          </h3>
          {progressLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20 rounded-3xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {/* Level */}
              <div className="bg-gradient-to-br from-sunshine-100 to-sunshine-200 border-4 border-sunshine-300 rounded-3xl p-4 text-center">
                <div className="text-4xl mb-1">{levelInfo.emoji}</div>
                <div className="font-heading text-xl text-sunshine-700">Level {levelInfo.level}</div>
                <div className="font-body text-sm text-sunshine-600">{levelInfo.title}</div>
              </div>
              {/* Points */}
              <div className="bg-gradient-to-br from-tangerine-100 to-tangerine-200 border-4 border-tangerine-300 rounded-3xl p-4 text-center">
                <div className="text-4xl mb-1">⭐</div>
                <div className="font-heading text-xl text-tangerine-700">{totalPoints}</div>
                <div className="font-body text-sm text-tangerine-600">Total Points</div>
              </div>
              {/* Lessons */}
              <div className="bg-gradient-to-br from-sky-100 to-sky-200 border-4 border-sky-300 rounded-3xl p-4 text-center">
                <div className="text-4xl mb-1">📖</div>
                <div className="font-heading text-xl text-sky-700">{completedLessons.length}</div>
                <div className="font-body text-sm text-sky-600">Lessons Done</div>
              </div>
              {/* Quizzes */}
              <div className="bg-gradient-to-br from-grass-100 to-grass-200 border-4 border-grass-300 rounded-3xl p-4 text-center">
                <div className="text-4xl mb-1">❓</div>
                <div className="font-heading text-xl text-grass-700">{quizResults.length}</div>
                <div className="font-body text-sm text-grass-600">Quizzes Taken</div>
              </div>
            </div>
          )}
        </div>

        {/* Badges Card */}
        <div className="bg-white border-4 border-cherry-300 rounded-4xl p-6 shadow-fun-xl">
          <h3 className="font-heading text-2xl text-cherry-700 mb-4 text-center">
            🏅 My Badges ({earnedBadges.size}/{ALL_BADGES.length})
          </h3>
          {progressLoading ? (
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {ALL_BADGES.map((badge) => {
                const earned = earnedBadges.has(badge.id);
                return (
                  <div
                    key={badge.id}
                    title={badge.label}
                    className={`
                      flex flex-col items-center gap-1 p-2 rounded-2xl border-2 text-center
                      ${earned
                        ? 'border-sunshine-400 bg-sunshine-50 shadow-fun'
                        : 'border-gray-200 bg-gray-50 opacity-40 grayscale'
                      }
                    `}
                  >
                    <span className="text-2xl">{badge.emoji}</span>
                    <span className="font-body text-xs leading-tight text-gray-600 hidden sm:block">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Start Learning Button */}
        <div className="text-center pb-4">
          <button
            onClick={handleStartLearning}
            disabled={isTransitioning}
            className="kid-btn bg-gradient-to-r from-grass-400 to-sky-400 hover:from-grass-500 hover:to-sky-500 text-white px-10 py-5 text-2xl border-4 border-grass-600 shadow-fun-xl flex items-center gap-3 mx-auto"
          >
            {isTransitioning ? (
              <>
                <Loader2 size={28} className="animate-spin" />
                Let's go!
              </>
            ) : (
              <>
                🚀 Start Learning!
              </>
            )}
          </button>
          <p className="font-body text-sm text-muted-foreground mt-3">
            Adventure awaits! Let's learn together! 🌈
          </p>
        </div>

      </div>
    </div>
  );
};

export default PostLoginProfile;
