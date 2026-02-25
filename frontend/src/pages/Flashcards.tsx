import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, RotateCcw } from "lucide-react";
import { getFlashcards } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<Language, { label: string; voice: string; btnClass: string; frontBg: string; backBg: string }> = {
  english: { label: "English", voice: "en-US", btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600", frontBg: "bg-sky-200 border-sky-500", backBg: "bg-sky-400 border-sky-600" },
  telugu: { label: "తెలుగు", voice: "te-IN", btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600", frontBg: "bg-grass-200 border-grass-500", backBg: "bg-grass-400 border-grass-600" },
  hindi: { label: "हिंदी", voice: "hi-IN", btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600", frontBg: "bg-tangerine-200 border-tangerine-500", backBg: "bg-tangerine-400 border-tangerine-600" },
  tamil: { label: "தமிழ்", voice: "ta-IN", btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600", frontBg: "bg-lavender-200 border-lavender-500", backBg: "bg-lavender-400 border-lavender-600" },
};

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function Flashcards() {
  const [language, setLanguage] = useState<Language>("english");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = getFlashcards(language);
  const config = LANGUAGE_CONFIG[language];
  const card = cards[currentIdx];

  const handleNext = () => {
    setCurrentIdx((i) => (i + 1) % cards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIdx((i) => (i - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-lavender-100 to-mint-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl text-sky-600 drop-shadow-md mb-2">🗂️ Flashcards</h1>
          <p className="font-body text-xl text-sky-500 font-semibold">Tap the card to flip it!</p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setCurrentIdx(0); setFlipped(false); }}
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

        {/* Progress */}
        <div className="text-center mb-4">
          <span className="font-heading text-xl text-gray-600">{currentIdx + 1} / {cards.length}</span>
        </div>

        {/* Flashcard */}
        <div
          className="flip-card w-full h-72 cursor-pointer mb-8"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped((f) => !f)}
        >
          <div className={`flip-card-inner w-full h-full ${flipped ? "flipped" : ""}`}>
            {/* Front */}
            <div className={`flip-card-front kid-card border-4 ${config.frontBg} flex flex-col items-center justify-center p-8 gap-4`}>
              <span className="text-7xl">{card?.emoji}</span>
              <span className="font-heading text-3xl text-gray-800">{card?.front}</span>
              <span className="font-body text-sm text-gray-500">Tap to flip!</span>
            </div>
            {/* Back */}
            <div className={`flip-card-back kid-card border-4 ${config.backBg} flex flex-col items-center justify-center p-8 gap-4`}>
              <span className="font-heading text-2xl text-white text-center leading-relaxed">{card?.back}</span>
              <button
                onClick={(e) => { e.stopPropagation(); speak(card?.back ?? "", config.voice); }}
                className="kid-btn bg-white/30 hover:bg-white/50 text-white px-5 py-2 border-2 border-white flex items-center gap-2"
              >
                <Volume2 size={20} /> Listen
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            className="kid-btn bg-lavender-400 hover:bg-lavender-500 text-white px-6 py-3 text-lg border-4 border-lavender-600 flex items-center gap-2"
          >
            <ChevronLeft size={22} /> Prev
          </button>
          <button
            onClick={() => setFlipped(false)}
            className="kid-btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-3 border-4 border-gray-400 flex items-center gap-2"
          >
            <RotateCcw size={20} /> Reset
          </button>
          <button
            onClick={handleNext}
            className="kid-btn bg-lavender-400 hover:bg-lavender-500 text-white px-6 py-3 text-lg border-4 border-lavender-600 flex items-center gap-2"
          >
            Next <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
