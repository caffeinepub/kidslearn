import React from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useContentRestrictions } from '../hooks/useContentRestrictions';
import { Lock } from 'lucide-react';

const SUBJECTS = [
  { id: 'math', label: 'Math', emoji: '🔢', icon: '/assets/generated/subject-math.dim_128x128.png', color: 'bg-sky-100 border-sky-300' },
  { id: 'alphabet', label: 'Alphabet', emoji: '🔤', icon: '/assets/generated/subject-alphabet.dim_128x128.png', color: 'bg-sunshine-100 border-sunshine-300' },
  { id: 'science', label: 'Science', emoji: '🔬', icon: '/assets/generated/subject-science.dim_128x128.png', color: 'bg-grass-100 border-grass-300' },
  { id: 'telugu', label: 'Telugu', emoji: '🇮🇳', icon: '/assets/generated/subject-telugu.dim_128x128.png', color: 'bg-tangerine-100 border-tangerine-300' },
  { id: 'hindi', label: 'Hindi', emoji: '🇮🇳', icon: '/assets/generated/subject-hindi.dim_128x128.png', color: 'bg-cherry-100 border-cherry-300' },
  { id: 'english', label: 'English', emoji: '📚', icon: '/assets/generated/subject-english.dim_128x128.png', color: 'bg-purple-100 border-purple-300' },
];

const ACTIVITIES = [
  { label: 'Lessons', emoji: '📖', pathFn: (s: string) => `/lessons/${s}` },
  { label: 'Flashcards', emoji: '🃏', pathFn: (s: string) => `/flashcards/${s}` },
  { label: 'Quiz', emoji: '🧪', pathFn: (s: string) => `/quiz/${s}` },
  { label: 'Mini-Game', emoji: '🎮', pathFn: (s: string) => `/mini-game/${s}` },
];

export default function SubjectSelection() {
  const navigate = useNavigate();
  const { ageGroup } = useParams({ from: '/subjects/$ageGroup' });
  const { isSubjectAllowed } = useContentRestrictions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sunshine-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-fredoka text-cherry-600 text-center mb-2">
          Choose a Subject! 📚
        </h1>
        <p className="text-center text-muted-foreground font-nunito mb-8">
          Age Group: <span className="capitalize font-semibold text-tangerine-600">{ageGroup}</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SUBJECTS.map((subject) => {
            const allowed = isSubjectAllowed(subject.id);
            return (
              <div
                key={subject.id}
                className={`${subject.color} border-2 rounded-2xl p-4 ${allowed ? '' : 'opacity-60'}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <img src={subject.icon} alt={subject.label} className="w-10 h-10 rounded-lg" />
                  <span className="font-fredoka text-lg text-gray-800">{subject.label}</span>
                  {!allowed && <Lock className="h-4 w-4 text-cherry-500 ml-auto" />}
                </div>

                {!allowed ? (
                  <div className="text-center py-2">
                    <p className="text-xs font-nunito text-cherry-600">🔒 Locked by parent</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {ACTIVITIES.map((activity) => (
                      <button
                        key={activity.label}
                        onClick={() => navigate({ to: activity.pathFn(subject.id) as any })}
                        className="bg-white/70 hover:bg-white rounded-xl p-2 text-center transition-all hover:scale-105 active:scale-95 border border-white/50"
                      >
                        <div className="text-xl">{activity.emoji}</div>
                        <div className="text-xs font-nunito text-gray-700 mt-0.5">{activity.label}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
