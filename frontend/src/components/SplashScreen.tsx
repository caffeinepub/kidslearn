import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // After enter animation (600ms), hold for 1s, then exit
    const holdTimer = setTimeout(() => setPhase('hold'), 600);
    const exitTimer = setTimeout(() => setPhase('exit'), 1800);
    const doneTimer = setTimeout(() => onComplete(), 2300);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center splash-bg transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="splash-bubble splash-bubble-1" />
        <div className="splash-bubble splash-bubble-2" />
        <div className="splash-bubble splash-bubble-3" />
        <div className="splash-bubble splash-bubble-4" />
        <div className="splash-bubble splash-bubble-5" />
      </div>

      {/* Logo container */}
      <div
        className={`relative flex flex-col items-center gap-6 transition-all duration-600 ${
          phase === 'enter' ? 'splash-logo-enter' : 'splash-logo-visible'
        }`}
      >
        {/* Logo image with bounce */}
        <div className="splash-logo-bounce">
          <img
            src="/assets/generated/kids-learn-logo.dim_400x400.png"
            alt="Kids Learn Logo"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl shadow-2xl border-4 border-white/60"
          />
        </div>

        {/* App name */}
        <div className="text-center">
          <h1 className="font-heading text-5xl sm:text-6xl text-white drop-shadow-lg tracking-wide">
            Kids Learn
          </h1>
          <p className="font-nunito text-white/90 text-lg sm:text-xl mt-2 font-semibold tracking-wider">
            ✨ Fun Learning Every Day ✨
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-2">
          <span className="splash-dot splash-dot-1" />
          <span className="splash-dot splash-dot-2" />
          <span className="splash-dot splash-dot-3" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
