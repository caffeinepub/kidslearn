import { useState, useEffect } from 'react';
import CelebrationAnimation from '../components/CelebrationAnimation';

type Language = 'english' | 'telugu' | 'hindi' | 'tamil';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: '🇬🇧 English',
  telugu: '🌺 Telugu',
  hindi: '🪔 Hindi',
  tamil: '🌸 Tamil',
};

interface MatchPair {
  id: string;
  emoji: string;
  words: Record<Language, string>;
}

const MATCH_PAIRS: MatchPair[] = [
  { id: 'dog', emoji: '🐶', words: { english: 'Dog', telugu: 'కుక్క', hindi: 'कुत्ता', tamil: 'நாய்' } },
  { id: 'cat', emoji: '🐱', words: { english: 'Cat', telugu: 'పిల్లి', hindi: 'बिल्ली', tamil: 'பூனை' } },
  { id: 'cow', emoji: '🐄', words: { english: 'Cow', telugu: 'ఆవు', hindi: 'गाय', tamil: 'பசு' } },
  { id: 'fish', emoji: '🐟', words: { english: 'Fish', telugu: 'చేప', hindi: 'मछली', tamil: 'மீன்' } },
  { id: 'bird', emoji: '🐦', words: { english: 'Bird', telugu: 'పక్షి', hindi: 'पक्षी', tamil: 'பறவை' } },
  { id: 'lion', emoji: '🦁', words: { english: 'Lion', telugu: 'సింహం', hindi: 'शेर', tamil: 'சிங்கம்' } },
];

interface CardItem {
  id: string;
  type: 'emoji' | 'word';
  pairId: string;
  content: string;
  matched: boolean;
  selected: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchingGame() {
  const [language, setLanguage] = useState<Language>('english');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [wrongPair, setWrongPair] = useState<string[]>([]);

  const initGame = (lang: Language) => {
    const emojiCards: CardItem[] = MATCH_PAIRS.map(p => ({
      id: `emoji-${p.id}`,
      type: 'emoji',
      pairId: p.id,
      content: p.emoji,
      matched: false,
      selected: false,
    }));
    const wordCards: CardItem[] = MATCH_PAIRS.map(p => ({
      id: `word-${p.id}`,
      type: 'word',
      pairId: p.id,
      content: p.words[lang],
      matched: false,
      selected: false,
    }));
    setCards(shuffle([...emojiCards, ...wordCards]));
    setSelectedCard(null);
    setMatchedCount(0);
    setAttempts(0);
    setWrongPair([]);
    setShowCelebration(false);
  };

  useEffect(() => {
    initGame(language);
  }, [language]);

  const handleCardClick = (card: CardItem) => {
    if (card.matched || card.selected) return;
    if (wrongPair.length > 0) return;

    if (!selectedCard) {
      setSelectedCard(card);
      setCards(prev => prev.map(c => c.id === card.id ? { ...c, selected: true } : c));
      return;
    }

    if (selectedCard.id === card.id) return;

    setAttempts(a => a + 1);

    if (selectedCard.pairId === card.pairId && selectedCard.type !== card.type) {
      // Match!
      setCards(prev => prev.map(c =>
        c.pairId === card.pairId ? { ...c, matched: true, selected: false } : c
      ));
      setSelectedCard(null);
      const newCount = matchedCount + 1;
      setMatchedCount(newCount);
      if (newCount === MATCH_PAIRS.length) {
        setTimeout(() => setShowCelebration(true), 300);
      }
    } else {
      // Wrong
      setWrongPair([selectedCard.id, card.id]);
      setCards(prev => prev.map(c =>
        c.id === card.id ? { ...c, selected: true } : c
      ));
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === selectedCard.id || c.id === card.id ? { ...c, selected: false } : c
        ));
        setSelectedCard(null);
        setWrongPair([]);
      }, 800);
    }
  };

  const isWrong = (cardId: string) => wrongPair.includes(cardId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-100 to-sunshine-50 px-4 py-8">
      <CelebrationAnimation active={showCelebration} onComplete={() => setShowCelebration(false)} />
      <div className="max-w-3xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-lavender-700 mb-2">
          Matching Game 🎮
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Match the emoji with the correct word!
        </p>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`font-nunito font-bold px-4 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-sm ${
                language === lang
                  ? 'bg-lavender-500 border-lavender-700 text-white shadow-fun'
                  : 'bg-white border-lavender-300 text-lavender-700 hover:bg-lavender-50'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-white border-4 border-grass-400 rounded-3xl px-5 py-2 text-center shadow-fun">
            <p className="font-fredoka text-2xl text-grass-600">{matchedCount}/{MATCH_PAIRS.length}</p>
            <p className="font-nunito text-xs text-muted-foreground">Matched</p>
          </div>
          <div className="bg-white border-4 border-tangerine-400 rounded-3xl px-5 py-2 text-center shadow-fun">
            <p className="font-fredoka text-2xl text-tangerine-600">{attempts}</p>
            <p className="font-nunito text-xs text-muted-foreground">Attempts</p>
          </div>
        </div>

        {/* Win Screen */}
        {matchedCount === MATCH_PAIRS.length && (
          <div className="bg-sunshine-400 border-4 border-sunshine-600 rounded-4xl p-6 text-center mb-6 shadow-fun-xl animate-bounce-in">
            <div className="text-5xl mb-2">🏆</div>
            <h2 className="font-fredoka text-3xl text-white mb-1">You Won!</h2>
            <p className="font-nunito text-white/90 font-bold mb-4">
              Matched all pairs in {attempts} attempts!
            </p>
            <button
              onClick={() => initGame(language)}
              className="bg-white text-sunshine-700 font-fredoka text-xl px-6 py-3 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all"
            >
              Play Again 🔄
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.matched}
              className={`
                min-h-[80px] rounded-3xl border-4 p-3 flex items-center justify-center
                font-nunito font-bold text-lg transition-all duration-200
                ${card.matched
                  ? 'bg-grass-400 border-grass-600 text-white scale-95 opacity-70'
                  : isWrong(card.id)
                  ? 'bg-cherry-400 border-cherry-600 text-white scale-95'
                  : card.selected
                  ? 'bg-sunshine-400 border-sunshine-600 text-white scale-105 shadow-fun-lg'
                  : 'bg-white border-lavender-300 text-foreground hover:border-lavender-500 hover:scale-105 shadow-fun'
                }
              `}
            >
              <span className={card.type === 'emoji' ? 'text-3xl' : 'text-base text-center leading-tight'}>
                {card.content}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => initGame(language)}
            className="bg-lavender-500 hover:bg-lavender-600 border-4 border-lavender-700 text-white font-fredoka text-xl px-6 py-3 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all"
          >
            🔄 New Game
          </button>
        </div>
      </div>
    </div>
  );
}
