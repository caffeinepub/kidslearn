import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from "lucide-react";
import React, { useState } from "react";
import { getFlashcards } from "../data/languageData";
import { speakWord } from "../utils/speech";

type Language = "english" | "telugu" | "hindi" | "tamil";

const LANGUAGE_CONFIG: Record<
  Language,
  {
    label: string;
    voice: string;
    btnClass: string;
    frontBg: string;
    backBg: string;
  }
> = {
  english: {
    label: "English",
    voice: "en-US",
    btnClass: "bg-sky-400 hover:bg-sky-500 text-white border-sky-600",
    frontBg: "bg-gradient-to-br from-sky-100 to-sky-200 border-sky-400",
    backBg: "bg-gradient-to-br from-sky-400 to-sky-600 border-sky-700",
  },
  telugu: {
    label: "తెలుగు",
    voice: "te-IN",
    btnClass: "bg-grass-400 hover:bg-grass-500 text-white border-grass-600",
    frontBg: "bg-gradient-to-br from-grass-100 to-grass-200 border-grass-400",
    backBg: "bg-gradient-to-br from-grass-400 to-grass-600 border-grass-700",
  },
  hindi: {
    label: "हिंदी",
    voice: "hi-IN",
    btnClass:
      "bg-tangerine-400 hover:bg-tangerine-500 text-white border-tangerine-600",
    frontBg:
      "bg-gradient-to-br from-tangerine-100 to-tangerine-200 border-tangerine-400",
    backBg:
      "bg-gradient-to-br from-tangerine-400 to-tangerine-600 border-tangerine-700",
  },
  tamil: {
    label: "தமிழ்",
    voice: "ta-IN",
    btnClass:
      "bg-lavender-400 hover:bg-lavender-500 text-white border-lavender-600",
    frontBg:
      "bg-gradient-to-br from-lavender-100 to-lavender-200 border-lavender-400",
    backBg:
      "bg-gradient-to-br from-lavender-400 to-lavender-600 border-lavender-700",
  },
};

// Extended flashcard data with more items per language
const EXTRA_FLASHCARDS: Record<
  Language,
  Array<{ emoji: string; front: string; back: string }>
