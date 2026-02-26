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

const ALL_CATEGORIES: {
  key: VocabCategory;
  label: string;
  emoji: string;
  bgClass: string;
  headerBg: string;
}[] = [
  { key: "animals", label: "Animals", emoji: "🐾", bgClass: "bg-grass-200 border-grass-500", headerBg: "bg-grass-300" },
  { key: "food", label: "Food & Fruits", emoji: "🍎", bgClass: "bg-cherry-200 border-cherry-500", headerBg: "bg-cherry-300" },
  { key: "colors", label: "Colors", emoji: "🎨", bgClass: "bg-lavender-200 border-lavender-500", headerBg: "bg-lavender-300" },
  { key: "bodyParts", label: "Body Parts", emoji: "👁️", bgClass: "bg-sky-200 border-sky-500", headerBg: "bg-sky-300" },
];

// ─── Image mapping ────────────────────────────────────────────────────────────
// Maps English word (lowercase) → generated image path

const VOCAB_IMAGE_MAP: Record<string, string> = {
  // Animals
  cat: "/assets/generated/vocab-cat.dim_200x200.png",
  dog: "/assets/generated/vocab-dog.dim_200x200.png",
  fish: "/assets/generated/vocab-fish.dim_200x200.png",
  bird: "/assets/generated/vocab-bird.dim_200x200.png",
  elephant: "/assets/generated/vocab-elephant.dim_200x200.png",
  lion: "/assets/generated/vocab-lion.dim_200x200.png",
  // Food
  apple: "/assets/generated/vocab-apple.dim_200x200.png",
  banana: "/assets/generated/vocab-banana.dim_200x200.png",
  milk: "/assets/generated/vocab-milk.dim_200x200.png",
  rice: "/assets/generated/vocab-rice.dim_200x200.png",
  bread: "/assets/generated/vocab-bread.dim_200x200.png",
  mango: "/assets/generated/vocab-mango.dim_200x200.png",
  // Colors
  red: "/assets/generated/vocab-red.dim_200x200.png",
  blue: "/assets/generated/vocab-blue.dim_200x200.png",
  green: "/assets/generated/vocab-green.dim_200x200.png",
};

// ─── Card color palette ───────────────────────────────────────────────────────

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

// ─── TTS helper ───────────────────────────────────────────────────────────────

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PictureLesson() {
  const [language, setLanguage] = useState<Language>("english");

  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-mint-100 to-lavender-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-6xl text-tangerine-600 drop-shadow-md mb-2">
            🖼️ Picture Learning!
          </h1>
          <p className="font-body text-xl text-tangerine-500 font-semibold">
            See the picture, learn the word in 4 languages!
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`kid-btn px-6 py-3 text-lg font-heading border-4 transition-transform ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].activeClass
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              <span className="mr-1">{LANGUAGE_CONFIG[lang].flag}</span>
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Active language hint */}
        <div className="text-center mb-8">
          <span className="inline-block bg-white/70 border-2 border-gray-200 rounded-2xl px-5 py-2 font-body text-base text-gray-600">
            🔊 Tap any card to hear the word in{" "}
            <strong className="text-gray-800">{LANGUAGE_CONFIG[language].label}</strong>
          </span>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {ALL_CATEGORIES.map((cat) => {
            const entries = vocabularyByCategory[language]?.[cat.key]
              ?? vocabularyByCategory.english[cat.key]
              ?? [];

            if (!entries.length) return null;

            return (
              <section key={cat.key}>
                {/* Category Header */}
                <div className={`inline-flex items-center gap-3 mb-6 px-5 py-3 rounded-3xl border-4 ${cat.bgClass}`}>
                  <span className="text-3xl">{cat.emoji}</span>
                  <h2 className="font-heading text-2xl md:text-3xl text-gray-800">
                    {cat.label}
                  </h2>
                  <span className="font-body text-base text-gray-600 ml-1">
                    ({entries.length} words)
                  </span>
                </div>

                {/* Picture Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                  {entries.map((item, idx) => {
                    const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
                    // Look up image by English word (lowercase)
                    const englishKey = item.english.toLowerCase();
                    const imgSrc = VOCAB_IMAGE_MAP[englishKey] ?? null;

                    return (
                      <div
                        key={`${language}-${cat.key}-${idx}`}
                        className={`kid-card border-4 ${colorClass} cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 flex flex-col overflow-hidden`}
                        style={{ minHeight: "260px" }}
                        onClick={() => speak(item.word, config.voice)}
                      >
                        {/* Image or Emoji area */}
                        <div className="flex-1 flex items-center justify-center bg-white/40 py-3 px-2">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={item.english}
                              className="w-28 h-28 object-contain rounded-2xl drop-shadow-md"
                            />
                          ) : (
                            <span className="text-7xl drop-shadow-sm">{item.emoji}</span>
                          )}
                        </div>

                        {/* Labels area */}
                        <div className="bg-white/50 px-3 py-2 flex flex-col gap-1">
                          {/* Native word (highlighted for active language) */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-heading text-lg text-gray-800 leading-tight flex-1 truncate">
                              {item.word}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speak(item.word, config.voice);
                              }}
                              className={`kid-btn p-1.5 rounded-xl border-2 border-white ${config.btnClass} shrink-0`}
                              aria-label={`Speak ${item.word}`}
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>

                          {/* English label (always shown as reference) */}
                          {language !== "english" && (
                            <span className="font-body text-xs text-gray-500 truncate">
                              {item.english}
                            </span>
                          )}
                        </div>

                        {/* All 4 language labels strip */}
                        <AllLanguageStrip englishKey={englishKey} category={cat.key} idx={idx} />
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

// ─── Sub-component: shows all 4 language labels at the bottom of each card ───

interface AllLanguageStripProps {
  englishKey: string;
  category: VocabCategory;
  idx: number;
}

function AllLanguageStrip({ englishKey, category, idx }: AllLanguageStripProps) {
  const languages: Language[] = ["english", "telugu", "hindi", "tamil"];
  const langLabels: Record<Language, string> = {
    english: "EN",
    telugu: "TE",
    hindi: "HI",
    tamil: "TA",
  };
  const langColors: Record<Language, string> = {
    english: "bg-sky-200 text-sky-800",
    telugu: "bg-grass-200 text-grass-800",
    hindi: "bg-tangerine-200 text-tangerine-800",
    tamil: "bg-lavender-200 text-lavender-800",
  };

  return (
    <div className="grid grid-cols-4 border-t-2 border-white/50">
      {languages.map((lang) => {
        const entries = vocabularyByCategory[lang]?.[category] ?? vocabularyByCategory.english[category] ?? [];
        const entry = entries[idx];
        if (!entry) return null;
        return (
          <button
            key={lang}
            onClick={(e) => {
              e.stopPropagation();
              speak(entry.word, LANGUAGE_CONFIG[lang].voice);
            }}
            className={`${langColors[lang]} flex flex-col items-center py-1 px-0.5 hover:brightness-95 active:brightness-90 transition-all`}
            title={`${langLabels[lang]}: ${entry.word}`}
          >
            <span className="font-heading text-xs font-bold opacity-60">{langLabels[lang]}</span>
            <span className="font-body text-xs leading-tight text-center truncate w-full px-0.5">
              {entry.word}
            </span>
          </button>
        );
      })}
    </div>
  );
}
