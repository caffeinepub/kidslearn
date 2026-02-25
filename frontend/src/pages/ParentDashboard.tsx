import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerRole, useGetSessionProgress } from '../hooks/useQueries';
import { UserRole } from '../backend';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, Loader2, BookOpen, Star, Trophy, BarChart2 } from 'lucide-react';

const ALL_BADGES = [
  { id: 'first_lesson', label: 'First Lesson', emoji: '📖' },
  { id: 'quiz_master', label: 'Quiz Master', emoji: '🧠' },
  { id: 'perfect_score', label: 'Perfect Score', emoji: '💯' },
  { id: 'streak_3', label: '3-Day Streak', emoji: '🔥' },
  { id: 'alphabet_hero', label: 'Alphabet Hero', emoji: '🔤' },
  { id: 'number_ninja', label: 'Number Ninja', emoji: '🔢' },
  { id: 'word_wizard', label: 'Word Wizard', emoji: '✨' },
  { id: 'poem_reader', label: 'Poem Reader', emoji: '🎵' },
  { id: 'game_champion', label: 'Game Champion', emoji: '🏆' },
  { id: 'fast_learner', label: 'Fast Learner', emoji: '⚡' },
  { id: 'curious_mind', label: 'Curious Mind', emoji: '🔍' },
];

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const { data: role, isLoading: roleLoading, isFetched: roleFetched } = useGetCallerRole();
  const principalStr = identity?.getPrincipal().toString();
  const { data: progress, isLoading: progressLoading } = useGetSessionProgress(principalStr);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-fun border-4 border-sunshine-200 p-8 max-w-md text-center">
          <span className="text-6xl">🔒</span>
          <h2 className="text-2xl font-bold font-fredoka text-sunshine-600 mt-4">Login Required</h2>
          <p className="text-gray-600 font-nunito mt-2">Please log in to view the Parent Dashboard.</p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="mt-6 px-6 py-3 bg-sunshine-400 text-white rounded-xl font-bold font-nunito hover:bg-sunshine-500 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (roleLoading || !roleFetched) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-sunshine-500" size={48} />
      </div>
    );
  }

  if (role !== UserRole.parent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-fun border-4 border-cherry-200 p-8 max-w-md text-center">
          <span className="text-6xl">🚫</span>
          <h2 className="text-2xl font-bold font-fredoka text-cherry-600 mt-4">Access Denied</h2>
          <p className="text-gray-600 font-nunito mt-2">This dashboard is only for Parents.</p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="mt-6 px-6 py-3 bg-sunshine-400 text-white rounded-xl font-bold font-nunito hover:bg-sunshine-500 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const earnedBadges = progress?.earnedBadges ?? [];
  const completedLessons = progress?.completedLessons ?? [];
  const quizResults = progress?.quizResults ?? [];
  const avgScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce(
            (sum, r) => sum + (Number(r.total) > 0 ? (Number(r.score) / Number(r.total)) * 100 : 0),
            0
          ) / quizResults.length
        )
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 pb-12">
      {/* Header */}
      <div className="bg-tangerine-400 py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-fredoka">👨‍👩‍👧 Parent Dashboard</h1>
            <p className="text-tangerine-100 font-nunito text-sm mt-0.5">
              Track your child's learning journey
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/40 text-white rounded-xl font-nunito font-bold text-sm transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {progressLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-tangerine-400" size={40} />
            <span className="ml-3 text-gray-500 font-nunito">Loading progress...</span>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl border-2 border-sunshine-200 p-4 text-center shadow-sm">
                <BookOpen className="mx-auto text-sunshine-500 mb-1" size={28} />
                <div className="text-2xl font-bold font-fredoka text-sunshine-600">{completedLessons.length}</div>
                <div className="text-xs text-gray-500 font-nunito">Lessons Done</div>
              </div>
              <div className="bg-white rounded-2xl border-2 border-grass-200 p-4 text-center shadow-sm">
                <Star className="mx-auto text-grass-500 mb-1" size={28} />
                <div className="text-2xl font-bold font-fredoka text-grass-600">{earnedBadges.length}</div>
                <div className="text-xs text-gray-500 font-nunito">Badges Earned</div>
              </div>
              <div className="bg-white rounded-2xl border-2 border-tangerine-200 p-4 text-center shadow-sm">
                <Trophy className="mx-auto text-tangerine-500 mb-1" size={28} />
                <div className="text-2xl font-bold font-fredoka text-tangerine-600">{quizResults.length}</div>
                <div className="text-xs text-gray-500 font-nunito">Quizzes Taken</div>
              </div>
              <div className="bg-white rounded-2xl border-2 border-cherry-200 p-4 text-center shadow-sm">
                <BarChart2 className="mx-auto text-cherry-500 mb-1" size={28} />
                <div className="text-2xl font-bold font-fredoka text-cherry-600">
                  {avgScore !== null ? `${avgScore}%` : '—'}
                </div>
                <div className="text-xs text-gray-500 font-nunito">Avg Score</div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl border-2 border-sunshine-200 shadow-sm mb-6 overflow-hidden">
              <div className="bg-sunshine-100 px-6 py-4 border-b border-sunshine-200">
                <h2 className="text-lg font-bold font-fredoka text-sunshine-700">⭐ Badges</h2>
              </div>
              <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {ALL_BADGES.map((badge) => {
                  const earned = earnedBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                        earned
                          ? 'border-sunshine-300 bg-sunshine-50'
                          : 'border-gray-200 bg-gray-50 opacity-40 grayscale'
                      }`}
                    >
                      <span className="text-3xl">{badge.emoji}</span>
                      <span className="text-xs font-nunito text-center text-gray-600 leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quiz Results */}
            <div className="bg-white rounded-2xl border-2 border-grass-200 shadow-sm overflow-hidden">
              <div className="bg-grass-100 px-6 py-4 border-b border-grass-200">
                <h2 className="text-lg font-bold font-fredoka text-grass-700">📝 Quiz Results</h2>
              </div>
              {quizResults.length === 0 ? (
                <div className="text-center py-10 text-gray-400 font-nunito">
                  No quizzes taken yet. Encourage your child to try a quiz!
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {quizResults.map((r, i) => {
                    const pct = Number(r.total) > 0 ? Math.round((Number(r.score) / Number(r.total)) * 100) : 0;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-nunito font-bold text-gray-700 w-24 shrink-0 text-sm">
                          {r.subject}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct >= 80 ? 'bg-grass-400' : pct >= 50 ? 'bg-sunshine-400' : 'bg-cherry-400'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold font-nunito text-gray-600 w-16 text-right shrink-0">
                          {Number(r.score)}/{Number(r.total)} ({pct}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
