import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetSessionProgress } from '../hooks/useQueries';
import { LogOut, Trophy, BookOpen, Zap, TrendingUp, AlertCircle, LogIn } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const BADGE_INFO: Record<string, { label: string; emoji: string }> = {
  'math-quiz-badge': { label: 'Math Champion', emoji: '🔢' },
  'alphabet-quiz-badge': { label: 'Alphabet Star', emoji: '🔤' },
  'science-quiz-badge': { label: 'Science Whiz', emoji: '🔬' },
  'telugu-quiz-badge': { label: 'Telugu Hero', emoji: '🌺' },
  'hindi-quiz-badge': { label: 'Hindi Star', emoji: '🪔' },
  'english-quiz-badge': { label: 'English Pro', emoji: '📖' },
  'first-lesson': { label: 'First Lesson', emoji: '🎓' },
  'quiz-master': { label: 'Quiz Master', emoji: '🧠' },
};

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: progress, isLoading } = useGetSessionProgress();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (e) {
      console.error('Login error', e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lavender-100 to-sunshine-50 flex items-center justify-center px-4">
        <div className="bg-white border-4 border-lavender-400 rounded-4xl p-8 max-w-md w-full text-center shadow-fun-xl">
          <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
          <h1 className="font-fredoka text-3xl text-lavender-700 mb-2">Parent & Teacher Dashboard</h1>
          <p className="font-nunito text-muted-foreground mb-6">
            Log in to view your child's progress, scores, and achievements.
          </p>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-lavender-500 hover:bg-lavender-600 border-4 border-lavender-700 text-white font-fredoka text-2xl py-4 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
          >
            <LogIn size={28} />
            {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
          </button>
          <p className="font-nunito text-xs text-muted-foreground mt-4">
            Secure login — children do not need to log in.
          </p>
        </div>
      </div>
    );
  }

  const badges = progress?.earnedBadges || [];
  const completedLessons = progress?.completedLessons || [];
  const quizResults = progress?.quizResults || [];

  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + (Number(r.score) / Number(r.total)) * 100, 0) / quizResults.length)
    : 0;

  const weakAreas = quizResults
    .filter(r => (Number(r.score) / Number(r.total)) < 0.6)
    .map(r => r.subject);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-fredoka text-3xl sm:text-4xl text-lavender-700">
              👨‍👩‍👧‍👦 Parent Dashboard
            </h1>
            <p className="font-nunito text-muted-foreground text-sm mt-1">
              Logged in as: {identity.getPrincipal().toString().slice(0, 20)}...
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-cherry-500 hover:bg-cherry-600 border-4 border-cherry-700 text-white font-nunito font-bold px-4 py-2 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-3xl" />
            <Skeleton className="h-32 w-full rounded-3xl" />
            <Skeleton className="h-32 w-full rounded-3xl" />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-sunshine-400 border-4 border-sunshine-600 rounded-3xl p-4 text-center shadow-fun">
                <div className="text-3xl mb-1">⭐</div>
                <p className="font-fredoka text-white text-2xl">{badges.length}</p>
                <p className="font-nunito text-white/90 text-xs">Badges Earned</p>
              </div>
              <div className="bg-grass-400 border-4 border-grass-600 rounded-3xl p-4 text-center shadow-fun">
                <BookOpen className="mx-auto text-white mb-1" size={28} />
                <p className="font-fredoka text-white text-2xl">{completedLessons.length}</p>
                <p className="font-nunito text-white/90 text-xs">Lessons Done</p>
              </div>
              <div className="bg-tangerine-400 border-4 border-tangerine-600 rounded-3xl p-4 text-center shadow-fun">
                <Zap className="mx-auto text-white mb-1" size={28} />
                <p className="font-fredoka text-white text-2xl">{quizResults.length}</p>
                <p className="font-nunito text-white/90 text-xs">Quizzes Taken</p>
              </div>
              <div className="bg-lavender-400 border-4 border-lavender-600 rounded-3xl p-4 text-center shadow-fun">
                <TrendingUp className="mx-auto text-white mb-1" size={28} />
                <p className="font-fredoka text-white text-2xl">{avgScore}%</p>
                <p className="font-nunito text-white/90 text-xs">Avg Score</p>
              </div>
            </div>

            {/* Quiz Results */}
            <div className="bg-white border-4 border-tangerine-300 rounded-4xl p-5 mb-6 shadow-fun">
              <h2 className="font-fredoka text-2xl text-tangerine-700 mb-4 flex items-center gap-2">
                <Zap size={24} /> Quiz Performance
              </h2>
              {quizResults.length === 0 ? (
                <p className="font-nunito text-muted-foreground text-center py-4">No quizzes taken yet.</p>
              ) : (
                <div className="space-y-3">
                  {quizResults.map((result, i) => {
                    const pct = Math.round((Number(result.score) / Number(result.total)) * 100);
                    const barColor = pct >= 70 ? 'bg-grass-500' : pct >= 40 ? 'bg-sunshine-500' : 'bg-cherry-500';
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-nunito font-bold text-foreground w-24 text-sm capitalize">{result.subject}</span>
                        <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                          <div className={`${barColor} h-4 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-fredoka text-foreground w-16 text-right">{Number(result.score)}/{Number(result.total)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Weak Areas */}
            {weakAreas.length > 0 && (
              <div className="bg-cherry-50 border-4 border-cherry-300 rounded-4xl p-5 mb-6 shadow-fun">
                <h2 className="font-fredoka text-2xl text-cherry-700 mb-3 flex items-center gap-2">
                  <AlertCircle size={24} /> Areas Needing Improvement
                </h2>
                <div className="flex flex-wrap gap-2">
                  {weakAreas.map((area, i) => (
                    <span key={i} className="bg-cherry-400 border-2 border-cherry-600 text-white font-nunito font-bold px-3 py-1 rounded-2xl text-sm capitalize">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="bg-white border-4 border-sunshine-300 rounded-4xl p-5 shadow-fun">
              <h2 className="font-fredoka text-2xl text-sunshine-700 mb-4 flex items-center gap-2">
                <Trophy size={24} /> Earned Badges ({badges.length})
              </h2>
              {badges.length === 0 ? (
                <p className="font-nunito text-muted-foreground text-center py-4">No badges earned yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {badges.map((badgeId, i) => {
                    const info = BADGE_INFO[badgeId] || { label: badgeId, emoji: '🏅' };
                    return (
                      <div key={i} className="bg-sunshine-100 border-4 border-sunshine-400 rounded-3xl p-3 text-center">
                        <div className="text-3xl mb-1">{info.emoji}</div>
                        <p className="font-nunito font-bold text-sunshine-700 text-xs">{info.label}</p>
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
}
