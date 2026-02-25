import { useState } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { useGetQuizQuestions, useRecordQuizResult, useAwardBadge } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import CelebrationAnimation from '../components/CelebrationAnimation';
import { Skeleton } from '@/components/ui/skeleton';

const FALLBACK_QUESTIONS: Record<string, Array<{ id: bigint; question: string; options: string[]; correctIndex: bigint }>> = {
  math: [
    { id: 1n, question: 'What is 2 + 3?', options: ['4', '5', '6', '7'], correctIndex: 1n },
    { id: 2n, question: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correctIndex: 1n },
    { id: 3n, question: 'What is 10 - 4?', options: ['5', '6', '7', '8'], correctIndex: 1n },
    { id: 4n, question: 'What is 3 × 2?', options: ['4', '5', '6', '7'], correctIndex: 2n },
  ],
  alphabet: [
    { id: 5n, question: 'What letter comes after A?', options: ['B', 'C', 'D', 'E'], correctIndex: 0n },
    { id: 6n, question: 'Which is a vowel?', options: ['B', 'C', 'E', 'F'], correctIndex: 2n },
    { id: 7n, question: 'How many letters are in the alphabet?', options: ['24', '25', '26', '27'], correctIndex: 2n },
    { id: 8n, question: 'What does "A is for ___"?', options: ['Ant', 'Ball', 'Cat', 'Dog'], correctIndex: 0n },
  ],
  science: [
    { id: 9n, question: 'What do plants need to make food?', options: ['Rain only', 'Sunlight, water & air', 'Soil only', 'Wind'], correctIndex: 1n },
    { id: 10n, question: 'What is the largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctIndex: 2n },
    { id: 11n, question: 'What do we call baby frogs?', options: ['Kittens', 'Tadpoles', 'Puppies', 'Chicks'], correctIndex: 1n },
    { id: 12n, question: 'What gas do we breathe in?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correctIndex: 2n },
  ],
  telugu: [
    { id: 13n, question: 'What does "ఒకటి" mean?', options: ['Two', 'Three', 'One', 'Four'], correctIndex: 2n },
    { id: 14n, question: 'What does "ఎరుపు" mean?', options: ['Green', 'Yellow', 'Blue', 'Red'], correctIndex: 3n },
    { id: 15n, question: 'What is the Telugu greeting?', options: ['నమస్కారం', 'Hello', 'Bonjour', 'Hola'], correctIndex: 0n },
    { id: 16n, question: 'What does "పచ్చ" mean?', options: ['Red', 'Green', 'Yellow', 'Orange'], correctIndex: 1n },
  ],
  hindi: [
    { id: 17n, question: 'What does "एक" mean?', options: ['Two', 'Three', 'One', 'Four'], correctIndex: 2n },
    { id: 18n, question: 'What does "लाल" mean?', options: ['Green', 'Yellow', 'Blue', 'Red'], correctIndex: 3n },
    { id: 19n, question: 'What is the Hindi greeting?', options: ['नमस्ते', 'Hello', 'Bonjour', 'Hola'], correctIndex: 0n },
    { id: 20n, question: 'What does "हरा" mean?', options: ['Red', 'Green', 'Yellow', 'Orange'], correctIndex: 1n },
  ],
  english: [
    { id: 21n, question: 'Which word is a noun?', options: ['Run', 'Happy', 'Cat', 'Quickly'], correctIndex: 2n },
    { id: 22n, question: 'Which word is a verb?', options: ['Big', 'Jump', 'Red', 'Soft'], correctIndex: 1n },
    { id: 23n, question: 'What does "happy" mean?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], correctIndex: 2n },
    { id: 24n, question: 'How do you greet someone in English?', options: ['Goodbye', 'Hello', 'Sorry', 'Please'], correctIndex: 1n },
  ],
};

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function Quiz() {
  const search = useSearch({ strict: false }) as { ageGroup?: string; subject?: string };
  const subject = search.subject || 'math';
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false);

  const { data: backendQuestions, isLoading } = useGetQuizQuestions();
  const recordQuizMutation = useRecordQuizResult();
  const awardBadgeMutation = useAwardBadge();

  const questions = (backendQuestions && backendQuestions.length > 0)
    ? backendQuestions
    : (FALLBACK_QUESTIONS[subject] || FALLBACK_QUESTIONS.math);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (answerState !== 'unanswered') return;
    const correct = Number(currentQuestion.correctIndex) === optionIndex;
    setSelectedAnswer(optionIndex);
    setAnswerState(correct ? 'correct' : 'incorrect');
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswerState('unanswered');
    } else {
      const finalScore = answerState === 'correct' ? score + 1 : score;
      setIsFinished(true);
      setShowCelebration(true);

      if (identity) {
        try {
          await recordQuizMutation.mutateAsync({
            subject,
            score: BigInt(finalScore),
            total: BigInt(questions.length),
          });
        } catch { /* ignore */ }

        if (!badgeAwarded) {
          try {
            await awardBadgeMutation.mutateAsync(`${subject}-quiz-badge`);
            setBadgeAwarded(true);
          } catch { /* ignore duplicate */ }
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswerState('unanswered');
    setScore(0);
    setIsFinished(false);
    setShowCelebration(false);
    setBadgeAwarded(false);
  };

  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const subjectEmoji = subject === 'math' ? '🔢' : subject === 'alphabet' ? '🔤' : subject === 'science' ? '🔬' : subject === 'telugu' ? '🌺' : subject === 'hindi' ? '🪔' : '📖';

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-48 mx-auto rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const isGreat = percentage >= 70;

    return (
      <div className="animate-bounce-in max-w-lg mx-auto px-4 py-8 text-center">
        <CelebrationAnimation active={showCelebration} onComplete={() => setShowCelebration(false)} />
        <div className={`rounded-3xl border-4 p-8 mb-6 ${isGreat ? 'bg-sunshine-400 border-sunshine-600' : 'bg-tangerine-400 border-tangerine-600'}`}>
          <div className="text-6xl mb-4">{isGreat ? '🏆' : '⭐'}</div>
          <h2 className="font-fredoka text-3xl text-foreground mb-2">{isGreat ? 'Amazing Job!' : 'Good Try!'}</h2>
          <p className="font-nunito font-bold text-foreground/80 text-lg mb-4">
            You scored {score} out of {questions.length}!
          </p>
          <div className="bg-white/40 rounded-2xl py-3 px-6 inline-block">
            <span className="font-fredoka text-4xl text-foreground">{percentage}%</span>
          </div>
        </div>

        {badgeAwarded && (
          <div className="bg-grass-500 border-4 border-grass-700 rounded-3xl p-4 mb-6 flex items-center gap-3">
            <Trophy className="text-white" size={32} />
            <div className="text-left">
              <p className="font-fredoka text-white text-lg">Badge Earned! 🎖️</p>
              <p className="font-nunito text-white/80 text-sm">{subjectLabel} Quiz Champion</p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="touch-target flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-tangerine-400 text-white font-nunito font-bold shadow-fun hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw size={20} /> Try Again
          </button>
          <button
            onClick={() => navigate({ to: '/progress' })}
            className="touch-target flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-grass-500 text-white font-nunito font-bold shadow-fun hover:scale-105 active:scale-95 transition-all"
          >
            <Trophy size={20} /> My Progress
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        <p className="font-fredoka text-2xl text-muted-foreground">No questions found!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-slide-in max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="font-fredoka text-3xl text-foreground">{subjectEmoji} {subjectLabel} Quiz</h1>
        <p className="font-nunito text-muted-foreground font-semibold">
          Question {currentIndex + 1} of {questions.length} • Score: {score}
        </p>
      </div>

      <div className="w-full bg-muted rounded-full h-4 mb-6 overflow-hidden">
        <div
          className="bg-tangerine-400 h-4 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-card border-4 border-sunshine-400 rounded-3xl p-6 mb-6 shadow-card">
        <p className="font-fredoka text-2xl text-foreground text-center leading-snug">
          {currentQuestion.question}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {currentQuestion.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrect = Number(currentQuestion.correctIndex) === i;
          let btnClass = 'bg-card border-4 border-muted text-foreground hover:border-sunshine-400 hover:bg-sunshine-50';
          if (answerState !== 'unanswered') {
            if (isCorrect) btnClass = 'bg-grass-500 border-grass-700 text-white';
            else if (isSelected) btnClass = 'bg-cherry-500 border-cherry-700 text-white';
            else btnClass = 'bg-muted border-muted text-muted-foreground opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answerState !== 'unanswered'}
              className={`${btnClass} touch-target rounded-2xl p-4 font-nunito font-bold text-lg text-left transition-all hover:scale-102 active:scale-98 shadow-fun`}
            >
              <span className="mr-2">{['A', 'B', 'C', 'D'][i]}.</span> {option}
            </button>
          );
        })}
      </div>

      {answerState !== 'unanswered' && (
        <div className={`rounded-2xl p-4 mb-4 flex items-center gap-3 ${answerState === 'correct' ? 'bg-grass-100 border-4 border-grass-400' : 'bg-cherry-100 border-4 border-cherry-400'}`}>
          {answerState === 'correct'
            ? <CheckCircle className="text-grass-600" size={24} />
            : <XCircle className="text-cherry-600" size={24} />
          }
          <p className="font-nunito font-bold text-foreground">
            {answerState === 'correct' ? '✅ Correct! Great job!' : '❌ Not quite — keep trying!'}
          </p>
        </div>
      )}

      {answerState !== 'unanswered' && (
        <button
          onClick={handleNext}
          className="touch-target w-full py-4 rounded-2xl bg-sunshine-400 text-foreground font-fredoka text-xl shadow-fun hover:scale-105 active:scale-95 transition-all"
        >
          {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
        </button>
      )}
    </div>
  );
}
