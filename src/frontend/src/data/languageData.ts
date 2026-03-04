// ─── Types ────────────────────────────────────────────────────────────────────

export type Language = "english" | "telugu" | "hindi" | "tamil";

export const LANGUAGES: { id: Language; label: string; flag: string }[] = [
  { id: "english", label: "English", flag: "🇬🇧" },
  { id: "telugu", label: "తెలుగు", flag: "🇮🇳" },
  { id: "hindi", label: "हिंदी", flag: "🇮🇳" },
  { id: "tamil", label: "தமிழ்", flag: "🇮🇳" },
];

export interface LetterCard {
  letter: string;
  word: string;
  emoji: string;
  transliteration?: string;
}

export interface NumberCard {
  number: number;
  telugu: string;
  tamil: string;
  hindi: string;
  english: string;
  emoji: string;
}

// Legacy alias used by NumbersLesson
export type NumberEntry = NumberCard;

export interface NumberEntry100 {
  number: number;
  telugu: string;
  tamil: string;
  hindi: string;
  english: string;
}

export interface FullScreenNumberCard {
  number: number;
  numeral: string; // native numeral character
  word: string; // word in target language
  english: string; // English translation
  emoji: string;
}

export interface VocabWord {
  word: string;
  translation: string;
  emoji: string;
}

export interface VocabEntry {
  word: string; // word in native script
  english: string; // English translation
  emoji: string;
}

export type VocabCategory = "animals" | "colors" | "food" | "bodyParts";

export const VOCAB_CATEGORIES: {
  id: VocabCategory;
  label: string;
  emoji: string;
}[] = [
  { id: "animals", label: "Animals", emoji: "🐾" },
  { id: "colors", label: "Colors", emoji: "🎨" },
  { id: "food", label: "Food", emoji: "🍽️" },
  { id: "bodyParts", label: "Body Parts", emoji: "🫀" },
];

export interface PoemSentence {
  english: string;
  telugu: string;
  hindi: string;
  tamil: string;
}

export interface Poem {
  id: string;
  title: Record<Language, string>;
  sentences: PoemSentence[];
}

// Flat poem format used by PoemsLesson
export interface FlatPoem {
  title: string;
  lines: string[];
}

export interface QuizItem {
  question: string;
  options: string[];
  correct: number;
  correctIndex: number;
}

export interface MatchingPair {
  emoji: string;
  word: string;
}

export interface GameQuestion {
  question: string;
  options: string[];
  correct: number;
  correctIndex: number;
}

export interface PuzzleWord {
  word: string;
  letters: string[];
  emoji: string;
  hint: string;
}

export interface FlashcardItem {
  id: number;
  front: string;
  back: string;
  emoji: string;
}

export interface LessonItem {
  id: number;
  title: string;
  body: string;
}

// ─── Alphabet Data ────────────────────────────────────────────────────────────

export const englishAlphabet: LetterCard[] = [
  { letter: "A", word: "Apple", emoji: "🍎", transliteration: "Ay" },
  { letter: "B", word: "Ball", emoji: "⚽", transliteration: "Bee" },
  { letter: "C", word: "Cat", emoji: "🐱", transliteration: "See" },
  { letter: "D", word: "Dog", emoji: "🐶", transliteration: "Dee" },
  { letter: "E", word: "Elephant", emoji: "🐘", transliteration: "Ee" },
  { letter: "F", word: "Fish", emoji: "🐟", transliteration: "Ef" },
  { letter: "G", word: "Goat", emoji: "🐐", transliteration: "Jee" },
  { letter: "H", word: "House", emoji: "🏠", transliteration: "Aych" },
  { letter: "I", word: "Ice cream", emoji: "🍦", transliteration: "Eye" },
  { letter: "J", word: "Jar", emoji: "🫙", transliteration: "Jay" },
  { letter: "K", word: "Kite", emoji: "🪁", transliteration: "Kay" },
  { letter: "L", word: "Lion", emoji: "🦁", transliteration: "El" },
  { letter: "M", word: "Mango", emoji: "🥭", transliteration: "Em" },
  { letter: "N", word: "Nest", emoji: "🪺", transliteration: "En" },
  { letter: "O", word: "Orange", emoji: "🍊", transliteration: "Oh" },
  { letter: "P", word: "Parrot", emoji: "🦜", transliteration: "Pee" },
  { letter: "Q", word: "Queen", emoji: "👑", transliteration: "Cue" },
  { letter: "R", word: "Rose", emoji: "🌹", transliteration: "Ar" },
  { letter: "S", word: "Sun", emoji: "☀️", transliteration: "Es" },
  { letter: "T", word: "Tiger", emoji: "🐯", transliteration: "Tee" },
  { letter: "U", word: "Umbrella", emoji: "☂️", transliteration: "You" },
  { letter: "V", word: "Van", emoji: "🚐", transliteration: "Vee" },
  { letter: "W", word: "Water", emoji: "💧", transliteration: "Double-you" },
  { letter: "X", word: "Xylophone", emoji: "🎵", transliteration: "Ex" },
  { letter: "Y", word: "Yak", emoji: "🐂", transliteration: "Why" },
  { letter: "Z", word: "Zebra", emoji: "🦓", transliteration: "Zee" },
];

export const teluguAlphabet: LetterCard[] = [
  // Vowels (అచ్చులు)
  { letter: "అ", word: "అమ్మ", emoji: "🤱", transliteration: "a" },
  { letter: "ఆ", word: "ఆవు", emoji: "🐄", transliteration: "aa" },
  { letter: "ఇ", word: "ఇల్లు", emoji: "🏠", transliteration: "i" },
  { letter: "ఈ", word: "ఈగ", emoji: "🪰", transliteration: "ee" },
  { letter: "ఉ", word: "ఉప్పు", emoji: "🧂", transliteration: "u" },
  { letter: "ఊ", word: "ఊయల", emoji: "🪢", transliteration: "oo" },
  { letter: "ఋ", word: "ఋషి", emoji: "🧘", transliteration: "ru" },
  { letter: "ఎ", word: "ఎద్దు", emoji: "🐂", transliteration: "e" },
  { letter: "ఏ", word: "ఏనుగు", emoji: "🐘", transliteration: "ae" },
  { letter: "ఐ", word: "ఐస్", emoji: "🧊", transliteration: "ai" },
  { letter: "ఒ", word: "ఒంట", emoji: "🐪", transliteration: "o" },
  { letter: "ఓ", word: "ఓడ", emoji: "⛵", transliteration: "oh" },
  { letter: "ఔ", word: "ఔషధం", emoji: "💊", transliteration: "au" },
  { letter: "అం", word: "అంగడి", emoji: "🏪", transliteration: "am" },
  { letter: "అః", word: "అఃహా", emoji: "😮", transliteration: "ah" },
  // Consonants (హల్లులు)
  { letter: "క", word: "కాకి", emoji: "🐦", transliteration: "ka" },
  { letter: "ఖ", word: "ఖర్జూరం", emoji: "🌴", transliteration: "kha" },
  { letter: "గ", word: "గుర్రం", emoji: "🐴", transliteration: "ga" },
  { letter: "ఘ", word: "ఘంట", emoji: "🔔", transliteration: "gha" },
  { letter: "ఙ", word: "ఙ", emoji: "🔤", transliteration: "nga" },
  { letter: "చ", word: "చేప", emoji: "🐟", transliteration: "cha" },
  { letter: "ఛ", word: "ఛత్రం", emoji: "☂️", transliteration: "chha" },
  { letter: "జ", word: "జింక", emoji: "🦌", transliteration: "ja" },
  { letter: "ఝ", word: "ఝరి", emoji: "🌊", transliteration: "jha" },
  { letter: "ఞ", word: "ఞ", emoji: "🔤", transliteration: "nya" },
  { letter: "ట", word: "టమాట", emoji: "🍅", transliteration: "ta" },
  { letter: "ఠ", word: "ఠీవి", emoji: "🦚", transliteration: "tha" },
  { letter: "డ", word: "డబ్బు", emoji: "💰", transliteration: "da" },
  { letter: "ఢ", word: "ఢంకా", emoji: "🥁", transliteration: "dha" },
  { letter: "ణ", word: "ణ", emoji: "🔤", transliteration: "na" },
  { letter: "త", word: "తాబేలు", emoji: "🐢", transliteration: "ta" },
  { letter: "థ", word: "థాలీ", emoji: "🍽️", transliteration: "tha" },
  { letter: "ద", word: "దీపం", emoji: "🪔", transliteration: "da" },
  { letter: "ధ", word: "ధనుస్సు", emoji: "🏹", transliteration: "dha" },
  { letter: "న", word: "నక్క", emoji: "🦊", transliteration: "na" },
  { letter: "ప", word: "పాము", emoji: "🐍", transliteration: "pa" },
  { letter: "ఫ", word: "ఫలం", emoji: "🍑", transliteration: "pha" },
  { letter: "బ", word: "బాతు", emoji: "🦆", transliteration: "ba" },
  { letter: "భ", word: "భూమి", emoji: "🌍", transliteration: "bha" },
  { letter: "మ", word: "మామిడి", emoji: "🥭", transliteration: "ma" },
  { letter: "య", word: "యానం", emoji: "✈️", transliteration: "ya" },
  { letter: "ర", word: "రైలు", emoji: "🚂", transliteration: "ra" },
  { letter: "ల", word: "లంబూ", emoji: "🍋", transliteration: "la" },
  { letter: "వ", word: "వంకాయ", emoji: "🍆", transliteration: "va" },
  { letter: "శ", word: "శంఖం", emoji: "🐚", transliteration: "sha" },
  { letter: "ష", word: "షర్టు", emoji: "👕", transliteration: "sha" },
  { letter: "స", word: "సింహం", emoji: "🦁", transliteration: "sa" },
  { letter: "హ", word: "హంస", emoji: "🦢", transliteration: "ha" },
  { letter: "ళ", word: "ళ", emoji: "🔤", transliteration: "lla" },
  { letter: "క్ష", word: "క్షమ", emoji: "🙏", transliteration: "ksha" },
  { letter: "ఱ", word: "ఱాయి", emoji: "🪨", transliteration: "rra" },
];

