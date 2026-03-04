import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { getAlphabetCards } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<
  Language,
  { label: string; voice: string; btnClass: string; activeClass: string }
> = {
  english: {
    label: "English",
    voice: "en-US",
    btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600",
    activeClass: "bg-sky-500 text-white border-sky-700 scale-110 shadow-fun-lg",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600",
    activeClass:
      "bg-grass-500 text-white border-grass-700 scale-110 shadow-fun-lg",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    btnClass:
      "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600",
    activeClass:
      "bg-tangerine-500 text-white border-tangerine-700 scale-110 shadow-fun-lg",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    btnClass:
      "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600",
    activeClass:
      "bg-lavender-500 text-white border-lavender-700 scale-110 shadow-fun-lg",
  },
};

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

const ENGLISH_IMAGE_MAP: Record<string, string> = {
  a: "/assets/generated/alphabet-a.dim_200x200.png",
  b: "/assets/generated/alphabet-b.dim_200x200.png",
  c: "/assets/generated/alphabet-c.dim_200x200.png",
  d: "/assets/generated/alphabet-d.dim_200x200.png",
  e: "/assets/generated/alphabet-e.dim_200x200.png",
  f: "/assets/generated/alphabet-f.dim_200x200.png",
  g: "/assets/generated/alphabet-g.dim_200x200.png",
  h: "/assets/generated/alphabet-h.dim_200x200.png",
  i: "/assets/generated/alphabet-i.dim_200x200.png",
  j: "/assets/generated/alphabet-j.dim_200x200.png",
  k: "/assets/generated/alphabet-k.dim_200x200.png",
  l: "/assets/generated/alphabet-l.dim_200x200.png",
  m: "/assets/generated/alphabet-m.dim_200x200.png",
  n: "/assets/generated/alphabet-n.dim_200x200.png",
  o: "/assets/generated/alphabet-o.dim_200x200.png",
};

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75;
  window.speechSynthesis.speak(utterance);
}

export default function AlphabetLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const [idx, setIdx] = useState(0);

  const cards = getAlphabetCards(language);
  const config = LANGUAGE_CONFIG[language];
  const total = cards.length;

  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIdx((i) => (i + 1) % total);
  }, [total]);

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

  const card = cards[idx];
  const bgGradient = CARD_BG_COLORS[idx % CARD_BG_COLORS.length];
  const imgSrc =
    language === "english"
      ? (ENGLISH_IMAGE_MAP[card.letter.toLowerCase()] ?? null)
      : null;

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setIdx(0);
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${bgGradient} transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="alphabet.page"
    >
      {/* Language tabs — top strip */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-2 p-2 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2 flex-wrap justify-center">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              data-ocid={`alphabet.lang_${lang}.toggle`}
              onClick={() => handleLangChange(lang)}
              className={`kid-btn px-4 py-1.5 text-base font-heading border-3 transition-all ${
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
        {/* Giant letter */}
        <div
          className="font-heading leading-none drop-shadow-2xl select-none text-white"
          style={{ fontSize: "clamp(6rem, 25vw, 18rem)" }}
        >
          {card.letter}
        </div>

        {/* Image or emoji */}
        <div className="flex items-center justify-center">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={card.word}
              className="rounded-3xl shadow-2xl border-4 border-white/60"
              style={{
                width: "clamp(140px, 25vw, 280px)",
                height: "clamp(140px, 25vw, 280px)",
                objectFit: "contain",
              }}
            />
          ) : (
            <span
              className="drop-shadow-xl"
              style={{ fontSize: "clamp(80px, 18vw, 180px)" }}
            >
              {card.emoji}
            </span>
          )}
        </div>

        {/* Word label */}
        <div
          className="font-heading text-white drop-shadow-lg text-center leading-tight"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
        >
          {card.word}
        </div>

        {/* Speak button */}
        <button
          type="button"
          data-ocid="alphabet.speak.button"
          onClick={() => speak(`${card.letter}. ${card.word}`, config.voice)}
          className="kid-btn bg-white/30 hover:bg-white/50 text-white border-4 border-white/60 px-6 py-3 flex items-center gap-2 text-xl font-heading backdrop-blur-sm"
          aria-label="Speak"
        >
          <Volume2 size={28} />
          Listen
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        data-ocid="alphabet.pagination_prev"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        data-ocid="alphabet.pagination_next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Next"
      >
        <ChevronRight size={36} />
      </button>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-heading text-2xl text-white/80 drop-shadow-md pointer-events-none">
        {idx + 1} / {total}
      </div>

      {/* Dot indicators (up to 26) */}
      {total <= 30 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1 pointer-events-none flex-wrap px-8">
          {cards.map((card, dotIdx) => (
            <div
              key={`dot-${card.letter}`}
              className={`rounded-full transition-all duration-300 ${
                dotIdx === idx ? "w-4 h-4 bg-white" : "w-2.5 h-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
