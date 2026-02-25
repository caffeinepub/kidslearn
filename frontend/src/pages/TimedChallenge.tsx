import { useState, useEffect, useRef } from 'react';
import { Timer, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import CelebrationAnimation from '../components/CelebrationAnimation';

type Language = 'english' | 'telugu' | 'hindi' | 'tamil';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: '🇬🇧 English',
  telugu: '🌺 Telugu',
  hindi: '🪔 Hindi',
  tamil: '🌸 Tamil',
};

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  emoji: string;
}

const QUESTIONS: Record<Language, Question[]> = {
  english: [
    { question: 'What is 2 + 3?', options: ['4', '5', '6', '7'], correctIndex: 1, emoji: '🔢' },
    { question: 'What color is the sky?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctIndex: 2, emoji: '🌤️' },
    { question: 'How many legs does a dog have?', options: ['2', '4', '6', '8'], correctIndex: 1, emoji: '🐶' },
    { question: 'What letter comes after A?', options: ['B', 'C', 'D', 'E'], correctIndex: 0, emoji: '🔤' },
    { question: 'What is the largest animal?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Lion'], correctIndex: 1, emoji: '🐋' },
    { question: 'How many days in a week?', options: ['5', '6', '7', '8'], correctIndex: 2, emoji: '📅' },
    { question: 'What do plants need to grow?', options: ['Only water', 'Sunlight & water', 'Only soil', 'Only air'], correctIndex: 1, emoji: '🌱' },
    { question: 'What is 10 - 4?', options: ['5', '6', '7', '8'], correctIndex: 1, emoji: '➖' },
  ],
  telugu: [
    { question: '"ఒకటి" అంటే ఏమిటి?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 0, emoji: '🔢' },
    { question: '"ఆవు" అంటే ఏమిటి?', options: ['Dog', 'Cat', 'Cow', 'Bird'], correctIndex: 2, emoji: '🐄' },
    { question: '"ఎరుపు" అంటే ఏమిటి?', options: ['Green', 'Blue', 'Red', 'Yellow'], correctIndex: 2, emoji: '🔴' },
    { question: '"నమస్కారం" అంటే ఏమిటి?', options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], correctIndex: 1, emoji: '🙏' },
    { question: '"పది" అంటే ఏమిటి?', options: ['5', '8', '10', '12'], correctIndex: 2, emoji: '🔟' },
    { question: '"పక్షి" అంటే ఏమిటి?', options: ['Fish', 'Bird', 'Dog', 'Cat'], correctIndex: 1, emoji: '🐦' },
    { question: '"సూర్యుడు" అంటే ఏమిటి?', options: ['Moon', 'Star', 'Sun', 'Cloud'], correctIndex: 2, emoji: '☀️' },
    { question: '"రెండు" అంటే ఏమిటి?', options: ['1', '2', '3', '4'], correctIndex: 1, emoji: '✌️' },
  ],
  hindi: [
    { question: '"एक" का मतलब क्या है?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 0, emoji: '🔢' },
    { question: '"गाय" का मतलब क्या है?', options: ['Dog', 'Cat', 'Cow', 'Bird'], correctIndex: 2, emoji: '🐄' },
    { question: '"लाल" का मतलब क्या है?', options: ['Green', 'Blue', 'Red', 'Yellow'], correctIndex: 2, emoji: '🔴' },
    { question: '"नमस्ते" का मतलब क्या है?', options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], correctIndex: 1, emoji: '🙏' },
    { question: '"दस" का मतलब क्या है?', options: ['5', '8', '10', '12'], correctIndex: 2, emoji: '🔟' },
    { question: '"पक्षी" का मतलब क्या है?', options: ['Fish', 'Bird', 'Dog', 'Cat'], correctIndex: 1, emoji: '🐦' },
    { question: '"सूरज" का मतलब क्या है?', options: ['Moon', 'Star', 'Sun', 'Cloud'], correctIndex: 2, emoji: '☀️' },
    { question: '"दो" का मतलब क्या है?', options: ['1', '2', '3', '4'], correctIndex: 1, emoji: '✌️' },
  ],
  tamil: [
    { question: '"ஒன்று" என்றால் என்ன?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 0, emoji: '🔢' },
    { question: '"பசு" என்றால் என்ன?', options: ['Dog', 'Cat', 'Cow', 'Bird'], correctIndex: 2, emoji: '🐄' },
    { question: '"சிவப்பு" என்றால் என்ன?', options: ['Green', 'Blue', 'Red', 'Yellow'], correctIndex: 2, emoji: '🔴' },
    { question: '"வணக்கம்" என்றால் என்ன?', options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], correctIndex: 1, emoji: '🙏' },
    { question: '"பத்து" என்றால் என்ன?', options: ['5', '8', '10', '12'], correctIndex: 2, emoji: '🔟' },
    { question: '"பறவை" என்றால் என்ன?', options: ['Fish', 'Bird', 'Dog', 'Cat'], correctIndex: 1, emoji: '🐦' },
    { question: '"சூரியன்" என்றால் என்ன?', options: ['Moon', 'Star', 'Sun', 'Cloud'], correctIndex: 2, emoji: '☀️' },
    { question: '"இரண்டு" என்றால் என்ன?', options: ['1', '2', '3', '4'], correctIndex: 1, emoji: '✌️' },
  ],
};

