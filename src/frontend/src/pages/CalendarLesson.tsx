import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";

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

interface MonthData {
  num: number;
  english: string;
  telugu: string;
  hindi: string;
  tamil: string;
  emoji: string;
  funFact: string;
  bgGradient: string;
  image: string;
}

const MONTHS: MonthData[] = [
  {
    num: 1,
    english: "January",
    telugu: "జనవరి",
    hindi: "जनवरी",
    tamil: "ஜனவரி",
    emoji: "🎆",
    funFact: "January is the first month! New Year starts here. 🎉",
    bgGradient: "from-sky-300 to-sky-600",
    image: "/assets/generated/month-january.dim_400x300.png",
  },
  {
    num: 2,
    english: "February",
    telugu: "ఫిబ్రవరి",
    hindi: "फरवरी",
    tamil: "பிப்ரவரி",
    emoji: "❤️",
    funFact: "February has the shortest days! Valentine's Day is here. 💝",
    bgGradient: "from-cherry-300 to-cherry-600",
    image: "/assets/generated/month-february.dim_400x300.png",
  },
  {
    num: 3,
    english: "March",
    telugu: "మార్చి",
    hindi: "मार्च",
    tamil: "மார்ச்",
    emoji: "🌸",
    funFact: "Spring begins in March! Flowers start to bloom. 🌺",
    bgGradient: "from-grass-300 to-grass-600",
    image: "/assets/generated/month-march.dim_400x300.png",
  },
  {
    num: 4,
    english: "April",
    telugu: "ఏప్రిల్",
    hindi: "अप्रैल",
    tamil: "ஏப்ரல்",
    emoji: "🌧️",
    funFact: "April showers bring May flowers! Rain helps plants grow. 🌱",
    bgGradient: "from-lavender-300 to-lavender-600",
    image: "/assets/generated/month-april.dim_400x300.png",
  },
  {
    num: 5,
    english: "May",
    telugu: "మే",
    hindi: "मई",
    tamil: "மே",
    emoji: "🌻",
    funFact: "May is full of flowers and warm sunshine! 🌞",
    bgGradient: "from-sunshine-300 to-sunshine-600",
    image: "/assets/generated/month-may.dim_400x300.png",
  },
  {
    num: 6,
    english: "June",
    telugu: "జూన్",
    hindi: "जून",
    tamil: "ஜூன்",
    emoji: "🏖️",
    funFact: "Summer begins in June! Time for the beach and fun. ☀️",
    bgGradient: "from-tangerine-300 to-tangerine-600",
    image: "/assets/generated/month-june.dim_400x300.png",
  },
  {
    num: 7,
    english: "July",
    telugu: "జులై",
    hindi: "जुलाई",
    tamil: "ஜூலை",
    emoji: "🍉",
    funFact: "July is the hottest month! Enjoy ice cream and watermelon. 🍦",
    bgGradient: "from-coral-300 to-coral-600",
    image: "/assets/generated/month-july.dim_400x300.png",
  },
  {
    num: 8,
    english: "August",
    telugu: "ఆగస్టు",
    hindi: "अगस्त",
    tamil: "ஆகஸ்ட்",
    emoji: "🎒",
    funFact: "August means back to school! Time to learn new things. 📚",
    bgGradient: "from-mint-300 to-mint-600",
    image: "/assets/generated/month-august.dim_400x300.png",
  },
  {
    num: 9,
    english: "September",
    telugu: "సెప్టెంబర్",
    hindi: "सितंबर",
    tamil: "செப்டம்பர்",
    emoji: "🍂",
    funFact: "Autumn starts in September! Leaves turn red and yellow. 🍁",
    bgGradient: "from-tangerine-400 to-tangerine-700",
    image: "/assets/generated/month-september.dim_400x300.png",
  },
  {
    num: 10,
    english: "October",
    telugu: "అక్టోబర్",
    hindi: "अक्टूबर",
    tamil: "அக்டோபர்",
    emoji: "🎃",
    funFact: "October has Halloween! Pumpkins and costumes everywhere. 👻",
    bgGradient: "from-sunshine-400 to-sunshine-700",
    image: "/assets/generated/month-october.dim_400x300.png",
  },
  {
    num: 11,
    english: "November",
    telugu: "నవంబర్",
    hindi: "नवंबर",
    tamil: "நவம்பர்",
    emoji: "🦃",
    funFact: "November is harvest time! We give thanks for all good things. 🌾",
    bgGradient: "from-grass-400 to-grass-700",
    image: "/assets/generated/month-november.dim_400x300.png",
  },
  {
    num: 12,
    english: "December",
    telugu: "డిసెంబర్",
    hindi: "दिसंबर",
    tamil: "டிசம்பர்",
    emoji: "🎄",
    funFact: "December is the last month! Winter holidays and Christmas. ☃️",
    bgGradient: "from-sky-400 to-sky-700",
    image: "/assets/generated/month-december.dim_400x300.png",
  },
];

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75;
  window.speechSynthesis.speak(utterance);
}

