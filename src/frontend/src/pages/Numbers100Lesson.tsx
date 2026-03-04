import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNumbers100 } from "../data/languageData";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<
  Language,
  { label: string; voice: string; activeClass: string }
> = {
  english: {
    label: "English",
    voice: "en-US",
    activeClass: "bg-sky-500 text-white border-sky-700 scale-110 shadow-fun-lg",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    activeClass:
      "bg-grass-500 text-white border-grass-700 scale-110 shadow-fun-lg",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    activeClass:
      "bg-tangerine-500 text-white border-tangerine-700 scale-110 shadow-fun-lg",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    activeClass:
      "bg-lavender-500 text-white border-lavender-700 scale-110 shadow-fun-lg",
  },
};

// All 100 numbers data for all 4 languages
const ALL_NUMBERS_DATA: {
  n: number;
  telugu: string;
  hindi: string;
  english: string;
  tamil: string;
}[] = [
  { n: 1, telugu: "ఒకటి", hindi: "एक", english: "One", tamil: "ஒன்று" },
  { n: 2, telugu: "రెండు", hindi: "दो", english: "Two", tamil: "இரண்டு" },
  { n: 3, telugu: "మూడు", hindi: "तीन", english: "Three", tamil: "மூன்று" },
  { n: 4, telugu: "నాలుగు", hindi: "चार", english: "Four", tamil: "நான்கு" },
  { n: 5, telugu: "అయిదు", hindi: "पाँच", english: "Five", tamil: "ஐந்து" },
  { n: 6, telugu: "ఆరు", hindi: "छह", english: "Six", tamil: "ஆறு" },
  { n: 7, telugu: "ఏడు", hindi: "सात", english: "Seven", tamil: "ஏழு" },
  { n: 8, telugu: "ఎనిమిది", hindi: "आठ", english: "Eight", tamil: "எட்டு" },
  { n: 9, telugu: "తొమ్మిది", hindi: "नौ", english: "Nine", tamil: "ஒன்பது" },
  { n: 10, telugu: "పది", hindi: "दस", english: "Ten", tamil: "பத்து" },
  {
    n: 11,
    telugu: "పదకొండు",
    hindi: "ग्यारह",
    english: "Eleven",
    tamil: "பதினொன்று",
  },
  {
    n: 12,
    telugu: "పన్నెండు",
    hindi: "बारह",
    english: "Twelve",
    tamil: "பன்னிரண்டு",
  },
  {
    n: 13,
    telugu: "పదమూడు",
    hindi: "तेरह",
    english: "Thirteen",
    tamil: "பதிமூன்று",
  },
  {
    n: 14,
    telugu: "పదనాలుగు",
    hindi: "चौदह",
    english: "Fourteen",
    tamil: "பதினான்கு",
  },
  {
    n: 15,
    telugu: "పదిహేను",
    hindi: "पंद्रह",
    english: "Fifteen",
    tamil: "பதினைந்து",
  },
  {
    n: 16,
    telugu: "పదహారు",
    hindi: "सोलह",
    english: "Sixteen",
    tamil: "பதினாறு",
  },
  {
    n: 17,
    telugu: "పదిహేడు",
    hindi: "सत्रह",
    english: "Seventeen",
    tamil: "பதினேழு",
  },
  {
    n: 18,
    telugu: "పదిహెనిమిది",
    hindi: "अठारह",
    english: "Eighteen",
    tamil: "பதினெட்டு",
  },
  {
    n: 19,
    telugu: "పంతొమ్మిది",
    hindi: "उन्नीस",
    english: "Nineteen",
    tamil: "பத்தொன்பது",
  },
  { n: 20, telugu: "ఇరవై", hindi: "बीस", english: "Twenty", tamil: "இருபது" },
  {
    n: 21,
    telugu: "ఇరవై ఒకటి",
    hindi: "इक्कीस",
    english: "Twenty-One",
    tamil: "இருபத்தொன்று",
  },
  {
    n: 22,
    telugu: "ఇరవై రెండు",
    hindi: "बाईस",
    english: "Twenty-Two",
    tamil: "இருபத்திரண்டு",
  },
  {
    n: 23,
    telugu: "ఇరవై మూడు",
    hindi: "तेईस",
    english: "Twenty-Three",
    tamil: "இருபத்து மூன்று",
  },
  {
    n: 24,
    telugu: "ఇరవై నాలుగు",
    hindi: "चौबीस",
    english: "Twenty-Four",
    tamil: "இருபத்து நான்கு",
  },
  {
    n: 25,
    telugu: "ఇరవై అయిదు",
    hindi: "पच्चीस",
    english: "Twenty-Five",
    tamil: "இருபத்தைந்து",
  },
  {
    n: 26,
    telugu: "ఇరవై ఆరు",
    hindi: "छब्बीस",
    english: "Twenty-Six",
    tamil: "இருபத்தாறு",
  },
  {
    n: 27,
    telugu: "ఇరవై ఏడు",
    hindi: "सत्ताईस",
    english: "Twenty-Seven",
    tamil: "இருபத்தேழு",
  },
  {
    n: 28,
    telugu: "ఇరవై ఎనిమిది",
    hindi: "अट्ठाईस",
    english: "Twenty-Eight",
    tamil: "இருபத்தெட்டு",
  },
  {
    n: 29,
    telugu: "ఇరవై తొమ్మిది",
    hindi: "उनतीस",
    english: "Twenty-Nine",
    tamil: "இருபத்தொன்பது",
  },
  { n: 30, telugu: "ముప్పై", hindi: "तीस", english: "Thirty", tamil: "முப்பது" },
  {
    n: 31,
    telugu: "ముప్పై ఒకటి",
    hindi: "इकतीस",
    english: "Thirty-One",
    tamil: "முப்பத்தொன்று",
  },
  {
    n: 32,
    telugu: "ముప్పై రెండు",
    hindi: "बत्तीस",
    english: "Thirty-Two",
    tamil: "முப்பத்திரண்டு",
  },
  {
    n: 33,
    telugu: "ముప్పై మూడు",
    hindi: "तैंतीस",
    english: "Thirty-Three",
    tamil: "முப்பத்து மூன்று",
  },
  {
    n: 34,
    telugu: "ముప్పై నాలుగు",
    hindi: "चौंतीस",
    english: "Thirty-Four",
    tamil: "முப்பத்து நான்கு",
  },
  {
    n: 35,
    telugu: "ముప్పై అయిదు",
    hindi: "पैंतीस",
    english: "Thirty-Five",
    tamil: "முப்பத்தைந்து",
  },
  {
    n: 36,
    telugu: "ముప్పై ఆరు",
    hindi: "छत्तीस",
    english: "Thirty-Six",
    tamil: "முப்பத்தாறு",
  },
  {
    n: 37,
    telugu: "ముప్పై ఏడు",
    hindi: "सैंतीस",
    english: "Thirty-Seven",
    tamil: "முப்பத்தேழு",
  },
  {
    n: 38,
    telugu: "ముప్పై ఎనిమిది",
    hindi: "अड़तीस",
    english: "Thirty-Eight",
    tamil: "முப்பத்தெட்டு",
  },
  {
    n: 39,
    telugu: "ముప్పై తొమ్మిది",
    hindi: "उनतालीस",
    english: "Thirty-Nine",
    tamil: "முப்பத்தொன்பது",
  },
  { n: 40, telugu: "నలభై", hindi: "चालीस", english: "Forty", tamil: "நாற்பது" },
  {
    n: 41,
    telugu: "నలభై ఒకటి",
    hindi: "इकतालीस",
    english: "Forty-One",
    tamil: "நாற்பத்தொன்று",
  },
  {
    n: 42,
    telugu: "నలభై రెండు",
    hindi: "बयालीस",
    english: "Forty-Two",
    tamil: "நாற்பத்திரண்டு",
  },
  {
    n: 43,
    telugu: "నలభై మూడు",
    hindi: "तैंतालीस",
    english: "Forty-Three",
    tamil: "நாற்பத்து மூன்று",
  },
  {
    n: 44,
    telugu: "నలభై నాలుగు",
    hindi: "चवालीस",
    english: "Forty-Four",
    tamil: "நாற்பத்து நான்கு",
  },
  {
    n: 45,
    telugu: "నలభై అయిదు",
    hindi: "पैंतालीस",
    english: "Forty-Five",
    tamil: "நாற்பத்தைந்து",
  },
  {
    n: 46,
    telugu: "నలభై ఆరు",
    hindi: "छियालीस",
    english: "Forty-Six",
    tamil: "நாற்பத்தாறு",
  },
  {
    n: 47,
    telugu: "నలభై ఏడు",
    hindi: "सैंतालीस",
    english: "Forty-Seven",
    tamil: "நாற்பத்தேழு",
  },
  {
    n: 48,
    telugu: "నలభై ఎనిమిది",
    hindi: "अड़तालीस",
    english: "Forty-Eight",
    tamil: "நாற்பத்தெட்டு",
  },
  {
    n: 49,
    telugu: "నలభై తొమ్మిది",
    hindi: "उनचास",
    english: "Forty-Nine",
    tamil: "நாற்பத்தொன்பது",
  },
  { n: 50, telugu: "యభై", hindi: "पचास", english: "Fifty", tamil: "ஐம்பது" },
  {
    n: 51,
    telugu: "యభై ఒకటి",
    hindi: "इक्यावन",
    english: "Fifty-One",
    tamil: "ஐம்பத்தொன்று",
  },
  {
    n: 52,
    telugu: "యభై రెండు",
    hindi: "बावन",
    english: "Fifty-Two",
    tamil: "ஐம்பத்திரண்டு",
  },
  {
    n: 53,
    telugu: "యభై మూడు",
    hindi: "तिरपन",
    english: "Fifty-Three",
    tamil: "ஐம்பத்து மூன்று",
  },
  {
    n: 54,
    telugu: "యభై నాలుగు",
    hindi: "चौवन",
    english: "Fifty-Four",
    tamil: "ஐம்பத்து நான்கு",
  },
  {
    n: 55,
    telugu: "యభై అయిదు",
    hindi: "पचपन",
    english: "Fifty-Five",
    tamil: "ஐம்பத்தைந்து",
  },
  {
    n: 56,
    telugu: "యభై ఆరు",
    hindi: "छप्पन",
    english: "Fifty-Six",
    tamil: "ஐம்பத்தாறு",
  },
  {
    n: 57,
    telugu: "యభై ఏడు",
    hindi: "सत्तावन",
    english: "Fifty-Seven",
    tamil: "ஐம்பத்தேழு",
  },
  {
    n: 58,
    telugu: "యభై ఎనిమిది",
    hindi: "अट्ठावन",
    english: "Fifty-Eight",
    tamil: "ஐம்பத்தெட்டு",
  },
  {
    n: 59,
    telugu: "యభై తొమ్మిది",
    hindi: "उनसठ",
    english: "Fifty-Nine",
    tamil: "ஐம்பத்தொன்பது",
  },
  { n: 60, telugu: "అరవై", hindi: "साठ", english: "Sixty", tamil: "அறுபது" },
  {
    n: 61,
    telugu: "అరవై ఒకటి",
    hindi: "इकसठ",
    english: "Sixty-One",
    tamil: "அறுபத்தொன்று",
  },
  {
    n: 62,
    telugu: "అరవై రెండు",
    hindi: "बासठ",
    english: "Sixty-Two",
    tamil: "அறுபத்திரண்டு",
  },
  {
    n: 63,
    telugu: "అరవై మూడు",
    hindi: "तिरसठ",
    english: "Sixty-Three",
    tamil: "அறுபத்து மூன்று",
  },
  {
    n: 64,
    telugu: "అరవై నాలుగు",
    hindi: "चौंसठ",
    english: "Sixty-Four",
    tamil: "அறுபத்து நான்கு",
  },
  {
    n: 65,
    telugu: "అరవై అయిదు",
    hindi: "पैंसठ",
    english: "Sixty-Five",
    tamil: "அறுபத்தைந்து",
  },
  {
    n: 66,
    telugu: "అరవై ఆరు",
    hindi: "छियासठ",
    english: "Sixty-Six",
    tamil: "அறுபத்தாறு",
  },
  {
    n: 67,
    telugu: "అరవై ఏడు",
    hindi: "सड़सठ",
    english: "Sixty-Seven",
    tamil: "அறுபத்தேழு",
  },
  {
    n: 68,
    telugu: "అరవై ఎనిమిది",
    hindi: "अड़सठ",
    english: "Sixty-Eight",
    tamil: "அறுபத்தெட்டு",
  },
  {
    n: 69,
    telugu: "అరవై తొమ్మిది",
    hindi: "उनहत्तर",
    english: "Sixty-Nine",
    tamil: "அறுபத்தொன்பது",
  },
  { n: 70, telugu: "డెబ్బై", hindi: "सत्तर", english: "Seventy", tamil: "எழுபது" },
  {
    n: 71,
    telugu: "డెబ్బై ఒకటి",
    hindi: "इकहत्तर",
    english: "Seventy-One",
    tamil: "எழுபத்தொன்று",
  },
  {
    n: 72,
    telugu: "డెబ్బై రెండు",
    hindi: "बहत्तर",
    english: "Seventy-Two",
    tamil: "எழுபத்திரண்டு",
  },
  {
    n: 73,
    telugu: "డెబ్బై మూడు",
    hindi: "तिहत्तर",
    english: "Seventy-Three",
    tamil: "எழுபத்து மூன்று",
  },
  {
    n: 74,
    telugu: "డెబ్బై నాలుగు",
    hindi: "चौहत्तर",
    english: "Seventy-Four",
    tamil: "எழுபத்து நான்கு",
  },
  {
    n: 75,
    telugu: "డెబ్బై అయిదు",
    hindi: "पचहत्तर",
    english: "Seventy-Five",
    tamil: "எழுபத்தைந்து",
  },
  {
    n: 76,
    telugu: "డెబ్బై ఆరు",
    hindi: "छिहत्तर",
    english: "Seventy-Six",
    tamil: "எழுபத்தாறு",
  },
  {
    n: 77,
    telugu: "డెబ్బై ఏడు",
    hindi: "सतहत्तर",
    english: "Seventy-Seven",
    tamil: "எழுபத்தேழு",
  },
  {
    n: 78,
    telugu: "డెబ్బై ఎనిమిది",
    hindi: "अठहत्तर",
    english: "Seventy-Eight",
    tamil: "எழுபத்தெட்டு",
  },
  {
    n: 79,
    telugu: "డెబ్బై తొమ్మిది",
    hindi: "उनासी",
    english: "Seventy-Nine",
    tamil: "எழுபத்தொன்பது",
  },
  { n: 80, telugu: "ఎనభై", hindi: "अस्सी", english: "Eighty", tamil: "எண்பது" },
  {
    n: 81,
    telugu: "ఎనభై ఒకటి",
    hindi: "इक्यासी",
    english: "Eighty-One",
    tamil: "எண்பத்தொன்று",
  },
  {
    n: 82,
    telugu: "ఎనభై రెండు",
    hindi: "बयासी",
    english: "Eighty-Two",
    tamil: "எண்பத்திரண்டு",
  },
  {
    n: 83,
    telugu: "ఎనభై మూడు",
    hindi: "तिरासी",
    english: "Eighty-Three",
    tamil: "எண்பத்து மூன்று",
  },
  {
    n: 84,
    telugu: "ఎనభై నాలుగు",
    hindi: "चौरासी",
    english: "Eighty-Four",
    tamil: "எண்பத்து நான்கு",
  },
  {
    n: 85,
    telugu: "ఎనభై అయిదు",
    hindi: "पचासी",
    english: "Eighty-Five",
    tamil: "எண்பத்தைந்து",
  },
  {
    n: 86,
    telugu: "ఎనభై ఆరు",
    hindi: "छियासी",
    english: "Eighty-Six",
    tamil: "எண்பத்தாறு",
  },
  {
    n: 87,
    telugu: "ఎనభై ఏడు",
    hindi: "सत्तासी",
    english: "Eighty-Seven",
    tamil: "எண்பத்தேழு",
  },
  {
    n: 88,
    telugu: "ఎనభై ఎనిమిది",
    hindi: "अट्ठासी",
    english: "Eighty-Eight",
    tamil: "எண்பத்தெட்டு",
  },
  {
    n: 89,
    telugu: "ఎనభై తొమ్మిది",
    hindi: "नवासी",
    english: "Eighty-Nine",
    tamil: "எண்பத்தொன்பது",
  },
  { n: 90, telugu: "తొంభై", hindi: "नब्बे", english: "Ninety", tamil: "தொண்ணூறு" },
  {
    n: 91,
    telugu: "తొంభై ఒకటి",
    hindi: "इक्यानवे",
    english: "Ninety-One",
    tamil: "தொண்ணூற்றொன்று",
  },
  {
    n: 92,
    telugu: "తొంభై రెండు",
    hindi: "बानवे",
    english: "Ninety-Two",
    tamil: "தொண்ணூற்றிரண்டு",
  },
  {
    n: 93,
    telugu: "తొంభై మూడు",
    hindi: "तिरानवे",
    english: "Ninety-Three",
    tamil: "தொண்ணூற்று மூன்று",
  },
  {
    n: 94,
    telugu: "తొంభై నాలుగు",
    hindi: "चौरानवे",
    english: "Ninety-Four",
    tamil: "தொண்ணூற்று நான்கு",
  },
  {
    n: 95,
    telugu: "తొంభై అయిదు",
    hindi: "पंचानवे",
    english: "Ninety-Five",
    tamil: "தொண்ணூற்றைந்து",
  },
  {
    n: 96,
    telugu: "తొంభై ఆరు",
    hindi: "छियानवे",
    english: "Ninety-Six",
    tamil: "தொண்ணூற்றாறு",
  },
  {
    n: 97,
    telugu: "తొంభై ఏడు",
    hindi: "सत्तानवे",
    english: "Ninety-Seven",
    tamil: "தொண்ணூற்றேழு",
  },
  {
    n: 98,
    telugu: "తొంభై ఎనిమిది",
    hindi: "अट्ठानवे",
    english: "Ninety-Eight",
    tamil: "தொண்ணூற்றெட்டு",
  },
  {
    n: 99,
    telugu: "తొంభై తొమ్మిది",
    hindi: "निन्यानवे",
    english: "Ninety-Nine",
    tamil: "தொண்ணூற்றொன்பது",
  },
  { n: 100, telugu: "వంద", hindi: "सौ", english: "One Hundred", tamil: "நூறு" },
];

