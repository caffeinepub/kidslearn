import React, { useState, useEffect } from "react";
import { RotateCcw, CheckCircle } from "lucide-react";
import { getPuzzleWords } from "../data/languageData";
import CelebrationAnimation from "../components/CelebrationAnimation";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<Language, { label: string; btnClass: string }> = {
  english: { label: "English", btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600" },
  telugu: { label: "తెలుగు", btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600" },
  hindi: { label: "हिंदी", btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600" },
  tamil: { label: "தமிழ்", btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600" },
};

const TILE_COLORS = [
  "bg-sunshine-300 border-sunshine-600 text-sunshine-900",
  "bg-cherry-300 border-cherry-600 text-cherry-900",
  "bg-sky-300 border-sky-600 text-sky-900",
  "bg-grass-300 border-grass-600 text-grass-900",
  "bg-tangerine-300 border-tangerine-600 text-tangerine-900",
  "bg-lavender-300 border-lavender-600 text-lavender-900",
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function PuzzleGame() {
  const [language, setLanguage] = useState<Language>("english");
  const [wordIdx, setWordIdx] = useState(0);
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const words = getPuzzleWords(language);
  const currentWord = words[wordIdx];

  useEffect(() => {
    if (currentWord) {
      setTiles(shuffle(currentWord.letters));
      setSelected([]);
      setSolved(false);
      setShowCelebration(false);
    }
  }, [wordIdx, language]);

  const handleTileClick = (letter: string, tileIdx: number) => {
    const newSelected = [...selected, letter];
    setSelected(newSelected);
    const newTiles = [...tiles];
    newTiles.splice(tileIdx, 1);
    setTiles(newTiles);

    if (newSelected.join("") === currentWord.word) {
      setSolved(true);
      setScore((s) => s + 1);
      setShowCelebration(true);
    }
  };

  const handleRemoveLast = () => {
    if (selected.length === 0) return;
    const last = selected[selected.length - 1];
    setSelected(selected.slice(0, -1));
    setTiles([...tiles, last]);
  };

  const handleNext = () => {
    setWordIdx((i) => (i + 1) % words.length);
  };

  const handleReset = () => {
    setTiles(shuffle(currentWord.letters));
    setSelected([]);
    setSolved(false);
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-100 via-sunshine-100 to-tangerine-100 py-6 px-4">
      <CelebrationAnimation active={showCelebration} />
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-heading text-5xl text-coral-600 drop-shadow-md mb-2">🧩 Puzzle Game!</h1>
          <p className="font-body text-xl text-coral-500 font-semibold">Tap letters to spell the word!</p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setWordIdx(0); }}
              className={`kid-btn px-5 py-2.5 text-base font-heading border-4 ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].btnClass + " scale-110 shadow-fun-lg"
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Score */}
        <div className="flex justify-center mb-6">
          <div className="kid-card border-4 bg-sunshine-200 border-sunshine-500 px-8 py-3">
            <span className="font-heading text-2xl text-sunshine-700">⭐ Score: {score}</span>
          </div>
        </div>

        {/* Hint */}
        <div className="kid-card border-4 bg-white border-sky-300 p-6 mb-6 text-center">
          <p className="font-heading text-2xl text-gray-700 mb-2">Spell this word:</p>
          <span className="text-6xl">{currentWord?.emoji}</span>
          <p className="font-heading text-xl text-sky-600 mt-2">{currentWord?.hint}</p>
        </div>

        {/* Selected Letters */}
        <div className="kid-card border-4 bg-grass-100 border-grass-400 p-4 mb-4 min-h-[80px] flex items-center justify-center gap-2 flex-wrap">
          {selected.length === 0 ? (
            <span className="font-body text-gray-400 text-lg">Tap letters below...</span>
          ) : (
            selected.map((letter, idx) => (
              <span
                key={idx}
                className="kid-card border-4 bg-grass-300 border-grass-600 w-12 h-12 flex items-center justify-center font-heading text-2xl text-grass-900"
              >
                {letter}
              </span>
            ))
          )}
        </div>

        {/* Solved State */}
        {solved && (
          <div className="kid-card border-4 bg-sunshine-200 border-sunshine-500 p-4 mb-4 text-center flex items-center justify-center gap-3">
            <CheckCircle className="text-grass-600" size={32} />
            <span className="font-heading text-2xl text-sunshine-700">🎉 Correct! Well done!</span>
          </div>
        )}

        {/* Letter Tiles */}
        {!solved && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tiles.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleTileClick(letter, idx)}
                className={`kid-card border-4 w-14 h-14 flex items-center justify-center font-heading text-2xl hover:scale-110 hover:shadow-fun-xl active:scale-95 ${TILE_COLORS[idx % TILE_COLORS.length]}`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!solved && (
            <button
              onClick={handleRemoveLast}
              disabled={selected.length === 0}
              className="kid-btn bg-cherry-400 hover:bg-cherry-500 text-white px-6 py-3 text-lg border-4 border-cherry-600 disabled:opacity-40"
            >
              ← Remove
            </button>
          )}
          <button
            onClick={handleReset}
            className="kid-btn bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 text-lg border-4 border-sky-600 flex items-center gap-2"
          >
            <RotateCcw size={20} /> Reset
          </button>
          {solved && (
            <button
              onClick={handleNext}
              className="kid-btn bg-grass-400 hover:bg-grass-500 text-white px-6 py-3 text-lg border-4 border-grass-600"
            >
              Next Word ➡️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
