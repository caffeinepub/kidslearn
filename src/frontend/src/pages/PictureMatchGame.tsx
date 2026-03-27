import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { speakWord } from "../utils/speech";

const WORD_IMAGES: Record<string, string> = {
  Lion: "/assets/generated/animal-lion-transparent.dim_400x400.png",
  Elephant: "/assets/generated/animal-elephant-transparent.dim_400x400.png",
  Monkey: "/assets/generated/animal-monkey-transparent.dim_400x400.png",
  Tiger: "/assets/generated/animal-tiger-transparent.dim_400x400.png",
  Zebra: "/assets/generated/animal-zebra-transparent.dim_400x400.png",
  Giraffe: "/assets/generated/animal-giraffe-transparent.dim_400x400.png",
  Parrot: "/assets/generated/animal-parrot-transparent.dim_400x400.png",
  Apple: "/assets/generated/fruit-apple-transparent.dim_400x400.png",
  Banana: "/assets/generated/fruit-banana-transparent.dim_400x400.png",
  Orange: "/assets/generated/fruit-orange-transparent.dim_400x400.png",
  Strawberry: "/assets/generated/fruit-strawberry-transparent.dim_400x400.png",
  Grapes: "/assets/generated/fruit-grapes-transparent.dim_400x400.png",
  Mango: "/assets/generated/fruit-mango-transparent.dim_400x400.png",
  Head: "/assets/generated/body-head-transparent.dim_400x400.png",
  Hand: "/assets/generated/body-hand-transparent.dim_400x400.png",
  Eye: "/assets/generated/body-eye-transparent.dim_400x400.png",
  Nose: "/assets/generated/body-nose-transparent.dim_400x400.png",
  Ear: "/assets/generated/body-ear-transparent.dim_400x400.png",
  Mouth: "/assets/generated/body-mouth-transparent.dim_400x400.png",
  Foot: "/assets/generated/body-foot-transparent.dim_400x400.png",
};

type Category = "animals" | "fruits" | "bodyParts";

