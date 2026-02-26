import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetKidsProfile } from '../hooks/useQueries';
import { usePinLock } from '../hooks/usePinLock';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Gamepad2, Trophy, Zap, Heart } from 'lucide-react';

const NAV_ITEMS = [
  { icon: '📚', label: 'Learn', desc: 'Lessons & Flashcards', path: '/age-group', color: 'bg-sky-100 border-sky-300 hover:bg-sky-200' },
  { icon: '🔤', label: 'Alphabet', desc: 'Letters & Words', path: '/alphabet-lesson/english', color: 'bg-sunshine-100 border-sunshine-300 hover:bg-sunshine-200' },
  { icon: '🔢', label: 'Numbers', desc: 'Count & Learn', path: '/numbers-lesson/english', color: 'bg-tangerine-100 border-tangerine-300 hover:bg-tangerine-200' },
  { icon: '🧪', label: 'Quiz', desc: 'Test Your Skills', path: '/quiz/math', color: 'bg-cherry-100 border-cherry-300 hover:bg-cherry-200' },
  { icon: '🎮', label: 'Games', desc: 'Fun Mini-Games', path: '/mini-game/math', color: 'bg-grass-100 border-grass-300 hover:bg-grass-200' },
  { icon: '🏆', label: 'Progress', desc: 'Badges & Stats', path: '/progress', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200' },
  { icon: '🎯', label: 'Matching', desc: 'Match & Learn', path: '/matching-game/english', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200' },
  { icon: '⏱️', label: 'Challenge', desc: 'Timed Quiz', path: '/timed-challenge', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200' },
];

export default function Home() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { isPinUnlocked } = usePinLock();
  const { data: kidsProfile, isLoading: profileLoading, isFetched } = useGetKidsProfile();

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isAuthenticated) return;
    if (profileLoading || !isFetched) return;

    if (kidsProfile === null) {
      navigate({ to: '/profile-setup' });
      return;
    }

    if (kidsProfile !== null && !isPinUnlocked) {
      navigate({ to: '/pin-entry' });
    }
  }, [isAuthenticated, kidsProfile, isPinUnlocked, profileLoading, isFetched, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sunshine-50 to-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="KidsLearn Hero"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/60 to-transparent flex items-center px-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-fredoka text-white drop-shadow-lg">
              Welcome{isAuthenticated && kidsProfile ? `, ${kidsProfile.name}` : ' to KidsLearn'}! 🌟
            </h1>
            <p className="text-lg text-sky-100 font-nunito mt-1">
              {isAuthenticated ? "Let's learn something amazing today!" : 'Log in to start your adventure!'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation Grid */}
        <h2 className="text-2xl font-fredoka text-cherry-600 mb-4 text-center">What do you want to do? 🎉</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate({ to: item.path as any })}
              className={`${item.color} border-2 rounded-2xl p-4 text-center transition-all duration-200 hover:scale-105 hover:shadow-fun active:scale-95`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="font-fredoka text-lg text-gray-800">{item.label}</div>
              <div className="text-xs font-nunito text-gray-600 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Fun Stats Banner */}
        <div className="bg-gradient-to-r from-cherry-500 to-tangerine-500 rounded-3xl p-6 text-white text-center shadow-fun">
          <h3 className="text-2xl font-fredoka mb-3">🚀 Keep Learning Every Day!</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <BookOpen className="h-8 w-8 mb-1" />
              <span className="font-fredoka text-xl">6</span>
              <span className="text-xs font-nunito opacity-90">Subjects</span>
            </div>
            <div className="flex flex-col items-center">
              <Gamepad2 className="h-8 w-8 mb-1" />
              <span className="font-fredoka text-xl">5+</span>
              <span className="text-xs font-nunito opacity-90">Games</span>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="h-8 w-8 mb-1" />
              <span className="font-fredoka text-xl">11</span>
              <span className="text-xs font-nunito opacity-90">Badges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