export const hindiAlphabet: LetterCard[] = [
  // Vowels (स्वर)
  { letter: "अ", word: "अम्मा", emoji: "🤱", transliteration: "a" },
  { letter: "आ", word: "आम", emoji: "🥭", transliteration: "aa" },
  { letter: "इ", word: "इमली", emoji: "🌿", transliteration: "i" },
  { letter: "ई", word: "ईख", emoji: "🌾", transliteration: "ee" },
  { letter: "उ", word: "उल्लू", emoji: "🦉", transliteration: "u" },
  { letter: "ऊ", word: "ऊंट", emoji: "🐪", transliteration: "oo" },
  { letter: "ऋ", word: "ऋषि", emoji: "🧘", transliteration: "ri" },
  { letter: "ए", word: "एड़ी", emoji: "👣", transliteration: "e" },
  { letter: "ऐ", word: "ऐनक", emoji: "👓", transliteration: "ai" },
  { letter: "ओ", word: "ओस", emoji: "💧", transliteration: "o" },
  { letter: "औ", word: "औरत", emoji: "👩", transliteration: "au" },
  { letter: "अं", word: "अंगूर", emoji: "🍇", transliteration: "an" },
  { letter: "अः", word: "अःहा", emoji: "😮", transliteration: "ah" },
  // Consonants (व्यंजन)
  { letter: "क", word: "कमल", emoji: "🪷", transliteration: "ka" },
  { letter: "ख", word: "खरगोश", emoji: "🐰", transliteration: "kha" },
  { letter: "ग", word: "गाय", emoji: "🐄", transliteration: "ga" },
  { letter: "घ", word: "घर", emoji: "🏠", transliteration: "gha" },
  { letter: "ङ", word: "ङ", emoji: "🔤", transliteration: "nga" },
  { letter: "च", word: "चाँद", emoji: "🌙", transliteration: "cha" },
  { letter: "छ", word: "छाता", emoji: "☂️", transliteration: "chha" },
  { letter: "ज", word: "जहाज", emoji: "✈️", transliteration: "ja" },
  { letter: "झ", word: "झंडा", emoji: "🚩", transliteration: "jha" },
  { letter: "ञ", word: "ञ", emoji: "🔤", transliteration: "nya" },
  { letter: "ट", word: "टमाटर", emoji: "🍅", transliteration: "ta" },
  { letter: "ठ", word: "ठंड", emoji: "❄️", transliteration: "tha" },
  { letter: "ड", word: "डमरू", emoji: "🥁", transliteration: "da" },
  { letter: "ढ", word: "ढोल", emoji: "🥁", transliteration: "dha" },
  { letter: "ण", word: "ण", emoji: "🔤", transliteration: "na" },
  { letter: "त", word: "तितली", emoji: "🦋", transliteration: "ta" },
  { letter: "थ", word: "थाली", emoji: "🍽️", transliteration: "tha" },
  { letter: "द", word: "दीपक", emoji: "🪔", transliteration: "da" },
  { letter: "ध", word: "धनुष", emoji: "🏹", transliteration: "dha" },
  { letter: "न", word: "नाव", emoji: "⛵", transliteration: "na" },
  { letter: "प", word: "पतंग", emoji: "🪁", transliteration: "pa" },
  { letter: "फ", word: "फूल", emoji: "🌸", transliteration: "pha" },
  { letter: "ब", word: "बकरी", emoji: "🐐", transliteration: "ba" },
  { letter: "भ", word: "भालू", emoji: "🐻", transliteration: "bha" },
  { letter: "म", word: "मछली", emoji: "🐟", transliteration: "ma" },
  { letter: "य", word: "यात्रा", emoji: "🧳", transliteration: "ya" },
  { letter: "र", word: "रेलगाड़ी", emoji: "🚂", transliteration: "ra" },
  { letter: "ल", word: "लड्डू", emoji: "🍬", transliteration: "la" },
  { letter: "व", word: "वर्षा", emoji: "🌧️", transliteration: "va" },
  { letter: "श", word: "शेर", emoji: "🦁", transliteration: "sha" },
  { letter: "ष", word: "षट्कोण", emoji: "⬡", transliteration: "sha" },
  { letter: "स", word: "सूरज", emoji: "☀️", transliteration: "sa" },
  { letter: "ह", word: "हाथी", emoji: "🐘", transliteration: "ha" },
  { letter: "क्ष", word: "क्षमा", emoji: "🙏", transliteration: "ksha" },
  { letter: "त्र", word: "त्रिशूल", emoji: "🔱", transliteration: "tra" },
  { letter: "ज्ञ", word: "ज्ञान", emoji: "📖", transliteration: "gya" },
];

export const tamilAlphabet: LetterCard[] = [
  // Vowels (உயிரெழுத்துக்கள்)
  { letter: "அ", word: "அம்மா", emoji: "🤱", transliteration: "a" },
  { letter: "ஆ", word: "ஆடு", emoji: "🐐", transliteration: "aa" },
  { letter: "இ", word: "இலை", emoji: "🍃", transliteration: "i" },
  { letter: "ஈ", word: "ஈ", emoji: "🪰", transliteration: "ee" },
  { letter: "உ", word: "உப்பு", emoji: "🧂", transliteration: "u" },
  { letter: "ஊ", word: "ஊஞ்சல்", emoji: "🪢", transliteration: "oo" },
  { letter: "எ", word: "எலி", emoji: "🐭", transliteration: "e" },
  { letter: "ஏ", word: "ஏணி", emoji: "🪜", transliteration: "ae" },
  { letter: "ஐ", word: "ஐந்து", emoji: "5️⃣", transliteration: "ai" },
  { letter: "ஒ", word: "ஒட்டகம்", emoji: "🐪", transliteration: "o" },
  { letter: "ஓ", word: "ஓடு", emoji: "🏺", transliteration: "oh" },
  { letter: "ஔ", word: "ஔஷதம்", emoji: "💊", transliteration: "au" },
  // Consonants (மெய்யெழுத்துக்கள்)
  { letter: "க", word: "கடல்", emoji: "🌊", transliteration: "ka" },
  { letter: "ங", word: "ங", emoji: "🔤", transliteration: "nga" },
  { letter: "ச", word: "சந்திரன்", emoji: "🌙", transliteration: "cha" },
  { letter: "ஞ", word: "ஞாயிறு", emoji: "☀️", transliteration: "nya" },
  { letter: "ட", word: "டமரு", emoji: "🥁", transliteration: "ta" },
  { letter: "ண", word: "ணவன்", emoji: "🐟", transliteration: "na" },
  { letter: "த", word: "தாமரை", emoji: "🪷", transliteration: "tha" },
  { letter: "ந", word: "நாய்", emoji: "🐶", transliteration: "na" },
  { letter: "ப", word: "பறவை", emoji: "🐦", transliteration: "pa" },
  { letter: "ம", word: "மாம்பழம்", emoji: "🥭", transliteration: "ma" },
  { letter: "ய", word: "யானை", emoji: "🐘", transliteration: "ya" },
  { letter: "ர", word: "ரயில்", emoji: "🚂", transliteration: "ra" },
  { letter: "ல", word: "லாரி", emoji: "🚛", transliteration: "la" },
  { letter: "வ", word: "வண்ணத்துப்பூச்சி", emoji: "🦋", transliteration: "va" },
  { letter: "ழ", word: "ழகரம்", emoji: "📝", transliteration: "zha" },
  { letter: "ள", word: "ளவு", emoji: "🌿", transliteration: "lla" },
  { letter: "ற", word: "றால்", emoji: "🐟", transliteration: "rra" },
  { letter: "ன", word: "னம்", emoji: "🌸", transliteration: "na" },
  { letter: "ஜ", word: "ஜன்னல்", emoji: "🪟", transliteration: "ja" },
  { letter: "ஷ", word: "ஷர்ட்", emoji: "👕", transliteration: "sha" },
  { letter: "ஸ", word: "ஸ்கூல்", emoji: "🏫", transliteration: "sa" },
  { letter: "ஹ", word: "ஹம்சம்", emoji: "🦢", transliteration: "ha" },
  { letter: "க்ஷ", word: "க்ஷமை", emoji: "🙏", transliteration: "ksha" },
  { letter: "ஶ்ரீ", word: "ஶ்ரீ", emoji: "🕉️", transliteration: "shri" },
];

export const alphabetData: Record<Language, LetterCard[]> = {
  english: englishAlphabet,
  telugu: teluguAlphabet,
  hindi: hindiAlphabet,
  tamil: tamilAlphabet,
};

// ─── Numbers 1–10 ─────────────────────────────────────────────────────────────

export const NUMBERS_1_TO_10: NumberCard[] = [
  {
    number: 1,
    telugu: "ఒకటి",
    tamil: "ஒன்று",
    hindi: "एक",
    english: "One",
    emoji: "🍎",
  },
  {
    number: 2,
    telugu: "రెండు",
    tamil: "இரண்டு",
    hindi: "दो",
    english: "Two",
    emoji: "🍌🍌",
  },
  {
    number: 3,
    telugu: "మూడు",
    tamil: "மூன்று",
    hindi: "तीन",
    english: "Three",
    emoji: "🍊🍊🍊",
  },
  {
    number: 4,
    telugu: "నాలుగు",
    tamil: "நான்கு",
    hindi: "चार",
    english: "Four",
    emoji: "⭐⭐⭐⭐",
  },
  {
    number: 5,
    telugu: "అయిదు",
    tamil: "ஐந்து",
    hindi: "पाँच",
    english: "Five",
    emoji: "🌟🌟🌟🌟🌟",
  },
  {
    number: 6,
    telugu: "ఆరు",
    tamil: "ஆறு",
    hindi: "छह",
    english: "Six",
    emoji: "🎈🎈🎈🎈🎈🎈",
  },
  {
    number: 7,
    telugu: "ఏడు",
    tamil: "ஏழு",
    hindi: "सात",
    english: "Seven",
    emoji: "🌈",
  },
  {
    number: 8,
    telugu: "ఎనిమిది",
    tamil: "எட்டு",
    hindi: "आठ",
    english: "Eight",
    emoji: "🐙",
  },
  {
    number: 9,
    telugu: "తొమ్మిది",
    tamil: "ஒன்பது",
    hindi: "नौ",
    english: "Nine",
    emoji: "🌺🌺🌺🌺🌺🌺🌺🌺🌺",
  },
  {
    number: 10,
    telugu: "పది",
    tamil: "பத்து",
    hindi: "दस",
    english: "Ten",
    emoji: "🎉",
  },
];

// Legacy alias used by NumbersLesson (num field)
export const numbersData10 = NUMBERS_1_TO_10;

// ─── Numbers 1–20 Full Screen Data ───────────────────────────────────────────

export const NUMBERS_1_TO_20_FULLSCREEN: Record<
  Language,
  FullScreenNumberCard[]
