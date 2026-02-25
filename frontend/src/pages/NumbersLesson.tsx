import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { getNumbers } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<Language, { label: string; voice: string; btnClass: string; cardBg: string }> = {
  english: {
    label: "English",
    voice: "en-US",
    btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600",
    cardBg: "bg-sky-100 border-sky-400",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600",
    cardBg: "bg-grass-100 border-grass-400",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600",
    cardBg: "bg-tangerine-100 border-tangerine-400",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600",
    cardBg: "bg-lavender-100 border-lavender-400",
  },
};

const NUMBER_CARD_COLORS = [
  "bg-cherry-200 border-cherry-500",
  "bg-sunshine-200 border-sunshine-500",
  "bg-sky-200 border-sky-500",
  "bg-grass-200 border-grass-500",
  "bg-tangerine-200 border-tangerine-500",
  "bg-lavender-200 border-lavender-500",
  "bg-mint-200 border-mint-500",
  "bg-coral-200 border-coral-500",
  "bg-cherry-300 border-cherry-600",
  "bg-sunshine-300 border-sunshine-600",
];

const NUMBER_EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function NumbersLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const numbers = getNumbers(language);
  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-tangerine-100 to-cherry-100 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-6xl text-tangerine-600 drop-shadow-md mb-2">
            🔢 Numbers 1–10
          </h1>
          <p className="font-body text-xl text-tangerine-500 font-semibold">
            Tap a card to hear the number!
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
                  ? LANGUAGE_CONFIG[lang].btnClass + " scale-110 shadow-fun-lg"
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Number Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {numbers.map((num, idx) => {
            const colorClass = NUMBER_CARD_COLORS[idx % NUMBER_CARD_COLORS.length];
            return (
              <div
                key={`${language}-${num.numeral}-${idx}`}
                className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-110 hover:shadow-fun-xl active:scale-95 animate-card-entrance card-delay-${Math.min(idx + 1, 6)} flex flex-col items-center justify-center p-4 min-h-[240px] gap-2`}
                onClick={() => speak(num.word, config.voice)}
              >
                {/* Big Number */}
                <span className="font-heading text-8xl md:text-9xl leading-none drop-shadow-md select-none text-gray-800">
                  {num.numeral}
                </span>

                {/* Emoji */}
                <span className="text-4xl">{NUMBER_EMOJIS[idx] || "⭐"}</span>

                {/* Word */}
                <div className="flex items-center gap-1 w-full justify-center">
                  <span className="font-heading text-lg text-gray-700 text-center leading-tight">
                    {num.word}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(num.word, config.voice); }}
                    className={`kid-btn p-1.5 rounded-xl border-2 border-white ${config.btnClass} shrink-0`}
                    aria-label="Speak"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