const CalendarLesson: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language>("english");
  const [idx, setIdx] = useState(0);

  const total = MONTHS.length;
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIdx((i) => (i + 1) % total);
  }, [total]);

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

  const month = MONTHS[idx];

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${month.bgGradient} transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="calendar.page"
    >
      {/* Language tabs — top strip */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-2 p-2 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2 flex-wrap justify-center">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              type="button"
              data-ocid={`calendar.lang_${lang.id}.toggle`}
              onClick={() => setSelectedLang(lang.id)}
              className={`kid-btn px-4 py-1.5 text-base font-heading border-3 transition-all ${
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
      <div className="flex flex-col items-center justify-center h-full pt-16 pb-20 px-20 gap-3">
        {/* Month number badge */}
        <div className="bg-white/30 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border-4 border-white/60 shadow-xl shrink-0">
          <span className="font-heading text-2xl text-white">{month.num}</span>
        </div>

        {/* Month image */}
        <img
          src={month.image}
          alt={month.english}
          className="rounded-3xl shadow-2xl border-4 border-white/60"
          style={{
            width: "clamp(160px, 35vw, 300px)",
            height: "clamp(120px, 26vw, 220px)",
            objectFit: "cover",
          }}
        />

        {/* Month emoji */}
        <span
          className="drop-shadow-xl"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
        >
          {month.emoji}
        </span>

        {/* Month name in selected language */}
        <div
          className="font-heading text-white drop-shadow-lg text-center leading-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          {month[selectedLang]}
        </div>

        {/* English name if not English */}
        {selectedLang !== "english" && (
          <div
            className="font-heading text-white/80 text-center"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
          >
            {month.english}
          </div>
        )}

        {/* Fun fact */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-5 py-3 max-w-md text-center border-2 border-white/30">
          <p
            className="font-body text-white leading-snug"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)" }}
          >
            {month.funFact}
          </p>
        </div>

        {/* Speak button */}
        <button
          type="button"
          data-ocid="calendar.speak.button"
          onClick={() => speak(month[selectedLang], LANG_VOICE[selectedLang])}
          className="kid-btn bg-white/30 hover:bg-white/50 text-white border-4 border-white/60 px-5 py-2.5 flex items-center gap-2 text-lg font-heading backdrop-blur-sm"
          aria-label="Speak month name"
        >
          <Volume2 size={24} />
          Listen
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        data-ocid="calendar.pagination_prev"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Previous month"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        data-ocid="calendar.pagination_next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Next month"
      >
        <ChevronRight size={36} />
      </button>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-heading text-2xl text-white/80 drop-shadow-md pointer-events-none">
        {idx + 1} / {total}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
        {MONTHS.map((m, dotIdx) => (
          <div
            key={`dot-month-${m.num}`}
            className={`rounded-full transition-all duration-300 ${
              dotIdx === idx ? "w-4 h-4 bg-white" : "w-2.5 h-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarLesson;