> = {
  telugu: [
    { number: 1, numeral: "౧", word: "ఒకటి", english: "One", emoji: "1️⃣" },
    { number: 2, numeral: "౨", word: "రెండు", english: "Two", emoji: "2️⃣" },
    { number: 3, numeral: "౩", word: "మూడు", english: "Three", emoji: "3️⃣" },
    { number: 4, numeral: "౪", word: "నాలుగు", english: "Four", emoji: "4️⃣" },
    { number: 5, numeral: "౫", word: "అయిదు", english: "Five", emoji: "5️⃣" },
    { number: 6, numeral: "౬", word: "ఆరు", english: "Six", emoji: "6️⃣" },
    { number: 7, numeral: "౭", word: "ఏడు", english: "Seven", emoji: "7️⃣" },
    { number: 8, numeral: "౮", word: "ఎనిమిది", english: "Eight", emoji: "8️⃣" },
    { number: 9, numeral: "౯", word: "తొమ్మిది", english: "Nine", emoji: "9️⃣" },
    { number: 10, numeral: "౧౦", word: "పది", english: "Ten", emoji: "🔟" },
    {
      number: 11,
      numeral: "౧౧",
      word: "పదకొండు",
      english: "Eleven",
      emoji: "1️⃣1️⃣",
    },
    {
      number: 12,
      numeral: "౧౨",
      word: "పన్నెండు",
      english: "Twelve",
      emoji: "1️⃣2️⃣",
    },
    {
      number: 13,
      numeral: "౧౩",
      word: "పదమూడు",
      english: "Thirteen",
      emoji: "1️⃣3️⃣",
    },
    {
      number: 14,
      numeral: "౧౪",
      word: "పదనాలుగు",
      english: "Fourteen",
      emoji: "1️⃣4️⃣",
    },
    {
      number: 15,
      numeral: "౧౫",
      word: "పదిహేను",
      english: "Fifteen",
      emoji: "1️⃣5️⃣",
    },
    {
      number: 16,
      numeral: "౧౬",
      word: "పదహారు",
      english: "Sixteen",
      emoji: "1️⃣6️⃣",
    },
    {
      number: 17,
      numeral: "౧౭",
      word: "పదిహేడు",
      english: "Seventeen",
      emoji: "1️⃣7️⃣",
    },
    {
      number: 18,
      numeral: "౧౮",
      word: "పదిహెనిమిది",
      english: "Eighteen",
      emoji: "1️⃣8️⃣",
    },
    {
      number: 19,
      numeral: "౧౯",
      word: "పందొమ్మిది",
      english: "Nineteen",
      emoji: "1️⃣9️⃣",
    },
    { number: 20, numeral: "౨౦", word: "ఇరవై", english: "Twenty", emoji: "2️⃣0️⃣" },
  ],
  hindi: [
    { number: 1, numeral: "१", word: "एक", english: "One", emoji: "1️⃣" },
    { number: 2, numeral: "२", word: "दो", english: "Two", emoji: "2️⃣" },
    { number: 3, numeral: "३", word: "तीन", english: "Three", emoji: "3️⃣" },
    { number: 4, numeral: "४", word: "चार", english: "Four", emoji: "4️⃣" },
    { number: 5, numeral: "५", word: "पाँच", english: "Five", emoji: "5️⃣" },
    { number: 6, numeral: "६", word: "छह", english: "Six", emoji: "6️⃣" },
    { number: 7, numeral: "७", word: "सात", english: "Seven", emoji: "7️⃣" },
    { number: 8, numeral: "८", word: "आठ", english: "Eight", emoji: "8️⃣" },
    { number: 9, numeral: "९", word: "नौ", english: "Nine", emoji: "9️⃣" },
    { number: 10, numeral: "१०", word: "दस", english: "Ten", emoji: "🔟" },
    {
      number: 11,
      numeral: "११",
      word: "ग्यारह",
      english: "Eleven",
      emoji: "1️⃣1️⃣",
    },
    { number: 12, numeral: "१२", word: "बारह", english: "Twelve", emoji: "1️⃣2️⃣" },
    {
      number: 13,
      numeral: "१३",
      word: "तेरह",
      english: "Thirteen",
      emoji: "1️⃣3️⃣",
    },
    {
      number: 14,
      numeral: "१४",
      word: "चौदह",
      english: "Fourteen",
      emoji: "1️⃣4️⃣",
    },
    {
      number: 15,
      numeral: "१५",
      word: "पंद्रह",
      english: "Fifteen",
      emoji: "1️⃣5️⃣",
    },
    {
      number: 16,
      numeral: "१६",
      word: "सोलह",
      english: "Sixteen",
      emoji: "1️⃣6️⃣",
    },
    {
      number: 17,
      numeral: "१७",
      word: "सत्रह",
      english: "Seventeen",
      emoji: "1️⃣7️⃣",
    },
    {
      number: 18,
      numeral: "१८",
      word: "अठारह",
      english: "Eighteen",
      emoji: "1️⃣8️⃣",
    },
    {
      number: 19,
      numeral: "१९",
      word: "उन्नीस",
      english: "Nineteen",
      emoji: "1️⃣9️⃣",
    },
    { number: 20, numeral: "२०", word: "बीस", english: "Twenty", emoji: "2️⃣0️⃣" },
  ],
  tamil: [
    { number: 1, numeral: "௧", word: "ஒன்று", english: "One", emoji: "1️⃣" },
    { number: 2, numeral: "௨", word: "இரண்டு", english: "Two", emoji: "2️⃣" },
    { number: 3, numeral: "௩", word: "மூன்று", english: "Three", emoji: "3️⃣" },
    { number: 4, numeral: "௪", word: "நான்கு", english: "Four", emoji: "4️⃣" },
    { number: 5, numeral: "௫", word: "ஐந்து", english: "Five", emoji: "5️⃣" },
    { number: 6, numeral: "௬", word: "ஆறு", english: "Six", emoji: "6️⃣" },
    { number: 7, numeral: "௭", word: "ஏழு", english: "Seven", emoji: "7️⃣" },
    { number: 8, numeral: "௮", word: "எட்டு", english: "Eight", emoji: "8️⃣" },
    { number: 9, numeral: "௯", word: "ஒன்பது", english: "Nine", emoji: "9️⃣" },
    { number: 10, numeral: "௰", word: "பத்து", english: "Ten", emoji: "🔟" },
    {
      number: 11,
      numeral: "௰௧",
      word: "பதினொன்று",
      english: "Eleven",
      emoji: "1️⃣1️⃣",
    },
    {
      number: 12,
      numeral: "௰௨",
      word: "பன்னிரண்டு",
      english: "Twelve",
      emoji: "1️⃣2️⃣",
    },
    {
      number: 13,
      numeral: "௰௩",
      word: "பதிமூன்று",
      english: "Thirteen",
      emoji: "1️⃣3️⃣",
    },
    {
      number: 14,
      numeral: "௰௪",
      word: "பதினான்கு",
      english: "Fourteen",
      emoji: "1️⃣4️⃣",
    },
    {
      number: 15,
      numeral: "௰௫",
      word: "பதினைந்து",
      english: "Fifteen",
      emoji: "1️⃣5️⃣",
    },
    {
      number: 16,
      numeral: "௰௬",
      word: "பதினாறு",
      english: "Sixteen",
      emoji: "1️⃣6️⃣",
    },
    {
      number: 17,
      numeral: "௰௭",
      word: "பதினேழு",
      english: "Seventeen",
      emoji: "1️⃣7️⃣",
    },
    {
      number: 18,
      numeral: "௰௮",
      word: "பதினெட்டு",
      english: "Eighteen",
      emoji: "1️⃣8️⃣",
    },
    {
      number: 19,
      numeral: "௰௯",
      word: "பத்தொன்பது",
      english: "Nineteen",
      emoji: "1️⃣9️⃣",
    },
    {
      number: 20,
      numeral: "௨௰",
      word: "இருபது",
      english: "Twenty",
      emoji: "2️⃣0️⃣",
    },
  ],
  english: [
    { number: 1, numeral: "1", word: "One", english: "One", emoji: "1️⃣" },
    { number: 2, numeral: "2", word: "Two", english: "Two", emoji: "2️⃣" },
    { number: 3, numeral: "3", word: "Three", english: "Three", emoji: "3️⃣" },
    { number: 4, numeral: "4", word: "Four", english: "Four", emoji: "4️⃣" },
    { number: 5, numeral: "5", word: "Five", english: "Five", emoji: "5️⃣" },
    { number: 6, numeral: "6", word: "Six", english: "Six", emoji: "6️⃣" },
    { number: 7, numeral: "7", word: "Seven", english: "Seven", emoji: "7️⃣" },
    { number: 8, numeral: "8", word: "Eight", english: "Eight", emoji: "8️⃣" },
    { number: 9, numeral: "9", word: "Nine", english: "Nine", emoji: "9️⃣" },
    { number: 10, numeral: "10", word: "Ten", english: "Ten", emoji: "🔟" },
    {
      number: 11,
      numeral: "11",
      word: "Eleven",
      english: "Eleven",
      emoji: "1️⃣1️⃣",
    },
    {
      number: 12,
      numeral: "12",
      word: "Twelve",
      english: "Twelve",
      emoji: "1️⃣2️⃣",
    },
    {
      number: 13,
      numeral: "13",
      word: "Thirteen",
      english: "Thirteen",
      emoji: "1️⃣3️⃣",
    },
    {
      number: 14,
      numeral: "14",
      word: "Fourteen",
      english: "Fourteen",
      emoji: "1️⃣4️⃣",
    },
    {
      number: 15,
      numeral: "15",
      word: "Fifteen",
      english: "Fifteen",
      emoji: "1️⃣5️⃣",
    },
    {
      number: 16,
      numeral: "16",
      word: "Sixteen",
      english: "Sixteen",
      emoji: "1️⃣6️⃣",
    },
    {
      number: 17,
      numeral: "17",
      word: "Seventeen",
      english: "Seventeen",
      emoji: "1️⃣7️⃣",
    },
    {
      number: 18,
      numeral: "18",
      word: "Eighteen",
      english: "Eighteen",
      emoji: "1️⃣8️⃣",
    },
    {
      number: 19,
      numeral: "19",
      word: "Nineteen",
      english: "Nineteen",
      emoji: "1️⃣9️⃣",
    },
    {
      number: 20,
      numeral: "20",
      word: "Twenty",
      english: "Twenty",
      emoji: "2️⃣0️⃣",
    },
  ],
};

// ─── Numbers 1–100 ────────────────────────────────────────────────────────────

