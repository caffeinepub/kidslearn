import { useState } from 'react';
import { Volume2 } from 'lucide-react';

type Language = 'english' | 'telugu' | 'hindi' | 'tamil';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: '🇬🇧 English',
  telugu: '🌺 Telugu',
  hindi: '🪔 Hindi',
  tamil: '🌸 Tamil',
};

const LANG_CODES: Record<Language, string> = {
  english: 'en-US',
  telugu: 'te-IN',
  hindi: 'hi-IN',
  tamil: 'ta-IN',
};

interface LetterEntry {
  letter: string;
  image: string;
  imageAlt: string;
  words: Record<Language, string>;
}

// 26 English letters with generated images and multilingual words
const ALPHABET_DATA: LetterEntry[] = [
  {
    letter: 'A', image: '/assets/generated/alphabet-a.dim_200x200.png', imageAlt: 'Illustration of an apple for letter A',
    words: { english: 'Apple 🍎', telugu: 'అరటి (Arati)', hindi: 'अनार (Anaar)', tamil: 'அன்னாசி (Annaasi)' },
  },
  {
    letter: 'B', image: '/assets/generated/alphabet-b.dim_200x200.png', imageAlt: 'Illustration of a ball for letter B',
    words: { english: 'Ball ⚽', telugu: 'బంతి (Banti)', hindi: 'बकरी (Bakri)', tamil: 'பந்து (Panthu)' },
  },
  {
    letter: 'C', image: '/assets/generated/alphabet-c.dim_200x200.png', imageAlt: 'Illustration of a cat for letter C',
    words: { english: 'Cat 🐱', telugu: 'పిల్లి (Pilli)', hindi: 'चाँद (Chaand)', tamil: 'பூனை (Poonai)' },
  },
  {
    letter: 'D', image: '/assets/generated/alphabet-d.dim_200x200.png', imageAlt: 'Illustration of a dog for letter D',
    words: { english: 'Dog 🐶', telugu: 'కుక్క (Kukka)', hindi: 'दरवाज़ा (Darwaaza)', tamil: 'நாய் (Naai)' },
  },
  {
    letter: 'E', image: '/assets/generated/alphabet-e.dim_200x200.png', imageAlt: 'Illustration of an elephant for letter E',
    words: { english: 'Elephant 🐘', telugu: 'ఏనుగు (Enugu)', hindi: 'हाथी (Haathi)', tamil: 'யானை (Yaanai)' },
  },
  {
    letter: 'F', image: '/assets/generated/alphabet-f.dim_200x200.png', imageAlt: 'Illustration of a fish for letter F',
    words: { english: 'Fish 🐟', telugu: 'చేప (Chepa)', hindi: 'फूल (Phool)', tamil: 'மீன் (Meen)' },
  },
  {
    letter: 'G', image: '/assets/generated/alphabet-g.dim_200x200.png', imageAlt: 'Illustration of a goat for letter G',
    words: { english: 'Goat 🐐', telugu: 'మేక (Meka)', hindi: 'गाय (Gaay)', tamil: 'ஆடு (Aadu)' },
  },
  {
    letter: 'H', image: '/assets/generated/alphabet-h.dim_200x200.png', imageAlt: 'Illustration of a hat for letter H',
    words: { english: 'Hat 🎩', telugu: 'టోపీ (Topi)', hindi: 'घर (Ghar)', tamil: 'தொப்பி (Thoppi)' },
  },
  {
    letter: 'I', image: '/assets/generated/alphabet-i.dim_200x200.png', imageAlt: 'Illustration of ice cream for letter I',
    words: { english: 'Ice cream 🍦', telugu: 'ఐస్ క్రీమ్ (Ice Cream)', hindi: 'इमली (Imli)', tamil: 'ஐஸ்கிரீம் (Ice Cream)' },
  },
  {
    letter: 'J', image: '/assets/generated/alphabet-j.dim_200x200.png', imageAlt: 'Illustration of a jar for letter J',
    words: { english: 'Jar 🫙', telugu: 'జాడీ (Jaadi)', hindi: 'जल (Jal)', tamil: 'ஜாடி (Jaadi)' },
  },
  {
    letter: 'K', image: '/assets/generated/alphabet-k.dim_200x200.png', imageAlt: 'Illustration of a kite for letter K',
    words: { english: 'Kite 🪁', telugu: 'గాలిపటం (Gaalipatam)', hindi: 'कमल (Kamal)', tamil: 'காற்றாடி (Kaattraadi)' },
  },
  {
    letter: 'L', image: '/assets/generated/alphabet-l.dim_200x200.png', imageAlt: 'Illustration of a lion for letter L',
    words: { english: 'Lion 🦁', telugu: 'సింహం (Simham)', hindi: 'लड्डू (Laddoo)', tamil: 'சிங்கம் (Singam)' },
  },
  {
    letter: 'M', image: '/assets/generated/alphabet-m.dim_200x200.png', imageAlt: 'Illustration of a mango for letter M',
    words: { english: 'Mango 🥭', telugu: 'మామిడి (Maamidi)', hindi: 'मछली (Machhli)', tamil: 'மாம்பழம் (Maambazham)' },
  },
  {
    letter: 'N', image: '/assets/generated/alphabet-n.dim_200x200.png', imageAlt: 'Illustration of a nest for letter N',
    words: { english: 'Nest 🪺', telugu: 'గూడు (Guudu)', hindi: 'नाव (Naav)', tamil: 'கூடு (Koodu)' },
  },
  {
    letter: 'O', image: '/assets/generated/alphabet-o.dim_200x200.png', imageAlt: 'Illustration of an orange for letter O',
    words: { english: 'Orange 🍊', telugu: 'నారింజ (Naarinja)', hindi: 'ओस (Os)', tamil: 'ஆரஞ்சு (Aaranchu)' },
  },
  {
    letter: 'P', image: '/assets/generated/alphabet-p.dim_200x200.png', imageAlt: 'Illustration of a parrot for letter P',
    words: { english: 'Parrot 🦜', telugu: 'చిలుక (Chiluka)', hindi: 'पत्ता (Patta)', tamil: 'கிளி (Kili)' },
  },
  {
    letter: 'Q', image: '/assets/generated/alphabet-q.dim_200x200.png', imageAlt: 'Illustration of a queen for letter Q',
    words: { english: 'Queen 👑', telugu: 'రాణి (Raani)', hindi: 'क्वीन (Queen)', tamil: 'ராணி (Raani)' },
  },
  {
    letter: 'R', image: '/assets/generated/alphabet-r.dim_200x200.png', imageAlt: 'Illustration of a rose for letter R',
    words: { english: 'Rose 🌹', telugu: 'గులాబి (Gulaabi)', hindi: 'रोटी (Roti)', tamil: 'ரோஜா (Roja)' },
  },
  {
    letter: 'S', image: '/assets/generated/alphabet-s.dim_200x200.png', imageAlt: 'Illustration of the sun for letter S',
    words: { english: 'Sun ☀️', telugu: 'సూర్యుడు (Suryudu)', hindi: 'सेब (Seb)', tamil: 'சூரியன் (Suuriyan)' },
  },
  {
    letter: 'T', image: '/assets/generated/alphabet-t.dim_200x200.png', imageAlt: 'Illustration of a tiger for letter T',
    words: { english: 'Tiger 🐯', telugu: 'పులి (Puli)', hindi: 'तारा (Taara)', tamil: 'புலி (Puli)' },
  },
  {
    letter: 'U', image: '/assets/generated/alphabet-u.dim_200x200.png', imageAlt: 'Illustration of an umbrella for letter U',
    words: { english: 'Umbrella ☂️', telugu: 'గొడుగు (Godugu)', hindi: 'उल्लू (Ullu)', tamil: 'குடை (Kudai)' },
  },
  {
    letter: 'V', image: '/assets/generated/alphabet-v.dim_200x200.png', imageAlt: 'Illustration of a van for letter V',
    words: { english: 'Van 🚐', telugu: 'వాహనం (Vaahanam)', hindi: 'वर्षा (Varsha)', tamil: 'வண்டி (Vandi)' },
  },
  {
    letter: 'W', image: '/assets/generated/alphabet-w.dim_200x200.png', imageAlt: 'Illustration of water for letter W',
    words: { english: 'Water 💧', telugu: 'నీరు (Neeru)', hindi: 'वृक्ष (Vriksha)', tamil: 'நீர் (Neer)' },
  },
  {
    letter: 'X', image: '/assets/generated/alphabet-x.dim_200x200.png', imageAlt: 'Illustration of a xylophone for letter X',
    words: { english: 'Xylophone 🎵', telugu: 'జైలోఫోన్ (Xylophone)', hindi: 'एक्स (X)', tamil: 'சைலோஃபோன் (Xylophone)' },
  },
  {
    letter: 'Y', image: '/assets/generated/alphabet-y.dim_200x200.png', imageAlt: 'Illustration of a yak for letter Y',
    words: { english: 'Yak 🐃', telugu: 'యాక్ (Yak)', hindi: 'यात्रा (Yaatra)', tamil: 'யாக் (Yak)' },
  },
  {
    letter: 'Z', image: '/assets/generated/alphabet-z.dim_200x200.png', imageAlt: 'Illustration of a zebra for letter Z',
    words: { english: 'Zebra 🦓', telugu: 'జీబ్రా (Zebra)', hindi: 'ज़ेबरा (Zebra)', tamil: 'ஜீப்ரா (Zebra)' },
  },
];

