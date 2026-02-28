import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { vocabularyByCategory } from "../data/languageData";
import type { Language, VocabCategory } from "../data/languageData";

// ─── Language config ──────────────────────────────────────────────────────────

const LANGUAGE_CONFIG: Record<Language, { label: string; flag: string; voice: string; btnClass: string; activeClass: string }> = {
  english: {
    label: "English",
    flag: "🇬🇧",
    voice: "en-US",
    btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600",
    activeClass: "bg-sky-500 text-white border-sky-700 scale-110 shadow-fun-lg",
  },
  telugu: {
    label: "తెలుగు",
    flag: "🇮🇳",
    voice: "te-IN",
    btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600",
    activeClass: "bg-grass-500 text-white border-grass-700 scale-110 shadow-fun-lg",
  },
  hindi: {
    label: "हिंदी",
    flag: "🇮🇳",
    voice: "hi-IN",
    btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600",
    activeClass: "bg-tangerine-500 text-white border-tangerine-700 scale-110 shadow-fun-lg",
  },
  tamil: {
    label: "தமிழ்",
    flag: "🇮🇳",
    voice: "ta-IN",
    btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600",
    activeClass: "bg-lavender-500 text-white border-lavender-700 scale-110 shadow-fun-lg",
  },
};

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES: { key: VocabCategory; label: string; emoji: string; bgClass: string }[] = [
  { key: "animals", label: "Animals", emoji: "🐾", bgClass: "bg-grass-200 border-grass-500" },
  { key: "food", label: "Food & Fruits", emoji: "🍎", bgClass: "bg-cherry-200 border-cherry-500" },
  { key: "colors", label: "Colors", emoji: "🎨", bgClass: "bg-lavender-200 border-lavender-500" },
  { key: "bodyParts", label: "Body Parts", emoji: "👁️", bgClass: "bg-sky-200 border-sky-500" },
];

// ─── Image map for vocab items ────────────────────────────────────────────────

const VOCAB_IMAGES: Record<string, string> = {
  dog: "/assets/generated/vocab-dog.dim_200x200.png",
  cat: "/assets/generated/vocab-cat.dim_200x200.png",
  bird: "/assets/generated/vocab-bird.dim_200x200.png",
  fish: "/assets/generated/vocab-fish.dim_200x200.png",
  lion: "/assets/generated/vocab-lion.dim_200x200.png",
  elephant: "/assets/generated/vocab-elephant.dim_200x200.png",
  apple: "/assets/generated/vocab-apple.dim_200x200.png",
  banana: "/assets/generated/vocab-banana.dim_200x200.png",
  mango: "/assets/generated/vocab-mango.dim_200x200.png",
  milk: "/assets/generated/vocab-milk.dim_200x200.png",
  bread: "/assets/generated/vocab-bread.dim_200x200.png",
  rice: "/assets/generated/vocab-rice.dim_200x200.png",
  red: "/assets/generated/vocab-red.dim_200x200.png",
  blue: "/assets/generated/vocab-blue.dim_200x200.png",
  green: "/assets/generated/vocab-green.dim_200x200.png",
};

const CARD_COLORS = [
  "bg-sunshine-100 border-sunshine-400",
  "bg-cherry-100 border-cherry-400",
  "bg-sky-100 border-sky-400",
  "bg-grass-100 border-grass-400",
  "bg-tangerine-100 border-tangerine-400",
  "bg-lavender-100 border-lavender-400",
  "bg-mint-100 border-mint-400",
  "bg-coral-100 border-coral-400",
];

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

function getImageForWord(word: string): string | null {
  const key = word.toLowerCase().trim();
  return VOCAB_IMAGES[key] || null;
}

export default function PictureLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const config = LANGUAGE_CONFIG[language];

  // Collect all vocab items across all categories
  const allItems: { word: string; emoji: string; category: string; categoryEmoji: string }[] = [];
  CATEGORIES.forEach((cat) => {
    const entries = vocabularyByCategory[language]?.[cat.key] ?? vocabularyByCategory.english[cat.key] ?? [];
    entries.forEach((item) => {
      allItems.push({ word: item.word, emoji: item.emoji, category: cat.label, categoryEmoji: cat.emoji });
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-sky-100 to-lavender-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-7xl text-tangerine-600 drop-shadow-md mb-2">
            🖼️ Picture Learning
          </h1>
          <p className="font-body text-xl md:text-2xl text-tangerine-500 font-semibold">
            Tap a picture to hear the word!
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`kid-btn px-6 py-3 text-xl font-heading border-4 ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].activeClass
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              {LANGUAGE_CONFIG[lang].flag} {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Category sections */}
        {CATEGORIES.map((cat) => {
          const entries = vocabularyByCategory[language]?.[cat.key] ?? vocabularyByCategory.english[cat.key] ?? [];
          if (!entries.length) return null;

          return (
            <section key={cat.key} className="mb-12">
              {/* Category header */}
              <div className={`inline-flex items-center gap-3 mb-5 px-5 py-3 rounded-3xl border-4 ${cat.bgClass}`}>
                <span className="text-4xl">{cat.emoji}</span>
                <h2 className="font-heading text-3xl md:text-4xl text-gray-800">{cat.label}</h2>
              </div>

              {/* Picture cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {entries.map((item, idx) => {
                  const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
                  const imgSrc = getImageForWord(item.word);

                  return (
                    <button
                      key={`${language}-${cat.key}-${idx}`}
                      onClick={() => speak(item.word, config.voice)}
                      className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 flex flex-col overflow-hidden text-left`}
                      style={{ minHeight: "220px" }}
                    >
                      {/* Image or emoji - larger */}
                      <div className="flex-1 flex items-center justify-center bg-white/40 py-5">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={item.word}
                            className="w-32 h-32 object-contain rounded-2xl"
                          />
                        ) : (
                          <span className="text-7xl">{item.emoji}</span>
                        )}
                      </div>

                      {/* Word label strip */}
                      <div className="flex items-center justify-between px-3 py-2 bg-white/50">
                        <span className="font-heading text-xl text-gray-800 truncate flex-1">{item.word}</span>
                        <Volume2 size={18} className="text-gray-500 shrink-0 ml-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className="h-12" />
      </div>
    </div>
  );
}