export const numbersData: NumberEntry100[] = Array.from(
  { length: 100 },
  (_, i) => {
    const n = i + 1;
    const teluguNumbers = [
      "ఒకటి",
      "రెండు",
      "మూడు",
      "నాలుగు",
      "అయిదు",
      "ఆరు",
      "ఏడు",
      "ఎనిమిది",
      "తొమ్మిది",
      "పది",
      "పదకొండు",
      "పన్నెండు",
      "పదమూడు",
      "పదనాలుగు",
      "పదిహేను",
      "పదహారు",
      "పదిహేడు",
      "పదిహెనిమిది",
      "పందొమ్మిది",
      "ఇరవై",
      "ఇరవైఒకటి",
      "ఇరవైరెండు",
      "ఇరవైమూడు",
      "ఇరవైనాలుగు",
      "ఇరవైఅయిదు",
      "ఇరవైఆరు",
      "ఇరవైఏడు",
      "ఇరవైఎనిమిది",
      "ఇరవైతొమ్మిది",
      "ముప్పై",
      "ముప్పైఒకటి",
      "ముప్పైరెండు",
      "ముప్పైమూడు",
      "ముప్పైనాలుగు",
      "ముప్పైఅయిదు",
      "ముప్పైఆరు",
      "ముప్పైఏడు",
      "ముప్పైఎనిమిది",
      "ముప్పైతొమ్మిది",
      "నలభై",
      "నలభైఒకటి",
      "నలభైరెండు",
      "నలభైమూడు",
      "నలభైనాలుగు",
      "నలభైఅయిదు",
      "నలభైఆరు",
      "నలభైఏడు",
      "నలభైఎనిమిది",
      "నలభైతొమ్మిది",
      "యాభై",
      "యాభైఒకటి",
      "యాభైరెండు",
      "యాభైమూడు",
      "యాభైనాలుగు",
      "యాభైఅయిదు",
      "యాభైఆరు",
      "యాభైఏడు",
      "యాభైఎనిమిది",
      "యాభైతొమ్మిది",
      "అరవై",
      "అరవైఒకటి",
      "అరవైరెండు",
      "అరవైమూడు",
      "అరవైనాలుగు",
      "అరవైఅయిదు",
      "అరవైఆరు",
      "అరవైఏడు",
      "అరవైఎనిమిది",
      "అరవైతొమ్మిది",
      "డెబ్బై",
      "డెబ్బైఒకటి",
      "డెబ్బైరెండు",
      "డెబ్బైమూడు",
      "డెబ్బైనాలుగు",
      "డెబ్బైఅయిదు",
      "డెబ్బైఆరు",
      "డెబ్బైఏడు",
      "డెబ్బైఎనిమిది",
      "డెబ్బైతొమ్మిది",
      "ఎనభై",
      "ఎనభైఒకటి",
      "ఎనభైరెండు",
      "ఎనభైమూడు",
      "ఎనభైనాలుగు",
      "ఎనభైఅయిదు",
      "ఎనభైఆరు",
      "ఎనభైఏడు",
      "ఎనభైఎనిమిది",
      "ఎనభైతొమ్మిది",
      "తొంభై",
      "తొంభైఒకటి",
      "తొంభైరెండు",
      "తొంభైమూడు",
      "తొంభైనాలుగు",
      "తొంభైఅయిదు",
      "తొంభైఆరు",
      "తొంభైఏడు",
      "తొంభైఎనిమిది",
      "తొంభైతొమ్మిది",
      "వంద",
    ];
    const tamilNumbers = [
      "ஒன்று",
      "இரண்டு",
      "மூன்று",
      "நான்கு",
      "ஐந்து",
      "ஆறு",
      "ஏழு",
      "எட்டு",
      "ஒன்பது",
      "பத்து",
      "பதினொன்று",
      "பன்னிரண்டு",
      "பதிமூன்று",
      "பதினான்கு",
      "பதினைந்து",
      "பதினாறு",
      "பதினேழு",
      "பதினெட்டு",
      "பத்தொன்பது",
      "இருபது",
      "இருபத்தொன்று",
      "இருபத்திரண்டு",
      "இருபத்திமூன்று",
      "இருபத்தினான்கு",
      "இருபத்தைந்து",
      "இருபத்தாறு",
      "இருபத்தேழு",
      "இருபத்தெட்டு",
      "இருபத்தொன்பது",
      "முப்பது",
      "முப்பத்தொன்று",
      "முப்பத்திரண்டு",
      "முப்பத்திமூன்று",
      "முப்பத்தினான்கு",
      "முப்பத்தைந்து",
      "முப்பத்தாறு",
      "முப்பத்தேழு",
      "முப்பத்தெட்டு",
      "முப்பத்தொன்பது",
      "நாற்பது",
      "நாற்பத்தொன்று",
      "நாற்பத்திரண்டு",
      "நாற்பத்திமூன்று",
      "நாற்பத்தினான்கு",
      "நாற்பத்தைந்து",
      "நாற்பத்தாறு",
      "நாற்பத்தேழு",
      "நாற்பத்தெட்டு",
      "நாற்பத்தொன்பது",
      "ஐம்பது",
      "ஐம்பத்தொன்று",
      "ஐம்பத்திரண்டு",
      "ஐம்பத்திமூன்று",
      "ஐம்பத்தினான்கு",
      "ஐம்பத்தைந்து",
      "ஐம்பத்தாறு",
      "ஐம்பத்தேழு",
      "ஐம்பத்தெட்டு",
      "ஐம்பத்தொன்பது",
      "அறுபது",
      "அறுபத்தொன்று",
      "அறுபத்திரண்டு",
      "அறுபத்திமூன்று",
      "அறுபத்தினான்கு",
      "அறுபத்தைந்து",
      "அறுபத்தாறு",
      "அறுபத்தேழு",
      "அறுபத்தெட்டு",
      "அறுபத்தொன்பது",
      "எழுபது",
      "எழுபத்தொன்று",
      "எழுபத்திரண்டு",
      "எழுபத்திமூன்று",
      "எழுபத்தினான்கு",
      "எழுபத்தைந்து",
      "எழுபத்தாறு",
      "எழுபத்தேழு",
      "எழுபத்தெட்டு",
      "எழுபத்தொன்பது",
      "எண்பது",
      "எண்பத்தொன்று",
      "எண்பத்திரண்டு",
      "எண்பத்திமூன்று",
      "எண்பத்தினான்கு",
      "எண்பத்தைந்து",
      "எண்பத்தாறு",
      "எண்பத்தேழு",
      "எண்பத்தெட்டு",
      "எண்பத்தொன்பது",
      "தொண்ணூறு",
      "தொண்ணூற்றொன்று",
      "தொண்ணூற்றிரண்டு",
      "தொண்ணூற்றிமூன்று",
      "தொண்ணூற்றினான்கு",
      "தொண்ணூற்றைந்து",
      "தொண்ணூற்றாறு",
      "தொண்ணூற்றேழு",
      "தொண்ணூற்றெட்டு",
      "தொண்ணூற்றொன்பது",
      "நூறு",
    ];
    const hindiNumbers = [
      "एक",
      "दो",
      "तीन",
      "चार",
      "पाँच",
      "छह",
      "सात",
      "आठ",
      "नौ",
      "दस",
      "ग्यारह",
      "बारह",
      "तेरह",
      "चौदह",
      "पंद्रह",
      "सोलह",
      "सत्रह",
      "अठारह",
      "उन्नीस",
      "बीस",
      "इक्कीस",
      "बाईस",
      "तेईस",
      "चौबीस",
      "पच्चीस",
      "छब्बीस",
      "सत्ताईस",
      "अट्ठाईस",
      "उनतीस",
      "तीस",
      "इकतीस",
      "बत्तीस",
      "तैंतीस",
      "चौंतीस",
      "पैंतीस",
      "छत्तीस",
      "सैंतीस",
      "अड़तीस",
      "उनतालीस",
      "चालीस",
      "इकतालीस",
      "बयालीस",
      "तैंतालीस",
      "चौंतालीस",
      "पैंतालीस",
      "छियालीस",
      "सैंतालीस",
      "अड़तालीस",
      "उनचास",
      "पचास",
      "इक्यावन",
      "बावन",
      "तिरपन",
      "चौवन",
      "पचपन",
      "छप्पन",
      "सत्तावन",
      "अट्ठावन",
      "उनसठ",
      "साठ",
      "इकसठ",
      "बासठ",
      "तिरसठ",
      "चौंसठ",
      "पैंसठ",
      "छियासठ",
      "सड़सठ",
      "अड़सठ",
      "उनहत्तर",
      "सत्तर",
      "इकहत्तर",
      "बहत्तर",
      "तिहत्तर",
      "चौहत्तर",
      "पचहत्तर",
      "छिहत्तर",
      "सतहत्तर",
      "अठहत्तर",
      "उनासी",
      "अस्सी",
      "इक्यासी",
      "बयासी",
      "तिरासी",
      "चौरासी",
      "पचासी",
      "छियासी",
      "सत्तासी",
      "अट्ठासी",
      "नवासी",
      "नब्बे",
      "इक्यानवे",
      "बानवे",
      "तिरानवे",
      "चौरानवे",
      "पचानवे",
      "छियानवे",
      "सत्तानवे",
      "अट्ठानवे",
      "निन्यानवे",
      "सौ",
    ];
    const englishNumbers = [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
      "Twenty",
      "Twenty-one",
      "Twenty-two",
      "Twenty-three",
      "Twenty-four",
      "Twenty-five",
      "Twenty-six",
      "Twenty-seven",
      "Twenty-eight",
      "Twenty-nine",
      "Thirty",
      "Thirty-one",
      "Thirty-two",
      "Thirty-three",
      "Thirty-four",
      "Thirty-five",
      "Thirty-six",
      "Thirty-seven",
      "Thirty-eight",
      "Thirty-nine",
      "Forty",
      "Forty-one",
      "Forty-two",
      "Forty-three",
      "Forty-four",
      "Forty-five",
      "Forty-six",
      "Forty-seven",
      "Forty-eight",
      "Forty-nine",
      "Fifty",
      "Fifty-one",
      "Fifty-two",
      "Fifty-three",
      "Fifty-four",
      "Fifty-five",
      "Fifty-six",
      "Fifty-seven",
      "Fifty-eight",
      "Fifty-nine",
      "Sixty",
      "Sixty-one",
      "Sixty-two",
      "Sixty-three",
      "Sixty-four",
      "Sixty-five",
      "Sixty-six",
      "Sixty-seven",
      "Sixty-eight",
      "Sixty-nine",
      "Seventy",
      "Seventy-one",
      "Seventy-two",
      "Seventy-three",
      "Seventy-four",
      "Seventy-five",
      "Seventy-six",
      "Seventy-seven",
      "Seventy-eight",
      "Seventy-nine",
      "Eighty",
      "Eighty-one",
      "Eighty-two",
      "Eighty-three",
      "Eighty-four",
      "Eighty-five",
      "Eighty-six",
      "Eighty-seven",
      "Eighty-eight",
      "Eighty-nine",
      "Ninety",
      "Ninety-one",
      "Ninety-two",
      "Ninety-three",
      "Ninety-four",
      "Ninety-five",
      "Ninety-six",
      "Ninety-seven",
      "Ninety-eight",
      "Ninety-nine",
      "One Hundred",
    ];
    return {
      number: n,
      telugu: teluguNumbers[i],
      tamil: tamilNumbers[i],
      hindi: hindiNumbers[i],
      english: englishNumbers[i],
    };
  },
);

// ─── Vocabulary by Category ───────────────────────────────────────────────────

export const vocabularyByCategory: Record<
  Language,
  Record<VocabCategory, VocabEntry[]>
