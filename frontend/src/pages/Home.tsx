import { useNavigate } from '@tanstack/react-router';
import { BookOpen, Hash, Type, Music, Image, Map, Gamepad2, Zap, Puzzle, Trophy } from 'lucide-react';

const sections = [
  { label: 'Numbers', icon: Hash, path: '/numbers', color: 'bg-sunshine-400', border: 'border-sunshine-600', emoji: '🔢' },
  { label: 'Alphabet', icon: Type, path: '/alphabet', color: 'bg-grass-400', border: 'border-grass-600', emoji: '🔤' },
  { label: 'Poems', icon: Music, path: '/poems', color: 'bg-tangerine-400', border: 'border-tangerine-600', emoji: '📖' },
  { label: 'Vocabulary', icon: Image, path: '/vocabulary', color: 'bg-cherry-400', border: 'border-cherry-600', emoji: '🌟' },
  { label: 'India Map', icon: Map, path: '/map', color: 'bg-sky-400', border: 'border-sky-600', emoji: '🗺️' },
  { label: 'Matching Game', icon: Gamepad2, path: '/matching-game', color: 'bg-lavender-400', border: 'border-lavender-600', emoji: '🎮' },
  { label: 'Timed Challenge', icon: Zap, path: '/timed-challenge', color: 'bg-tangerine-500', border: 'border-tangerine-700', emoji: '⚡' },
  { label: 'Puzzle', icon: Puzzle, path: '/puzzle', color: 'bg-grass-500', border: 'border-grass-700', emoji: '🧩' },
  { label: 'Quiz', icon: BookOpen, path: '/quiz', color: 'bg-sunshine-500', border: 'border-sunshine-700', emoji: '🧠' },
  { label: 'Progress', icon: Trophy, path: '/progress', color: 'bg-cherry-500', border: 'border-cherry-700', emoji: '🏆' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sunshine-50">
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="KidsLearn Hero"
          className="w-full object-cover max-h-64 sm:max-h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sunshine-500/70 to-sky-500/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img
                src="/assets/generated/kidslearn-logo.dim_256x256.png"
                alt="KidsLearn"
                className="w-16 h-16 rounded-3xl shadow-fun-lg animate-float"
              />
              <h1 className="font-fredoka text-5xl sm:text-6xl drop-shadow-lg">KidsLearn</h1>
            </div>
            <p className="font-nunito text-xl sm:text-2xl font-bold drop-shadow-md">
              Learn Numbers, Alphabets, Poems & More! 🎉
            </p>
            <p className="font-nunito text-base sm:text-lg mt-1 drop-shadow-md opacity-90">
              Telugu • Hindi • English • Tamil
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-fredoka text-3xl sm:text-4xl text-center text-sunshine-700 mb-2">
          What do you want to learn today? 🌈
        </h2>
        <p className="font-nunito text-center text-muted-foreground mb-8 text-lg">
          Tap any card to start learning!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sections.map((section, i) => (
            <button
              key={section.path}
              onClick={() => navigate({ to: section.path })}
              className={`card-enter-${Math.min(i + 1, 8)} ${section.color} border-4 ${section.border} rounded-3xl p-4 flex flex-col items-center gap-2 shadow-fun-lg hover:scale-105 hover:shadow-fun-xl active:scale-95 transition-all duration-200 min-h-[120px] justify-center`}
            >
              <span className="text-4xl">{section.emoji}</span>
              <span className="font-fredoka text-white text-lg drop-shadow-sm text-center leading-tight">
                {section.label}
              </span>
            </button>
          ))}
        </div>

        {/* Age Group Section */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate({ to: '/age-group' })}
            className="bg-lavender-500 hover:bg-lavender-600 border-4 border-lavender-700 text-white font-fredoka text-2xl px-8 py-4 rounded-4xl shadow-fun-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            🎓 Start Structured Learning by Age Group
          </button>
        </div>
      </div>
    </div>
  );
}
