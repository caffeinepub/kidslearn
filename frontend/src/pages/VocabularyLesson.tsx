import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { vocabularyByCategory } from "../data/languageData";
import type { Language, VocabCategory } from "../data/languageData";

const LANGUAGE_CONFIG: Record<Language, { label: string; voice: string; btnClass: string; headerClass: string }> = {
  english: { label: "English", voice: "en-US", btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600", headerClass: "text-sky-600" },
  telugu: { label: "తెలుగు", voice: "te-IN", btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600", headerClass: "text-grass-600" },
  hindi: { label: "हिंदी", voice: "hi-IN", btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600", headerClass: "text-tangerine-600" },
  tamil: { label: "தமிழ்", voice: "ta-IN", btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600", headerClass: "text-lavender-600" },
};

const ALL_CATEGORIES: { key: VocabCategory; label: string; emoji: string; bgClass: string; headerBg: string }[] = [
  { key: "animals", label: "Animals", emoji: "🐾", bgClass: "bg-grass-200 border-grass-500", headerBg: "bg-grass-300" },
  { key: "food", label: "Food & Fruits", emoji: "🍎", bgClass: "bg-cherry-200 border-cherry-500", headerBg: "bg-cherry-300" },
  { key: "colors", label: "Colors", emoji: "🎨", bgClass: "bg-lavender-200 border-lavender-500", headerBg: "bg-lavender-300" },
  { key: "bodyParts", label: "Body Parts", emoji: "👁️", bgClass: "bg-sky-200 border-sky-500", headerBg: "bg-sky-300" },
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

  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-sky-100 to-mint-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
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
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* All Categories — fully expanded */}
        <div className="space-y-12">
          {ALL_CATEGORIES.map((cat) => {
            const entries = vocabularyByCategory[language]?.[cat.key] ?? vocabularyByCategory.english[cat.key] ?? [];
            if (!entries.length) return null;

            return (
              <section key={cat.key}>
                {/* Category Header */}
                <div className={`flex items-center gap-3 mb-5 px-5 py-3 rounded-3xl border-4 ${cat.bgClass} inline-flex`}>
                  <span className="text-3xl">{cat.emoji}</span>
                  <h2 className="font-heading text-2xl md:text-3xl text-gray-800">
                    {cat.label}
                  </h2>
                  <span className="font-body text-base text-gray-600 ml-1">
                    ({entries.length} words)
                  </span>
                </div>

                {/* Word Cards Grid — all words, no truncation */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {entries.map((item, idx) => {
                    const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
                    return (
                      <div
                        key={`${language}-${cat.key}-${idx}`}
                        className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 flex flex-col overflow-hidden`}
                        style={{ minHeight: "200px" }}
                        onClick={() => speak(item.word, config.voice)}
                      >
                        {/* Emoji area */}
                        <div className="flex-1 flex items-center justify-center bg-white/20 py-4">
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
              </section>
            );
          })}
        </div>

        {/* Bottom spacer */}
        <div className="h-12" />
      </div>
    </div>
  );
}
