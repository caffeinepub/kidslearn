import React, { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAwardBadge, useRecordQuizResult } from "../hooks/useQueries";
import CelebrationAnimation from "../components/CelebrationAnimation";
import { getQuizQuestions } from "../data/languageData";
import type { Language } from "../data/languageData";
import { Principal } from "@dfinity/principal";

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

export default function Quiz() {
  const { identity } = useInternetIdentity();
  const [language, setLanguage] = useState<Language>("english");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const questions = getQuizQuestions(language);
  const awardBadge = useAwardBadge();
  const recordQuizResult = useRecordQuizResult();

  const currentQuestion = questions[currentIdx];

  const handleAnswer = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    const correct = optionIdx === currentQuestion.correctIndex;
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = async () => {
    const isLastQuestion = currentIdx + 1 >= questions.length;
    const currentCorrect = selectedAnswer === currentQuestion.correctIndex;
    const finalScore = isLastQuestion ? score + (currentCorrect ? 1 : 0) : score;

    if (isLastQuestion) {
      setFinished(true);
      if (finalScore >= Math.ceil(questions.length * 0.7)) {
        setShowCelebration(true);
      }
      if (identity) {
        const principal = Principal.fromText(identity.getPrincipal().toString());
        try {
          await awardBadge.mutateAsync({ targetPrincipal: principal, badgeId: `quiz-${language}` });
        } catch { /* ignore duplicate */ }
        try {
          await recordQuizResult.mutateAsync({ subject: language, score: BigInt(finalScore), total: BigInt(questions.length) });
        } catch { /* ignore */ }
      }
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setShowCelebration(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setShowCelebration(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-sunshine-100 via-cherry-100 to-lavender-100 flex items-center justify-center p-4">
        <CelebrationAnimation active={showCelebration} />
        <div className="kid-card border-4 bg-white border-sunshine-400 max-w-md w-full p-8 text-center">
          <div className="text-7xl mb-4">{pct >= 70 ? "🏆" : "💪"}</div>
          <h2 className="font-heading text-4xl text-sunshine-600 mb-2">
            {pct >= 70 ? "Amazing!" : "Good Try!"}
          </h2>
          <p className="font-body text-xl text-gray-600 mb-4">
            You scored{" "}
            <span className="font-heading text-cherry-500 text-2xl">{score}</span> out of{" "}
            <span className="font-heading text-2xl">{questions.length}</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-6 overflow-hidden">
            <div
              className={`h-6 rounded-full transition-all duration-1000 ${pct >= 70 ? "bg-grass-400" : "bg-tangerine-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct >= 70 && (
            <div className="bg-sunshine-100 border-4 border-sunshine-400 rounded-2xl p-4 mb-4">
              <p className="font-heading text-xl text-sunshine-700">🎖️ Badge Earned!</p>
            </div>
          )}
          <button
            onClick={handleRestart}
            className="kid-btn bg-sky-400 hover:bg-sky-500 text-white px-8 py-3 text-xl border-4 border-sky-600 flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={22} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherry-100 via-sunshine-100 to-sky-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-heading text-5xl text-cherry-600 drop-shadow-md mb-2">❓ Quiz Time!</h1>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
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

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-heading text-lg text-gray-600">{currentIdx + 1}/{questions.length}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 bg-gradient-to-r from-sky-400 to-lavender-400 rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="font-heading text-lg text-grass-600">⭐ {score}</span>
        </div>

        {/* Question Card */}
        <div className="kid-card border-4 bg-white border-sky-300 p-6 mb-6">
          <p className="font-heading text-2xl text-gray-800 text-center leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctIndex;
            const showResult = selectedAnswer !== null;

            let extraClass = "";
            if (showResult && isCorrect) extraClass = "bg-grass-300 border-grass-600 scale-105";
            else if (showResult && isSelected && !isCorrect) extraClass = "bg-cherry-300 border-cherry-600 opacity-80";

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`kid-card border-4 p-4 text-left font-heading text-xl transition-all duration-200 ${
                  showResult ? extraClass : OPTION_COLORS[idx % OPTION_COLORS.length]
                } disabled:cursor-default flex items-center gap-3`}
              >
                {showResult && isCorrect && <CheckCircle className="text-grass-600 shrink-0" size={24} />}
                {showResult && isSelected && !isCorrect && <XCircle className="text-cherry-600 shrink-0" size={24} />}
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {selectedAnswer !== null && (
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="kid-btn bg-sunshine-400 hover:bg-sunshine-500 text-white px-10 py-4 text-xl border-4 border-sunshine-600 shadow-fun-xl"
            >
              {currentIdx + 1 >= questions.length ? "🏁 Finish!" : "Next ➡️"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
