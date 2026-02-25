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

interface NumberEntry {
  numeral: number;
  emoji: string;
  emojiCount: string;
  words: Record<Language, string>;
}

// Emoji counts: up to 5 show full count, 6-10 show groups, 11-20 show simplified
function buildEmojiCount(n: number, emoji: string): string {
  if (n <= 5) return emoji.repeat(n);
  if (n <= 10) return emoji.repeat(5) + '\n' + emoji.repeat(n - 5);
  if (n <= 15) return emoji.repeat(5) + '\n' + emoji.repeat(5) + '\n' + emoji.repeat(n - 10);
  return emoji.repeat(5) + '\n' + emoji.repeat(5) + '\n' + emoji.repeat(5) + '\n' + emoji.repeat(n - 15);
}

const NUMBER_EMOJIS = ['🍎','🍊','🍋','🍇','🍓','🌟','🌈','🦋','🐝','🌸','🎈','🎀','🎵','🌺','🍭','🦄','🐬','🌙','⭐','🎉'];

const NUMBERS_DATA: NumberEntry[] = [
  { numeral: 1, emoji: '🍎', emojiCount: buildEmojiCount(1, '🍎'), words: { english: 'One', telugu: 'ఒకటి', hindi: 'एक', tamil: 'ஒன்று' } },
  { numeral: 2, emoji: '🍊', emojiCount: buildEmojiCount(2, '🍊'), words: { english: 'Two', telugu: 'రెండు', hindi: 'दो', tamil: 'இரண்டு' } },
  { numeral: 3, emoji: '🍋', emojiCount: buildEmojiCount(3, '🍋'), words: { english: 'Three', telugu: 'మూడు', hindi: 'तीन', tamil: 'மூன்று' } },
  { numeral: 4, emoji: '🍇', emojiCount: buildEmojiCount(4, '🍇'), words: { english: 'Four', telugu: 'నాలుగు', hindi: 'चार', tamil: 'நான்கு' } },
  { numeral: 5, emoji: '🍓', emojiCount: buildEmojiCount(5, '🍓'), words: { english: 'Five', telugu: 'అయిదు', hindi: 'पाँच', tamil: 'ஐந்து' } },
  { numeral: 6, emoji: '🌟', emojiCount: buildEmojiCount(6, '🌟'), words: { english: 'Six', telugu: 'ఆరు', hindi: 'छह', tamil: 'ஆறு' } },
  { numeral: 7, emoji: '🌈', emojiCount: buildEmojiCount(7, '🌈'), words: { english: 'Seven', telugu: 'ఏడు', hindi: 'सात', tamil: 'ஏழு' } },
  { numeral: 8, emoji: '🦋', emojiCount: buildEmojiCount(8, '🦋'), words: { english: 'Eight', telugu: 'ఎనిమిది', hindi: 'आठ', tamil: 'எட்டு' } },
  { numeral: 9, emoji: '🐝', emojiCount: buildEmojiCount(9, '🐝'), words: { english: 'Nine', telugu: 'తొమ్మిది', hindi: 'नौ', tamil: 'ஒன்பது' } },
  { numeral: 10, emoji: '🌸', emojiCount: buildEmojiCount(10, '🌸'), words: { english: 'Ten', telugu: 'పది', hindi: 'दस', tamil: 'பத்து' } },
  { numeral: 11, emoji: '🎈', emojiCount: buildEmojiCount(11, '🎈'), words: { english: 'Eleven', telugu: 'పదకొండు', hindi: 'ग्यारह', tamil: 'பதினொன்று' } },
  { numeral: 12, emoji: '🎀', emojiCount: buildEmojiCount(12, '🎀'), words: { english: 'Twelve', telugu: 'పన్నెండు', hindi: 'बारह', tamil: 'பன்னிரண்டு' } },
  { numeral: 13, emoji: '🎵', emojiCount: buildEmojiCount(13, '🎵'), words: { english: 'Thirteen', telugu: 'పదమూడు', hindi: 'तेरह', tamil: 'பதிமூன்று' } },
  { numeral: 14, emoji: '🌺', emojiCount: buildEmojiCount(14, '🌺'), words: { english: 'Fourteen', telugu: 'పదనాలుగు', hindi: 'चौदह', tamil: 'பதினான்கு' } },
  { numeral: 15, emoji: '🍭', emojiCount: buildEmojiCount(15, '🍭'), words: { english: 'Fifteen', telugu: 'పదిహేను', hindi: 'पंद्रह', tamil: 'பதினைந்து' } },
  { numeral: 16, emoji: '🦄', emojiCount: buildEmojiCount(16, '🦄'), words: { english: 'Sixteen', telugu: 'పదహారు', hindi: 'सोलह', tamil: 'பதினாறு' } },
  { numeral: 17, emoji: '🐬', emojiCount: buildEmojiCount(17, '🐬'), words: { english: 'Seventeen', telugu: 'పదిహేడు', hindi: 'सत्रह', tamil: 'பதினேழு' } },
  { numeral: 18, emoji: '🌙', emojiCount: buildEmojiCount(18, '🌙'), words: { english: 'Eighteen', telugu: 'పదెనిమిది', hindi: 'अठारह', tamil: 'பதினெட்டு' } },
  { numeral: 19, emoji: '⭐', emojiCount: buildEmojiCount(19, '⭐'), words: { english: 'Nineteen', telugu: 'పందొమ్మిది', hindi: 'उन्नीस', tamil: 'பத்தொன்பது' } },
  { numeral: 20, emoji: '🎉', emojiCount: buildEmojiCount(20, '🎉'), words: { english: 'Twenty', telugu: 'ఇరవై', hindi: 'बीस', tamil: 'இருபது' } },
];

