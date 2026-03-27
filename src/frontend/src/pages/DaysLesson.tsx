import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { speakWord } from "../utils/speech";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGES: { id: Language; label: string; emoji: string }[] = [
  { id: "english", label: "English", emoji: "🇬🇧" },
  { id: "telugu", label: "తెలుగు", emoji: "🌺" },
  { id: "hindi", label: "हिंदी", emoji: "🇮🇳" },
  { id: "tamil", label: "தமிழ்", emoji: "🌸" },
];

const LANG_VOICE: Record<Language, string> = {
  english: "en-US",
  telugu: "te-IN",
  hindi: "hi-IN",
  tamil: "ta-IN",
};

const LANG_ACTIVE_CLASS: Record<Language, string> = {
  english: "bg-sky-500 text-white border-sky-700 scale-110 shadow-fun-lg",
  telugu: "bg-grass-500 text-white border-grass-700 scale-110 shadow-fun-lg",
  hindi:
    "bg-tangerine-500 text-white border-tangerine-700 scale-110 shadow-fun-lg",
  tamil:
    "bg-lavender-500 text-white border-lavender-700 scale-110 shadow-fun-lg",
};

interface DayData {
  num: number;
  english: string;
  telugu: string;
  hindi: string;
  tamil: string;
  emoji: string;
  funFact: string;
  bgGradient: string;
}

const DAYS: DayData[] = [
  {
    num: 1,
    english: "Sunday",
    telugu: "ఆదివారం",
    hindi: "रविवार",
    tamil: "ஞாயிற்றுக்கிழமை",
    emoji: "☀️",
    funFact: "Sunday is the first day of the week! Time to rest and play. 🎉",
    bgGradient: "from-yellow-400 to-orange-400",
  },
  {
    num: 2,
    english: "Monday",
    telugu: "సోమవారం",
    hindi: "सोमवार",
    tamil: "திங்கட்கிழமை",
    emoji: "📚",
    funFact: "Monday is a fresh start! Let's begin the week with energy. 💪",
    bgGradient: "from-blue-400 to-indigo-400",
  },
  {
    num: 3,
    english: "Tuesday",
    telugu: "మంగళవారం",
    hindi: "मंगलवार",
    tamil: "செவ்வாய்க்கிழமை",
    emoji: "🎨",
    funFact: "Tuesday is for creativity! Draw, paint and be artistic. 🖌️",
    bgGradient: "from-red-400 to-pink-400",
  },
  {
    num: 4,
    english: "Wednesday",
    telugu: "బుధవారం",
    hindi: "बुधवार",
    tamil: "புதன்கிழமை",
    emoji: "🌿",
    funFact: "Wednesday is the middle of the week! We are halfway there! 🌟",
    bgGradient: "from-green-400 to-teal-400",
  },
  {
    num: 5,
    english: "Thursday",
    telugu: "గురువారం",
    hindi: "गुरुवार",
    tamil: "வியாழக்கிழமை",
    emoji: "🎵",
    funFact: "Thursday is music day! Sing, dance and be happy. 🎶",
    bgGradient: "from-purple-400 to-violet-400",
  },
  {
    num: 6,
    english: "Friday",
    telugu: "శుక్రవారం",
    hindi: "शुक्रवार",
    tamil: "வெள்ளிக்கிழமை",
    emoji: "🎉",
    funFact: "Friday is almost the weekend! Get ready for fun! 🥳",
    bgGradient: "from-pink-400 to-rose-400",
  },
  {
    num: 7,
    english: "Saturday",
    telugu: "శనివారం",
    hindi: "शनिवार",
    tamil: "சனிக்கிழமை",
    emoji: "🏖️",
    funFact: "Saturday is the best day! Play outside and have lots of fun! 🌈",
    bgGradient: "from-cyan-400 to-sky-400",
  },
];

const DaysLesson: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language>("english");
  const [idx, setIdx] = useState(0);

  const total = DAYS.length;
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIdx((i) => {
      const next = (i - 1 + total) % total;
      speakWord(
        DAYS[next][selectedLang],
        LANG_VOICE[selectedLang] as "en-US" | "te-IN" | "hi-IN" | "ta-IN",
      );
      return next;
    });
  }, [total, selectedLang]);

  const goNext = useCallback(() => {
    setIdx((i) => {
      const next = (i + 1) % total;
      speakWord(
        DAYS[next][selectedLang],
        LANG_VOICE[selectedLang] as "en-US" | "te-IN" | "hi-IN" | "ta-IN",
      );
      return next;
    });
  }, [total, selectedLang]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const day = DAYS[idx];

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${day.bgGradient} transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="days.page"
    >
      {/* Language tabs — top strip */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-2 p-2 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2 flex-wrap justify-center">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              type="button"
              data-ocid={`days.lang_${lang.id}.toggle`}
              onClick={() => setSelectedLang(lang.id)}
              className={`kid-btn px-4 py-1.5 text-base font-bold border-3 transition-all ${
                selectedLang === lang.id
                  ? LANG_ACTIVE_CLASS[lang.id]
                  : "bg-white/30 text-white border-white/50 hover:bg-white/50"
              }`}
            >
              {lang.emoji} {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main card content — centered */}
      <div className="flex flex-col items-center justify-center h-full pt-16 pb-20 px-16 gap-4">
        {/* Day number badge */}
        <div className="bg-white/30 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center border-4 border-white/60 shadow-xl shrink-0">
          <span className="font-bold text-2xl text-white">Day {day.num}</span>
        </div>

        {/* Day emoji — large */}
        <span
          className="drop-shadow-xl select-none"
          style={{ fontSize: "clamp(5rem, 20vw, 10rem)" }}
        >
          {day.emoji}
        </span>

        {/* Day name in selected language */}
        <div
          className="font-bold text-white drop-shadow-lg text-center leading-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          {day[selectedLang]}
        </div>

        {/* All 4 language names shown below */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {DAYS[idx] &&
            LANGUAGES.map((lang) => (
              <span
                key={lang.id}
                className={`bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-1.5 font-bold border-2 border-white/40 ${
                  lang.id === selectedLang
                    ? "bg-white/40 border-white text-white text-lg"
                    : "text-white/80 text-base"
                }`}
              >
                {lang.emoji} {DAYS[idx][lang.id]}
              </span>
            ))}
        </div>

        {/* Fun fact */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-5 py-3 max-w-md text-center border-2 border-white/30">
          <p
            className="font-bold text-white leading-snug"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)" }}
          >
            {day.funFact}
          </p>
        </div>

        {/* Speak button */}
        <button
          type="button"
          data-ocid="days.speak.button"
          onClick={() =>
            speakWord(
              day[selectedLang],
              LANG_VOICE[selectedLang] as "en-US" | "te-IN" | "hi-IN" | "ta-IN",
            )
          }
          className="kid-btn bg-white/30 hover:bg-white/50 text-white border-4 border-white/60 px-5 py-2.5 flex items-center gap-2 text-lg font-bold backdrop-blur-sm"
          aria-label="Speak day name"
        >
          <Volume2 size={24} />
          Listen
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        data-ocid="days.pagination_prev"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Previous day"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        data-ocid="days.pagination_next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Next day"
      >
        <ChevronRight size={36} />
      </button>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-2xl text-white/80 drop-shadow-md pointer-events-none">
        {idx + 1} / {total}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
        {DAYS.map((d, dotIdx) => (
          <div
            key={`dot-day-${d.num}`}
            className={`rounded-full transition-all duration-300 ${
              dotIdx === idx ? "w-4 h-4 bg-white" : "w-2.5 h-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DaysLesson;
