import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { vocabularyByCategory } from "../data/languageData";
import type { Language, VocabCategory } from "../data/languageData";

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

const ALL_CATEGORIES: {
  key: VocabCategory;
  label: string;
  emoji: string;
  bgGradient: string;
}[] = [
  {
    key: "animals",
    label: "Animals",
    emoji: "🐾",
    bgGradient: "from-grass-300 to-grass-600",
  },
  {
    key: "food",
    label: "Food & Fruits",
    emoji: "🍎",
    bgGradient: "from-cherry-300 to-cherry-600",
  },
  {
    key: "colors",
    label: "Colors",
    emoji: "🎨",
    bgGradient: "from-lavender-300 to-lavender-600",
  },
  {
    key: "bodyParts",
    label: "Body Parts",
    emoji: "👁️",
    bgGradient: "from-sky-300 to-sky-600",
  },
];

const CARD_BG_COLORS = [
  "from-sunshine-300 to-sunshine-500",
  "from-cherry-300 to-cherry-500",
  "from-sky-300 to-sky-500",
  "from-grass-300 to-grass-500",
  "from-tangerine-300 to-tangerine-500",
  "from-lavender-300 to-lavender-500",
  "from-mint-300 to-mint-500",
  "from-coral-300 to-coral-500",
];

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75;
  window.speechSynthesis.speak(utterance);
}

export default function VocabularyLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  const config = LANGUAGE_CONFIG[language];
  const currentCat = ALL_CATEGORIES[categoryIdx];

  const entries =
    vocabularyByCategory[language]?.[currentCat.key] ??
    vocabularyByCategory.english[currentCat.key] ??
    [];

  const total = entries.length;

  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setWordIdx((i) => {
      const next = (i - 1 + total) % total;
      const nextItem = entries[next];
      if (nextItem) speak(nextItem.word, config.voice);
      return next;
    });
  }, [total, entries, config.voice]);

  const goNext = useCallback(() => {
    setWordIdx((i) => {
      const next = (i + 1) % total;
      const nextItem = entries[next];
      if (nextItem) speak(nextItem.word, config.voice);
      return next;
    });
  }, [total, entries, config.voice]);

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
    setWordIdx(0);
  };

  const handleCatChange = (catI: number) => {
    setCategoryIdx(catI);
    setWordIdx(0);
  };

  const item = entries[wordIdx];
  const bgGradient = item
    ? CARD_BG_COLORS[wordIdx % CARD_BG_COLORS.length]
    : currentCat.bgGradient;

  if (!item) return null;

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${bgGradient} transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="vocabulary.page"
    >
      {/* Top strip — language + category */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm">
        {/* Language tabs */}
        <div className="flex justify-center gap-2 px-2 pt-2">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              data-ocid={`vocabulary.lang_${lang}.toggle`}
              onClick={() => handleLangChange(lang)}
              className={`kid-btn px-3 py-1 text-sm font-bold border-2 transition-all ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].activeClass
                  : "bg-white/30 text-white border-white/50 hover:bg-white/50"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-1.5 px-2 py-1.5 overflow-x-auto">
          {ALL_CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              type="button"
              data-ocid={`vocabulary.cat_${cat.key}.tab`}
              onClick={() => handleCatChange(i)}
              className={`kid-btn px-3 py-1 text-sm font-bold border-2 transition-all whitespace-nowrap ${
                i === categoryIdx
                  ? "bg-white text-gray-800 border-white scale-105 shadow-fun"
                  : "bg-white/20 text-white border-white/40 hover:bg-white/40"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main card content — centered */}
      <div className="flex flex-col items-center justify-center h-full pt-24 pb-16 px-20 gap-4">
        {/* Giant emoji */}
        <span
          className="drop-shadow-2xl"
          style={{ fontSize: "clamp(120px, 30vw, 260px)" }}
        >
          {item.emoji}
        </span>

        {/* Word label */}
        <div
          className="font-bold text-white drop-shadow-lg text-center leading-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          {item.word}
        </div>

        {/* English translation (if not English mode) */}
        {language !== "english" && (
          <div
            className="font-bold text-white/80 text-center leading-tight"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            {item.english}
          </div>
        )}

        {/* Speak button */}
        <button
          type="button"
          data-ocid="vocabulary.speak.button"
          onClick={() => speak(item.word, config.voice)}
          className="kid-btn bg-white/30 hover:bg-white/50 text-white border-4 border-white/60 px-6 py-3 flex items-center gap-2 text-xl font-bold backdrop-blur-sm"
          aria-label="Speak"
        >
          <Volume2 size={28} />
          Listen
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        data-ocid="vocabulary.pagination_prev"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        data-ocid="vocabulary.pagination_next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Next"
      >
        <ChevronRight size={36} />
      </button>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-2xl text-white/80 drop-shadow-md pointer-events-none">
        {wordIdx + 1} / {total}
      </div>

      {/* Dot indicators (up to 20) */}
      {total <= 20 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 pointer-events-none flex-wrap px-8">
          {entries.map((entry, dotIdx) => (
            <div
              key={`dot-${entry.word}-${dotIdx}`}
              className={`rounded-full transition-all duration-300 ${
                dotIdx === wordIdx
                  ? "w-4 h-4 bg-white"
                  : "w-2.5 h-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