> = {
  telugu: {
    animals: [
      { word: "కుక్క", english: "Dog", emoji: "🐶" },
      { word: "పిల్లి", english: "Cat", emoji: "🐱" },
      { word: "ఏనుగు", english: "Elephant", emoji: "🐘" },
      { word: "పులి", english: "Tiger", emoji: "🐯" },
      { word: "ఆవు", english: "Cow", emoji: "🐄" },
      { word: "పక్షి", english: "Bird", emoji: "🐦" },
      { word: "చేప", english: "Fish", emoji: "🐟" },
      { word: "సింహం", english: "Lion", emoji: "🦁" },
      { word: "కోతి", english: "Monkey", emoji: "🐒" },
      { word: "గుర్రం", english: "Horse", emoji: "🐴" },
    ],
    colors: [
      { word: "ఎరుపు", english: "Red", emoji: "🔴" },
      { word: "నీలం", english: "Blue", emoji: "🔵" },
      { word: "పచ్చ", english: "Green", emoji: "🟢" },
      { word: "పసుపు", english: "Yellow", emoji: "🟡" },
      { word: "నారింజ", english: "Orange", emoji: "🟠" },
      { word: "ఊదా", english: "Purple", emoji: "🟣" },
      { word: "నలుపు", english: "Black", emoji: "⚫" },
      { word: "తెలుపు", english: "White", emoji: "⚪" },
      { word: "గులాబీ", english: "Pink", emoji: "🩷" },
      { word: "గోధుమ", english: "Brown", emoji: "🟤" },
    ],
    food: [
      { word: "అన్నం", english: "Rice", emoji: "🍚" },
      { word: "రొట్టె", english: "Bread", emoji: "🍞" },
      { word: "పండు", english: "Fruit", emoji: "🍎" },
      { word: "పాలు", english: "Milk", emoji: "🥛" },
      { word: "నీళ్ళు", english: "Water", emoji: "💧" },
      { word: "యాపిల్", english: "Apple", emoji: "🍎" },
      { word: "అరటి", english: "Banana", emoji: "🍌" },
      { word: "మామిడి", english: "Mango", emoji: "🥭" },
      { word: "టమాట", english: "Tomato", emoji: "🍅" },
      { word: "ఉల్లి", english: "Onion", emoji: "🧅" },
    ],
    bodyParts: [
      { word: "చేయి", english: "Hand", emoji: "✋" },
      { word: "కాలు", english: "Leg", emoji: "🦵" },
      { word: "కన్ను", english: "Eye", emoji: "👁️" },
      { word: "చెవి", english: "Ear", emoji: "👂" },
      { word: "ముక్కు", english: "Nose", emoji: "👃" },
      { word: "నోరు", english: "Mouth", emoji: "👄" },
      { word: "తల", english: "Head", emoji: "🗣️" },
      { word: "పాదం", english: "Foot", emoji: "🦶" },
      { word: "వేలు", english: "Finger", emoji: "☝️" },
      { word: "వీపు", english: "Back", emoji: "🫀" },
    ],
  },
  hindi: {
    animals: [
      { word: "कुत्ता", english: "Dog", emoji: "🐶" },
      { word: "बिल्ली", english: "Cat", emoji: "🐱" },
      { word: "हाथी", english: "Elephant", emoji: "🐘" },
      { word: "बाघ", english: "Tiger", emoji: "🐯" },
      { word: "गाय", english: "Cow", emoji: "🐄" },
      { word: "पक्षी", english: "Bird", emoji: "🐦" },
      { word: "मछली", english: "Fish", emoji: "🐟" },
      { word: "शेर", english: "Lion", emoji: "🦁" },
      { word: "बंदर", english: "Monkey", emoji: "🐒" },
      { word: "घोड़ा", english: "Horse", emoji: "🐴" },
    ],
    colors: [
      { word: "लाल", english: "Red", emoji: "🔴" },
      { word: "नीला", english: "Blue", emoji: "🔵" },
      { word: "हरा", english: "Green", emoji: "🟢" },
      { word: "पीला", english: "Yellow", emoji: "🟡" },
      { word: "नारंगी", english: "Orange", emoji: "🟠" },
      { word: "बैंगनी", english: "Purple", emoji: "🟣" },
      { word: "काला", english: "Black", emoji: "⚫" },
      { word: "सफेद", english: "White", emoji: "⚪" },
      { word: "गुलाबी", english: "Pink", emoji: "🩷" },
      { word: "भूरा", english: "Brown", emoji: "🟤" },
    ],
    food: [
      { word: "चावल", english: "Rice", emoji: "🍚" },
      { word: "रोटी", english: "Bread", emoji: "🍞" },
      { word: "फल", english: "Fruit", emoji: "🍎" },
      { word: "दूध", english: "Milk", emoji: "🥛" },
      { word: "पानी", english: "Water", emoji: "💧" },
      { word: "सेब", english: "Apple", emoji: "🍎" },
      { word: "केला", english: "Banana", emoji: "🍌" },
      { word: "आम", english: "Mango", emoji: "🥭" },
      { word: "टमाटर", english: "Tomato", emoji: "🍅" },
      { word: "प्याज", english: "Onion", emoji: "🧅" },
    ],
    bodyParts: [
      { word: "हाथ", english: "Hand", emoji: "✋" },
      { word: "पैर", english: "Leg", emoji: "🦵" },
      { word: "आँख", english: "Eye", emoji: "👁️" },
      { word: "कान", english: "Ear", emoji: "👂" },
      { word: "नाक", english: "Nose", emoji: "👃" },
      { word: "मुँह", english: "Mouth", emoji: "👄" },
      { word: "सिर", english: "Head", emoji: "🗣️" },
      { word: "पाँव", english: "Foot", emoji: "🦶" },
      { word: "उँगली", english: "Finger", emoji: "☝️" },
      { word: "पीठ", english: "Back", emoji: "🫀" },
    ],
  },
  tamil: {
    animals: [
      { word: "நாய்", english: "Dog", emoji: "🐶" },
      { word: "பூனை", english: "Cat", emoji: "🐱" },
      { word: "யானை", english: "Elephant", emoji: "🐘" },
      { word: "புலி", english: "Tiger", emoji: "🐯" },
      { word: "பசு", english: "Cow", emoji: "🐄" },
      { word: "பறவை", english: "Bird", emoji: "🐦" },
      { word: "மீன்", english: "Fish", emoji: "🐟" },
      { word: "சிங்கம்", english: "Lion", emoji: "🦁" },
      { word: "குரங்கு", english: "Monkey", emoji: "🐒" },
      { word: "குதிரை", english: "Horse", emoji: "🐴" },
    ],
    colors: [
      { word: "சிவப்பு", english: "Red", emoji: "🔴" },
      { word: "நீலம்", english: "Blue", emoji: "🔵" },
      { word: "பச்சை", english: "Green", emoji: "🟢" },
      { word: "மஞ்சள்", english: "Yellow", emoji: "🟡" },
      { word: "ஆரஞ்சு", english: "Orange", emoji: "🟠" },
      { word: "ஊதா", english: "Purple", emoji: "🟣" },
      { word: "கருப்பு", english: "Black", emoji: "⚫" },
      { word: "வெள்ளை", english: "White", emoji: "⚪" },
      { word: "இளஞ்சிவப்பு", english: "Pink", emoji: "🩷" },
      { word: "பழுப்பு", english: "Brown", emoji: "🟤" },
    ],
    food: [
      { word: "சோறு", english: "Rice", emoji: "🍚" },
      { word: "ரொட்டி", english: "Bread", emoji: "🍞" },
      { word: "பழம்", english: "Fruit", emoji: "🍎" },
      { word: "பால்", english: "Milk", emoji: "🥛" },
      { word: "தண்ணீர்", english: "Water", emoji: "💧" },
      { word: "ஆப்பிள்", english: "Apple", emoji: "🍎" },
      { word: "வாழைப்பழம்", english: "Banana", emoji: "🍌" },
      { word: "மாம்பழம்", english: "Mango", emoji: "🥭" },
      { word: "தக்காளி", english: "Tomato", emoji: "🍅" },
      { word: "வெங்காயம்", english: "Onion", emoji: "🧅" },
    ],
    bodyParts: [
      { word: "கை", english: "Hand", emoji: "✋" },
      { word: "கால்", english: "Leg", emoji: "🦵" },
      { word: "கண்", english: "Eye", emoji: "👁️" },
      { word: "காது", english: "Ear", emoji: "👂" },
      { word: "மூக்கு", english: "Nose", emoji: "👃" },
      { word: "வாய்", english: "Mouth", emoji: "👄" },
      { word: "தலை", english: "Head", emoji: "🗣️" },
      { word: "பாதம்", english: "Foot", emoji: "🦶" },
      { word: "விரல்", english: "Finger", emoji: "☝️" },
      { word: "முதுகு", english: "Back", emoji: "🫀" },
    ],
  },
  english: {
    animals: [
      { word: "Dog", english: "Dog", emoji: "🐶" },
      { word: "Cat", english: "Cat", emoji: "🐱" },
      { word: "Elephant", english: "Elephant", emoji: "🐘" },
      { word: "Tiger", english: "Tiger", emoji: "🐯" },
      { word: "Cow", english: "Cow", emoji: "🐄" },
      { word: "Bird", english: "Bird", emoji: "🐦" },
      { word: "Fish", english: "Fish", emoji: "🐟" },
      { word: "Lion", english: "Lion", emoji: "🦁" },
      { word: "Monkey", english: "Monkey", emoji: "🐒" },
      { word: "Horse", english: "Horse", emoji: "🐴" },
    ],
    colors: [
      { word: "Red", english: "Red", emoji: "🔴" },
      { word: "Blue", english: "Blue", emoji: "🔵" },
      { word: "Green", english: "Green", emoji: "🟢" },
      { word: "Yellow", english: "Yellow", emoji: "🟡" },
      { word: "Orange", english: "Orange", emoji: "🟠" },
      { word: "Purple", english: "Purple", emoji: "🟣" },
      { word: "Black", english: "Black", emoji: "⚫" },
      { word: "White", english: "White", emoji: "⚪" },
      { word: "Pink", english: "Pink", emoji: "🩷" },
      { word: "Brown", english: "Brown", emoji: "🟤" },
    ],
    food: [
      { word: "Rice", english: "Rice", emoji: "🍚" },
      { word: "Bread", english: "Bread", emoji: "🍞" },
      { word: "Fruit", english: "Fruit", emoji: "🍎" },
      { word: "Milk", english: "Milk", emoji: "🥛" },
      { word: "Water", english: "Water", emoji: "💧" },
      { word: "Apple", english: "Apple", emoji: "🍎" },
      { word: "Banana", english: "Banana", emoji: "🍌" },
      { word: "Mango", english: "Mango", emoji: "🥭" },
      { word: "Tomato", english: "Tomato", emoji: "🍅" },
      { word: "Onion", english: "Onion", emoji: "🧅" },
    ],
    bodyParts: [
      { word: "Hand", english: "Hand", emoji: "✋" },
      { word: "Leg", english: "Leg", emoji: "🦵" },
      { word: "Eye", english: "Eye", emoji: "👁️" },
      { word: "Ear", english: "Ear", emoji: "👂" },
      { word: "Nose", english: "Nose", emoji: "👃" },
      { word: "Mouth", english: "Mouth", emoji: "👄" },
      { word: "Head", english: "Head", emoji: "🗣️" },
      { word: "Foot", english: "Foot", emoji: "🦶" },
      { word: "Finger", english: "Finger", emoji: "☝️" },
      { word: "Back", english: "Back", emoji: "🫀" },
    ],
  },
};

// ─── Vocabulary (legacy flat list) ───────────────────────────────────────────