const CARD_COLORS = [
  'bg-sunshine-400 border-sunshine-600',
  'bg-grass-400 border-grass-600',
  'bg-tangerine-400 border-tangerine-600',
  'bg-cherry-400 border-cherry-600',
  'bg-sky-400 border-sky-600',
  'bg-lavender-400 border-lavender-600',
];

function speakNumber(word: string, langCode: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = langCode;
  utterance.rate = 0.85;
  utterance.pitch = 1.2;
  window.speechSynthesis.speak(utterance);
}

export default function NumbersLesson() {
  const [language, setLanguage] = useState<Language>('english');
  const [speaking, setSpeaking] = useState<number | null>(null);

  const handleSpeak = (entry: NumberEntry) => {
    setSpeaking(entry.numeral);
    speakNumber(entry.words[language], LANG_CODES[language]);
    setTimeout(() => setSpeaking(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunshine-100 to-grass-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-sunshine-700 mb-2">
          Numbers 🔢
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Learn numbers 1 to 20 in 4 languages!
        </p>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`font-nunito font-bold px-5 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-base ${
                language === lang
                  ? 'bg-sunshine-500 border-sunshine-700 text-white shadow-fun'
                  : 'bg-white border-sunshine-300 text-sunshine-700 hover:bg-sunshine-50'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {NUMBERS_DATA.map((entry, i) => {
            const colorClass = CARD_COLORS[i % CARD_COLORS.length];
            const isSpeaking = speaking === entry.numeral;
            return (
              <div
                key={entry.numeral}
                onClick={() => handleSpeak(entry)}
                className={`${colorClass} border-4 rounded-3xl p-4 flex flex-col items-center gap-2 shadow-fun-lg hover:scale-105 transition-all duration-200 cursor-pointer select-none ${isSpeaking ? 'scale-110 ring-4 ring-white/60' : ''}`}
              >
                {/* Big Number */}
                <span className="font-fredoka text-6xl text-white drop-shadow-md leading-none">
                  {entry.numeral}
                </span>

                {/* Emoji Count */}
                <div className="text-center leading-tight">
                  {entry.emojiCount.split('\n').map((row, ri) => (
                    <div key={ri} className="text-lg leading-tight">{row}</div>
                  ))}
                </div>

                {/* Primary language word */}
                <span className="font-nunito font-bold text-white text-lg text-center leading-tight">
                  {entry.words[language]}
                </span>

                {/* Other language words */}
                <div className="w-full flex flex-col gap-0.5">
                  {(Object.keys(LANGUAGE_LABELS) as Language[])
                    .filter((l) => l !== language)
                    .map((l) => (
                      <span key={l} className="font-nunito text-white/80 text-xs text-center leading-tight">
                        {entry.words[l]}
                      </span>
                    ))}
                </div>

                {/* Speak button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleSpeak(entry); }}
                  className={`mt-1 bg-white/30 hover:bg-white/50 text-white rounded-2xl px-3 py-1 flex items-center gap-1 font-nunito font-bold text-sm transition-all hover:scale-105 active:scale-95 ${isSpeaking ? 'bg-white/60 animate-pulse' : ''}`}
                >
                  <Volume2 size={16} />
                  {isSpeaking ? '...' : 'Say it!'}
                </button>
              </div>
            );
          })}
        </div>

        <p className="font-nunito text-center text-muted-foreground text-sm mt-8">
          🔊 Tap any card to hear the number spoken in the selected language!
        </p>
      </div>
    </div>
  );
}