> = {
  english: [
    { emoji: "🍎", front: "Apple", back: "A red, sweet fruit 🍎" },
    { emoji: "🐘", front: "Elephant", back: "The biggest land animal 🐘" },
    { emoji: "☀️", front: "Sun", back: "The bright star that gives us light ☀️" },
    { emoji: "🌊", front: "Ocean", back: "A huge body of salt water 🌊" },
    { emoji: "🦁", front: "Lion", back: "The king of the jungle 🦁" },
    {
      emoji: "🌈",
      front: "Rainbow",
      back: "Beautiful colours in the sky after rain 🌈",
    },
    { emoji: "🚀", front: "Rocket", back: "A vehicle that goes to space 🚀" },
    {
      emoji: "🎵",
      front: "Music",
      back: "Beautiful sounds we love to hear 🎵",
    },
    {
      emoji: "🌸",
      front: "Flower",
      back: "A beautiful, colourful plant bloom 🌸",
    },
    { emoji: "🐠", front: "Fish", back: "An animal that lives in water 🐠" },
    { emoji: "🏔️", front: "Mountain", back: "A very tall, rocky landform 🏔️" },
    {
      emoji: "⭐",
      front: "Star",
      back: "A bright light we see in the night sky ⭐",
    },
  ],
  telugu: [
    { emoji: "🍎", front: "ఆపిల్", back: "Apple - ఒక ఎర్రని పండు 🍎" },
    { emoji: "🐘", front: "ఏనుగు", back: "Elephant - అతి పెద్ద జంతువు 🐘" },
    { emoji: "☀️", front: "సూర్యుడు", back: "Sun - వెలుతురు ఇచ్చే తారుడు ☀️" },
    { emoji: "🌊", front: "సముద్రం", back: "Ocean - పెద్ద ఉప్పు నీటి సముద్రం 🌊" },
    { emoji: "🦁", front: "సింహం", back: "Lion - అడవికి రాజు 🦁" },
    {
      emoji: "🌈",
      front: "ఇంద్రధనుసు",
      back: "Rainbow - వర్షం తర్వాత ఆకాశంలో రంగులు 🌈",
    },
    { emoji: "🌸", front: "పువ్వు", back: "Flower - అందమైన రంగురంగుల పువ్వు 🌸" },
    { emoji: "🐠", front: "చేప", back: "Fish - నీటిలో నివసించే జంతువు 🐠" },
    { emoji: "🍌", front: "అరటి", back: "Banana - పసుపు రంగు పండు 🍌" },
    { emoji: "🌙", front: "చంద్రుడు", back: "Moon - రాత్రి వెలిగే చంద్రుడు 🌙" },
    { emoji: "🏠", front: "ఇల్లు", back: "House - మనం నివసించే స్థలం 🏠" },
    { emoji: "📚", front: "పుస్తకం", back: "Book - చదవడానికి ఉపయోగించే వస్తువు 📚" },
  ],
  hindi: [
    { emoji: "🍎", front: "सेब", back: "Apple - एक लाल, मीठा फल 🍎" },
    { emoji: "🐘", front: "हाथी", back: "Elephant - सबसे बड़ा जमीनी जानवर 🐘" },
    { emoji: "☀️", front: "सूरज", back: "Sun - हमें रोशनी देने वाला तारा ☀️" },
    { emoji: "🌊", front: "समुद्र", back: "Ocean - नमक के पानी का विशाल समुद्र 🌊" },
    { emoji: "🦁", front: "शेर", back: "Lion - जंगल का राजा 🦁" },
    {
      emoji: "🌈",
      front: "इंद्रधनुष",
      back: "Rainbow - बारिश के बाद आकाश में रंग 🌈",
    },
    { emoji: "🌸", front: "फूल", back: "Flower - सुंदर, रंगीन पौधे का खिलना 🌸" },
    { emoji: "🐠", front: "मछली", back: "Fish - पानी में रहने वाला जानवर 🐠" },
    { emoji: "🍌", front: "केला", back: "Banana - पीला रंग का फल 🍌" },
    { emoji: "🌙", front: "चाँद", back: "Moon - रात को चमकने वाला चाँद 🌙" },
    { emoji: "🏠", front: "घर", back: "House - जहाँ हम रहते हैं 🏠" },
    { emoji: "📚", front: "किताब", back: "Book - पढ़ने के लिए उपयोग होती है 📚" },
  ],
  tamil: [
    { emoji: "🍎", front: "ஆப்பிள்", back: "Apple - சிவப்பு, இனிப்பான பழம் 🍎" },
    { emoji: "🐘", front: "யானை", back: "Elephant - மிகப்பெரிய நிலவாழ் விலங்கு 🐘" },
    {
      emoji: "☀️",
      front: "சூரியன்",
      back: "Sun - நமக்கு வெளிச்சம் தரும் நட்சத்திரம் ☀️",
    },
    { emoji: "🌊", front: "கடல்", back: "Ocean - உப்பு நீரின் பெரிய தொகுப்பு 🌊" },
    { emoji: "🦁", front: "சிங்கம்", back: "Lion - காட்டின் ராஜா 🦁" },
    {
      emoji: "🌈",
      front: "வானவில்",
      back: "Rainbow - மழைக்குப் பிறகு வானில் வண்ணங்கள் 🌈",
    },
    { emoji: "🌸", front: "பூ", back: "Flower - அழகான, வண்ணமயமான தாவர மலர் 🌸" },
    { emoji: "🐠", front: "மீன்", back: "Fish - நீரில் வாழும் விலங்கு 🐠" },
    { emoji: "🍌", front: "வாழைப்பழம்", back: "Banana - மஞ்சள் நிற பழம் 🍌" },
    { emoji: "🌙", front: "நிலா", back: "Moon - இரவில் ஒளிரும் நிலவு 🌙" },
    { emoji: "🏠", front: "வீடு", back: "House - நாம் வாழும் இடம் 🏠" },
    {
      emoji: "📚",
      front: "புத்தகம்",
      back: "Book - படிக்கப் பயன்படுத்தப்படுகிறது 📚",
    },
  ],
};

