import { useState, useRef } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useGetLessons, useCompleteLesson, useGetSessionProgress } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Skeleton } from '@/components/ui/skeleton';

const FALLBACK_LESSONS: Record<string, Array<{ id: bigint; title: string; body: string; image: string }>> = {
  math: [
    { id: 1n, title: 'Counting to 10', body: 'Let\'s count together! 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Counting helps us know how many things we have. Try counting your fingers!', image: '' },
    { id: 2n, title: 'Adding Numbers', body: 'Adding means putting numbers together. If you have 2 apples and get 3 more, you have 5 apples! 2 + 3 = 5.', image: '' },
    { id: 3n, title: 'Shapes Around Us', body: 'Shapes are everywhere! A circle is round like the sun. A square has 4 equal sides. A triangle has 3 sides. Can you find shapes around you?', image: '' },
  ],
  alphabet: [
    { id: 4n, title: 'The Letter A', body: 'A is the first letter of the alphabet! A is for Apple, Ant, and Alligator. The letter A makes the sound "ah" or "ay".', image: '' },
    { id: 5n, title: 'Vowels', body: 'Vowels are special letters: A, E, I, O, U. Every word needs a vowel! Can you think of words that start with each vowel?', image: '' },
    { id: 6n, title: 'Reading Words', body: 'When we put letters together, they make words! C-A-T spells CAT. D-O-G spells DOG. Try sounding out each letter!', image: '' },
  ],
  science: [
    { id: 7n, title: 'Plants Need Sunlight', body: 'Plants are living things that make their own food using sunlight, water, and air. This process is called photosynthesis!', image: '' },
    { id: 8n, title: 'The Water Cycle', body: 'Water travels in a cycle! The sun heats water, turning it into vapor that rises up. It cools and forms clouds. Then it falls as rain!', image: '' },
    { id: 9n, title: 'Animals and Habitats', body: 'Animals live in places called habitats. Fish live in water. Birds live in trees. Bears live in forests. Each animal is perfectly suited to its home!', image: '' },
  ],
  telugu: [
    { id: 10n, title: 'Telugu Vowels - అచ్చులు', body: 'Telugu has beautiful vowels called అచ్చులు. The first vowel is అ (a). Then ఆ (aa), ఇ (i), ఈ (ee). These are the building blocks of Telugu words!', image: '' },
    { id: 11n, title: 'Telugu Numbers - సంఖ్యలు', body: 'Let\'s learn Telugu numbers! ఒకటి (1), రెండు (2), మూడు (3), నాలుగు (4), అయిదు (5). Practice saying them aloud!', image: '' },
    { id: 12n, title: 'Telugu Colors - రంగులు', body: 'Colors in Telugu: ఎరుపు (red), పచ్చ (green), పసుపు (yellow), నారింజ (orange). Look around and name things in Telugu!', image: '' },
  ],
  hindi: [
    { id: 13n, title: 'Hindi Vowels - स्वर', body: 'Hindi uses the Devanagari script. The vowels are called स्वर. अ (a), आ (aa), इ (i), ई (ee), उ (u). These are the first sounds to learn!', image: '' },
    { id: 14n, title: 'Hindi Numbers - संख्याएं', body: 'Numbers in Hindi: एक (1), दो (2), तीन (3), चार (4), पाँच (5). Can you count to five in Hindi?', image: '' },
    { id: 15n, title: 'Hindi Colors - रंग', body: 'Colors in Hindi: लाल (red), हरा (green), पीला (yellow), नारंगी (orange). Practice these colorful words!', image: '' },
  ],
  english: [
    { id: 16n, title: 'Greetings in English', body: 'English greetings: "Hello!" means hi. "Good morning!" is said in the morning. "How are you?" asks how someone feels. "Thank you!" shows gratitude.', image: '' },
    { id: 17n, title: 'Common Nouns', body: 'Nouns are naming words! A cat, a house, a tree, a book — these are all nouns. Nouns can be people, places, or things.', image: '' },
    { id: 18n, title: 'Action Words - Verbs', body: 'Verbs are action words! Run, jump, eat, sleep, play — these are all verbs. Every sentence needs a verb. What is your favorite action?', image: '' },
  ],
};

