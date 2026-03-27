/**
 * KidsLearn Speech Utility
 * Provides high-quality, kid-friendly pronunciation using the best available voices.
 */

type LangCode = "en-US" | "te-IN" | "hi-IN" | "ta-IN";

// Language priority lists — prefer high-quality voices for each locale
const VOICE_PRIORITY: Record<LangCode, string[]> = {
  "en-US": [
    "Google US English",
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Zira",
    "Samantha",
    "Karen",
    "en-US",
  ],
  "te-IN": ["Google తెలుగు", "Microsoft Shruti Online", "te-IN"],
  "hi-IN": [
    "Google हिन्दी",
    "Microsoft Swara Online (Natural) - Hindi (India)",
    "Microsoft Hemant",
    "Lekha",
    "hi-IN",
  ],
  "ta-IN": ["Google தமிழ்", "Microsoft Valluvar Online", "ta-IN"],
};

let voicesLoaded = false;
let voiceCache: Record<string, SpeechSynthesisVoice | null> = {};

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.addEventListener(
        "voiceschanged",
        () => {
          resolve(window.speechSynthesis.getVoices());
        },
        { once: true },
      );
    }
  });
}

async function getBestVoice(
  langCode: LangCode,
): Promise<SpeechSynthesisVoice | null> {
  if (voiceCache[langCode] !== undefined) return voiceCache[langCode];

  const voices = await loadVoices();
  const priorities = VOICE_PRIORITY[langCode] ?? [langCode];

  // 1. Try exact name match from priority list
  for (const name of priorities) {
    const match = voices.find((v) => v.name === name);
    if (match) {
      voiceCache[langCode] = match;
      return match;
    }
  }

  // 2. Try voices matching the language code (e.g. te-IN, hi-IN)
  const langMatch = voices.find((v) => v.lang === langCode);
  if (langMatch) {
    voiceCache[langCode] = langMatch;
    return langMatch;
  }

  // 3. Fallback: match on language prefix (e.g. "hi" in "hi-IN")
  const prefix = langCode.split("-")[0];
  const prefixMatch = voices.find((v) => v.lang.startsWith(prefix));
  if (prefixMatch) {
    voiceCache[langCode] = prefixMatch;
    return prefixMatch;
  }

  voiceCache[langCode] = null;
  return null;
}

/** Speak a single word/text with the best available voice for the given language */
export async function speakWord(
  text: string,
  langCode: LangCode,
): Promise<void> {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const voice = await getBestVoice(langCode);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.8; // slightly slow — clear for kids
  utterance.pitch = 1.1; // slightly higher pitch — friendlier tone
  utterance.volume = 1.0;
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

/** Speak letter/number first, then word with a natural gap between them */
export async function speakLetterAndWord(
  letter: string,
  word: string,
  langCode: LangCode,
): Promise<void> {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const voice = await getBestVoice(langCode);

  const makeUtterance = (text: string, rate = 0.8) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode;
    u.rate = rate;
    u.pitch = 1.1;
    u.volume = 1.0;
    if (voice) u.voice = voice;
    return u;
  };

  // Speak letter
  const u1 = makeUtterance(letter, 0.7);
  // Silent pause — browsers will chain these so we add a real wait via onend
  const u2 = makeUtterance(word, 0.8);

  // Chain: after letter ends, wait 400ms then speak word
  u1.onend = () => {
    setTimeout(() => {
      window.speechSynthesis.speak(u2);
    }, 400);
  };

  window.speechSynthesis.speak(u1);
}

/** Pre-warm voices so first playback is instant */
export function preloadVoices(): void {
  if (voicesLoaded) return;
  voicesLoaded = true;
  loadVoices().then((voices) => {
    if (voices.length > 0) voiceCache = {};
  });
}
