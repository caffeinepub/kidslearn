import { useState } from 'react';
import { Volume2 } from 'lucide-react';

type Language = 'english' | 'telugu' | 'hindi' | 'tamil';
type Category = 'bodyparts' | 'animals' | 'trees' | 'flowers';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: '🇬🇧 English',
  telugu: '🌺 Telugu',
  hindi: '🪔 Hindi',
  tamil: '🌸 Tamil',
};

const CATEGORY_LABELS: Record<Category, { label: string; emoji: string }> = {
  bodyparts: { label: 'Body Parts', emoji: '🫀' },
  animals: { label: 'Animals', emoji: '🐾' },
  trees: { label: 'Trees', emoji: '🌳' },
  flowers: { label: 'Flowers', emoji: '🌸' },
};

interface VocabItem {
  id: string;
  emoji: string;
  names: Record<Language, string>;
}

const VOCAB_DATA: Record<Category, VocabItem[]> = {
  bodyparts: [
    { id: 'head', emoji: '🗣️', names: { english: 'Head', telugu: 'తల', hindi: 'सिर', tamil: 'தலை' } },
    { id: 'eye', emoji: '👁️', names: { english: 'Eye', telugu: 'కన్ను', hindi: 'आँख', tamil: 'கண்' } },
    { id: 'ear', emoji: '👂', names: { english: 'Ear', telugu: 'చెవి', hindi: 'कान', tamil: 'காது' } },
    { id: 'nose', emoji: '👃', names: { english: 'Nose', telugu: 'ముక్కు', hindi: 'नाक', tamil: 'மூக்கு' } },
    { id: 'mouth', emoji: '👄', names: { english: 'Mouth', telugu: 'నోరు', hindi: 'मुँह', tamil: 'வாய்' } },
    { id: 'hand', emoji: '✋', names: { english: 'Hand', telugu: 'చేయి', hindi: 'हाथ', tamil: 'கை' } },
    { id: 'foot', emoji: '🦶', names: { english: 'Foot', telugu: 'కాలు', hindi: 'पैर', tamil: 'கால்' } },
    { id: 'heart', emoji: '❤️', names: { english: 'Heart', telugu: 'గుండె', hindi: 'दिल', tamil: 'இதயம்' } },
    { id: 'tooth', emoji: '🦷', names: { english: 'Tooth', telugu: 'పన్ను', hindi: 'दाँत', tamil: 'பல்' } },
    { id: 'hair', emoji: '💇', names: { english: 'Hair', telugu: 'జుట్టు', hindi: 'बाल', tamil: 'முடி' } },
  ],
  animals: [
    { id: 'dog', emoji: '🐶', names: { english: 'Dog', telugu: 'కుక్క', hindi: 'कुत्ता', tamil: 'நாய்' } },
    { id: 'cat', emoji: '🐱', names: { english: 'Cat', telugu: 'పిల్లి', hindi: 'बिल्ली', tamil: 'பூனை' } },
    { id: 'cow', emoji: '🐄', names: { english: 'Cow', telugu: 'ఆవు', hindi: 'गाय', tamil: 'பசு' } },
    { id: 'elephant', emoji: '🐘', names: { english: 'Elephant', telugu: 'ఏనుగు', hindi: 'हाथी', tamil: 'யானை' } },
    { id: 'lion', emoji: '🦁', names: { english: 'Lion', telugu: 'సింహం', hindi: 'शेर', tamil: 'சிங்கம்' } },
    { id: 'tiger', emoji: '🐯', names: { english: 'Tiger', telugu: 'పులి', hindi: 'बाघ', tamil: 'புலி' } },
    { id: 'bird', emoji: '🐦', names: { english: 'Bird', telugu: 'పక్షి', hindi: 'पक्षी', tamil: 'பறவை' } },
    { id: 'fish', emoji: '🐟', names: { english: 'Fish', telugu: 'చేప', hindi: 'मछली', tamil: 'மீன்' } },
    { id: 'rabbit', emoji: '🐰', names: { english: 'Rabbit', telugu: 'కుందేలు', hindi: 'खरगोश', tamil: 'முயல்' } },
    { id: 'monkey', emoji: '🐒', names: { english: 'Monkey', telugu: 'కోతి', hindi: 'बंदर', tamil: 'குரங்கு' } },
  ],
  trees: [
    { id: 'mango', emoji: '🥭', names: { english: 'Mango Tree', telugu: 'మామిడి చెట్టు', hindi: 'आम का पेड़', tamil: 'மாமரம்' } },
    { id: 'coconut', emoji: '🥥', names: { english: 'Coconut Tree', telugu: 'కొబ్బరి చెట్టు', hindi: 'नारियल का पेड़', tamil: 'தென்னை மரம்' } },
    { id: 'banyan', emoji: '🌳', names: { english: 'Banyan Tree', telugu: 'మర్రి చెట్టు', hindi: 'बरगद का पेड़', tamil: 'ஆலமரம்' } },
    { id: 'neem', emoji: '🌿', names: { english: 'Neem Tree', telugu: 'వేప చెట్టు', hindi: 'नीम का पेड़', tamil: 'வேப்பமரம்' } },
    { id: 'banana', emoji: '🍌', names: { english: 'Banana Tree', telugu: 'అరటి చెట్టు', hindi: 'केले का पेड़', tamil: 'வாழை மரம்' } },
    { id: 'tamarind', emoji: '🌱', names: { english: 'Tamarind Tree', telugu: 'చింత చెట్టు', hindi: 'इमली का पेड़', tamil: 'புளி மரம்' } },
    { id: 'peepal', emoji: '🍃', names: { english: 'Peepal Tree', telugu: 'రావి చెట్టు', hindi: 'पीपल का पेड़', tamil: 'அரசமரம்' } },
    { id: 'bamboo', emoji: '🎋', names: { english: 'Bamboo', telugu: 'వెదురు', hindi: 'बाँस', tamil: 'மூங்கில்' } },
  ],
  flowers: [
    { id: 'rose', emoji: '🌹', names: { english: 'Rose', telugu: 'గులాబి', hindi: 'गुलाब', tamil: 'ரோஜா' } },
    { id: 'lotus', emoji: '🪷', names: { english: 'Lotus', telugu: 'తామర', hindi: 'कमल', tamil: 'தாமரை' } },
    { id: 'jasmine', emoji: '🌸', names: { english: 'Jasmine', telugu: 'మల్లె', hindi: 'चमेली', tamil: 'மல்லிகை' } },
    { id: 'sunflower', emoji: '🌻', names: { english: 'Sunflower', telugu: 'సూర్యకాంతి', hindi: 'सूरजमुखी', tamil: 'சூரியகாந்தி' } },
    { id: 'marigold', emoji: '🌼', names: { english: 'Marigold', telugu: 'బంతి పువ్వు', hindi: 'गेंदा', tamil: 'சாமந்தி' } },
    { id: 'hibiscus', emoji: '🌺', names: { english: 'Hibiscus', telugu: 'మందారం', hindi: 'गुड़हल', tamil: 'செம்பருத்தி' } },
    { id: 'tulip', emoji: '🌷', names: { english: 'Tulip', telugu: 'ట్యూలిప్', hindi: 'ट्यूलिप', tamil: 'டுலிப்' } },
    { id: 'lily', emoji: '💐', names: { english: 'Lily', telugu: 'లిల్లీ', hindi: 'लिली', tamil: 'லில்லி' } },
  ],
};

