import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { getMatchingPairs } from "../data/languageData";
import type { Language } from "../data/languageData";
import CelebrationAnimation from "../components/CelebrationAnimation";

const LANGUAGE_CONFIG: Record<Language, { label: string; btnClass: string; cardBg: string }> = {
  english: { label: "English", btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600", cardBg: "bg-sky-200 border-sky-500" },
  telugu: { label: "తెలుగు", btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600", cardBg: "bg-grass-200 border-grass-500" },
  hindi: { label: "हिंदी", btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600", cardBg: "bg-tangerine-200 border-tangerine-500" },
  tamil: { label: "தமிழ்", btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600", cardBg: "bg-lavender-200 border-lavender-500" },
};

interface CardItem {
  id: string;
  content: string;
  pairId: number;
  type: "emoji" | "word";
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MatchingGame() {
  const [language, setLanguage] = useState<Language>("english");
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const config = LANGUAGE_CONFIG[language];

  const initGame = (lang: Language) => {
    const pairs = getMatchingPairs(lang);
    const items: CardItem[] = [];
    pairs.forEach((pair, idx) => {
      items.push({ id: `emoji-${idx}`, content: pair.emoji, pairId: idx, type: "emoji" });
      items.push({ id: `word-${idx}`, content: pair.word, pairId: idx, type: "word" });
    });
    setCards(shuffle(items));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => { initGame(language); }, [language]);

  const handleCardClick = (cardId: string) => {
    if (flipped.length === 2) return;
    if (flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped.map((id) => cards.find((c) => c.id === id)!);
      if (a.pairId === b.pairId && a.type !== b.type) {
        const newMatched = [...matched, a.id, b.id];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) setWon(true);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isFlippedCard = (id: string) => flipped.includes(id) || matched.includes(id);
  const isMatchedCard = (id: string) => matched.includes(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-100 via-sky-100 to-lavender-100 py-6 px-4">
      <CelebrationAnimation active={won} />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-heading text-5xl text-mint-600 drop-shadow-md mb-2">🃏 Matching Game!</h1>
          <p className="font-body text-lg text-mint-500 font-semibold">Match the emoji with the word!</p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
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

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="kid-card border-4 bg-sunshine-200 border-sunshine-500 px-6 py-3 text-center">
            <span className="font-heading text-2xl text-sunshine-700">Moves: {moves}</span>
          </div>
          <div className="kid-card border-4 bg-grass-200 border-grass-500 px-6 py-3 text-center">
            <span className="font-heading text-2xl text-grass-700">Matched: {matched.length / 2}/{cards.length / 2}</span>
          </div>
          <button
            onClick={() => initGame(language)}
            className="kid-btn bg-cherry-400 hover:bg-cherry-500 text-white px-5 py-3 border-4 border-cherry-600 flex items-center gap-2"
          >
            <RotateCcw size={20} /> Reset
          </button>
        </div>

        {won && (
          <div className="kid-card border-4 bg-sunshine-200 border-sunshine-500 p-6 text-center mb-6">
            <div className="text-6xl mb-2">🏆</div>
            <h2 className="font-heading text-3xl text-sunshine-700">You Won in {moves} moves!</h2>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {cards.map((card) => {
            const flippedState = isFlippedCard(card.id);
            const matchedState = isMatchedCard(card.id);
            return (
              <div
                key={card.id}
                onClick={() => !flippedState && handleCardClick(card.id)}
                className={`kid-card border-4 cursor-pointer min-h-[80px] flex items-center justify-center transition-all duration-300 ${
                  matchedState
                    ? "bg-grass-300 border-grass-600 scale-95 opacity-80"
                    : flippedState
                    ? config.cardBg + " scale-105 shadow-fun-xl"
                    : "bg-white border-gray-300 hover:scale-105 hover:shadow-fun"
                }`}
              >
                {flippedState ? (
                  <span className={`font-heading text-center px-1 ${card.type === "emoji" ? "text-3xl" : "text-base"}`}>
                    {card.content}
                  </span>
                ) : (
                  <span className="text-2xl">❓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
