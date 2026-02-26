import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetTasks, useGetSessionProgress, useGetCallerUserProfile } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import CelebrationAnimation from '../components/CelebrationAnimation';
import TaskCard from '../components/TaskCard';
import ProgressWidget from '../components/ProgressWidget';
import RewardsDisplay from '../components/RewardsDisplay';
import GameCard from '../components/GameCard';
import LearningCard from '../components/LearningCard';

const GAMES = [
  {
    name: 'Matching Game',
    emoji: '🃏',
    description: 'Match emoji cards to words!',
    route: '/matching-game',
    bgClass: 'bg-mint-100',
    borderClass: 'border-mint-400',
    textClass: 'text-mint-700',
  },
  {
    name: 'Mini Game',
    emoji: '🎮',
    description: 'Fun memory & word games!',
    route: '/mini-game',
    bgClass: 'bg-lavender-100',
    borderClass: 'border-lavender-400',
    textClass: 'text-lavender-700',
  },
  {
    name: 'Puzzle Game',
    emoji: '🧩',
    description: 'Spell the word letter by letter!',
    route: '/puzzle',
    bgClass: 'bg-tangerine-100',
    borderClass: 'border-tangerine-400',
    textClass: 'text-tangerine-700',
  },
  {
    name: 'Timed Challenge',
    emoji: '⏱️',
    description: 'Race against the clock!',
    route: '/timed-challenge',
    bgClass: 'bg-cherry-100',
    borderClass: 'border-cherry-400',
    textClass: 'text-cherry-700',
  },
  {
    name: 'Quiz',
    emoji: '❓',
    description: 'Test what you know!',
    route: '/quiz',
    bgClass: 'bg-sky-100',
    borderClass: 'border-sky-400',
    textClass: 'text-sky-700',
  },
];

const LEARNING_MODULES = [
  { name: 'Alphabet A–Z', emoji: '🔡', route: '/alphabet-fullscreen', bgClass: 'bg-sky-100', borderClass: 'border-sky-400', textClass: 'text-sky-700' },
  { name: 'Alphabet', emoji: '🔤', route: '/alphabet', bgClass: 'bg-sky-200', borderClass: 'border-sky-500', textClass: 'text-sky-800' },
  { name: 'Numbers 1–10', emoji: '🔢', route: '/numbers', bgClass: 'bg-sunshine-100', borderClass: 'border-sunshine-400', textClass: 'text-sunshine-700' },
  { name: 'Numbers 1–100', emoji: '💯', route: '/numbers-100', bgClass: 'bg-tangerine-100', borderClass: 'border-tangerine-400', textClass: 'text-tangerine-700' },
  { name: 'Vocabulary', emoji: '📚', route: '/vocabulary', bgClass: 'bg-grass-100', borderClass: 'border-grass-400', textClass: 'text-grass-700' },
  { name: 'Flashcards', emoji: '🗂️', route: '/flashcards', bgClass: 'bg-mint-100', borderClass: 'border-mint-400', textClass: 'text-mint-700' },
  { name: 'Poems', emoji: '🎵', route: '/poems', bgClass: 'bg-lavender-100', borderClass: 'border-lavender-400', textClass: 'text-lavender-700' },
  { name: 'Picture Learning', emoji: '🖼️', route: '/picture-learning', bgClass: 'bg-coral-100', borderClass: 'border-coral-400', textClass: 'text-coral-700' },
  { name: 'Subjects', emoji: '🎓', route: '/subjects', bgClass: 'bg-cherry-100', borderClass: 'border-cherry-400', textClass: 'text-cherry-700' },
];

// Avatar map for display
const AVATAR_MAP: Record<string, string> = {
  lion: '🦁', panda: '🐼', fox: '🦊', frog: '🐸', octopus: '🐙',
  unicorn: '🦄', bear: '🐻', koala: '🐨', tiger: '🐯', penguin: '🐧',
  rabbit: '🐰', dragon: '🐲',
};

const KidsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const principalStr = identity?.getPrincipal().toString();

  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: tasks = [], isLoading: tasksLoading } = useGetTasks();
  const { data: progress, isLoading: progressLoading } = useGetSessionProgress(principalStr);

  const [showCelebration, setShowCelebration] = useState(false);
  const [visible, setVisible] = useState(false);
  const prevPointsRef = useRef<number>(0);
  const prevBadgesRef = useRef<number>(0);

  // Fade-in on mount (smooth transition from profile screen)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const earnedBadges = progress?.earnedBadges ?? [];
  const completedLessons = progress?.completedLessons ?? [];
  const quizResults = progress?.quizResults ?? [];

  const totalPoints = tasks.filter((t) => t.isCompleted).reduce((sum, t) => sum + Number(t.points), 0);

  // Determine recommended lesson (first not yet completed, or first module if none completed)
  const completedLessonIds = new Set(completedLessons.map(Number));
  const recommendedModuleIndex = LEARNING_MODULES.findIndex((_, idx) => !completedLessonIds.has(idx + 1));
  const recommendedIndex = recommendedModuleIndex >= 0 ? recommendedModuleIndex : 0;

  // Trigger celebration when points or badges increase
  useEffect(() => {
    if (totalPoints > prevPointsRef.current || earnedBadges.length > prevBadgesRef.current) {
      if (prevPointsRef.current > 0 || prevBadgesRef.current > 0) {
        setShowCelebration(true);
      }
    }
    prevPointsRef.current = totalPoints;
    prevBadgesRef.current = earnedBadges.length;
  }, [totalPoints, earnedBadges.length]);

  const kidName = userProfile?.name ?? (isAuthenticated ? 'Explorer' : 'Explorer');
  const avatarEmoji = userProfile?.avatarId ? (AVATAR_MAP[userProfile.avatarId] ?? '🌟') : '🌟';

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-sunshine-100 via-sky-50 to-lavender-100 pb-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <CelebrationAnimation
        active={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-sky-400 via-lavender-400 to-cherry-400 py-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <span className="absolute top-3 left-6 text-5xl animate-float">⭐</span>
          <span className="absolute top-6 right-10 text-4xl animate-bounce">🌈</span>
          <span className="absolute bottom-3 left-1/4 text-3xl">🎉</span>
          <span className="absolute bottom-4 right-1/3 text-4xl animate-float">🦋</span>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="text-center sm:text-left flex items-center gap-4">
            {/* Avatar display */}
            {!profileLoading && (
              <div className="w-16 h-16 rounded-full bg-white/30 border-4 border-white/60 flex items-center justify-center text-4xl shadow-fun shrink-0">
                {avatarEmoji}
              </div>
            )}
            <div>
              <h1 className="font-heading text-4xl md:text-5xl text-white drop-shadow-lg">
                👋 Hi, {profileLoading ? '...' : kidName}!
              </h1>
              <p className="font-body text-lg text-white/90 mt-1">
                Ready to learn and play today? 🚀
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate({ to: '/progress' })}
              className="kid-btn bg-white/20 hover:bg-white/40 text-white border-2 border-white/50 px-5 py-3 text-base"
            >
              ⭐ My Progress
            </button>
            {isAuthenticated && (
              <button
                onClick={() => navigate({ to: '/post-login-profile' })}
                className="kid-btn bg-white/20 hover:bg-white/40 text-white border-2 border-white/50 px-5 py-3 text-base"
              >
                👤 Profile
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-10">

        {/* ── Recommended Lesson ── */}
        <section>
          <h2 className="font-heading text-3xl text-grass-700 mb-4 flex items-center gap-2">
            ✨ Recommended for You!
          </h2>
          {progressLoading ? (
            <Skeleton className="h-28 rounded-3xl" />
          ) : (
            <div
              className="relative bg-gradient-to-r from-grass-300 to-sky-300 border-4 border-grass-400 rounded-3xl p-5 flex items-center gap-5 shadow-fun-xl cursor-pointer hover:scale-[1.02] transition-transform duration-200 active:scale-[0.99]"
              onClick={() => navigate({ to: LEARNING_MODULES[recommendedIndex].route as '/' })}
            >
              {/* Pulsing ring */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-white/40 animate-pulse-ring" />
                <div className="w-20 h-20 rounded-full bg-white/30 border-4 border-white/70 flex items-center justify-center text-5xl shadow-fun">
                  {LEARNING_MODULES[recommendedIndex].emoji}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-sunshine-400 text-white font-heading text-sm px-3 py-1 rounded-full border-2 border-sunshine-600 shadow-fun">
                    ⭐ Recommended
                  </span>
                  {completedLessons.length > 0 && (
                    <span className="bg-white/40 text-white font-body text-xs px-2 py-1 rounded-full">
                      Next up!
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-2xl text-white drop-shadow-sm">
                  {LEARNING_MODULES[recommendedIndex].name}
                </h3>
                <p className="font-body text-white/90 text-sm mt-1">
                  {completedLessons.length === 0
                    ? 'Perfect place to start your learning adventure!'
                    : `You've completed ${completedLessons.length} lesson${completedLessons.length !== 1 ? 's' : ''}. Keep going!`}
                </p>
              </div>
              <div className="shrink-0">
                <span className="kid-btn bg-white text-grass-700 border-4 border-white/80 px-5 py-3 text-base shadow-fun inline-block">
                  Let's Go! 🎯
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ── Tasks / Chores ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/generated/task-icon.dim_128x128.png"
              alt="Tasks"
              className="w-10 h-10 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <h2 className="font-heading text-3xl text-sunshine-700">My Tasks & Chores</h2>
          </div>

          {tasksLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-3xl" />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-sunshine-50 border-4 border-sunshine-200 rounded-3xl p-8 text-center">
              <span className="text-5xl">🌟</span>
              <p className="font-heading text-xl text-sunshine-600 mt-3">No tasks yet!</p>
              <p className="font-body text-gray-500 mt-1">Check back soon for new tasks to complete.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <TaskCard
                  key={Number(task.id)}
                  task={task}
                  onCompleted={() => setShowCelebration(true)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Progress & Rewards (side by side on larger screens) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Progress Tracking */}
          <section>
            <h2 className="font-heading text-3xl text-sky-700 mb-4 flex items-center gap-2">
              📊 My Progress
            </h2>
            {progressLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}
              </div>
            ) : (
              <ProgressWidget
                completedLessons={completedLessons.length}
                totalLessons={9}
                quizzesTaken={quizResults.length}
                tasks={tasks}
              />
            )}
          </section>

          {/* Rewards / Points */}
          <section>
            <h2 className="font-heading text-3xl text-lavender-700 mb-4 flex items-center gap-2">
              🏆 Rewards & Points
            </h2>
            {progressLoading || tasksLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-28 rounded-3xl" />
                <Skeleton className="h-32 rounded-2xl" />
              </div>
            ) : (
              <RewardsDisplay earnedBadges={earnedBadges} tasks={tasks} />
            )}
          </section>
        </div>

        {/* ── Games ── */}
        <section>
          <h2 className="font-heading text-3xl text-cherry-700 mb-4 flex items-center gap-2">
            🎮 Games
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {GAMES.map((game) => (
              <GameCard key={game.route} {...game} />
            ))}
          </div>
        </section>

        {/* ── Educational Content ── */}
        <section>
          <h2 className="font-heading text-3xl text-grass-700 mb-4 flex items-center gap-2">
            📚 Learn Something New!
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {LEARNING_MODULES.map((mod, idx) => (
              <div key={mod.route} className="relative">
                {idx === recommendedIndex && (
                  <div className="absolute -top-2 -right-2 z-10 bg-sunshine-400 text-white text-xs font-heading px-2 py-0.5 rounded-full border-2 border-sunshine-600 shadow-fun">
                    ⭐
                  </div>
                )}
                <LearningCard {...mod} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section className="bg-gradient-to-r from-grass-300 to-mint-300 rounded-3xl p-6 text-center">
          <h2 className="font-heading text-2xl text-white mb-4">🚀 Quick Start</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate({ to: '/age-group' })}
              className="kid-btn bg-white text-grass-700 border-4 border-white hover:bg-grass-50 px-6 py-3 text-base"
            >
              🎯 Start Learning
            </button>
            <button
              onClick={() => navigate({ to: '/alphabet-fullscreen' })}
              className="kid-btn bg-white/20 text-white border-4 border-white/50 hover:bg-white/30 px-6 py-3 text-base"
            >
              🔡 A–Z Full Screen
            </button>
            <button
              onClick={() => navigate({ to: '/picture-learning' })}
              className="kid-btn bg-white/20 text-white border-4 border-white/50 hover:bg-white/30 px-6 py-3 text-base"
            >
              🖼️ Picture Learning
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default KidsDashboard;
