import React, { useState } from "react";
import { Volume2 } from "lucide-react";
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
  const [language, setLanguage] = useState<Language>("english");

  const cards = getAlphabetCards(language);
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
      <div className="max-w-7xl mx-auto">
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
              onClick={() => setLanguage(lang)}
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
          {language.charAt(0).toUpperCase() + language.slice(1)} Alphabet — {cards.length} characters
        </div>

        {/* Full Cards Grid — all characters, no pagination */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {cards.map((card, idx) => {
            const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
            const imgSrc = getImageSrc(card.letter, language);
            return (
              <div
                key={`${language}-${card.letter}-${idx}`}
                className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 flex flex-col items-center justify-between p-4 min-h-[280px]`}
                onClick={() => speak(`${card.letter}. ${card.word}`, config.voice)}
              >
                {/* Letter - VERY LARGE */}
                <div className="flex-1 flex items-center justify-center w-full">
                  <span className="font-heading text-7xl md:text-8xl leading-none drop-shadow-md select-none">
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
                  <span className="font-heading text-lg text-gray-700 truncate flex-1">
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

        {/* Bottom spacer */}
        <div className="h-10" />
      </div>
    </div>
  );
}
