import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerRole, useGetAllSessionsProgress } from '../hooks/useQueries';
import { UserRole, SessionProgress } from '../backend';
import { GraduationCap, Users, BookOpen, Star, AlertCircle, Loader2 } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: role, isLoading: roleLoading, isFetched: roleFetched } = useGetCallerRole();
  const { data: allProgress, isLoading: progressLoading, error: progressError } = useGetAllSessionsProgress();

  // Access control
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-fun border-4 border-sunshine-200 p-8 max-w-md text-center">
          <span className="text-6xl">🔒</span>
          <h2 className="text-2xl font-bold font-fredoka text-sunshine-600 mt-4">Login Required</h2>
          <p className="text-gray-600 font-nunito mt-2">Please log in as a Teacher to view this dashboard.</p>
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

  if (role !== UserRole.teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-fun border-4 border-cherry-200 p-8 max-w-md text-center">
          <span className="text-6xl">🚫</span>
          <h2 className="text-2xl font-bold font-fredoka text-cherry-600 mt-4">Access Denied</h2>
          <p className="text-gray-600 font-nunito mt-2">This dashboard is only for Teachers.</p>
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

  const totalStudents = allProgress?.length ?? 0;
  const totalLessons = allProgress?.reduce(
    (sum, [, p]) => sum + (p as SessionProgress).completedLessons.length,
    0
  ) ?? 0;
  const totalBadges = allProgress?.reduce(
    (sum, [, p]) => sum + (p as SessionProgress).earnedBadges.length,
    0
  ) ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 pb-12">
      {/* Header */}
      <div className="bg-grass-500 py-6 px-4 text-center shadow-md">
        <div className="flex items-center justify-center gap-3">
          <GraduationCap className="text-white" size={32} />
          <h1 className="text-3xl font-bold text-white font-fredoka">Teacher Dashboard</h1>
        </div>
        <p className="text-grass-100 font-nunito mt-1 text-sm">
          Monitor all students' learning progress
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border-2 border-sunshine-200 p-5 text-center shadow-sm">
            <Users className="mx-auto text-sunshine-500 mb-2" size={32} />
            <div className="text-3xl font-bold font-fredoka text-sunshine-600">{totalStudents}</div>
            <div className="text-sm text-gray-500 font-nunito">Active Students</div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-grass-200 p-5 text-center shadow-sm">
            <BookOpen className="mx-auto text-grass-500 mb-2" size={32} />
            <div className="text-3xl font-bold font-fredoka text-grass-600">{totalLessons}</div>
            <div className="text-sm text-gray-500 font-nunito">Lessons Completed</div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-tangerine-200 p-5 text-center shadow-sm">
            <Star className="mx-auto text-tangerine-500 mb-2" size={32} />
            <div className="text-3xl font-bold font-fredoka text-tangerine-600">{totalBadges}</div>
            <div className="text-sm text-gray-500 font-nunito">Badges Earned</div>
          </div>
        </div>

        {/* Student Progress Table */}
        <div className="bg-white rounded-2xl border-2 border-sunshine-200 shadow-sm overflow-hidden">
          <div className="bg-sunshine-100 px-6 py-4 border-b border-sunshine-200">
            <h2 className="text-xl font-bold font-fredoka text-sunshine-700">
              📊 Student Progress
            </h2>
          </div>

          {progressLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-sunshine-400" size={40} />
              <span className="ml-3 text-gray-500 font-nunito">Loading student data...</span>
            </div>
          ) : progressError ? (
            <div className="flex items-center justify-center py-16 gap-3 text-cherry-500">
              <AlertCircle size={24} />
              <span className="font-nunito">Failed to load student data. You may need Teacher permissions.</span>
            </div>
          ) : !allProgress || allProgress.length === 0 ? (
            <div className="text-center py-16 px-4">
              <span className="text-6xl">📚</span>
              <h3 className="text-xl font-bold font-fredoka text-gray-500 mt-4">
                No Student Activity Yet
              </h3>
              <p className="text-gray-400 font-nunito mt-2 max-w-sm mx-auto">
                Students' progress will appear here once they start using the app. Share the app link with your students!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-nunito">
                <thead>
                  <tr className="bg-grass-50 text-grass-700 text-left">
                    <th className="px-4 py-3 font-bold">#</th>
                    <th className="px-4 py-3 font-bold">Student ID</th>
                    <th className="px-4 py-3 font-bold">Lessons Done</th>
                    <th className="px-4 py-3 font-bold">Badges</th>
                    <th className="px-4 py-3 font-bold">Quiz Results</th>
                    <th className="px-4 py-3 font-bold">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {allProgress.map(([sessionId, progress], idx) => {
                    const p = progress as SessionProgress;
                    const quizResults = p.quizResults ?? [];
                    const avgScore =
                      quizResults.length > 0
                        ? Math.round(
                            quizResults.reduce(
                              (sum, r) =>
                                sum + (Number(r.total) > 0 ? (Number(r.score) / Number(r.total)) * 100 : 0),
                              0
                            ) / quizResults.length
                          )
                        : null;

                    return (
                      <tr
                        key={sessionId}
                        className={`border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-sunshine-50 transition-colors`}
                      >
                        <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                            {sessionId.slice(0, 12)}…
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 bg-grass-100 text-grass-700 px-2 py-1 rounded-full text-xs font-bold">
                            📖 {p.completedLessons?.length ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 bg-sunshine-100 text-sunshine-700 px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ {p.earnedBadges?.length ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {quizResults.length === 0 ? (
                            <span className="text-gray-400 text-xs">No quizzes yet</span>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {quizResults.slice(0, 3).map((r, i) => (
                                <span
                                  key={i}
                                  className="bg-tangerine-100 text-tangerine-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {r.subject}: {Number(r.score)}/{Number(r.total)}
                                </span>
                              ))}
                              {quizResults.length > 3 && (
                                <span className="text-gray-400 text-xs">+{quizResults.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {avgScore !== null ? (
                            <span
                              className={`font-bold text-sm ${
                                avgScore >= 80
                                  ? 'text-grass-600'
                                  : avgScore >= 50
                                  ? 'text-sunshine-600'
                                  : 'text-cherry-600'
                              }`}
                            >
                              {avgScore}%
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
