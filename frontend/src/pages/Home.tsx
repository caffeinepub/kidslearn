import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Share2 } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import RoleSelectionModal from "../components/RoleSelectionModal";
import ShareModal from "../components/ShareModal";

const NAV_CARDS = [
  {
    title: "Alphabet A–Z",
    emoji: "🔡",
    description: "Full-screen A to Z with pictures!",
    path: "/alphabet-fullscreen",
    bgClass: "bg-sky-200 border-sky-500 hover:bg-sky-300",
    textClass: "text-sky-700",
  },
  {
    title: "Alphabet",
    emoji: "🔤",
    description: "Learn A to Z in 4 languages!",
    path: "/alphabet",
    bgClass: "bg-sky-100 border-sky-400 hover:bg-sky-200",
    textClass: "text-sky-600",
  },
  {
    title: "Numbers 1–10",
    emoji: "🔢",
    description: "Count from 1 to 10!",
    path: "/numbers",
    bgClass: "bg-sunshine-200 border-sunshine-500 hover:bg-sunshine-300",
    textClass: "text-sunshine-700",
  },
  {
    title: "Numbers 1–100",
    emoji: "💯",
    description: "Count all the way to 100!",
    path: "/numbers-100",
    bgClass: "bg-tangerine-200 border-tangerine-500 hover:bg-tangerine-300",
    textClass: "text-tangerine-700",
  },
  {
    title: "Vocabulary",
    emoji: "📚",
    description: "Learn new words with pictures!",
    path: "/vocabulary",
    bgClass: "bg-grass-200 border-grass-500 hover:bg-grass-300",
    textClass: "text-grass-700",
  },
  {
    title: "Picture Learning",
    emoji: "🖼️",
    description: "See pictures, learn words!",
    path: "/picture-learning",
    bgClass: "bg-tangerine-100 border-tangerine-400 hover:bg-tangerine-200",
    textClass: "text-tangerine-700",
  },
  {
    title: "Poems",
    emoji: "🎵",
    description: "Fun rhymes and songs!",
    path: "/poems",
    bgClass: "bg-lavender-200 border-lavender-500 hover:bg-lavender-300",
    textClass: "text-lavender-700",
  },
  {
    title: "Quiz",
    emoji: "❓",
    description: "Test what you know!",
    path: "/quiz",
    bgClass: "bg-cherry-200 border-cherry-500 hover:bg-cherry-300",
    textClass: "text-cherry-700",
  },
  {
    title: "Matching Game",
    emoji: "🃏",
    description: "Match the cards!",
    path: "/matching-game",
    bgClass: "bg-mint-200 border-mint-500 hover:bg-mint-300",
    textClass: "text-mint-700",
  },
  {
    title: "Puzzle",
    emoji: "🧩",
    description: "Spell the word!",
    path: "/puzzle",
    bgClass: "bg-coral-200 border-coral-500 hover:bg-coral-300",
    textClass: "text-coral-700",
  },
  {
    title: "Timed Challenge",
    emoji: "⏱️",
    description: "Race against the clock!",
    path: "/timed-challenge",
    bgClass: "bg-sunshine-300 border-sunshine-600 hover:bg-sunshine-400",
    textClass: "text-sunshine-800",
  },
  {
    title: "Flashcards",
    emoji: "🗂️",
    description: "Flip and learn!",
    path: "/flashcards",
    bgClass: "bg-sky-300 border-sky-600 hover:bg-sky-400",
    textClass: "text-sky-800",
  },
  {
    title: "Mini Games",
    emoji: "🎮",
    description: "Play and learn!",
    path: "/mini-game",
    bgClass: "bg-lavender-300 border-lavender-600 hover:bg-lavender-400",
    textClass: "text-lavender-800",
  },
  {
    title: "My Progress",
    emoji: "⭐",
    description: "See your badges!",
    path: "/progress",
    bgClass: "bg-grass-300 border-grass-600 hover:bg-grass-400",
    textClass: "text-grass-800",
  },
  {
    title: "My Profile",
    emoji: "👤",
    description: "View your profile!",
    path: "/profile",
    bgClass: "bg-lavender-200 border-lavender-500 hover:bg-lavender-300",
    textClass: "text-lavender-700",
  },
  {
    title: "Support Us",
    emoji: "💝",
    description: "Donate & help us grow!",
    path: "/donate",
    bgClass: "bg-cherry-100 border-cherry-400 hover:bg-cherry-200",
    textClass: "text-cherry-700",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [shareOpen, setShareOpen] = useState(false);

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();

  // Show welcome modal when authenticated but no profile yet
  const showWelcomeModal = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-sky-100 to-lavender-100">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-r from-sky-400 via-lavender-400 to-cherry-400 py-14 px-4">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-4 left-8 text-6xl animate-float">⭐</div>
            <div className="absolute top-8 right-12 text-5xl animate-bounce">🌈</div>
            <div className="absolute bottom-4 left-1/4 text-4xl">🎉</div>
            <div className="absolute bottom-6 right-1/3 text-5xl animate-float">🦋</div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Logo - prominently displayed */}
            <div className="flex justify-center mb-6">
              <img
                src="/assets/generated/kidslearn-logo.dim_256x256.png"
                alt="KidsLearn Logo"
                className="w-36 h-36 md:w-48 md:h-48 rounded-3xl shadow-fun-xl border-4 border-white"
              />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl text-white drop-shadow-lg mb-3">
              🌟 KidsLearn! 🌟
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/90 font-bold mb-6">
              Learn Alphabets, Numbers &amp; Words in Telugu, Hindi, Tamil &amp; English!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate({ to: "/age-group" })}
                className="kid-btn bg-sunshine-400 hover:bg-sunshine-500 text-white px-8 py-4 text-xl border-4 border-sunshine-600 shadow-fun-xl"
              >
                🚀 Start Learning!
              </button>
              <button
                onClick={() => navigate({ to: "/alphabet-fullscreen" })}
                className="kid-btn bg-white hover:bg-gray-100 text-sky-600 px-8 py-4 text-xl border-4 border-white shadow-fun-xl flex items-center gap-2"
              >
                🔡 A–Z Full Screen
              </button>
              <button
                onClick={() => navigate({ to: "/picture-learning" })}
                className="kid-btn bg-white/90 hover:bg-white text-tangerine-600 px-8 py-4 text-xl border-4 border-white shadow-fun-xl flex items-center gap-2"
              >
                🖼️ Picture Learning
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => navigate({ to: "/kids-dashboard" })}
                  className="kid-btn bg-white/80 hover:bg-white text-sky-600 px-8 py-4 text-xl border-4 border-white shadow-fun-xl flex items-center gap-2"
                >
                  <LayoutDashboard size={22} /> My Dashboard
                </button>
              )}
              {/* Share App Button */}
              <button
                onClick={() => setShareOpen(true)}
                className="kid-btn bg-white/80 hover:bg-white text-cherry-600 px-8 py-4 text-xl border-4 border-white shadow-fun-xl flex items-center gap-2"
              >
                <Share2 size={22} /> Share App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-heading text-4xl md:text-5xl text-center text-lavender-600 mb-8 drop-shadow-sm">
          🎯 What do you want to learn today?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {NAV_CARDS.map((card, idx) => (
            <button
              key={card.path}
              onClick={() => navigate({ to: card.path })}
              className={`kid-card border-4 ${card.bgClass} p-5 flex flex-col items-center gap-3 text-center cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 animate-card-entrance card-delay-${Math.min(idx + 1, 6)}`}
            >
              <span className="text-6xl">{card.emoji}</span>
              <span className={`font-heading text-xl md:text-2xl ${card.textClass}`}>{card.title}</span>
              <span className="font-body text-sm md:text-base text-gray-600 leading-tight">{card.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Fun Stats Banner */}
      <section className="bg-gradient-to-r from-grass-400 to-mint-400 py-10 px-4 mx-4 mb-8 rounded-3xl max-w-6xl md:mx-auto">
        <div className="flex flex-wrap justify-center gap-8 text-white text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">🌍</span>
            <span className="font-heading text-3xl">4 Languages</span>
            <span className="font-body text-base opacity-90">Telugu, Hindi, Tamil, English</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">📖</span>
            <span className="font-heading text-3xl">100+ Lessons</span>
            <span className="font-body text-base opacity-90">Fun &amp; Interactive</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">🏆</span>
            <span className="font-heading text-3xl">11 Badges</span>
            <span className="font-body text-base opacity-90">Earn as you learn!</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">🎮</span>
            <span className="font-heading text-3xl">5+ Games</span>
            <span className="font-body text-base opacity-90">Play &amp; Learn!</span>
          </div>
        </div>
      </section>

      {/* Welcome Modal (auto-redirects to kids dashboard) */}
      <RoleSelectionModal open={showWelcomeModal} />

      {/* Share Modal */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