export const vocabularyData: Record<Language, VocabWord[]> = {
  telugu: [
    { word: "అమ్మ", translation: "Mother", emoji: "🤱" },
    { word: "నాన్న", translation: "Father", emoji: "👨" },
    { word: "ఇల్లు", translation: "House", emoji: "🏠" },
    { word: "పాఠశాల", translation: "School", emoji: "🏫" },
    { word: "పుస్తకం", translation: "Book", emoji: "📚" },
    { word: "నీళ్ళు", translation: "Water", emoji: "💧" },
    { word: "పండు", translation: "Fruit", emoji: "🍎" },
    { word: "పువ్వు", translation: "Flower", emoji: "🌸" },
    { word: "కుక్క", translation: "Dog", emoji: "🐶" },
    { word: "పిల్లి", translation: "Cat", emoji: "🐱" },
    { word: "ఆవు", translation: "Cow", emoji: "🐄" },
    { word: "ఏనుగు", translation: "Elephant", emoji: "🐘" },
  ],
  hindi: [
    { word: "माँ", translation: "Mother", emoji: "🤱" },
    { word: "पिता", translation: "Father", emoji: "👨" },
    { word: "घर", translation: "House", emoji: "🏠" },
    { word: "विद्यालय", translation: "School", emoji: "🏫" },
    { word: "किताब", translation: "Book", emoji: "📚" },
    { word: "पानी", translation: "Water", emoji: "💧" },
    { word: "फल", translation: "Fruit", emoji: "🍎" },
    { word: "फूल", translation: "Flower", emoji: "🌸" },
    { word: "कुत्ता", translation: "Dog", emoji: "🐶" },
    { word: "बिल्ली", translation: "Cat", emoji: "🐱" },
    { word: "गाय", translation: "Cow", emoji: "🐄" },
    { word: "हाथी", translation: "Elephant", emoji: "🐘" },
  ],
  english: [
    { word: "Mother", translation: "అమ్మ / माँ / அம்மா", emoji: "🤱" },
    { word: "Father", translation: "నాన్న / पिता / அப்பா", emoji: "👨" },
    { word: "House", translation: "ఇల్లు / घर / வீடு", emoji: "🏠" },
    { word: "School", translation: "పాఠశాల / विद्यालय / பள்ளி", emoji: "🏫" },
    { word: "Book", translation: "పుస్తకం / किताब / புத்தகம்", emoji: "📚" },
    { word: "Water", translation: "నీళ్ళు / पानी / தண்ணீர்", emoji: "💧" },
    { word: "Fruit", translation: "పండు / फल / பழம்", emoji: "🍎" },
    { word: "Flower", translation: "పువ్వు / फूल / பூ", emoji: "🌸" },
    { word: "Dog", translation: "కుక్క / कुत्ता / நாய்", emoji: "🐶" },
    { word: "Cat", translation: "పిల్లి / बिल्ली / பூனை", emoji: "🐱" },
    { word: "Cow", translation: "ఆవు / गाय / பசு", emoji: "🐄" },
    { word: "Elephant", translation: "ఏనుగు / हाथी / யானை", emoji: "🐘" },
  ],
  tamil: [
    { word: "அம்மா", translation: "Mother", emoji: "🤱" },
    { word: "அப்பா", translation: "Father", emoji: "👨" },
    { word: "வீடு", translation: "House", emoji: "🏠" },
    { word: "பள்ளி", translation: "School", emoji: "🏫" },
    { word: "புத்தகம்", translation: "Book", emoji: "📚" },
    { word: "தண்ணீர்", translation: "Water", emoji: "💧" },
    { word: "பழம்", translation: "Fruit", emoji: "🍎" },
    { word: "பூ", translation: "Flower", emoji: "🌸" },
    { word: "நாய்", translation: "Dog", emoji: "🐶" },
    { word: "பூனை", translation: "Cat", emoji: "🐱" },
    { word: "பசு", translation: "Cow", emoji: "🐄" },
    { word: "யானை", translation: "Elephant", emoji: "🐘" },
  ],
};

// ─── Poems ────────────────────────────────────────────────────────────────────

export const POEMS: Poem[] = [
  {
    id: "moon",
    title: {
      english: "Twinkle Star",
      telugu: "చందమామ",
      hindi: "चंदा मामा",
      tamil: "நிலா நிலா",
    },
    sentences: [
      {
        english: "Twinkle twinkle little star",
        telugu: "చందమామ రావే జాబిల్లి రావే",
        hindi: "चंदा मामा दूर के",
        tamil: "நிலா நிலா ஓடி வா",
      },
      {
        english: "How I wonder what you are",
        telugu: "పాల పిండి వంటి వాడా",
        hindi: "पुए पकाए दूर के",
        tamil: "நில்லாமல் ஓடி வா",
      },
      {
        english: "Up above the world so high",
        telugu: "ఆకాశంలో నీవు ఉన్నావు",
        hindi: "आप खाएं थाली में",
        tamil: "வானில் உள்ள நிலவே",
      },
      {
        english: "Like a diamond in the sky",
        telugu: "వజ్రమువలె మెరిసే నీవు",
        hindi: "मुझे भी दो प्याली में",
        tamil: "கீழே வந்து விளையாடு",
      },
    ],
  },
  {
    id: "rain",
    title: {
      english: "Rain Rain",
      telugu: "వర్షం వర్షం",
      hindi: "बारिश बारिश",
      tamil: "மழை மழை",
    },
    sentences: [
      {
        english: "Rain rain go away",
        telugu: "వర్షం వర్షం వెళ్ళిపో",
        hindi: "बारिश बारिश जा जा जा",
        tamil: "மழை மழை போ போ போ",
      },
      {
        english: "Come again another day",
        telugu: "మళ్ళీ రేపు రా రా రా",
        hindi: "कल फिर आना आ आ आ",
        tamil: "நாளை மீண்டும் வா வா வா",
      },
      {
        english: "Little children want to play",
        telugu: "పిల్లలు ఆడాలని ఉంది",
        hindi: "बच्चे खेलना चाहते हैं",
        tamil: "குழந்தைகள் விளையாட விரும்புகிறார்கள்",
      },
      {
        english: "Rain rain go away",
        telugu: "వర్షం వర్షం వెళ్ళిపో",
        hindi: "बारिश बारिश जा जा जा",
        tamil: "மழை மழை போ போ போ",
      },
    ],
  },
];

// ─── Quiz Questions ───────────────────────────────────────────────────────────

