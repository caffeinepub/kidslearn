import { useState, useEffect } from 'react';
import CelebrationAnimation from '../components/CelebrationAnimation';

type Language = 'english' | 'telugu' | 'hindi' | 'tamil';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: '🇬🇧 English',
  telugu: '🌺 Telugu',
  hindi: '🪔 Hindi',
  tamil: '🌸 Tamil',
};

interface PuzzleWord {
  id: string;
  emoji: string;
  words: Record<Language, string>;
}

const PUZZLE_WORDS: PuzzleWord[] = [
  { id: 'sun', emoji: '☀️', words: { english: 'SUN', telugu: 'సూర్యుడు', hindi: 'सूरज', tamil: 'சூரியன்' } },
  { id: 'cat', emoji: '🐱', words: { english: 'CAT', telugu: 'పిల్లి', hindi: 'बिल्ली', tamil: 'பூனை' } },
  { id: 'dog', emoji: '🐶', words: { english: 'DOG', telugu: 'కుక్క', hindi: 'कुत्ता', tamil: 'நாய்' } },
  { id: 'fish', emoji: '🐟', words: { english: 'FISH', telugu: 'చేప', hindi: 'मछली', tamil: 'மீன்' } },
  { id: 'tree', emoji: '🌳', words: { english: 'TREE', telugu: 'చెట్టు', hindi: 'पेड़', tamil: 'மரம்' } },
  { id: 'star', emoji: '⭐', words: { english: 'STAR', telugu: 'నక్షత్రం', hindi: 'तारा', tamil: 'நட்சத்திரம்' } },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PuzzleGame() {
  const [language, setLanguage] = useState<Language>('english');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState<{ char: string; id: number; used: boolean }[]>([]);
  const [answer, setAnswer] = useState<{ char: string; id: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentWord = PUZZLE_WORDS[currentWordIndex];

  const initPuzzle = (wordIndex: number, lang: Language) => {
    const word = PUZZLE_WORDS[wordIndex];
    const target = word.words[lang];
    const letters = target.split('').map((char, i) => ({ char, id: i, used: false }));
    setScrambledLetters(shuffle(letters));
    setAnswer([]);
    setIsCorrect(false);
  };

  useEffect(() => {
    initPuzzle(currentWordIndex, language);
  }, [currentWordIndex, language]);

  const handleLetterClick = (letter: { char: string; id: number; used: boolean }) => {
    if (letter.used || isCorrect) return;
    const newAnswer = [...answer, { char: letter.char, id: letter.id }];
    setAnswer(newAnswer);
    setScrambledLetters(prev => prev.map(l => l.id === letter.id ? { ...l, used: true } : l));

    const target = currentWord.words[language];
    const answerStr = newAnswer.map(l => l.char).join('');

    if (answerStr.length === target.length) {
      if (answerStr === target) {
        setIsCorrect(true);
        setScore(s => s + 1);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          if (currentWordIndex < PUZZLE_WORDS.length - 1) {
            setCurrentWordIndex(i => i + 1);
          } else {
            setGameOver(true);
          }
        }, 1500);
      } else {
        // Wrong — reset after delay
        setTimeout(() => {
          initPuzzle(currentWordIndex, language);
        }, 600);
      }
    }
  };

  const handleRemoveLetter = (idx: number) => {
    if (isCorrect) return;
    const removed = answer[idx];
    setAnswer(prev => prev.filter((_, i) => i !== idx));
    setScrambledLetters(prev => prev.map(l => l.id === removed.id ? { ...l, used: false } : l));
  };

  const handleReset = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setGameOver(false);
    initPuzzle(0, language);
  };

  const target = currentWord.words[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass-100 to-sunshine-50 px-4 py-8">
      <CelebrationAnimation active={showCelebration} onComplete={() => setShowCelebration(false)} />
      <div className="max-w-2xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-grass-700 mb-2">
          Puzzle Game 🧩
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Arrange the letters to spell the word!
        </p>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`font-nunito font-bold px-4 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-sm ${
                language === lang
                  ? 'bg-grass-500 border-grass-700 text-white shadow-fun'
                  : 'bg-white border-grass-300 text-grass-700 hover:bg-grass-50'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Score */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-white border-4 border-sunshine-400 rounded-3xl px-5 py-2 text-center shadow-fun">
            <p className="font-fredoka text-2xl text-sunshine-600">{score}/{PUZZLE_WORDS.length}</p>
            <p className="font-nunito text-xs text-muted-foreground">Score</p>
          </div>
          <div className="bg-white border-4 border-grass-400 rounded-3xl px-5 py-2 text-center shadow-fun">
            <p className="font-fredoka text-2xl text-grass-600">{currentWordIndex + 1}/{PUZZLE_WORDS.length}</p>
            <p className="font-nunito text-xs text-muted-foreground">Word</p>
          </div>
        </div>

        {gameOver ? (
          <div className="bg-sunshine-400 border-4 border-sunshine-600 rounded-4xl p-8 text-center shadow-fun-xl animate-bounce-in">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="font-fredoka text-3xl text-white mb-2">Puzzle Complete!</h2>
            <p className="font-nunito text-white/90 font-bold text-lg mb-4">
              You scored {score} out of {PUZZLE_WORDS.length}!
            </p>
            <button
              onClick={handleReset}
              className="bg-white text-sunshine-700 font-fredoka text-xl px-6 py-3 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all"
            >
              Play Again 🔄
            </button>
          </div>
        ) : (
          <>
            {/* Word Card */}
            <div className="bg-white border-4 border-grass-400 rounded-4xl p-6 text-center shadow-fun-xl mb-6">
              <div className="text-7xl mb-3">{currentWord.emoji}</div>
              <p className="font-nunito text-muted-foreground text-sm mb-2">Spell this word:</p>
              {language !== 'english' && (
                <p className="font-nunito text-muted-foreground text-xs mb-2">
                  (English: {currentWord.words.english})
                </p>
              )}

              {/* Answer slots */}
              <div className="flex justify-center gap-2 flex-wrap mt-3">
                {target.split('').map((_, i) => (
                  <button
                    key={i}
                    onClick={() => answer[i] && handleRemoveLetter(i)}
                    className={`w-12 h-12 rounded-2xl border-4 flex items-center justify-center font-fredoka text-xl transition-all ${
                      answer[i]
                        ? isCorrect
                          ? 'bg-grass-400 border-grass-600 text-white'
                          : 'bg-sunshine-400 border-sunshine-600 text-white hover:scale-105'
                        : 'bg-muted border-muted-foreground/30 text-transparent'
                    }`}
                  >
                    {answer[i]?.char || '_'}
                  </button>
                ))}
              </div>

              {isCorrect && (
                <p className="font-fredoka text-grass-600 text-2xl mt-3 animate-bounce-in">
                  ✅ Correct! Well done!
                </p>
              )}
            </div>

            {/* Scrambled Letters */}
            <div className="bg-white border-4 border-lavender-300 rounded-4xl p-4 shadow-fun">
              <p className="font-nunito text-center text-muted-foreground text-sm mb-3">
                Tap letters to spell the word:
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {scrambledLetters.map((letter) => (
                  <button
                    key={letter.id}
                    onClick={() => handleLetterClick(letter)}
                    disabled={letter.used || isCorrect}
                    className={`w-12 h-12 rounded-2xl border-4 flex items-center justify-center font-fredoka text-xl transition-all ${
                      letter.used
                        ? 'bg-muted border-muted text-muted-foreground opacity-40'
                        : 'bg-lavender-400 border-lavender-600 text-white hover:scale-110 active:scale-95 shadow-fun'
                    }`}
                  >
                    {letter.char}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => initPuzzle(currentWordIndex, language)}
                className="bg-tangerine-400 hover:bg-tangerine-500 border-4 border-tangerine-600 text-white font-fredoka text-lg px-5 py-2 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all"
              >
                🔄 Reset Word
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