export default function Flashcards() {
  const [language, setLanguage] = useState<Language>("english");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Combine data from languageData module with extra cards
  const baseCards = getFlashcards(language);
  const extraCards = EXTRA_FLASHCARDS[language] || [];
  // Merge without duplicates by front text
  const frontSet = new Set(baseCards.map((c) => c.front));
  const merged = [
    ...baseCards,
    ...extraCards.filter((c) => !frontSet.has(c.front)),
  ];
  const cards = merged.length > 0 ? merged : extraCards;

  const config = LANGUAGE_CONFIG[language];
  const card = cards[currentIdx];

  const handleNext = () => {
    setCurrentIdx((i) => (i + 1) % cards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIdx((i) => (i - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-lavender-100 to-mint-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🗂️</div>
          <h1 className="font-bold text-5xl text-sky-700 drop-shadow-md mb-2">
            Flashcards
          </h1>
          <p className="font-bold text-xl text-sky-500">
            Tap the card to flip and learn!
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              data-ocid={`flashcards.lang_${lang}.toggle`}
              onClick={() => {
                setLanguage(lang);
                setCurrentIdx(0);
                setFlipped(false);
              }}
              className={`kid-btn px-6 py-3 text-lg font-bold border-4 ${
                language === lang
                  ? `${LANGUAGE_CONFIG[lang].btnClass} scale-110 shadow-fun-lg`
                  : "bg-white border-gray-300 text-gray-600 hover:scale-105"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="text-center mb-4">
          <span className="font-bold text-xl text-gray-600">
            Card {currentIdx + 1} of {cards.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-white/60 rounded-full mb-6 overflow-hidden border-2 border-white">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-lavender-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / cards.length) * 100}%` }}
          />
        </div>

        {/* Flashcard */}
        <button
          type="button"
          data-ocid="flashcards.canvas_target"
          className="flip-card w-full cursor-pointer mb-8 text-left"
          style={{ perspective: "1000px", height: "360px" }}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className={`flip-card-inner w-full h-full ${
              flipped ? "flipped" : ""
            }`}
          >
            {/* Front */}
            <div
              className={`flip-card-front kid-card border-4 ${config.frontBg} flex flex-col items-center justify-center p-8 gap-5`}
            >
              <span
                className="select-none drop-shadow-lg"
                style={{ fontSize: "clamp(5rem, 18vw, 8rem)" }}
              >
                {card?.emoji}
              </span>
              <span className="font-bold text-4xl md:text-5xl text-gray-800 text-center">
                {card?.front}
              </span>
              <span className="font-semibold text-base text-gray-500 bg-white/60 rounded-xl px-4 py-1">
                👆 Tap to flip!
              </span>
            </div>
            {/* Back */}
            <div
              className={`flip-card-back kid-card border-4 ${config.backBg} flex flex-col items-center justify-center p-8 gap-5`}
            >
              <span
                className="select-none drop-shadow-lg"
                style={{ fontSize: "clamp(4rem, 14vw, 6rem)" }}
              >
                {card?.emoji}
              </span>
              <span className="font-bold text-2xl md:text-3xl text-white text-center leading-relaxed">
                {card?.back}
              </span>
              <button
                type="button"
                data-ocid="flashcards.speak.button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(
                    card?.back ?? "",
                    config.voice as "en-US" | "te-IN" | "hi-IN" | "ta-IN",
                  );
                }}
                className="kid-btn bg-white/30 hover:bg-white/50 text-white px-6 py-2.5 border-2 border-white flex items-center gap-2 text-lg font-bold"
              >
                <Volume2 size={22} /> Listen
              </button>
            </div>
          </div>
        </button>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            data-ocid="flashcards.pagination_prev"
            onClick={handlePrev}
            className="kid-btn bg-lavender-400 hover:bg-lavender-500 text-white px-6 py-3 text-lg border-4 border-lavender-600 flex items-center gap-2"
          >
            <ChevronLeft size={22} /> Prev
          </button>
          <button
            type="button"
            data-ocid="flashcards.secondary_button"
            onClick={() => setFlipped(false)}
            className="kid-btn bg-white hover:bg-gray-100 text-gray-700 px-5 py-3 border-4 border-gray-300 flex items-center gap-2 font-bold"
          >
            <RotateCcw size={20} /> Reset
          </button>
          <button
            type="button"
            data-ocid="flashcards.pagination_next"
            onClick={handleNext}
            className="kid-btn bg-lavender-400 hover:bg-lavender-500 text-white px-6 py-3 text-lg border-4 border-lavender-600 flex items-center gap-2"
          >
            Next <ChevronRight size={22} />
          </button>
        </div>

        {/* Category dots */}
        <div className="flex justify-center gap-1.5 mt-6 flex-wrap">
          {cards.map((_, i) => (
            <button
              key={`dot-${i + 1}`}
              type="button"
              data-ocid={`flashcards.item.${i + 1}`}
              onClick={() => {
                setCurrentIdx(i);
                setFlipped(false);
              }}
              className={`rounded-full transition-all duration-200 ${
                i === currentIdx
                  ? "w-4 h-4 bg-sky-500"
                  : "w-2.5 h-2.5 bg-sky-200 hover:bg-sky-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