export default function Lessons() {
  const search = useSearch({ strict: false }) as { ageGroup?: string; subject?: string };
  const subject = search.subject || 'math';
  const { identity } = useInternetIdentity();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );

  const { data: backendLessons, isLoading } = useGetLessons();
  // Pass null to use the currently authenticated user's principal (resolved inside the hook)
  const { data: sessionProgress } = useGetSessionProgress();
  const completeLessonMutation = useCompleteLesson();

  const lessons = (backendLessons && backendLessons.length > 0)
    ? backendLessons
    : (FALLBACK_LESSONS[subject] || FALLBACK_LESSONS.math);

  const currentLesson = lessons[currentIndex];
  const completedIds = sessionProgress?.completedLessons?.map(String) || [];
  const isCompleted = currentLesson ? completedIds.includes(String(currentLesson.id)) : false;

  const handleSpeak = () => {
    if (!synthRef.current || !currentLesson) return;
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(`${currentLesson.title}. ${currentLesson.body}`);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  const handleComplete = async () => {
    if (!currentLesson || isCompleted || !identity) return;
    try {
      await completeLessonMutation.mutateAsync(BigInt(currentLesson.id));
    } catch {
      // Ignore if already completed
    }
  };

  const handlePrev = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
    setCurrentIndex((i) => Math.min(lessons.length - 1, i + 1));
  };

  const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1);
  const subjectEmoji =
    subject === 'math' ? '🔢' :
    subject === 'alphabet' ? '🔤' :
    subject === 'science' ? '🔬' :
    subject === 'telugu' ? '🌺' :
    subject === 'hindi' ? '🪔' : '📖';

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-10 w-48 mx-auto rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="font-fredoka text-2xl text-muted-foreground">No lessons found!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-slide-in max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="font-fredoka text-3xl text-foreground">{subjectEmoji} {subjectLabel} Lessons</h1>
        <p className="font-nunito text-muted-foreground font-semibold">
          Lesson {currentIndex + 1} of {lessons.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {lessons.map((lesson, i) => {
          const done = completedIds.includes(String(lesson.id));
          return (
            <button
              key={i}
              onClick={() => { synthRef.current?.cancel(); setIsSpeaking(false); setCurrentIndex(i); }}
              className={`w-4 h-4 rounded-full transition-all ${
                i === currentIndex ? 'bg-tangerine-500 scale-125' : done ? 'bg-grass-500' : 'bg-muted'
              }`}
            />
          );
        })}
      </div>

      {/* Lesson Card */}
      <div className="bg-card rounded-3xl border-4 border-sunshine-400 shadow-card overflow-hidden mb-6">
        <div className="bg-sunshine-100 h-40 flex items-center justify-center text-6xl">
          {currentLesson.image ? (
            <img src={currentLesson.image} alt={currentLesson.title} className="h-full w-full object-cover" />
          ) : (
            <span>{subjectEmoji}</span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="font-fredoka text-2xl text-foreground flex-1">{currentLesson.title}</h2>
            {isCompleted && <CheckCircle className="text-grass-500 shrink-0 mt-1" size={28} />}
          </div>
          <p className="font-nunito text-foreground leading-relaxed text-base">{currentLesson.body}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleSpeak}
          className={`touch-target flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-nunito font-bold shadow-fun hover:scale-105 active:scale-95 transition-all ${
            isSpeaking ? 'bg-cherry-500 text-white' : 'bg-tangerine-400 text-white hover:bg-tangerine-300'
          }`}
        >
          {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          {isSpeaking ? 'Stop' : 'Listen'}
        </button>

        {identity && !isCompleted && (
          <button
            onClick={handleComplete}
            disabled={completeLessonMutation.isPending}
            className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-grass-500 text-white font-nunito font-bold shadow-fun hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
          >
            <CheckCircle size={20} />
            {completeLessonMutation.isPending ? 'Saving...' : 'Mark Complete'}
          </button>
        )}
        {isCompleted && (
          <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-grass-100 border-4 border-grass-400 text-grass-700 font-nunito font-bold">
            <CheckCircle size={20} /> Completed!
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-muted font-nunito font-bold hover:bg-muted/80 disabled:opacity-40 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={20} /> Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
          className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-sunshine-400 text-foreground font-nunito font-bold hover:bg-sunshine-300 disabled:opacity-40 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