export const quizData: Record<Language, QuizItem[]> = {
  english: [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "What letter comes after A?",
      options: ["B", "C", "D", "E"],
      correct: 0,
      correctIndex: 0,
    },
    {
      question: "What color is the sky?",
      options: ["Red", "Green", "Blue", "Yellow"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "How many legs does a dog have?",
      options: ["2", "4", "6", "8"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "What sound does a cat make?",
      options: ["Woof", "Moo", "Meow", "Roar"],
      correct: 2,
      correctIndex: 2,
    },
  ],
  telugu: [
    {
      question: "అ తర్వాత ఏ అక్షరం వస్తుంది?",
      options: ["ఆ", "ఇ", "ఈ", "ఉ"],
      correct: 0,
      correctIndex: 0,
    },
    {
      question: "ఏనుగు ఏ రంగులో ఉంటుంది?",
      options: ["ఎరుపు", "నీలం", "పచ్చ", "బూడిద"],
      correct: 3,
      correctIndex: 3,
    },
    {
      question: "ఒకటి + ఒకటి = ?",
      options: ["ఒకటి", "రెండు", "మూడు", "నాలుగు"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "పిల్లి ఏమి చేస్తుంది?",
      options: ["అరుస్తుంది", "మ్యావ్ అంటుంది", "అరుస్తుంది", "గుర్రుమంటుంది"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "ఆకాశం ఏ రంగు?",
      options: ["ఎరుపు", "నీలం", "పచ్చ", "పసుపు"],
      correct: 1,
      correctIndex: 1,
    },
  ],
  hindi: [
    {
      question: "अ के बाद कौन सा अक्षर आता है?",
      options: ["आ", "इ", "ई", "उ"],
      correct: 0,
      correctIndex: 0,
    },
    {
      question: "हाथी किस रंग का होता है?",
      options: ["लाल", "नीला", "हरा", "भूरा"],
      correct: 3,
      correctIndex: 3,
    },
    {
      question: "एक + एक = ?",
      options: ["एक", "दो", "तीन", "चार"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "बिल्ली क्या आवाज करती है?",
      options: ["भौं भौं", "म्याऊं", "मू", "दहाड़"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "आसमान किस रंग का है?",
      options: ["लाल", "नीला", "हरा", "पीला"],
      correct: 1,
      correctIndex: 1,
    },
  ],
  tamil: [
    {
      question: "அ-வுக்கு பிறகு என்ன எழுத்து வரும்?",
      options: ["ஆ", "இ", "ஈ", "உ"],
      correct: 0,
      correctIndex: 0,
    },
    {
      question: "யானை என்ன நிறம்?",
      options: ["சிவப்பு", "நீலம்", "பச்சை", "சாம்பல்"],
      correct: 3,
      correctIndex: 3,
    },
    {
      question: "ஒன்று + ஒன்று = ?",
      options: ["ஒன்று", "இரண்டு", "மூன்று", "நான்கு"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "பூனை என்ன சத்தம் போடும்?",
      options: ["வௌ வௌ", "மியாவ்", "மூ", "கர்ஜனை"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "வானம் என்ன நிறம்?",
      options: ["சிவப்பு", "நீலம்", "பச்சை", "மஞ்சள்"],
      correct: 1,
      correctIndex: 1,
    },
  ],
};

// ─── Matching Pairs ───────────────────────────────────────────────────────────

export const matchingPairs: Record<Language, MatchingPair[]> = {
  english: [
    { emoji: "🐶", word: "Dog" },
    { emoji: "🐱", word: "Cat" },
    { emoji: "🐘", word: "Elephant" },
    { emoji: "🦁", word: "Lion" },
    { emoji: "🐯", word: "Tiger" },
    { emoji: "🐄", word: "Cow" },
  ],
  telugu: [
    { emoji: "🐶", word: "కుక్క" },
    { emoji: "🐱", word: "పిల్లి" },
    { emoji: "🐘", word: "ఏనుగు" },
    { emoji: "🦁", word: "సింహం" },
    { emoji: "🐯", word: "పులి" },
    { emoji: "🐄", word: "ఆవు" },
  ],
  hindi: [
    { emoji: "🐶", word: "कुत्ता" },
    { emoji: "🐱", word: "बिल्ली" },
    { emoji: "🐘", word: "हाथी" },
    { emoji: "🦁", word: "शेर" },
    { emoji: "🐯", word: "बाघ" },
    { emoji: "🐄", word: "गाय" },
  ],
  tamil: [
    { emoji: "🐶", word: "நாய்" },
    { emoji: "🐱", word: "பூனை" },
    { emoji: "🐘", word: "யானை" },
    { emoji: "🦁", word: "சிங்கம்" },
    { emoji: "🐯", word: "புலி" },
    { emoji: "🐄", word: "பசு" },
  ],
};

// ─── Puzzle Words ─────────────────────────────────────────────────────────────

export const puzzleWords: Record<Language, PuzzleWord[]> = {
  english: [
    { word: "CAT", letters: ["C", "A", "T"], emoji: "🐱", hint: "A furry pet" },
    {
      word: "DOG",
      letters: ["D", "O", "G"],
      emoji: "🐶",
      hint: "Man's best friend",
    },
    {
      word: "SUN",
      letters: ["S", "U", "N"],
      emoji: "☀️",
      hint: "Shines in the sky",
    },
    {
      word: "BUS",
      letters: ["B", "U", "S"],
      emoji: "🚌",
      hint: "A big vehicle",
    },
    {
      word: "COW",
      letters: ["C", "O", "W"],
      emoji: "🐄",
      hint: "Gives us milk",
    },
  ],
  telugu: [
    { word: "అమ్మ", letters: ["అ", "మ్మ"], emoji: "🤱", hint: "Mother" },
    { word: "ఇల్లు", letters: ["ఇ", "ల్లు"], emoji: "🏠", hint: "Home" },
    { word: "పాలు", letters: ["పా", "లు"], emoji: "🥛", hint: "Milk" },
    { word: "నీళ్ళు", letters: ["నీ", "ళ్ళు"], emoji: "💧", hint: "Water" },
    { word: "పువ్వు", letters: ["పు", "వ్వు"], emoji: "🌸", hint: "Flower" },
  ],
  hindi: [
    { word: "माँ", letters: ["मा", "ँ"], emoji: "🤱", hint: "Mother" },
    { word: "घर", letters: ["घ", "र"], emoji: "🏠", hint: "Home" },
    { word: "दूध", letters: ["दू", "ध"], emoji: "🥛", hint: "Milk" },
    { word: "पानी", letters: ["पा", "नी"], emoji: "💧", hint: "Water" },
    { word: "फूल", letters: ["फू", "ल"], emoji: "🌸", hint: "Flower" },
  ],
  tamil: [
    { word: "அம்மா", letters: ["அம்", "மா"], emoji: "🤱", hint: "Mother" },
    { word: "வீடு", letters: ["வீ", "டு"], emoji: "🏠", hint: "Home" },
    { word: "பால்", letters: ["பா", "ல்"], emoji: "🥛", hint: "Milk" },
    { word: "தண்ணீர்", letters: ["தண்", "ணீர்"], emoji: "💧", hint: "Water" },
    { word: "பூ", letters: ["பூ"], emoji: "🌸", hint: "Flower" },
  ],
};

// ─── Game Questions ───────────────────────────────────────────────────────────

export const gameQuestions: Record<Language, GameQuestion[]> = {
  english: [
    {
      question: "What is 1 + 1?",
      options: ["1", "2", "3", "4"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "What color is grass?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "How many legs does a cat have?",
      options: ["2", "4", "6", "8"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "What letter comes after B?",
      options: ["A", "C", "D", "E"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "What sound does a dog make?",
      options: ["Meow", "Moo", "Woof", "Roar"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "What is 3 + 2?",
      options: ["4", "5", "6", "7"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "What color is the sun?",
      options: ["Blue", "Green", "Yellow", "Purple"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "How many days in a week?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      correctIndex: 2,
    },
  ],
  telugu: [
    {
      question: "ఒకటి + ఒకటి = ?",
      options: ["ఒకటి", "రెండు", "మూడు", "నాలుగు"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "గడ్డి ఏ రంగు?",
      options: ["ఎరుపు", "నీలం", "పచ్చ", "పసుపు"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "పిల్లికి ఎన్ని కాళ్ళు?",
      options: ["రెండు", "నాలుగు", "ఆరు", "ఎనిమిది"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "అ తర్వాత ఏ అక్షరం?",
      options: ["ఆ", "ఇ", "ఈ", "ఉ"],
      correct: 0,
      correctIndex: 0,
    },
    {
      question: "కుక్క ఏమి అంటుంది?",
      options: ["మ్యావ్", "మూ", "బౌ బౌ", "గర్జన"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "మూడు + రెండు = ?",
      options: ["నాలుగు", "అయిదు", "ఆరు", "ఏడు"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "సూర్యుడు ఏ రంగు?",
      options: ["నీలం", "పచ్చ", "పసుపు", "ఊదా"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "వారంలో ఎన్ని రోజులు?",
      options: ["అయిదు", "ఆరు", "ఏడు", "ఎనిమిది"],
      correct: 2,
      correctIndex: 2,
    },
  ],
  hindi: [
    {
      question: "एक + एक = ?",
      options: ["एक", "दो", "तीन", "चार"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "घास किस रंग की होती है?",
      options: ["लाल", "नीला", "हरा", "पीला"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "बिल्ली के कितने पैर होते हैं?",
      options: ["दो", "चार", "छह", "आठ"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "ब के बाद कौन सा अक्षर आता है?",
      options: ["अ", "क", "ग", "च"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "कुत्ता क्या आवाज करता है?",
      options: ["म्याऊं", "मू", "भौं भौं", "दहाड़"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "तीन + दो = ?",
      options: ["चार", "पाँच", "छह", "सात"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "सूरज किस रंग का है?",
      options: ["नीला", "हरा", "पीला", "बैंगनी"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "एक हफ्ते में कितने दिन होते हैं?",
      options: ["पाँच", "छह", "सात", "आठ"],
      correct: 2,
      correctIndex: 2,
    },
  ],
  tamil: [
    {
      question: "ஒன்று + ஒன்று = ?",
      options: ["ஒன்று", "இரண்டு", "மூன்று", "நான்கு"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "புல் என்ன நிறம்?",
      options: ["சிவப்பு", "நீலம்", "பச்சை", "மஞ்சள்"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "பூனைக்கு எத்தனை கால்கள்?",
      options: ["இரண்டு", "நான்கு", "ஆறு", "எட்டு"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "அ-வுக்கு பிறகு என்ன எழுத்து?",
      options: ["ஆ", "இ", "ஈ", "உ"],
      correct: 0,
      correctIndex: 0,
    },
    {
      question: "நாய் என்ன சத்தம் போடும்?",
      options: ["மியாவ்", "மூ", "வௌ வௌ", "கர்ஜனை"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "மூன்று + இரண்டு = ?",
      options: ["நான்கு", "ஐந்து", "ஆறு", "ஏழு"],
      correct: 1,
      correctIndex: 1,
    },
    {
      question: "சூரியன் என்ன நிறம்?",
      options: ["நீலம்", "பச்சை", "மஞ்சள்", "ஊதா"],
      correct: 2,
      correctIndex: 2,
    },
    {
      question: "ஒரு வாரத்தில் எத்தனை நாட்கள்?",
      options: ["ஐந்து", "ஆறு", "ஏழு", "எட்டு"],
      correct: 2,
      correctIndex: 2,
    },
  ],
};

// ─── Flashcard Data ───────────────────────────────────────────────────────────

export const flashcardData: Record<Language, FlashcardItem[]> = {
  english: [
    { id: 1, front: "Apple", back: "A red or green fruit", emoji: "🍎" },
    { id: 2, front: "Dog", back: "A loyal pet animal", emoji: "🐶" },
    {
      id: 3,
      front: "Sun",
      back: "The star at the center of our solar system",
      emoji: "☀️",
    },
    {
      id: 4,
      front: "Book",
      back: "Used for reading and learning",
      emoji: "📚",
    },
    { id: 5, front: "Water", back: "Essential for life", emoji: "💧" },
  ],
  telugu: [
    { id: 1, front: "యాపిల్", back: "ఎర్రని లేదా పచ్చని పండు", emoji: "🍎" },
    { id: 2, front: "కుక్క", back: "విశ్వాసమైన పెంపుడు జంతువు", emoji: "🐶" },
    {
      id: 3,
      front: "సూర్యుడు",
      back: "మన సౌర వ్యవస్థ కేంద్రంలో ఉన్న నక్షత్రం",
      emoji: "☀️",
    },
    {
      id: 4,
      front: "పుస్తకం",
      back: "చదవడానికి మరియు నేర్చుకోవడానికి ఉపయోగిస్తారు",
      emoji: "📚",
    },
    { id: 5, front: "నీళ్ళు", back: "జీవితానికి అవసరం", emoji: "💧" },
  ],
  hindi: [
    { id: 1, front: "सेब", back: "एक लाल या हरा फल", emoji: "🍎" },
    { id: 2, front: "कुत्ता", back: "एक वफादार पालतू जानवर", emoji: "🐶" },
    { id: 3, front: "सूरज", back: "हमारे सौर मंडल के केंद्र में तारा", emoji: "☀️" },
    {
      id: 4,
      front: "किताब",
      back: "पढ़ने और सीखने के लिए उपयोग किया जाता है",
      emoji: "📚",
    },
    { id: 5, front: "पानी", back: "जीवन के लिए आवश्यक", emoji: "💧" },
  ],
  tamil: [
    { id: 1, front: "ஆப்பிள்", back: "ஒரு சிவப்பு அல்லது பச்சை பழம்", emoji: "🍎" },
    { id: 2, front: "நாய்", back: "ஒரு விசுவாசமான செல்லப்பிராணி", emoji: "🐶" },
    {
      id: 3,
      front: "சூரியன்",
      back: "நம் சூரிய மண்டலத்தின் மையத்தில் உள்ள நட்சத்திரம்",
      emoji: "☀️",
    },
    {
      id: 4,
      front: "புத்தகம்",
      back: "படிக்கவும் கற்றுக்கொள்ளவும் பயன்படுத்தப்படுகிறது",
      emoji: "📚",
    },
    { id: 5, front: "தண்ணீர்", back: "வாழ்க்கைக்கு அவசியம்", emoji: "💧" },
  ],
};

// ─── Lesson Data ──────────────────────────────────────────────────────────────

export const lessonData: Record<Language, LessonItem[]> = {
  english: [
    {
      id: 1,
      title: "Introduction to Alphabets",
      body: "The English alphabet has 26 letters from A to Z. Each letter has an uppercase and lowercase form. Letters are used to form words.",
    },
    {
      id: 2,
      title: "Vowels and Consonants",
      body: "The 5 vowels are A, E, I, O, U. All other letters are consonants. Vowels make open sounds while consonants need the mouth to close or restrict airflow.",
    },
    {
      id: 3,
      title: "Numbers 1 to 10",
      body: "One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten. Numbers help us count objects and understand quantities.",
    },
  ],
  telugu: [
    {
      id: 1,
      title: "అక్షరమాల పరిచయం",
      body: "తెలుగు అక్షరమాలలో 56 అక్షరాలు ఉన్నాయి. 16 అచ్చులు మరియు 36 హల్లులు ఉన్నాయి. ప్రతి అక్షరానికి ప్రత్యేక ఉచ్చారణ ఉంటుంది.",
    },
    {
      id: 2,
      title: "అచ్చులు మరియు హల్లులు",
      body: "అ, ఆ, ఇ, ఈ, ఉ, ఊ, ఋ, ఎ, ఏ, ఐ, ఒ, ఓ, ఔ అచ్చులు. మిగిలినవి హల్లులు. అచ్చులు స్వతంత్రంగా ఉచ్చరించబడతాయి.",
    },
    {
      id: 3,
      title: "సంఖ్యలు 1 నుండి 10",
      body: "ఒకటి, రెండు, మూడు, నాలుగు, అయిదు, ఆరు, ఏడు, ఎనిమిది, తొమ్మిది, పది. సంఖ్యలు వస్తువులను లెక్కించడానికి సహాయపడతాయి.",
    },
  ],
  hindi: [
    {
      id: 1,
      title: "वर्णमाला का परिचय",
      body: "हिंदी वर्णमाला में 46 अक्षर हैं। 13 स्वर और 33 व्यंजन हैं। प्रत्येक अक्षर का एक विशेष उच्चारण होता है।",
    },
    {
      id: 2,
      title: "स्वर और व्यंजन",
      body: "अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ, अं, अः स्वर हैं। बाकी सभी व्यंजन हैं। स्वर स्वतंत्र रूप से उच्चारित होते हैं।",
    },
    {
      id: 3,
      title: "संख्याएं 1 से 10",
      body: "एक, दो, तीन, चार, पाँच, छह, सात, आठ, नौ, दस। संख्याएं वस्तुओं को गिनने में मदद करती हैं।",
    },
  ],
  tamil: [
    {
      id: 1,
      title: "எழுத்துக்கள் அறிமுகம்",
      body: "தமிழ் எழுத்துக்களில் 48 எழுத்துக்கள் உள்ளன. 12 உயிரெழுத்துக்கள் மற்றும் 18 மெய்யெழுத்துக்கள் உள்ளன. ஒவ்வொரு எழுத்துக்கும் ஒரு சிறப்பு உச்சரிப்பு உள்ளது.",
    },
    {
      id: 2,
      title: "உயிர் மற்றும் மெய் எழுத்துக்கள்",
      body: "அ, ஆ, இ, ஈ, உ, ஊ, எ, ஏ, ஐ, ஒ, ஓ, ஔ உயிரெழுத்துக்கள். மற்றவை மெய்யெழுத்துக்கள். உயிரெழுத்துக்கள் தனியாக உச்சரிக்கப்படுகின்றன.",
    },
    {
      id: 3,
      title: "எண்கள் 1 முதல் 10",
      body: "ஒன்று, இரண்டு, மூன்று, நான்கு, ஐந்து, ஆறு, ஏழு, எட்டு, ஒன்பது, பத்து. எண்கள் பொருட்களை எண்ண உதவுகின்றன.",
    },
  ],
};

// ─── Utility Functions ────────────────────────────────────────────────────────

/** Returns the alphabet cards for the given language */
export function getAlphabetCards(language: Language): LetterCard[] {
  return alphabetData[language] ?? alphabetData.english;
}

/** Alias used by new multilingual pages */
export function getAlphabetForLanguage(language: Language): LetterCard[] {
  return alphabetData[language] ?? alphabetData.english;
}

/** Returns vocabulary words for the given language (flat list) */
export function getVocabulary(language: Language): VocabWord[] {
  return vocabularyData[language] ?? vocabularyData.english;
}

/** Alias */
export function getVocabularyForLanguage(language: Language): VocabWord[] {
  return vocabularyData[language] ?? vocabularyData.english;
}

/** Returns vocabulary entries for a specific language and category */
export function getVocabByCategory(
  language: Language,
  category: VocabCategory,
): VocabEntry[] {
  return (
    vocabularyByCategory[language]?.[category] ??
    vocabularyByCategory.english[category]
  );
}

/** Returns numbers 1–10 for the given language as FullScreenNumberCard[] */
export function getNumbers(language: Language): FullScreenNumberCard[] {
  // Return first 10 entries from the 1-20 dataset
  return (
    NUMBERS_1_TO_20_FULLSCREEN[language]?.slice(0, 10) ??
    NUMBERS_1_TO_20_FULLSCREEN.english.slice(0, 10)
  );
}

/** Returns numbers 1–100 for the given language as FullScreenNumberCard[] */
export function getNumbers100(language: Language): FullScreenNumberCard[] {
  // Build from the numbersData array (1-100) with native numerals
  const teluguNumerals = [
    "౧",
    "౨",
    "౩",
    "౪",
    "౫",
    "౬",
    "౭",
    "౮",
    "౯",
    "౧౦",
    "౧౧",
    "౧౨",
    "౧౩",
    "౧౪",
    "౧౫",
    "౧౬",
    "౧౭",
    "౧౮",
    "౧౯",
    "౨౦",
    "౨౧",
    "౨౨",
    "౨౩",
    "౨౪",
    "౨౫",
    "౨౬",
    "౨౭",
    "౨౮",
    "౨౯",
    "౩౦",
    "౩౧",
    "౩౨",
    "౩౩",
    "౩౪",
    "౩౫",
    "౩౬",
    "౩౭",
    "౩౮",
    "౩౯",
    "౪౦",
    "౪౧",
    "౪౨",
    "౪౩",
    "౪౪",
    "౪౫",
    "౪౬",
    "౪౭",
    "౪౮",
    "౪౯",
    "౫౦",
    "౫౧",
    "౫౨",
    "౫౩",
    "౫౪",
    "౫౫",
    "౫౬",
    "౫౭",
    "౫౮",
    "౫౯",
    "౬౦",
    "౬౧",
    "౬౨",
    "౬౩",
    "౬౪",
    "౬౫",
    "౬౬",
    "౬౭",
    "౬౮",
    "౬౯",
    "౭౦",
    "౭౧",
    "౭౨",
    "౭౩",
    "౭౪",
    "౭౫",
    "౭౬",
    "౭౭",
    "౭౮",
    "౭౯",
    "౮౦",
    "౮౧",
    "౮౨",
    "౮౩",
    "౮౪",
    "౮౫",
    "౮౬",
    "౮౭",
    "౮౮",
    "౮౯",
    "౯౦",
    "౯౧",
    "౯౨",
    "౯౩",
    "౯౪",
    "౯౫",
    "౯౬",
    "౯౭",
    "౯౮",
    "౯౯",
    "౧౦౦",
  ];
  const hindiNumerals = [
    "१",
    "२",
    "३",
    "४",
    "५",
    "६",
    "७",
    "८",
    "९",
    "१०",
    "११",
    "१२",
    "१३",
    "१४",
    "१५",
    "१६",
    "१७",
    "१८",
    "१९",
    "२०",
    "२१",
    "२२",
    "२३",
    "२४",
    "२५",
    "२६",
    "२७",
    "२८",
    "२९",
    "३०",
    "३१",
    "३२",
    "३३",
    "३४",
    "३५",
    "३६",
    "३७",
    "३८",
    "३९",
    "४०",
    "४१",
    "४२",
    "४३",
    "४४",
    "४५",
    "४६",
    "४७",
    "४८",
    "४९",
    "५०",
    "५१",
    "५२",
    "५३",
    "५४",
    "५५",
    "५६",
    "५७",
    "५८",
    "५९",
    "६०",
    "६१",
    "६२",
    "६३",
    "६४",
    "६५",
    "६६",
    "६७",
    "६८",
    "६९",
    "७०",
    "७१",
    "७२",
    "७३",
    "७४",
    "७५",
    "७६",
    "७७",
    "७८",
    "७९",
    "८०",
    "८१",
    "८२",
    "८३",
    "८४",
    "८५",
    "८६",
    "८७",
    "८८",
    "८९",
    "९०",
    "९१",
    "९२",
    "९३",
    "९४",
    "९५",
    "९६",
    "९७",
    "९८",
    "९९",
    "१००",
  ];
  const tamilNumerals = [
    "௧",
    "௨",
    "௩",
    "௪",
    "௫",
    "௬",
    "௭",
    "௮",
    "௯",
    "௰",
    "௰௧",
    "௰௨",
    "௰௩",
    "௰௪",
    "௰௫",
    "௰௬",
    "௰௭",
    "௰௮",
    "௰௯",
    "௨௰",
    "௨௰௧",
    "௨௰௨",
    "௨௰௩",
    "௨௰௪",
    "௨௰௫",
    "௨௰௬",
    "௨௰௭",
    "௨௰௮",
    "௨௰௯",
    "௩௰",
    "௩௰௧",
    "௩௰௨",
    "௩௰௩",
    "௩௰௪",
    "௩௰௫",
    "௩௰௬",
    "௩௰௭",
    "௩௰௮",
    "௩௰௯",
    "௪௰",
    "௪௰௧",
    "௪௰௨",
    "௪௰௩",
    "௪௰௪",
    "௪௰௫",
    "௪௰௬",
    "௪௰௭",
    "௪௰௮",
    "௪௰௯",
    "௫௰",
    "௫௰௧",
    "௫௰௨",
    "௫௰௩",
    "௫௰௪",
    "௫௰௫",
    "௫௰௬",
    "௫௰௭",
    "௫௰௮",
    "௫௰௯",
    "௬௰",
    "௬௰௧",
    "௬௰௨",
    "௬௰௩",
    "௬௰௪",
    "௬௰௫",
    "௬௰௬",
    "௬௰௭",
    "௬௰௮",
    "௬௰௯",
    "௭௰",
    "௭௰௧",
    "௭௰௨",
    "௭௰௩",
    "௭௰௪",
    "௭௰௫",
    "௭௰௬",
    "௭௰௭",
    "௭௰௮",
    "௭௰௯",
    "௮௰",
    "௮௰௧",
    "௮௰௨",
    "௮௰௩",
    "௮௰௪",
    "௮௰௫",
    "௮௰௬",
    "௮௰௭",
    "௮௰௮",
    "௮௰௯",
    "௯௰",
    "௯௰௧",
    "௯௰௨",
    "௯௰௩",
    "௯௰௪",
    "௯௰௫",
    "௯௰௬",
    "௯௰௭",
    "௯௰௮",
    "௯௰௯",
    "௱",
  ];

  return numbersData.map((entry, i) => {
    let numeral: string;
    let word: string;
    switch (language) {
      case "telugu":
        numeral = teluguNumerals[i] ?? String(entry.number);
        word = entry.telugu;
        break;
      case "hindi":
        numeral = hindiNumerals[i] ?? String(entry.number);
        word = entry.hindi;
        break;
      case "tamil":
        numeral = tamilNumerals[i] ?? String(entry.number);
        word = entry.tamil;
        break;
      default:
        numeral = String(entry.number);
        word = entry.english;
    }
    return {
      number: entry.number,
      numeral,
      word,
      english: entry.english,
      emoji: "",
    };
  });
}

/** Returns quiz questions for the given language */
export function getQuizQuestions(language: Language): QuizItem[] {
  return quizData[language] ?? quizData.english;
}

/** Returns matching pairs for the given language */
export function getMatchingPairs(language: Language): MatchingPair[] {
  return matchingPairs[language] ?? matchingPairs.english;
}

/** Returns puzzle words for the given language */
export function getPuzzleWords(language: Language): PuzzleWord[] {
  return puzzleWords[language] ?? puzzleWords.english;
}

/** Returns flashcards for the given language */
export function getFlashcards(language: Language): FlashcardItem[] {
  return flashcardData[language] ?? flashcardData.english;
}

/** Returns poems for the given language as flat FlatPoem[] (used by PoemsLesson) */
export function getPoems(language: Language): FlatPoem[] {
  return POEMS.map((poem) => ({
    title: poem.title[language] ?? poem.title.english,
    lines: poem.sentences.map((s) => s[language] ?? s.english),
  }));
}

/** Returns numbers 1–20 full screen cards for the given language */
export function getNumbersForLanguage(
  language: Language,
): FullScreenNumberCard[] {
  return (
    NUMBERS_1_TO_20_FULLSCREEN[language] ?? NUMBERS_1_TO_20_FULLSCREEN.english
  );
}
