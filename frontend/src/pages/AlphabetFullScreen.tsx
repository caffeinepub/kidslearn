import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Volume2, ArrowLeft } from 'lucide-react';

const ALPHABET_DATA = [
  { letter: 'A', word: 'Apple', emoji: '🍎', image: '/assets/generated/letter-a-apple.dim_200x200.png' },
  { letter: 'B', word: 'Ball', emoji: '⚽', image: '/assets/generated/letter-b-ball.dim_200x200.png' },
  { letter: 'C', word: 'Cat', emoji: '🐱', image: '/assets/generated/letter-c-cat.dim_200x200.png' },
  { letter: 'D', word: 'Dog', emoji: '🐶', image: '/assets/generated/letter-d-dog.dim_200x200.png' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', image: '/assets/generated/letter-e-elephant.dim_200x200.png' },
  { letter: 'F', word: 'Fish', emoji: '🐟', image: '/assets/generated/letter-f-fish.dim_200x200.png' },
  { letter: 'G', word: 'Goat', emoji: '🐐', image: '/assets/generated/letter-g-goat.dim_200x200.png' },
  { letter: 'H', word: 'House', emoji: '🏠', image: '/assets/generated/letter-h-house.dim_200x200.png' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', image: '/assets/generated/letter-i-icecream.dim_200x200.png' },
  { letter: 'J', word: 'Jar', emoji: '🫙', image: '/assets/generated/letter-j-jar.dim_200x200.png' },
  { letter: 'K', word: 'Kite', emoji: '🪁', image: '/assets/generated/letter-k-kite.dim_200x200.png' },
  { letter: 'L', word: 'Lion', emoji: '🦁', image: '/assets/generated/letter-l-lion.dim_200x200.png' },
  { letter: 'M', word: 'Mango', emoji: '🥭', image: '/assets/generated/letter-m-mango.dim_200x200.png' },
  { letter: 'N', word: 'Nest', emoji: '🪺', image: '/assets/generated/letter-n-nest.dim_200x200.png' },
  { letter: 'O', word: 'Orange', emoji: '🍊', image: '/assets/generated/letter-o-orange.dim_200x200.png' },
  { letter: 'P', word: 'Parrot', emoji: '🦜', image: null },
  { letter: 'Q', word: 'Queen', emoji: '👑', image: null },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', image: null },
  { letter: 'S', word: 'Sun', emoji: '☀️', image: null },
  { letter: 'T', word: 'Tiger', emoji: '🐯', image: null },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', image: null },
  { letter: 'V', word: 'Violin', emoji: '🎻', image: null },
  { letter: 'W', word: 'Whale', emoji: '🐳', image: null },
  { letter: 'X', word: 'Xylophone', emoji: '🎵', image: null },
  { letter: 'Y', word: 'Yak', emoji: '🐂', image: null },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', image: null },
];

// Vivid child-friendly background colors per letter
const BG_COLORS = [
  '#FF6B6B', // A - coral red
  '#FF8E53', // B - orange
  '#FFC300', // C - golden yellow
  '#2ECC71', // D - emerald green
  '#1ABC9C', // E - teal
  '#3498DB', // F - bright blue
  '#9B59B6', // G - purple
  '#E91E63', // H - pink
  '#FF5722', // I - deep orange
  '#00BCD4', // J - cyan
  '#8BC34A', // K - light green
  '#FF9800', // L - amber
  '#E040FB', // M - purple accent
  '#26C6DA', // N - light cyan
  '#EF5350', // O - red
  '#66BB6A', // P - green
  '#AB47BC', // Q - medium purple
  '#42A5F5', // R - blue
  '#FFCA28', // S - yellow
  '#26A69A', // T - teal
  '#EC407A', // U - pink
  '#7E57C2', // V - deep purple
  '#29B6F6', // W - light blue
  '#FF7043', // X - deep orange
  '#9CCC65', // Y - light green
  '#5C6BC0', // Z - indigo
];

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export default function AlphabetFullScreen() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const current = ALPHABET_DATA[currentIndex];
  const bgColor = BG_COLORS[currentIndex];

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    setCurrentIndex((prev) => (prev + 1) % ALPHABET_DATA.length);
  }, [isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    setCurrentIndex((prev) => (prev - 1 + ALPHABET_DATA.length) % ALPHABET_DATA.length);
  }, [isAnimating]);

  const handleSpeak = useCallback(() => {
    const phrase = `${current.letter} is for ${current.word}`;
    setIsSpeaking(true);
    speak(phrase);
    setTimeout(() => setIsSpeaking(false), 1500);
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === ' ' || e.key === 'Enter') handleSpeak();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, handleSpeak]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  // Auto-speak on letter change
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(`${current.letter} is for ${current.word}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentIndex, current.letter, current.word]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: bgColor, transition: 'background-color 0.4s ease' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button */}
      <button
        onClick={() => navigate({ to: '/' })}
        className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full transition-all shadow-lg"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-heading">Back</span>
      </button>

      {/* Main clickable area */}
      <button
        onClick={handleSpeak}
        className="flex flex-col items-center justify-center gap-4 cursor-pointer group focus:outline-none"
        aria-label={`${current.letter} is for ${current.word}. Tap to hear.`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Big Letter */}
        <div
          className="font-heading text-white drop-shadow-2xl leading-none"
          style={{
            fontSize: 'clamp(8rem, 35vw, 22rem)',
            textShadow: '0 8px 32px rgba(0,0,0,0.25)',
            transform: isAnimating ? 'scale(0.85)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {current.letter}
        </div>

        {/* Image or Emoji */}
        <div className="flex items-center justify-center">
          {current.image ? (
            <img
              src={current.image}
              alt={current.word}
              className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-xl rounded-3xl bg-white/20 p-2"
              style={{ transition: 'transform 0.3s ease' }}
            />
          ) : (
            <span
              className="text-8xl md:text-9xl drop-shadow-xl"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}
            >
              {current.emoji}
            </span>
          )}
        </div>

        {/* Word phrase */}
        <div className="text-center">
          <p
            className="font-heading text-white drop-shadow-lg"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 4rem)',
              textShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            {current.letter} is for{' '}
            <span className="underline decoration-white/60 decoration-4 underline-offset-4">
              {current.word}
            </span>
          </p>
        </div>

        {/* Speaker affordance */}
        <div
          className={`flex items-center gap-2 bg-white/25 hover:bg-white/40 text-white px-5 py-2 rounded-full transition-all shadow-md mt-1 ${isSpeaking ? 'animate-pulse scale-110' : 'group-hover:scale-105'}`}
        >
          <Volume2 size={22} />
          <span className="font-body text-base font-bold">Tap to hear!</span>
        </div>
      </button>

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-3 md:p-4 shadow-xl transition-all hover:scale-110 active:scale-95"
        aria-label="Previous letter"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-3 md:p-4 shadow-xl transition-all hover:scale-110 active:scale-95"
        aria-label="Next letter"
      >
        <ChevronRight size={32} />
      </button>

      {/* Progress indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="bg-black/20 backdrop-blur-sm text-white px-5 py-2 rounded-full shadow-lg">
          <span className="font-heading text-lg tracking-wide">
            {current.letter} &middot; {currentIndex + 1} / {ALPHABET_DATA.length}
          </span>
        </div>
        {/* Dot indicators */}
        <div className="flex gap-1 flex-wrap justify-center max-w-xs">
          {ALPHABET_DATA.map((item, idx) => (
            <button
              key={item.letter}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-4 h-4 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to letter ${item.letter}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
