import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import React, { useState } from "react";
import { getPoems } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<
  Language,
  { label: string; voice: string; btnClass: string; cardBg: string }
> = {
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
    btnClass:
      "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600",
    cardBg: "bg-tangerine-100 border-tangerine-400",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    btnClass:
      "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600",
    cardBg: "bg-lavender-100 border-lavender-400",
  },
};

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75;
  window.speechSynthesis.speak(utterance);
}

export default function PoemsLesson() {
  const [language, setLanguage] = useState<Language>("english");
  const [currentIdx, setCurrentIdx] = useState(0);

  const poems = getPoems(language);
  const config = LANGUAGE_CONFIG[language];
  const poem = poems[currentIdx];

  const lines = poem?.lines ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-cherry-100 to-sunshine-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-5xl text-lavender-600 drop-shadow-md mb-2">
            🎵 Poems & Rhymes
          </h1>
          <p className="font-semibold text-xl text-lavender-500">
            Tap a line to hear it!
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                setLanguage(lang);
                setCurrentIdx(0);
              }}
              className={`kid-btn px-6 py-3 text-lg font-bold border-4 ${
                language === lang
                  ? `${LANGUAGE_CONFIG[lang].btnClass} scale-110 shadow-fun-lg`
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Poem Card */}
        {poem && (
          <div className={`kid-card border-4 ${config.cardBg} p-6 mb-6`}>
            <h2 className="font-bold text-4xl text-center text-gray-800 mb-6">
              {poem.title}
            </h2>
            <div className="space-y-3">
              {lines.map((line, lineIdx) => (
                <div
                  key={`${poem.title}-line-${lineIdx}`}
                  className="flex items-center gap-3 rounded-2xl p-2"
                >
                  <button
                    type="button"
                    className={`kid-btn p-2 rounded-xl border-2 border-white ${config.btnClass} shrink-0`}
                    aria-label="Speak line"
                    onClick={() => speak(line, config.voice)}
                  >
                    <Volume2 size={18} />
                  </button>
                  <p className="font-semibold text-2xl text-gray-700 leading-relaxed">
                    {line}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => speak(lines.join(". "), config.voice)}
                className={`kid-btn px-6 py-3 text-lg border-4 ${config.btnClass} flex items-center gap-2`}
              >
                <Volume2 size={22} /> Read Full Poem Aloud
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="kid-btn bg-lavender-400 hover:bg-lavender-500 text-white px-6 py-3 text-lg border-4 border-lavender-600 disabled:opacity-40 flex items-center gap-2"
          >
            <ChevronLeft size={22} /> Prev
          </button>
          <span className="font-bold text-xl text-gray-600">
            {currentIdx + 1} / {poems.length}
          </span>
          <button
            type="button"
            onClick={() =>
              setCurrentIdx((i) => Math.min(poems.length - 1, i + 1))
            }
            disabled={currentIdx === poems.length - 1}
            className="kid-btn bg-lavender-400 hover:bg-lavender-500 text-white px-6 py-3 text-lg border-4 border-lavender-600 disabled:opacity-40 flex items-center gap-2"
          >
            Next <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
