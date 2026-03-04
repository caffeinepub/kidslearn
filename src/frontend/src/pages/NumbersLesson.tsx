import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNumbers } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<
  Language,
  { label: string; voice: string; activeClass: string }
> = {
  english: {
    label: "English",
    voice: "en-US",
    activeClass: "bg-sky-500 text-white border-sky-700 scale-110 shadow-fun-lg",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    activeClass:
      "bg-grass-500 text-white border-grass-700 scale-110 shadow-fun-lg",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    activeClass:
      "bg-tangerine-500 text-white border-tangerine-700 scale-110 shadow-fun-lg",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    activeClass:
      "bg-lavender-500 text-white border-lavender-700 scale-110 shadow-fun-lg",
  },
};

const NUMBER_EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const CARD_BG_COLORS = [
  "from-cherry-300 to-cherry-500",
  "from-sunshine-300 to-sunshine-500",
  "from-sky-300 to-sky-500",
  "from-grass-300 to-grass-500",
  "from-tangerine-300 to-tangerine-500",
  "from-lavender-300 to-lavender-500",
  "from-mint-300 to-mint-500",
  "from-coral-300 to-coral-500",
  "from-cherry-400 to-cherry-600",
  "from-sunshine-400 to-sunshine-600",
];

/** Speak only the word (one sound only) */
function speakWithGap(_numeral: string, word: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(word);
  u.lang = lang;
  u.rate = 0.7;

  window.speechSynthesis.speak(u);
}

export default function NumbersLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const [idx, setIdx] = useState(0);

  const numbers = getNumbers(language);
  const config = LANGUAGE_CONFIG[language];
  const total = numbers.length;

  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIdx((i) => {
      const next = (i - 1 + total) % total;
      speakWithGap(numbers[next].numeral, numbers[next].word, config.voice);
      return next;
    });
  }, [total, numbers, config.voice]);

  const goNext = useCallback(() => {
    setIdx((i) => {
      const next = (i + 1) % total;
      speakWithGap(numbers[next].numeral, numbers[next].word, config.voice);
      return next;
    });
  }, [total, numbers, config.voice]);

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

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setIdx(0);
  };

  const num = numbers[idx];
  const bgGradient = CARD_BG_COLORS[idx % CARD_BG_COLORS.length];
  const emoji = NUMBER_EMOJIS[idx] ?? "⭐";

  // Auto-speak on initial load only
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    speakWithGap(num.numeral, num.word, config.voice);
  }, []);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${bgGradient} transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="numbers.page"
    >
      {/* Language tabs — top strip */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-2 p-2 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2 flex-wrap justify-center">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              data-ocid={`numbers.lang_${lang}.toggle`}
              onClick={() => handleLangChange(lang)}
              className={`kid-btn px-4 py-1.5 text-base font-nunito font-bold border-3 transition-all ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].activeClass
                  : "bg-white/30 text-white border-white/50 hover:bg-white/50"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>
      </div>

      {/* Main card content — centered */}
      <div className="flex flex-col items-center justify-center h-full pt-16 pb-16 px-24 gap-4">
        {/* Giant numeral */}
        <div
          className="font-nunito font-bold leading-none drop-shadow-2xl select-none text-white"
          style={{ fontSize: "clamp(7rem, 30vw, 22rem)" }}
        >
          {num.numeral}
        </div>

        {/* Big emoji */}
        <span
          className="drop-shadow-xl"
          style={{ fontSize: "clamp(100px, 22vw, 200px)" }}
        >
          {emoji}
        </span>

        {/* Word label */}
        <div
          className="font-nunito font-bold text-white drop-shadow-lg text-center leading-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {num.word}
        </div>

        {/* Speak button */}
        <button
          type="button"
          data-ocid="numbers.speak.button"
          onClick={() => speakWithGap(num.numeral, num.word, config.voice)}
          className="kid-btn bg-white/30 hover:bg-white/50 text-white border-4 border-white/60 px-6 py-3 flex items-center gap-2 text-xl font-nunito font-bold backdrop-blur-sm"
          aria-label="Speak"
        >
          <Volume2 size={28} />
          Listen
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        data-ocid="numbers.pagination_prev"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        data-ocid="numbers.pagination_next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Next"
      >
        <ChevronRight size={36} />
      </button>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-nunito text-2xl text-white/80 drop-shadow-md pointer-events-none">
        {idx + 1} / {total}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
        {numbers.map((num, dotIdx) => (
          <div
            key={`dot-${num.numeral}`}
            className={`rounded-full transition-all duration-300 ${
              dotIdx === idx ? "w-5 h-5 bg-white" : "w-3 h-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