const TOTAL_TIME = 60;

export default function TimedChallenge() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>('english');
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const questions = QUESTIONS[language];

  useEffect(() => {
    if (!started || isFinished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setIsFinished(true);
          setShowCelebration(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [started, isFinished]);

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedAnswer(null);
      } else {
        clearInterval(timerRef.current!);
        setIsFinished(true);
        setShowCelebration(true);
      }
    }, 700);
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(TOTAL_TIME);
    setSelectedAnswer(null);
    setIsFinished(false);
    setShowCelebration(false);
  };

  const timerPercent = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timeLeft > 30 ? 'bg-grass-500' : timeLeft > 10 ? 'bg-sunshine-500' : 'bg-cherry-500';

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-tangerine-100 to-sunshine-50 px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="font-fredoka text-4xl sm:text-5xl text-tangerine-700 mb-2">Timed Challenge ⚡</h1>
          <p className="font-nunito text-muted-foreground text-lg mb-8">
            Answer as many questions as you can in {TOTAL_TIME} seconds!
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`font-nunito font-bold px-4 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-sm ${
                  language === lang
                    ? 'bg-tangerine-500 border-tangerine-700 text-white shadow-fun'
                    : 'bg-white border-tangerine-300 text-tangerine-700 hover:bg-tangerine-50'
                }`}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStarted(true)}
            className="bg-tangerine-500 hover:bg-tangerine-600 border-4 border-tangerine-700 text-white font-fredoka text-3xl px-10 py-5 rounded-4xl shadow-fun-xl hover:scale-105 active:scale-95 transition-all animate-pulse-ring"
          >
            ⚡ Start Challenge!
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-tangerine-100 to-sunshine-50 px-4 py-8">
        <CelebrationAnimation active={showCelebration} onComplete={() => setShowCelebration(false)} />
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-sunshine-400 border-4 border-sunshine-600 rounded-4xl p-8 shadow-fun-xl animate-bounce-in">
            <div className="text-6xl mb-3">🏆</div>
            <h2 className="font-fredoka text-4xl text-white mb-2">Time's Up!</h2>
            <p className="font-nunito text-white/90 font-bold text-xl mb-2">
              Score: {score} / {questions.length}
            </p>
            <p className="font-fredoka text-white text-3xl mb-4">{pct}%</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="bg-white text-sunshine-700 font-fredoka text-xl px-5 py-3 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <RotateCcw size={20} /> Try Again
              </button>
              <button
                onClick={() => navigate({ to: '/progress' })}
                className="bg-grass-500 border-4 border-grass-700 text-white font-fredoka text-xl px-5 py-3 rounded-3xl shadow-fun hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Trophy size={20} /> Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-tangerine-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="font-fredoka text-3xl text-center text-tangerine-700 mb-4">⚡ Timed Challenge</h1>

        {/* Timer */}
        <div className="bg-white border-4 border-tangerine-400 rounded-3xl p-4 mb-4 shadow-fun">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="text-tangerine-500" size={24} />
              <span className="font-fredoka text-3xl text-tangerine-600">{timeLeft}s</span>
            </div>
            <span className="font-nunito font-bold text-muted-foreground">
              Q {currentIndex + 1}/{questions.length} • Score: {score}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className={`${timerColor} h-4 rounded-full transition-all duration-1000`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white border-4 border-sunshine-400 rounded-3xl p-5 mb-4 shadow-fun text-center">
          <div className="text-4xl mb-2">{currentQ.emoji}</div>
          <p className="font-fredoka text-2xl text-foreground">{currentQ.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQ.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === currentQ.correctIndex;
            let cls = 'bg-white border-4 border-sunshine-300 text-foreground hover:border-sunshine-500 hover:bg-sunshine-50';
            if (selectedAnswer !== null) {
              if (isCorrect) cls = 'bg-grass-400 border-grass-600 text-white';
              else if (isSelected) cls = 'bg-cherry-400 border-cherry-600 text-white';
              else cls = 'bg-muted border-muted text-muted-foreground opacity-60';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`${cls} rounded-3xl p-4 font-nunito font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-fun min-h-[64px]`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
