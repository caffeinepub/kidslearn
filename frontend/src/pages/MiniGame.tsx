import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useGetMiniGameContent, useAwardBadge } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import CelebrationAnimation from '../components/CelebrationAnimation';
import { Skeleton } from '@/components/ui/skeleton';
import { RotateCcw, Trophy } from 'lucide-react';

// ---- Toddler: Matching Pairs Memory Game ----
const TODDLER_PAIRS = [
  ['🐶', 'Dog'], ['🍎', 'Apple'], ['🐱', 'Cat'], ['🌟', 'Star'],
  ['🐸', 'Frog'], ['🌈', 'Rainbow'],
];

interface MemoryCard {
  id: number;
  content: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

function ToddlerGame({ onWin }: { onWin: () => void }) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const pairs = TODDLER_PAIRS.slice(0, 4);
    const allCards: MemoryCard[] = [];
    pairs.forEach((pair, pairId) => {
      allCards.push({ id: pairId * 2, content: pair[0], pairId, isFlipped: false, isMatched: false });
      allCards.push({ id: pairId * 2 + 1, content: pair[1], pairId, isFlipped: false, isMatched: false });
    });
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }
    setCards(allCards);
    setFlippedIds([]);
  }, []);

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedIds.length === 1 && flippedIds[0] === cardId) return;

    const newFlipped = [...flippedIds, cardId];
    setCards((prev) => prev.map((c) => c.id === cardId ? { ...c, isFlipped: true } : c));
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [id1, id2] = newFlipped;
      const c1 = cards.find((c) => c.id === id1)!;
      const c2 = cards.find((c) => c.id === id2)!;

      setTimeout(() => {
        if (c1.pairId === c2.pairId) {
          setCards((prev) => {
            const updated = prev.map((c) =>
              c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
            );
            if (updated.every((c) => c.isMatched)) {
              setTimeout(onWin, 400);
            }
            return updated;
          });
        } else {
          setCards((prev) => prev.map((c) =>
            c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
          ));
        }
        setFlippedIds([]);
        setIsChecking(false);
      }, 800);
    }
  };

  return (
    <div>
      <p className="font-nunito text-center text-muted-foreground font-semibold mb-4">
        Find the matching pairs! 🎴
      </p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square rounded-2xl border-4 font-fredoka text-2xl
              flex items-center justify-center
              transition-all duration-300 hover-bounce shadow-fun-sm
              ${card.isMatched
                ? 'bg-grass-400 border-grass-600 text-white scale-95'
                : card.isFlipped
                ? 'bg-sunshine-300 border-sunshine-500'
                : 'bg-tangerine-400 border-tangerine-600 text-transparent'
              }
            `}
          >
            {(card.isFlipped || card.isMatched) ? card.content : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---- Early Learner: Drag-and-Drop Letter Matching ----
const LETTER_PAIRS = [
  { letter: 'A', word: 'Apple 🍎' },
  { letter: 'B', word: 'Ball 🏀' },
  { letter: 'C', word: 'Cat 🐱' },
  { letter: 'D', word: 'Dog 🐶' },
];

function EarlyLearnerGame({ onWin }: { onWin: () => void }) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [shuffledWords, setShuffledWords] = useState<typeof LETTER_PAIRS>([]);

  useEffect(() => {
    const shuffled = [...LETTER_PAIRS].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, []);

  const handleDragStart = (letter: string) => setDraggedLetter(letter);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, targetLetter: string) => {
    e.preventDefault();
    if (!draggedLetter) return;
    const newMatches = { ...matches, [targetLetter]: draggedLetter };
    setMatches(newMatches);
    setDraggedLetter(null);

    if (Object.keys(newMatches).length === LETTER_PAIRS.length) {
      const allCorrect = LETTER_PAIRS.every((p) => newMatches[p.letter] === p.letter);
      if (allCorrect) setTimeout(onWin, 400);
    }
  };

  const isCorrect = (letter: string) => matches[letter] === letter;
  const isWrong = (letter: string) => !!(matches[letter] && matches[letter] !== letter);

  return (
    <div>
      <p className="font-nunito text-center text-muted-foreground font-semibold mb-4">
        Drag the letter to its matching word! 🔤
      </p>

      <div className="flex justify-center gap-3 mb-6">
        {LETTER_PAIRS.map((pair) => {
          const isUsed = Object.values(matches).includes(pair.letter);
          return (
            <div
              key={pair.letter}
              draggable={!isUsed}
              onDragStart={() => handleDragStart(pair.letter)}
              className={`
                w-14 h-14 rounded-2xl border-4 flex items-center justify-center
                font-fredoka text-2xl cursor-grab active:cursor-grabbing
                transition-all shadow-fun-sm
                ${isUsed
                  ? 'bg-muted border-muted opacity-40 cursor-not-allowed'
                  : 'bg-sunshine-400 border-sunshine-600 hover-bounce'
                }
              `}
            >
              {pair.letter}
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {shuffledWords.map((pair) => (
          <div
            key={pair.letter}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, pair.letter)}
            className={`
              flex items-center gap-4 p-3 rounded-2xl border-4 transition-all
              ${isCorrect(pair.letter)
                ? 'bg-grass-400 border-grass-600'
                : isWrong(pair.letter)
                ? 'bg-cherry-400 border-cherry-600'
                : 'bg-card border-dashed border-muted'
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-xl border-4 flex items-center justify-center font-fredoka text-xl
              ${isCorrect(pair.letter) ? 'bg-grass-300 border-grass-500 text-white' :
                isWrong(pair.letter) ? 'bg-cherry-300 border-cherry-500 text-white' :
                'bg-muted border-muted/50'}
            `}>
              {matches[pair.letter] || '?'}
            </div>
            <span className="font-nunito font-bold text-lg">{pair.word}</span>
            {isCorrect(pair.letter) && <span className="ml-auto text-2xl">✅</span>}
            {isWrong(pair.letter) && <span className="ml-auto text-2xl">❌</span>}
          </div>
        ))}
      </div>

      {Object.keys(matches).length > 0 && !LETTER_PAIRS.every((p) => matches[p.letter] === p.letter) && (
        <button
          onClick={() => setMatches({})}
          className="mt-4 w-full py-3 rounded-2xl bg-muted font-nunito font-bold hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      )}
    </div>
  );
}

// ---- Older Kids: Word Scramble ----
const SCRAMBLE_WORDS = [
  { word: 'SCIENCE', hint: '🔬 The study of the natural world' },
  { word: 'RAINBOW', hint: '🌈 Colorful arc in the sky after rain' },
  { word: 'ELEPHANT', hint: '🐘 The largest land animal' },
  { word: 'PLANET', hint: '🪐 A large object orbiting a star' },
];

function scrambleWord(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join('');
  return result === word ? scrambleWord(word) : result;
}

function OlderKidsGame({ onWin }: { onWin: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState<Array<{ char: string; id: number; used: boolean }>>([]);
  const [answer, setAnswer] = useState<Array<{ char: string; id: number }>>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);

  const currentWord = SCRAMBLE_WORDS[wordIndex];

  useEffect(() => {
    const sc = scrambleWord(currentWord.word);
    setLetters(sc.split('').map((char, i) => ({ char, id: i, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  }, [wordIndex, currentWord.word]);

  const handleLetterClick = (letterId: number) => {
    const letter = letters.find((l) => l.id === letterId);
    if (!letter || letter.used) return;
    setLetters((prev) => prev.map((l) => l.id === letterId ? { ...l, used: true } : l));
    const newAnswer = [...answer, { char: letter.char, id: letterId }];
    setAnswer(newAnswer);

    if (newAnswer.length === currentWord.word.length) {
      const formed = newAnswer.map((l) => l.char).join('');
      const correct = formed === currentWord.word;
      setIsCorrect(correct);
      if (correct) {
        const newSolved = solvedCount + 1;
        setSolvedCount(newSolved);
        if (newSolved >= SCRAMBLE_WORDS.length) {
          setTimeout(onWin, 600);
        } else {
          setTimeout(() => {
            setWordIndex((i) => i + 1);
          }, 1000);
        }
      }
    }
  };

  const handleAnswerClick = (letterId: number) => {
    setAnswer((prev) => prev.filter((l) => l.id !== letterId));
    setLetters((prev) => prev.map((l) => l.id === letterId ? { ...l, used: false } : l));
    setIsCorrect(null);
  };

  const handleReset = () => {
    const sc = scrambleWord(currentWord.word);
    setLetters(sc.split('').map((char, i) => ({ char, id: i, used: false })));
    setAnswer([]);
    setIsCorrect(null);
  };

  return (
    <div>
      <p className="font-nunito text-center text-muted-foreground font-semibold mb-2">
        Unscramble the word! 🔤
      </p>
      <p className="font-nunito text-center text-sm text-muted-foreground mb-4">
        Word {wordIndex + 1} of {SCRAMBLE_WORDS.length} — Solved: {solvedCount}
      </p>

      <div className="bg-sunshine-100 border-2 border-sunshine-400 rounded-2xl p-3 mb-5 text-center">
        <p className="font-nunito font-bold text-foreground">{currentWord.hint}</p>
      </div>

      <div className={`
        flex justify-center gap-2 flex-wrap min-h-14 p-3 rounded-2xl border-4 mb-4 transition-all
        ${isCorrect === true ? 'bg-grass-400 border-grass-600' :
          isCorrect === false ? 'bg-cherry-100 border-cherry-400' :
          'bg-muted/50 border-dashed border-muted'}
      `}>
        {answer.map((l) => (
          <button
            key={l.id}
            onClick={() => handleAnswerClick(l.id)}
            className="w-10 h-10 rounded-xl bg-tangerine-400 border-2 border-tangerine-600 font-fredoka text-lg text-white hover-bounce shadow-fun-sm"
          >
            {l.char}
          </button>
        ))}
        {answer.length === 0 && (
          <span className="font-nunito text-muted-foreground text-sm self-center">Tap letters below to build the word</span>
        )}
      </div>

      {isCorrect === true && (
        <p className="text-center font-fredoka text-xl text-grass-600 mb-3">🎉 Correct! Well done!</p>
      )}
      {isCorrect === false && (
        <p className="text-center font-fredoka text-xl text-cherry-600 mb-3">❌ Not quite! Try again!</p>
      )}

      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {letters.map((l) => (
          <button
            key={l.id}
            onClick={() => handleLetterClick(l.id)}
            disabled={l.used}
            className={`
              w-10 h-10 rounded-xl border-2 font-fredoka text-lg
              transition-all shadow-fun-sm
              ${l.used
                ? 'bg-muted border-muted opacity-30 cursor-not-allowed'
                : 'bg-sunshine-400 border-sunshine-600 hover-bounce cursor-pointer'
              }
            `}
          >
            {l.char}
          </button>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="w-full py-3 rounded-2xl bg-muted font-nunito font-bold hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" /> Reset Word
      </button>
    </div>
  );
}

// ---- Main MiniGame Component ----
export default function MiniGame() {
  const search = useSearch({ strict: false }) as { ageGroup?: string; subject?: string };
  const ageGroup = search.ageGroup || 'early-learner';

  const [hasWon, setHasWon] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false);

  const { identity } = useInternetIdentity();
  const awardBadgeMutation = useAwardBadge();

  // useGetMiniGameContent is kept for potential future use
  useGetMiniGameContent();

  const handleWin = async () => {
    setHasWon(true);
    setShowCelebration(true);
    if (!badgeAwarded && identity) {
      try {
        await awardBadgeMutation.mutateAsync({
          targetPrincipal: identity.getPrincipal().toString(),
          badgeId: `${ageGroup}-minigame-badge`,
        });
        setBadgeAwarded(true);
      } catch { /* ignore duplicate */ }
    }
  };

  const handleRestart = () => {
    setHasWon(false);
    setShowCelebration(false);
    setBadgeAwarded(false);
  };

  const gameTitle =
    ageGroup === 'toddler' ? '🎴 Memory Match' :
    ageGroup === 'early-learner' ? '🔤 Letter Match' :
    '🔀 Word Scramble';
  const ageLabel =
    ageGroup === 'toddler' ? 'Toddlers' :
    ageGroup === 'early-learner' ? 'Early Learners' :
    'Older Kids';

  return (
    <div className="animate-fade-slide-in max-w-lg mx-auto px-4 py-8">
      <CelebrationAnimation active={showCelebration} onComplete={() => setShowCelebration(false)} />

      <div className="text-center mb-6">
        <h1 className="font-fredoka text-3xl text-foreground">{gameTitle}</h1>
        <p className="font-nunito text-muted-foreground font-semibold">{ageLabel} Mini-Game</p>
      </div>

      {hasWon ? (
        <div className="animate-bounce-in text-center">
          <div className="bg-sunshine-400 border-4 border-sunshine-600 rounded-3xl p-8 mb-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-fredoka text-3xl text-foreground mb-2">You Won!</h2>
            <p className="font-nunito font-bold text-foreground/80">Amazing work! You completed the game!</p>
          </div>

          {badgeAwarded && (
            <div className="bg-grass-500 border-4 border-grass-700 rounded-3xl p-4 mb-6 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-white" />
              <div className="text-left">
                <p className="font-fredoka text-white text-lg">Badge Earned! 🎖️</p>
                <p className="font-nunito text-white/80 text-sm">Keep playing to earn more badges!</p>
              </div>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="w-full py-4 rounded-3xl bg-tangerine-400 border-4 border-tangerine-600 text-white font-fredoka text-2xl shadow-fun hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <RotateCcw size={24} /> Play Again
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-3xl border-4 border-sunshine-400 shadow-card p-6">
          {ageGroup === 'toddler' && <ToddlerGame onWin={handleWin} />}
          {ageGroup === 'early-learner' && <EarlyLearnerGame onWin={handleWin} />}
          {ageGroup === 'older-kids' && <OlderKidsGame onWin={handleWin} />}
          {!['toddler', 'early-learner', 'older-kids'].includes(ageGroup) && (
            <EarlyLearnerGame onWin={handleWin} />
          )}
        </div>
      )}
    </div>
  );
}
