import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { getNumbers100 } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<Language, { label: string; voice: string; btnClass: string; headerColor: string }> = {
  english: {
    label: "English",
    voice: "en-US",
    btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600",
    headerColor: "text-sky-600",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600",
    headerColor: "text-grass-600",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600",
    headerColor: "text-tangerine-600",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600",
    headerColor: "text-lavender-600",
  },
};

const CARD_COLORS = [
  "bg-sunshine-200 border-sunshine-500 hover:bg-sunshine-300",
  "bg-cherry-200 border-cherry-500 hover:bg-cherry-300",
  "bg-sky-200 border-sky-500 hover:bg-sky-300",
  "bg-grass-200 border-grass-500 hover:bg-grass-300",
  "bg-tangerine-200 border-tangerine-500 hover:bg-tangerine-300",
  "bg-lavender-200 border-lavender-500 hover:bg-lavender-300",
  "bg-mint-200 border-mint-500 hover:bg-mint-300",
  "bg-coral-200 border-coral-500 hover:bg-coral-300",
];

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function Numbers100Lesson() {
  const [language, setLanguage] = useState<Language>("english");
  const numbers = getNumbers100(language);
  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-grass-100 via-mint-100 to-sky-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`font-heading text-5xl md:text-6xl drop-shadow-md mb-2 ${config.headerColor}`}>
            🔢 Numbers 1–100
          </h1>
          <p className="font-body text-xl text-grass-500 font-semibold">
            Tap any number to hear it!
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

        {/* Numbers Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {numbers.map((num, idx) => {
            const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
            return (
              <div
                key={`${language}-${num.numeral}-${idx}`}
                className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-110 hover:shadow-fun-xl active:scale-95 flex flex-col items-center justify-center p-2 min-h-[100px] gap-1 transition-all duration-150`}
                onClick={() => speak(num.word, config.voice)}
              >
                {/* Number - Large */}
                <span className="font-heading text-4xl md:text-5xl leading-none drop-shadow-sm select-none text-gray-800">
                  {num.numeral}
                </span>

                {/* Word */}
                <span className="font-body text-xs text-gray-600 text-center leading-tight line-clamp-2 w-full px-1">
                  {num.word}
                </span>

                {/* Speak button */}
                <button
                  onClick={(e) => { e.stopPropagation(); speak(num.word, config.voice); }}
                  className={`kid-btn p-1 rounded-lg border-2 border-white ${config.btnClass} mt-0.5`}
                  aria-label="Speak"
                >
                  <Volume2 size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