const CARD_COLORS = [
  'bg-sunshine-400 border-sunshine-600',
  'bg-grass-400 border-grass-600',
  'bg-tangerine-400 border-tangerine-600',
  'bg-cherry-400 border-cherry-600',
  'bg-sky-400 border-sky-600',
  'bg-lavender-400 border-lavender-600',
];

function speakText(text: string, langCode: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export default function AlphabetLesson() {
  const [language, setLanguage] = useState<Language>('english');
  const [speaking, setSpeaking] = useState<string | null>(null);

  const handleSpeak = (entry: LetterEntry) => {
    const text = `${entry.letter}. ${entry.words[language].replace(/\(.*?\)/g, '').trim()}`;
    setSpeaking(entry.letter);
    speakText(text, LANG_CODES[language]);
    setTimeout(() => setSpeaking(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-grass-700 mb-2">
          Alphabet 🔤
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Learn letters with pictures and words in 4 languages!
        </p>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`font-nunito font-bold px-5 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-base ${
                language === lang
                  ? 'bg-grass-500 border-grass-700 text-white shadow-fun'
                  : 'bg-white border-grass-300 text-grass-700 hover:bg-grass-50'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {ALPHABET_DATA.map((entry, i) => {
            const colorClass = CARD_COLORS[i % CARD_COLORS.length];
            const isSpeaking = speaking === entry.letter;
            return (
              <div
                key={entry.letter}
                onClick={() => handleSpeak(entry)}
                className={`${colorClass} border-4 rounded-3xl p-3 flex flex-col items-center gap-2 shadow-fun hover:scale-105 transition-all duration-200 cursor-pointer select-none ${isSpeaking ? 'scale-105 ring-4 ring-white/60' : ''}`}
              >
                {/* Big Letter */}
                <span className="font-fredoka text-5xl text-white drop-shadow-md leading-none">
                  {entry.letter}
                </span>

                {/* Illustration Image */}
                <div className="w-full flex justify-center">
                  <img
                    src={entry.image}
                    alt={entry.imageAlt}
                    className="w-16 h-16 object-cover rounded-2xl border-2 border-white/50 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Word in selected language */}
                <span className="font-nunito font-bold text-white text-xs text-center leading-tight px-1">
                  {entry.words[language]}
                </span>

                {/* All 4 language words (compact) */}
                <div className="w-full flex flex-col gap-0.5">
                  {(Object.keys(LANGUAGE_LABELS) as Language[])
                    .filter((l) => l !== language)
                    .map((l) => (
                      <span key={l} className="font-nunito text-white/80 text-[10px] text-center leading-tight">
                        {entry.words[l]}
                      </span>
                    ))}
                </div>

                {/* Speak button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleSpeak(entry); }}
                  className={`mt-1 bg-white/30 hover:bg-white/50 text-white rounded-2xl px-2 py-1 flex items-center gap-1 font-nunito font-bold text-xs transition-all hover:scale-105 active:scale-95 ${isSpeaking ? 'bg-white/60' : ''}`}
                >
                  <Volume2 size={12} />
                  {isSpeaking ? '...' : 'Say it!'}
                </button>
              </div>
            );
          })}
        </div>

        <p className="font-nunito text-center text-muted-foreground text-sm mt-8">
          🔊 Tap any card to hear the letter and word spoken aloud!
        </p>
      </div>
    </div>
  );
}
