import React, { useState, useEffect, useRef } from "react";
import { Timer, RotateCcw } from "lucide-react";
import { getQuizQuestions } from "../data/languageData";
import type { Language } from "../data/languageData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useRecordGameSession } from "../hooks/useQueries";
import { GameType } from "../backend";
import CelebrationAnimation from "../components/CelebrationAnimation";

const LANGUAGE_CONFIG: Record<Language, { label: string; btnClass: string }> = {
  english: { label: "English", btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600" },
  telugu: { label: "తెలుగు", btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600" },
  hindi: { label: "हिंदी", btnClass: "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600" },
  tamil: { label: "தமிழ்", btnClass: "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600" },
};

const OPTION_COLORS = [
  "bg-sky-200 border-sky-500 hover:bg-sky-300 text-sky-800",
  "bg-sunshine-200 border-sunshine-500 hover:bg-sunshine-300 text-sunshine-800",
  "bg-grass-200 border-grass-500 hover:bg-grass-300 text-grass-800",
  "bg-lavender-200 border-lavender-500 hover:bg-lavender-300 text-lavender-800",
];

const TIME_PER_QUESTION = 15;

export default function TimedChallenge() {
  const { identity } = useInternetIdentity();
  const [language, setLanguage] = useState<Language>("english");
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordGameSession = useRecordGameSession();

  const questions = getQuizQuestions(language);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const finishGame = async (finalScore: number) => {
    clearTimer();
    setFinished(true);
    if (finalScore >= Math.ceil(questions.length * 0.7)) setShowCelebration(true);
    if (identity) {
      try {
        await recordGameSession.mutateAsync({
          gameType: GameType.timedChallenge,
          language,
          score: BigInt(finalScore),
          totalQuestions: BigInt(questions.length),
        });
      } catch { /* ignore */ }
    }
  };

  useEffect(() => {
    if (!started || finished || selectedAnswer !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          setCurrentIdx((prev) => {
            const next = prev + 1;
            if (next >= questions.length) {
              finishGame(score);
            } else {
              setTimeLeft(TIME_PER_QUESTION);
            }
            return next >= questions.length ? prev : next;
          });
          return TIME_PER_QUESTION;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, currentIdx, finished, selectedAnswer]);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    clearTimer();
    setSelectedAnswer(idx);
    const correct = idx === questions[currentIdx].correctIndex;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        finishGame(newScore);
      } else {
        setCurrentIdx((i) => i + 1);
        setSelectedAnswer(null);
        setTimeLeft(TIME_PER_QUESTION);
      }
    }, 800);
  };

  const handleRestart = () => {
    clearTimer();
    setStarted(false);
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(TIME_PER_QUESTION);
    setSelectedAnswer(null);
    setFinished(false);
    setShowCelebration(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-tangerine-100 to-cherry-100 flex items-center justify-center p-4">
        <CelebrationAnimation active={showCelebration} />
        <div className="kid-card border-4 bg-white border-sunshine-400 max-w-md w-full p-8 text-center">
          <div className="text-7xl mb-4">{pct >= 70 ? "🏆" : "💪"}</div>
          <h2 className="font-heading text-4xl text-sunshine-600 mb-2">{pct >= 70 ? "Amazing!" : "Good Try!"}</h2>
          <p className="font-body text-xl text-gray-600 mb-4">
            Score: <span className="font-heading text-cherry-500 text-2xl">{score}</span> / {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-6 overflow-hidden">
            <div
              className={`h-6 rounded-full transition-all duration-1000 ${pct >= 70 ? "bg-grass-400" : "bg-tangerine-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <button
            onClick={handleRestart}
            className="kid-btn bg-sky-400 hover:bg-sky-500 text-white px-8 py-3 text-xl border-4 border-sky-600 flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={22} /> Play Again
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-tangerine-100 to-cherry-100 flex items-center justify-center p-4">
        <div className="kid-card border-4 bg-white border-tangerine-400 max-w-md w-full p-8 text-center">
          <div className="text-7xl mb-4">⏱️</div>
          <h1 className="font-heading text-4xl text-tangerine-600 mb-4">Timed Challenge!</h1>
          <p className="font-body text-lg text-gray-600 mb-6">
            Answer {questions.length} questions as fast as you can! You have {TIME_PER_QUESTION} seconds per question.
          </p>
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
          <button
            onClick={() => setStarted(true)}
            className="kid-btn bg-tangerine-400 hover:bg-tangerine-500 text-white px-10 py-4 text-2xl border-4 border-tangerine-600 shadow-fun-xl"
          >
            🚀 Start!
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];
  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-tangerine-100 to-cherry-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Timer & Score */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`kid-card border-4 px-5 py-3 flex items-center gap-2 ${timeLeft <= 5 ? "bg-cherry-200 border-cherry-500" : "bg-sunshine-200 border-sunshine-500"}`}>
            <Timer size={24} className={timeLeft <= 5 ? "text-cherry-600 animate-pulse" : "text-sunshine-600"} />
            <span className={`font-heading text-2xl ${timeLeft <= 5 ? "text-cherry-700" : "text-sunshine-700"}`}>{timeLeft}s</span>
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
            <div
              className={`h-5 rounded-full transition-all duration-1000 ${timerPct > 50 ? "bg-grass-400" : timerPct > 25 ? "bg-sunshine-400" : "bg-cherry-400"}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
          <div className="kid-card border-4 bg-grass-200 border-grass-500 px-5 py-3">
            <span className="font-heading text-2xl text-grass-700">⭐ {score}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center mb-4">
          <span className="font-heading text-xl text-gray-600">{currentIdx + 1} / {questions.length}</span>
        </div>

        {/* Question */}
        <div className="kid-card border-4 bg-white border-sky-300 p-6 mb-6">
          <p className="font-heading text-2xl text-gray-800 text-center">{question.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
              className={`kid-card border-4 p-4 font-heading text-xl text-left transition-all duration-200 ${
                selectedAnswer === idx
                  ? idx === question.correctIndex
                    ? "bg-grass-300 border-grass-600"
                    : "bg-cherry-300 border-cherry-600"
                  : OPTION_COLORS[idx % OPTION_COLORS.length]
              } disabled:cursor-default`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
