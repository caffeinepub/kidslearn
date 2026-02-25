import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import { getAlphabetCards } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<Language, { label: string; voice: string; bgClass: string; borderClass: string; btnClass: string }> = {
  english: {
    label: "English",
    voice: "en-US",
    bgClass: "bg-sky-100 border-sky-400",
    borderClass: "border-sky-400",
    btnClass: "bg-sky-400 hover:bg-sky-500 text-white",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    bgClass: "bg-grass-100 border-grass-400",
    borderClass: "border-grass-400",
    btnClass: "bg-grass-400 hover:bg-grass-500 text-white",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    bgClass: "bg-tangerine-100 border-tangerine-400",
    borderClass: "border-tangerine-400",
    btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    bgClass: "bg-lavender-100 border-lavender-400",
    borderClass: "border-lavender-400",
    btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white",
  },
};

const CARD_COLORS = [
  "bg-sunshine-200 border-sunshine-500",
  "bg-cherry-200 border-cherry-500",
  "bg-sky-200 border-sky-500",
  "bg-grass-200 border-grass-500",
  "bg-tangerine-200 border-tangerine-500",
  "bg-lavender-200 border-lavender-500",
  "bg-mint-200 border-mint-500",
  "bg-coral-200 border-coral-500",
];

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function AlphabetLesson() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>("english");
  const [currentPage, setCurrentPage] = useState(0);

  const cards = getAlphabetCards(language);
  const CARDS_PER_PAGE = 6;
  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  const pageCards = cards.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE);

  const config = LANGUAGE_CONFIG[language];

  const getImageSrc = (letter: string, lang: Language): string | null => {
    if (lang !== "english") return null;
    const letterLower = letter.toLowerCase();
    const imageMap: Record<string, string> = {
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
    return imageMap[letterLower] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sunshine-100 to-lavender-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-6xl text-sky-600 drop-shadow-md mb-2">
            🔤 Alphabet Fun!
          </h1>
          <p className="font-body text-xl text-sky-500 font-semibold">
            Tap a card to hear the letter!
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setCurrentPage(0); }}
              className={`kid-btn px-6 py-3 text-lg font-heading border-4 ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].btnClass + " scale-110 shadow-fun-lg border-white"
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className={`mx-auto max-w-xl mb-8 p-4 rounded-3xl border-4 text-center font-heading text-lg ${config.bgClass}`}>
          Showing {language.charAt(0).toUpperCase() + language.slice(1)} alphabet — Page {currentPage + 1} of {totalPages}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
          {pageCards.map((card, idx) => {
            const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
            const imgSrc = getImageSrc(card.letter, language);
            return (
              <div
                key={`${language}-${card.letter}-${idx}`}
                className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 animate-card-entrance card-delay-${Math.min(idx + 1, 6)} flex flex-col items-center justify-between p-4 min-h-[280px]`}
                onClick={() => speak(`${card.letter}. ${card.word}`, config.voice)}
              >
                {/* Letter - VERY LARGE */}
                <div className="flex-1 flex items-center justify-center w-full">
                  <span className="font-heading text-8xl md:text-9xl leading-none drop-shadow-md select-none">
                    {card.letter}
                  </span>
                </div>

                {/* Image or Emoji */}
                <div className="w-full flex items-center justify-center py-2">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={card.word}
                      className="w-20 h-20 object-contain rounded-2xl"
                    />
                  ) : (
                    <span className="text-5xl">{card.emoji}</span>
                  )}
                </div>

                {/* Word + Speak Button */}
                <div className="w-full flex items-center justify-between gap-2 mt-1">
                  <span className="font-heading text-xl text-gray-700 truncate flex-1">
                    {card.word}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(`${card.letter}. ${card.word}`, config.voice); }}
                    className={`kid-btn p-2 rounded-xl border-2 border-white ${config.btnClass} shrink-0`}
                    aria-label="Speak"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="kid-btn bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 text-lg border-4 border-sky-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft size={22} /> Prev
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-full font-heading text-lg border-4 transition-all ${
                  i === currentPage
                    ? "bg-sunshine-400 border-sunshine-600 text-white scale-110"
                    : "bg-white border-gray-300 text-gray-600 hover:scale-105"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="kid-btn bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 text-lg border-4 border-sky-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