const CARD_COLORS = [
  'bg-sunshine-400 border-sunshine-600',
  'bg-grass-400 border-grass-600',
  'bg-tangerine-400 border-tangerine-600',
  'bg-cherry-400 border-cherry-600',
  'bg-sky-400 border-sky-600',
  'bg-lavender-400 border-lavender-600',
];

export default function VocabularyLesson() {
  const [language, setLanguage] = useState<Language>('english');
  const [category, setCategory] = useState<Category>('animals');

  const playSound = (itemId: string) => {
    const audio = new Audio(`/assets/audio/${language}/vocabulary/${category}/${itemId}.mp3`);
    audio.play().catch(() => {});
  };

  const items = VOCAB_DATA[category];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cherry-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-cherry-700 mb-2">
          Vocabulary 🌟
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Learn words with pictures in all languages!
        </p>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-nunito font-bold px-4 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-base ${
                category === cat
                  ? 'bg-cherry-500 border-cherry-700 text-white shadow-fun'
                  : 'bg-white border-cherry-300 text-cherry-700 hover:bg-cherry-50'
              }`}
            >
              {CATEGORY_LABELS[cat].emoji} {CATEGORY_LABELS[cat].label}
            </button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`font-nunito font-bold px-4 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-sm ${
                language === lang
                  ? 'bg-sunshine-500 border-sunshine-700 text-white shadow-fun'
                  : 'bg-white border-sunshine-300 text-sunshine-700 hover:bg-sunshine-50'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const colorClass = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <div
                key={item.id}
                className={`${colorClass} border-4 rounded-3xl p-4 flex flex-col items-center gap-2 shadow-fun-lg hover:scale-105 transition-all duration-200`}
              >
                <span className="text-5xl">{item.emoji}</span>
                <span className="font-fredoka text-white text-xl text-center drop-shadow-sm">
                  {item.names[language]}
                </span>
                {/* Show all language names */}
                <div className="w-full space-y-1">
                  {(Object.keys(item.names) as Language[]).filter(l => l !== language).map(l => (
                    <div key={l} className="flex items-center justify-between bg-white/20 rounded-xl px-2 py-0.5">
                      <span className="font-nunito text-white/80 text-xs">{item.names[l]}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => playSound(item.id)}
                  className="mt-1 bg-white/30 hover:bg-white/50 text-white rounded-2xl px-3 py-1 flex items-center gap-1 font-nunito font-bold text-sm transition-all hover:scale-105 active:scale-95"
                >
                  <Volume2 size={14} />
                  Play
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