const CATEGORIES: {
  key: Category;
  label: string;
  emoji: string;
  bgGradient: string;
  items: string[];
}[] = [
  {
    key: "animals",
    label: "Animals",
    emoji: "🐾",
    bgGradient: "from-grass-400 to-grass-600",
    items: [
      "Lion",
      "Elephant",
      "Monkey",
      "Tiger",
      "Zebra",
      "Giraffe",
      "Parrot",
    ],
  },
  {
    key: "fruits",
    label: "Fruits",
    emoji: "🍎",
    bgGradient: "from-cherry-400 to-cherry-600",
    items: ["Apple", "Banana", "Orange", "Strawberry", "Grapes", "Mango"],
  },
  {
    key: "bodyParts",
    label: "Body Parts",
    emoji: "👁️",
    bgGradient: "from-sky-400 to-sky-600",
    items: ["Head", "Hand", "Eye", "Nose", "Ear", "Mouth", "Foot"],
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type GameState = "playing" | "correct" | "finished";

export default function PictureMatchGame() {
  const navigate = useNavigate();
  const [categoryKey, setCategoryKey] = useState<Category>("animals");
  const [queue, setQueue] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [wrongWord, setWrongWord] = useState<string | null>(null);
  const [shakeWord, setShakeWord] = useState<string | null>(null);

  const category =
    CATEGORIES.find((c) => c.key === categoryKey) ?? CATEGORIES[0];

  const buildChoices = useCallback((correct: string, allItems: string[]) => {
    const others = shuffle(allItems.filter((w) => w !== correct)).slice(0, 2);
    return shuffle([correct, ...others]);
  }, []);

  const startGame = useCallback(
    (cat: Category) => {
      const found = CATEGORIES.find((c) => c.key === cat) ?? CATEGORIES[0];
      const q = shuffle(found.items);
      setQueue(q);
      setCurrentIdx(0);
      setScore(0);
      setGameState("playing");
      setWrongWord(null);
      setShakeWord(null);
      if (q.length > 0) {
        setChoices(buildChoices(q[0], found.items));
      }
    },
    [buildChoices],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: startGame is stable
  useEffect(() => {
    startGame(categoryKey);
  }, [categoryKey]);

  const handleAnswer = (word: string) => {
    if (gameState !== "playing") return;
    const correct = queue[currentIdx];
    if (word === correct) {
      speakWord("Correct! Well done!", "en-US");
      setScore((s) => s + 1);
      setGameState("correct");
      setTimeout(() => {
        const nextIdx = currentIdx + 1;
        if (nextIdx >= queue.length) {
          setGameState("finished");
        } else {
          setCurrentIdx(nextIdx);
          setChoices(buildChoices(queue[nextIdx], category.items));
          setGameState("playing");
          setWrongWord(null);
        }
      }, 1500);
    } else {
      speakWord("Try again!", "en-US");
      setWrongWord(word);
      setShakeWord(word);
      setTimeout(() => setShakeWord(null), 600);
    }
  };

  const currentWord = queue[currentIdx];
  const imagePath = currentWord ? WORD_IMAGES[currentWord] : undefined;
  const progress = queue.length > 0 ? (currentIdx / queue.length) * 100 : 0;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${category.bgGradient} flex flex-col`}
      data-ocid="picturematch.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          data-ocid="picturematch.back.button"
          onClick={() => navigate({ to: "/vocabulary" })}
          className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 border-4 border-white/50 flex items-center justify-center text-white shadow-fun backdrop-blur-sm"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-2xl md:text-3xl text-white drop-shadow-lg flex items-center gap-2">
          🎮 Match the Picture!
        </h1>
        <div className="font-bold text-xl text-white bg-white/20 rounded-2xl px-4 py-2 border-2 border-white/40">
          {score}/{queue.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-4 h-4 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
        <div
          className="h-full bg-sunshine-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
          data-ocid="picturematch.loading_state"
        />
      </div>

      {/* Category tabs */}
      <div className="flex justify-center gap-2 px-4 pt-3 pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            data-ocid={`picturematch.cat_${cat.key}.tab`}
            onClick={() => setCategoryKey(cat.key)}
            className={`kid-btn px-4 py-2 text-sm font-bold border-2 transition-all ${
              cat.key === categoryKey
                ? "bg-white text-gray-800 border-white scale-105 shadow-fun"
                : "bg-white/20 text-white border-white/40 hover:bg-white/40"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Game area */}
      {gameState === "finished" ? (
        /* Celebration screen */
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
          <div className="text-8xl animate-bounce">🏆</div>
          <h2
            className="font-bold text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            You Did It!
          </h2>
          <div className="bg-white/20 rounded-3xl px-8 py-5 border-4 border-white/40 flex items-center gap-4">
            <Trophy className="text-sunshine-300" size={48} />
            <div>
              <div className="font-bold text-white text-3xl">
                {score}/{queue.length}
              </div>
              <div className="text-white/90 text-lg">
                {score === queue.length
                  ? "Perfect score! 🌟"
                  : score >= queue.length / 2
                    ? "Great job! 👏"
                    : "Keep practicing! 💪"}
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              type="button"
              data-ocid="picturematch.play_again.button"
              onClick={() => startGame(categoryKey)}
              className="kid-btn bg-sunshine-400 hover:bg-sunshine-500 text-white border-4 border-sunshine-600 px-8 py-4 text-xl font-bold flex items-center gap-2 shadow-fun-xl"
            >
              <RotateCcw size={24} /> Play Again!
            </button>
            <button
              type="button"
              data-ocid="picturematch.home.button"
              onClick={() => navigate({ to: "/" })}
              className="kid-btn bg-white/20 hover:bg-white/40 text-white border-4 border-white/40 px-8 py-4 text-xl font-bold shadow-fun-xl"
            >
              🏠 Home
            </button>
          </div>
        </div>
      ) : (
        /* Playing screen */
        <div className="flex-1 flex flex-col items-center justify-between py-4 px-6 gap-4">
          {/* Picture */}
          <div
            className={`relative rounded-3xl bg-white/20 border-4 border-white/40 p-4 flex items-center justify-center shadow-fun-xl transition-all duration-300 ${
              gameState === "correct"
                ? "scale-105 border-grass-300 bg-grass-200/40"
                : ""
            }`}
            style={{ width: "min(90vw, 380px)", height: "min(55vh, 340px)" }}
          >
            {gameState === "correct" && (
              <div className="absolute inset-0 flex items-center justify-center z-10 rounded-3xl bg-grass-400/30">
                <span style={{ fontSize: "clamp(60px, 15vw, 120px)" }}>⭐</span>
              </div>
            )}
            {imagePath ? (
              <img
                src={imagePath}
                alt="?"
                className="object-contain w-full h-full drop-shadow-2xl"
              />
            ) : (
              <span style={{ fontSize: "clamp(80px, 20vw, 160px)" }}>❓</span>
            )}
          </div>

          {/* Word choices */}
          <div className="w-full max-w-md flex flex-col gap-3">
            {choices.map((word, idx) => {
              const isWrong = word === wrongWord;
              const isShaking = word === shakeWord;
              return (
                <button
                  key={word}
                  type="button"
                  data-ocid={`picturematch.choice.button.${idx + 1}`}
                  onClick={() => handleAnswer(word)}
                  disabled={gameState === "correct"}
                  className={`kid-btn w-full py-4 text-2xl font-bold border-4 transition-all duration-200 ${
                    gameState === "correct" && word === queue[currentIdx]
                      ? "bg-grass-400 text-white border-grass-600 scale-105"
                      : isWrong
                        ? "bg-cherry-400 text-white border-cherry-600"
                        : "bg-white text-gray-800 border-white/80 hover:scale-102 hover:bg-white/90 hover:shadow-fun"
                  } ${isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
                  style={
                    isShaking ? { animation: "shake 0.5s ease-in-out" } : {}
                  }
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
