import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { getVocabulary } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";
type Category = "animals" | "fruits" | "colors" | "body" | "food" | "nature";

const LANGUAGE_CONFIG: Record<Language, { label: string; voice: string; btnClass: string }> = {
  english: { label: "English", voice: "en-US", btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600" },
  telugu: { label: "తెలుగు", voice: "te-IN", btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600" },
  hindi: { label: "हिंदी", voice: "hi-IN", btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600" },
  tamil: { label: "தமிழ்", voice: "ta-IN", btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600" },
};

const CATEGORIES: { key: Category; label: string; emoji: string; bgClass: string }[] = [
  { key: "animals", label: "Animals", emoji: "🐾", bgClass: "bg-grass-200 border-grass-500" },
  { key: "fruits", label: "Fruits", emoji: "🍎", bgClass: "bg-cherry-200 border-cherry-500" },
  { key: "colors", label: "Colors", emoji: "🎨", bgClass: "bg-lavender-200 border-lavender-500" },
  { key: "body", label: "Body Parts", emoji: "👁️", bgClass: "bg-sky-200 border-sky-500" },
  { key: "food", label: "Food", emoji: "🍽️", bgClass: "bg-tangerine-200 border-tangerine-500" },
  { key: "nature", label: "Nature", emoji: "🌿", bgClass: "bg-mint-200 border-mint-500" },
];

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

export default function VocabularyLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const [category, setCategory] = useState<Category>("animals");

  const vocab = getVocabulary(language, category);
  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-sky-100 to-mint-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-6xl text-lavender-600 drop-shadow-md mb-2">
            📚 Vocabulary
          </h1>
          <p className="font-body text-xl text-lavender-500 font-semibold">
            Learn words with pictures!
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
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

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`kid-btn px-5 py-2.5 text-base font-heading border-4 flex items-center gap-2 ${
                category === cat.key
                  ? cat.bgClass + " scale-110 shadow-fun-lg text-gray-800"
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Vocabulary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {vocab.map((item, idx) => {
            const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
            return (
              <div
                key={`${language}-${category}-${idx}`}
                className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 animate-card-entrance card-delay-${Math.min(idx + 1, 6)} flex flex-col overflow-hidden`}
                style={{ height: "220px" }}
                onClick={() => speak(item.word, config.voice)}
              >
                {/* Emoji area */}
                <div className="flex-1 flex items-center justify-center bg-white/20">
                  <span className="text-6xl">{item.emoji}</span>
                </div>
                {/* Word area */}
                <div className="flex items-center justify-between px-3 py-2 bg-white/30">
                  <span className="font-heading text-lg text-gray-800 truncate flex-1">{item.word}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(item.word, config.voice); }}
                    className={`kid-btn p-1.5 rounded-xl border-2 border-white ${config.btnClass} shrink-0 ml-1`}
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
