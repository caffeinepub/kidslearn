import { useNavigate } from '@tanstack/react-router';
import { Trophy, Star, BookOpen, Zap } from 'lucide-react';
import { useGetSessionProgress } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Skeleton } from '@/components/ui/skeleton';

const ALL_BADGES = [
  { id: 'math-quiz-badge', label: 'Math Champion', emoji: '🔢', color: 'bg-tangerine-400 border-tangerine-600' },
  { id: 'alphabet-quiz-badge', label: 'Alphabet Star', emoji: '🔤', color: 'bg-grass-500 border-grass-700' },
  { id: 'science-quiz-badge', label: 'Science Whiz', emoji: '🔬', color: 'bg-sunshine-400 border-sunshine-600' },
  { id: 'telugu-quiz-badge', label: 'Telugu Hero', emoji: '🌺', color: 'bg-cherry-400 border-cherry-600' },
  { id: 'hindi-quiz-badge', label: 'Hindi Star', emoji: '🪔', color: 'bg-tangerine-500 border-tangerine-700' },
  { id: 'english-quiz-badge', label: 'English Pro', emoji: '📖', color: 'bg-grass-600 border-grass-800' },
  { id: 'first-lesson', label: 'First Lesson', emoji: '🎓', color: 'bg-sky-400 border-sky-600' },
  { id: 'quiz-master', label: 'Quiz Master', emoji: '🧠', color: 'bg-lavender-500 border-lavender-700' },
  { id: 'toddler-minigame-badge', label: 'Memory Master', emoji: '🎴', color: 'bg-sunshine-400 border-sunshine-600' },
  { id: 'early-learner-minigame-badge', label: 'Letter Matcher', emoji: '🔤', color: 'bg-grass-500 border-grass-700' },
  { id: 'older-kids-minigame-badge', label: 'Word Wizard', emoji: '🔀', color: 'bg-cherry-500 border-cherry-700' },
];

export default function Progress() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  // No argument — hook resolves to the current user's principal internally
  const { data: progress, isLoading } = useGetSessionProgress();

  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sunshine-100 to-grass-50 flex items-center justify-center px-4">
        <div className="bg-white border-4 border-sunshine-400 rounded-4xl p-8 max-w-md w-full text-center shadow-fun-xl">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="font-fredoka text-3xl text-sunshine-700 mb-2">My Progress</h1>
          <p className="font-nunito text-muted-foreground mb-6">
            Log in to track your progress, badges, and quiz scores!
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="w-full bg-grass-400 hover:bg-grass-500 border-4 border-grass-600 text-white font-fredoka text-xl py-3 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all"
          >
            🚀 Keep Learning!
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-48 mx-auto rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
      </div>
    );
  }

  const earnedBadgeIds = new Set(progress?.earnedBadges || []);
  const completedLessons = progress?.completedLessons || [];
  const quizResults = progress?.quizResults || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunshine-100 to-grass-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏆</div>
          <h1 className="font-fredoka text-4xl text-sunshine-700 mb-2">My Progress</h1>
          <p className="font-nunito text-muted-foreground font-semibold">
            Look at everything you've learned! 🌟
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-sunshine-400 border-4 border-sunshine-600 rounded-3xl p-3 text-center shadow-fun">
            <p className="font-fredoka text-white text-3xl">{earnedBadgeIds.size}</p>
            <p className="font-nunito text-white/90 text-xs">Badges</p>
          </div>
          <div className="bg-grass-400 border-4 border-grass-600 rounded-3xl p-3 text-center shadow-fun">
            <p className="font-fredoka text-white text-3xl">{completedLessons.length}</p>
            <p className="font-nunito text-white/90 text-xs">Lessons</p>
          </div>
          <div className="bg-tangerine-400 border-4 border-tangerine-600 rounded-3xl p-3 text-center shadow-fun">
            <p className="font-fredoka text-white text-3xl">{quizResults.length}</p>
            <p className="font-nunito text-white/90 text-xs">Quizzes</p>
          </div>
        </div>

        {/* Badges Section */}
        <section className="mb-6">
          <h2 className="font-fredoka text-2xl text-foreground mb-3 flex items-center gap-2">
            <Trophy className="text-tangerine-500" size={24} />
            Badges ({earnedBadgeIds.size}/{ALL_BADGES.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ALL_BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`border-4 rounded-3xl p-4 flex flex-col items-center gap-2 transition-all ${
                    earned
                      ? `${badge.color} shadow-fun`
                      : 'bg-muted border-muted-foreground/20 opacity-50 grayscale'
                  }`}
                >
                  <span className="text-3xl">{badge.emoji}</span>
                  <p className={`font-fredoka text-center text-sm leading-tight ${earned ? 'text-white' : 'text-muted-foreground'}`}>
                    {badge.label}
                  </p>
                  {!earned && <p className="font-nunito text-xs text-muted-foreground">🔒 Locked</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quiz Results */}
        {quizResults.length > 0 && (
          <section className="mb-8">
            <h2 className="font-fredoka text-2xl text-foreground mb-3 flex items-center gap-2">
              <Zap className="text-tangerine-500" size={24} />
              Quiz Scores
            </h2>
            <div className="space-y-3">
              {quizResults.map((result, i) => {
                const score = Number(result.score);
                const total = Number(result.total);
                const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                return (
                  <div key={i} className="bg-white border-4 border-tangerine-300 rounded-2xl p-4 flex items-center gap-4 shadow-fun">
                    <div className="w-12 h-12 rounded-2xl bg-tangerine-400 flex items-center justify-center">
                      <Star className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-fredoka text-lg text-foreground capitalize">{result.subject}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-tangerine-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-fredoka text-xl text-foreground">{score}/{total}</p>
                      <p className="font-nunito text-sm text-muted-foreground">{pct}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <button
          onClick={() => navigate({ to: '/' })}
          className="w-full py-5 rounded-3xl bg-tangerine-400 border-4 border-tangerine-600 text-white font-fredoka text-2xl shadow-fun-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <span>🚀</span> Keep Learning!
        </button>
      </div>
    </div>
  );
}
