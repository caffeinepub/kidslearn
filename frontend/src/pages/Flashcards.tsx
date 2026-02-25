import { useState, useRef } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Volume2, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useGetFlashcards } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const FALLBACK_FLASHCARDS: Record<string, Array<{ id: bigint; front: string; back: string; image: string }>> = {
  math: [
    { id: 1n, front: '2 + 3 = ?', back: '5 🎉 Two plus three equals five!', image: '' },
    { id: 2n, front: 'What shape has 3 sides?', back: 'Triangle 🔺 A triangle has exactly 3 sides and 3 corners!', image: '' },
    { id: 3n, front: '10 - 4 = ?', back: '6 ✨ Ten minus four equals six!', image: '' },
    { id: 4n, front: 'What is half of 8?', back: '4 🌟 Half of 8 is 4!', image: '' },
  ],
  alphabet: [
    { id: 5n, front: 'A', back: 'A is for Apple 🍎 — "ah" sound', image: '' },
    { id: 6n, front: 'B', back: 'B is for Ball 🏀 — "buh" sound', image: '' },
    { id: 7n, front: 'C', back: 'C is for Cat 🐱 — "kuh" sound', image: '' },
    { id: 8n, front: 'D', back: 'D is for Dog 🐶 — "duh" sound', image: '' },
  ],
  science: [
    { id: 9n, front: 'What do plants need to grow?', back: 'Sunlight ☀️, Water 💧, and Air 🌬️!', image: '' },
    { id: 10n, front: 'What is the largest planet?', back: 'Jupiter 🪐 — It\'s so big, 1,300 Earths could fit inside!', image: '' },
    { id: 11n, front: 'What do we call baby frogs?', back: 'Tadpoles 🐸 — They start with tails and grow legs!', image: '' },
    { id: 12n, front: 'What gas do we breathe?', back: 'Oxygen (O₂) 💨 — Plants make oxygen for us!', image: '' },
  ],
  telugu: [
    { id: 13n, front: 'అ', back: '"a" sound — like in "apple" 🍎', image: '' },
    { id: 14n, front: 'ఒకటి', back: 'One (1) — ఒకటి means the number 1 🌟', image: '' },
    { id: 15n, front: 'ఎరుపు', back: 'Red color 🔴 — ఎరుపు means red!', image: '' },
    { id: 16n, front: 'నమస్కారం', back: 'Hello / Greetings 🙏 — A respectful Telugu greeting!', image: '' },
  ],
  hindi: [
    { id: 17n, front: 'अ', back: '"a" sound — first letter of Hindi alphabet 🌟', image: '' },
    { id: 18n, front: 'एक', back: 'One (1) — एक means the number 1 ☝️', image: '' },
    { id: 19n, front: 'लाल', back: 'Red color 🔴 — लाल means red!', image: '' },
    { id: 20n, front: 'नमस्ते', back: 'Hello / Namaste 🙏 — A warm Hindi greeting!', image: '' },
  ],
  english: [
    { id: 21n, front: 'Cat', back: 'A small furry animal that says "meow" 🐱', image: '' },
    { id: 22n, front: 'Run', back: 'To move quickly on your feet 🏃 — Run is an action word (verb)!', image: '' },
    { id: 23n, front: 'Happy', back: 'Feeling joyful and glad 😊 — Happy is a describing word (adjective)!', image: '' },
    { id: 24n, front: 'Big', back: 'Large in size 🐘 — The elephant is big!', image: '' },
  ],
};

export default function Flashcards() {
  const search = useSearch({ strict: false }) as { ageGroup?: string; subject?: string };
  const subject = search.subject || 'math';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );

  const { data: backendFlashcards, isLoading } = useGetFlashcards();

  const flashcards = (backendFlashcards && backendFlashcards.length > 0)
    ? backendFlashcards
    : (FALLBACK_FLASHCARDS[subject] || FALLBACK_FLASHCARDS.math);

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => setIsFlipped((f) => !f);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!synthRef.current || !currentCard) return;
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = isFlipped ? currentCard.back : currentCard.front;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  const handlePrev = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex((i) => Math.min(flashcards.length - 1, i + 1));
  };

  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const subjectEmoji = subject === 'math' ? '🔢' : subject === 'alphabet' ? '🔤' : subject === 'science' ? '🔬' : subject === 'telugu' ? '🌺' : subject === 'hindi' ? '🪔' : '📖';

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-48 mx-auto rounded-2xl" />
        <Skeleton className="h-72 w-full rounded-3xl" />
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        <p className="font-fredoka text-2xl text-muted-foreground">No flashcards found!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-slide-in max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="font-fredoka text-3xl text-foreground">{subjectEmoji} {subjectLabel} Flashcards</h1>
        <p className="font-nunito text-muted-foreground font-semibold">
          Card {currentIndex + 1} of {flashcards.length} — Tap to flip!
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {flashcards.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-tangerine-500 scale-125' : 'bg-muted'}`}
          />
        ))}
      </div>

      <div
        className="flip-card w-full h-72 cursor-pointer mb-6"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        aria-label={isFlipped ? 'Card back - click to flip' : 'Card front - click to flip'}
      >
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-front bg-sunshine-400 border-4 border-sunshine-600 rounded-3xl shadow-card flex flex-col items-center justify-center p-8 gap-4">
            <div className="text-5xl">{subjectEmoji}</div>
            <p className="font-fredoka text-3xl text-foreground text-center leading-tight">{currentCard.front}</p>
            <p className="font-nunito text-sm text-foreground/60 font-semibold">Tap to see answer →</p>
          </div>
          <div className="flip-card-back bg-grass-500 border-4 border-grass-700 rounded-3xl shadow-card flex flex-col items-center justify-center p-8 gap-4">
            <div className="text-5xl">💡</div>
            <p className="font-nunito text-xl text-white text-center leading-relaxed font-bold">{currentCard.back}</p>
            <p className="font-nunito text-sm text-white/70 font-semibold">Tap to flip back ←</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-muted font-nunito font-bold hover:bg-muted/80 disabled:opacity-40 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={20} /> Prev
        </button>
        <button
          onClick={handleSpeak}
          className={`touch-target flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-nunito font-bold shadow-fun hover:scale-105 active:scale-95 transition-all ${
            isSpeaking ? 'bg-cherry-500 text-white' : 'bg-tangerine-400 text-white hover:bg-tangerine-300'
          }`}
        >
          <Volume2 size={20} />
        </button>
        <button
          onClick={() => setIsFlipped(false)}
          className="touch-target flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-muted font-nunito font-bold hover:bg-muted/80 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-sunshine-400 text-foreground font-nunito font-bold hover:bg-sunshine-300 disabled:opacity-40 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