const CARD_BG_COLORS = [
  "from-sunshine-300 to-sunshine-500",
  "from-cherry-300 to-cherry-500",
  "from-sky-300 to-sky-500",
  "from-grass-300 to-grass-500",
  "from-tangerine-300 to-tangerine-500",
  "from-lavender-300 to-lavender-500",
  "from-mint-300 to-mint-500",
  "from-coral-300 to-coral-500",
];

const LANG_VOICES: Record<Language, string> = {
  english: "en-US",
  telugu: "te-IN",
  hindi: "hi-IN",
  tamil: "ta-IN",
};

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75;
  window.speechSynthesis.speak(utterance);
}

/** Speak only the word — no numeric prefix to avoid double sound */
function speakWord(word: string, lang: string) {
  speak(word, lang);
}

export default function Numbers100Lesson() {
  const [language, setLanguage] = useState<Language>("english");
  const [idx, setIdx] = useState(0);

  const total = ALL_NUMBERS_DATA.length;
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setIdx((i) => {
      const next = (i - 1 + total) % total;
      const nextNum = ALL_NUMBERS_DATA[next];
      speakWord(nextNum[language], LANG_VOICES[language]);
      return next;
    });
  }, [total, language]);

  const goNext = useCallback(() => {
    setIdx((i) => {
      const next = (i + 1) % total;
      const nextNum = ALL_NUMBERS_DATA[next];
      speakWord(nextNum[language], LANG_VOICES[language]);
      return next;
    });
  }, [total, language]);

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

  const num = ALL_NUMBERS_DATA[idx];
  const bgGradient = CARD_BG_COLORS[idx % CARD_BG_COLORS.length];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setIdx(0);
  };

  // Get word for current language
  const wordForLang = num[language];

  // Auto-speak on initial load only
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    speakWord(wordForLang, LANG_VOICES[language]);
  }, []);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${bgGradient} transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="numbers100.page"
    >
      {/* Language tabs — top strip */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-2 p-2 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2 flex-wrap justify-center">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              data-ocid={`numbers100.lang_${lang}.toggle`}
              onClick={() => handleLangChange(lang)}
              className={`kid-btn px-4 py-1.5 text-base font-heading border-3 transition-all ${
                language === lang
                  ? LANGUAGE_CONFIG[lang].activeClass
                  : "bg-white/30 text-white border-white/50 hover:bg-white/50"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>
      </div>

      {/* Main card content — centered */}
      <div className="flex flex-col items-center justify-center h-full pt-16 pb-20 px-24 gap-3">
        {/* Giant number */}
        <div
          className="font-heading leading-none drop-shadow-2xl select-none text-white"
          style={{ fontSize: "clamp(5rem, 26vw, 18rem)" }}
        >
          {num.n}
        </div>

        {/* Word in selected language */}
        <div
          className="font-heading text-white drop-shadow-lg text-center leading-tight"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          {wordForLang}
        </div>

        {/* All 4 languages word strip */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {(["telugu", "hindi", "english", "tamil"] as Language[]).map(
            (lang) => (
              <div
                key={lang}
                className={`px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 text-center transition-all ${lang === language ? "bg-white/40 border-white scale-105" : ""}`}
              >
                <div className="font-body text-white/70 text-xs uppercase mb-0.5">
                  {LANGUAGE_CONFIG[lang].label}
                </div>
                <div className="font-heading text-white text-lg leading-tight">
                  {num[lang]}
                </div>
              </div>
            ),
          )}
        </div>

        {/* Speak button */}
        <button
          type="button"
          data-ocid="numbers100.speak.button"
          onClick={() => speakWord(wordForLang, LANG_VOICES[language])}
          className="kid-btn bg-white/30 hover:bg-white/50 text-white border-4 border-white/60 px-6 py-3 flex items-center gap-2 text-xl font-heading backdrop-blur-sm mt-2"
          aria-label="Speak"
        >
          <Volume2 size={28} />
          Listen
        </button>
      </div>

      {/* Left arrow */}
      <button
        type="button"
        data-ocid="numbers100.pagination_prev"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        data-ocid="numbers100.pagination_next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all duration-150 z-10"
        aria-label="Next"
      >
        <ChevronRight size={36} />
      </button>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-heading text-2xl text-white/80 drop-shadow-md pointer-events-none">
        {idx + 1} / {total}
      </div>
    </div>
  );
}
