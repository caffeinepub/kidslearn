import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCompleteLesson,
  useGetLessons,
  useGetSessionProgress,
} from "../hooks/useQueries";

const FALLBACK_LESSONS: Record<
  string,
  Array<{
    id: bigint;
    title: string;
    body: string;
    image: string;
    emoji: string;
  }>
> = {
  math: [
    {
      id: 1n,
      title: "Counting to 5",
      body: "Let's count apples! 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ — One, Two, Three, Four, Five!",
      image: "",
      emoji: "🍎",
    },
    {
      id: 2n,
      title: "Counting to 10",
      body: "Count the stars! 1 to 10. ఒకటి రెండు మూడు / एक दो तीन / ஒன்று இரண்டு மூன்று",
      image: "",
      emoji: "🌟",
    },
    {
      id: 3n,
      title: "Simple Addition",
      body: "2 + 3 = 5. Adding means putting together! Two apples plus three apples = Five apples 🍎🍎➕🍎🍎🍎",
      image: "",
      emoji: "➕",
    },
    {
      id: 4n,
      title: "Simple Subtraction",
      body: "5 - 2 = 3. Subtracting means taking away! Five bananas minus two bananas = Three bananas 🍌",
      image: "",
      emoji: "➖",
    },
    {
      id: 5n,
      title: "Shapes: Circle",
      body: "A circle is perfectly round! The sun ☀️, a ball 🏀, and a coin 🪙 are circles!",
      image: "",
      emoji: "⭕",
    },
    {
      id: 6n,
      title: "Shapes: Square",
      body: "A square has 4 equal sides! A dice 🎲, a window, and a book are square-shaped.",
      image: "",
      emoji: "🟥",
    },
    {
      id: 7n,
      title: "Multiplication Intro",
      body: "3 × 2 = 6. Three groups of two! 🍪🍪 🍪🍪 🍪🍪 = Six cookies!",
      image: "",
      emoji: "✖️",
    },
    {
      id: 8n,
      title: "Division Intro",
      body: "8 ÷ 2 = 4. Share equally! Eight mangoes shared between two friends = Four each 🥭",
      image: "",
      emoji: "➗",
    },
  ],
  alphabet: [
    {
      id: 9n,
      title: "A for Apple",
      body: "A is for Apple 🍎 / అ - అమ్మ / अ - अनार / அ - அன்னாசி",
      image: "",
      emoji: "🍎",
    },
    {
      id: 10n,
      title: "B for Ball",
      body: "B is for Ball 🏀 / బ - బంతి / ब - बॉल / ப - பந்து",
      image: "",
      emoji: "🏀",
    },
    {
      id: 11n,
      title: "C for Cat",
      body: "C is for Cat 🐱 / క - కుక్క / क - कुत्ता / க - கோழி",
      image: "",
      emoji: "🐱",
    },
    {
      id: 12n,
      title: "D for Dog",
      body: "D is for Dog 🐶 / డ - డబ్బు / द - दरवाजा / ட - டக்கு",
      image: "",
      emoji: "🐶",
    },
    {
      id: 13n,
      title: "E for Elephant",
      body: "E is for Elephant 🐘 / ఏ - ఏనుగు / ए - एलिफेंट / ஏ - யானை",
      image: "",
      emoji: "🐘",
    },
    {
      id: 14n,
      title: "F for Fish",
      body: "F is for Fish 🐟 / ఫ - పువ్వు / फ - फूल / ப - மீன்",
      image: "",
      emoji: "🐟",
    },
    {
      id: 15n,
      title: "G for Grapes",
      body: "G is for Grapes 🍇 / గ - గుర్రం / ग - घोड़ा / க - திராட்சை",
      image: "",
      emoji: "🍇",
    },
    {
      id: 16n,
      title: "H for House",
      body: "H is for House 🏠 / హ - హంస / ह - हाथी / ஹ - வீடு",
      image: "",
      emoji: "🏠",
    },
  ],
  science: [
    {
      id: 17n,
      title: "Plants Need Sun",
      body: "Plants grow with sunlight ☀️, water 💧, and air! They make their own food.",
      image: "",
      emoji: "🌱",
    },
    {
      id: 18n,
      title: "Animals",
      body: "Animals are living creatures! Fish live in water 🐟, birds fly in sky 🐦, lions live on land 🦁",
      image: "",
      emoji: "🐘",
    },
    {
      id: 19n,
      title: "Body Parts",
      body: "Our body has many parts! Head 👤, eyes 👀, nose 👃, mouth 👄, hands 🙌, legs 🦵",
      image: "",
      emoji: "🫀",
    },
    {
      id: 20n,
      title: "Weather",
      body: "Weather changes every day! Sunny ☀️, Rainy 🌧️, Cloudy ⛅, Windy 💨, Snowy ❄️",
      image: "",
      emoji: "⛅",
    },
    {
      id: 21n,
      title: "Water Cycle",
      body: "Water evaporates ☁️, forms clouds, then falls as rain 🌧️ — the water cycle!",
      image: "",
      emoji: "💧",
    },
    {
      id: 22n,
      title: "Earth & Space",
      body: "Earth is our home planet 🌍. The Sun gives us light ☀️. The Moon shines at night 🌙",
      image: "",
      emoji: "🌍",
    },
    {
      id: 23n,
      title: "Fruits & Vegetables",
      body: "Fruits have seeds inside 🍎🍊🍇. Vegetables are roots, leaves or stems 🥕🥦🧅",
      image: "",
      emoji: "🥦",
    },
    {
      id: 24n,
      title: "Insects",
      body: "Insects have 6 legs! Butterfly 🦋, Bee 🐝, Ant 🐜, Ladybug 🐞 are all insects!",
      image: "",
      emoji: "🦋",
    },
  ],
  telugu: [
    {
      id: 25n,
      title: "Telugu Vowels అచ్చులు",
      body: "అ ఆ ఇ ఈ ఉ ఊ — Telugu vowels! అ for అమ్మ (mother), ఆ for ఆవు (cow)",
      image: "",
      emoji: "📝",
    },
    {
      id: 26n,
      title: "Telugu Consonants హల్లులు",
      body: "క ఖ గ ఘ — Telugu consonants! క for కాకి (crow), గ for గుర్రం (horse)",
      image: "",
      emoji: "✍️",
    },
    {
      id: 27n,
      title: "Animals in Telugu",
      body: "పశువులు: ఆవు (cow) 🐄, గుర్రం (horse) 🐴, ఏనుగు (elephant) 🐘, పులి (tiger) 🐯",
      image: "",
      emoji: "🐄",
    },
    {
      id: 28n,
      title: "Colors in Telugu",
      body: "రంగులు: ఎరుపు (red) 🔴, పచ్చ (green) 🟢, పసుపు (yellow) 🟡, నీలం (blue) 🔵",
      image: "",
      emoji: "🎨",
    },
    {
      id: 29n,
      title: "Numbers in Telugu",
      body: "సంఖ్యలు: ఒకటి (1), రెండు (2), మూడు (3), నాలుగు (4), అయిదు (5)",
      image: "",
      emoji: "🔢",
    },
    {
      id: 30n,
      title: "Body Parts Telugu",
      body: "శరీర భాగాలు: తల (head), కళ్ళు (eyes), చేయి (hand), కాలు (leg), ముక్కు (nose)",
      image: "",
      emoji: "🫀",
    },
    {
      id: 31n,
      title: "Fruits Telugu",
      body: "పళ్ళు: మామిడి (mango) 🥭, అరటి (banana) 🍌, ద్రాక్ష (grapes) 🍇, నారింజ (orange) 🍊",
      image: "",
      emoji: "🥭",
    },
    {
      id: 32n,
      title: "Greetings Telugu",
      body: "నమస్కారం (Namaste) 🙏, ధన్యవాదాలు (Thank you), శుభోదయం (Good morning)",
      image: "",
      emoji: "🙏",
    },
  ],
  hindi: [
    {
      id: 33n,
      title: "Hindi Vowels स्वर",
      body: "अ आ इ ई उ ऊ — Hindi vowels! अ for अनार (pomegranate), आ for आम (mango)",
      image: "",
      emoji: "📝",
    },
    {
      id: 34n,
      title: "Hindi Consonants व्यंजन",
      body: "क ख ग घ — Hindi consonants! क for केला (banana), ग for गाय (cow)",
      image: "",
      emoji: "✍️",
    },
    {
      id: 35n,
      title: "Animals in Hindi",
      body: "जानवर: गाय (cow) 🐄, घोड़ा (horse) 🐴, हाथी (elephant) 🐘, शेर (lion) 🦁",
      image: "",
      emoji: "🐄",
    },
    {
      id: 36n,
      title: "Colors in Hindi",
      body: "रंग: लाल (red) 🔴, हरा (green) 🟢, पीला (yellow) 🟡, नीला (blue) 🔵",
      image: "",
      emoji: "🎨",
    },
    {
      id: 37n,
      title: "Numbers in Hindi",
      body: "संख्या: एक (1), दो (2), तीन (3), चार (4), पाँच (5), छह (6)",
      image: "",
      emoji: "🔢",
    },
    {
      id: 38n,
      title: "Body Parts Hindi",
      body: "शरीर के अंग: सिर (head), आँखें (eyes), हाथ (hand), पैर (leg), नाक (nose)",
      image: "",
      emoji: "🫀",
    },
    {
      id: 39n,
      title: "Fruits Hindi",
      body: "फल: आम (mango) 🥭, केला (banana) 🍌, अंगूर (grapes) 🍇, संतरा (orange) 🍊",
      image: "",
      emoji: "🥭",
    },
    {
      id: 40n,
      title: "Greetings Hindi",
      body: "नमस्ते (Namaste) 🙏, धन्यवाद (Thank you), शुभ प्रभात (Good morning)",
      image: "",
      emoji: "🙏",
    },
  ],
  english: [
    {
      id: 41n,
      title: "Greetings",
      body: "Hello! Good morning! How are you? I am fine, thank you! Nice to meet you!",
      image: "",
      emoji: "👋",
    },
    {
      id: 42n,
      title: "Colors",
      body: "Red 🔴, Blue 🔵, Green 🟢, Yellow 🟡, Orange 🟠, Purple 🟣, Pink 🌸",
      image: "",
      emoji: "🌈",
    },
    {
      id: 43n,
      title: "Animals",
      body: "Cat 🐱, Dog 🐶, Elephant 🐘, Lion 🦁, Bird 🐦, Fish 🐟, Rabbit 🐰",
      image: "",
      emoji: "🦁",
    },
    {
      id: 44n,
      title: "Fruits",
      body: "Apple 🍎, Banana 🍌, Mango 🥭, Orange 🍊, Grapes 🍇, Strawberry 🍓",
      image: "",
      emoji: "🍎",
    },
    {
      id: 45n,
      title: "Vegetables",
      body: "Carrot 🥕, Tomato 🍅, Potato 🥔, Broccoli 🥦, Onion 🧅, Corn 🌽",
      image: "",
      emoji: "🥦",
    },
    {
      id: 46n,
      title: "Numbers",
      body: "One 1️⃣, Two 2️⃣, Three 3️⃣, Four 4️⃣, Five 5️⃣, Six 6️⃣, Seven 7️⃣, Eight 8️⃣",
      image: "",
      emoji: "🔢",
    },
    {
      id: 47n,
      title: "Action Words",
      body: "Run 🏃, Jump 🦘, Eat 🍽️, Sleep 😴, Play 🎮, Read 📚, Write ✍️, Sing 🎵",
      image: "",
      emoji: "🏃",
    },
    {
      id: 48n,
      title: "Family",
      body: "Mother 👩, Father 👨, Sister 👧, Brother 👦, Grandmother 👵, Grandfather 👴",
      image: "",
      emoji: "👨‍👩‍👧‍👦",
    },
  ],
  tamil: [
    {
      id: 49n,
      title: "Tamil Vowels உயிரெழுத்துகள்",
      body: "அ ஆ இ ஈ உ ஊ — Tamil vowels! அ for அம்மா (mother), ஆ for ஆடு (goat)",
      image: "",
      emoji: "📝",
    },
    {
      id: 50n,
      title: "Tamil Consonants மெய்யெழுத்துகள்",
      body: "க ச ட த ப ம — Tamil consonants! க for கோழி (hen), ம for மரம் (tree)",
      image: "",
      emoji: "✍️",
    },
    {
      id: 51n,
      title: "Animals in Tamil",
      body: "விலங்குகள்: பசு (cow) 🐄, குதிரை (horse) 🐴, யானை (elephant) 🐘, சிங்கம் (lion) 🦁",
      image: "",
      emoji: "🐄",
    },
    {
      id: 52n,
      title: "Colors in Tamil",
      body: "வண்ணங்கள்: சிவப்பு (red) 🔴, பச்சை (green) 🟢, மஞ்சள் (yellow) 🟡, நீலம் (blue) 🔵",
      image: "",
      emoji: "🎨",
    },
    {
      id: 53n,
      title: "Numbers in Tamil",
      body: "எண்கள்: ஒன்று (1), இரண்டு (2), மூன்று (3), நான்கு (4), ஐந்து (5)",
      image: "",
      emoji: "🔢",
    },
    {
      id: 54n,
      title: "Body Parts Tamil",
      body: "உடல் உறுப்புகள்: தலை (head), கண்கள் (eyes), கை (hand), கால் (leg), மூக்கு (nose)",
      image: "",
      emoji: "🫀",
    },
    {
      id: 55n,
      title: "Fruits Tamil",
      body: "பழங்கள்: மாம்பழம் (mango) 🥭, வாழைப்பழம் (banana) 🍌, திராட்சை (grapes) 🍇",
      image: "",
      emoji: "🥭",
    },
    {
      id: 56n,
      title: "Greetings Tamil",
      body: "வணக்கம் (Vanakkam) 🙏, நன்றி (Thank you), காலை வணக்கம் (Good morning)",
      image: "",
      emoji: "🙏",
    },
  ],
};

// Subject-specific gradient backgrounds for the illustration area
const SUBJECT_GRADIENTS: Record<string, string> = {
  math: "from-sunshine-300 to-tangerine-300",
  alphabet: "from-sky-300 to-lavender-300",
  science: "from-grass-300 to-mint-300",
  telugu: "from-tangerine-300 to-cherry-300",
  hindi: "from-cherry-200 to-lavender-300",
  english: "from-sky-200 to-grass-200",
  tamil: "from-mint-300 to-sky-300",
};

export default function Lessons() {
  const search = useSearch({ strict: false }) as {
    ageGroup?: string;
    subject?: string;
  };
  const subject = search.subject || "math";
  const { identity } = useInternetIdentity();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== "undefined" ? window.speechSynthesis : null,
  );

  const { data: backendLessons, isLoading } = useGetLessons();
  const { data: sessionProgress } = useGetSessionProgress();
  const completeLessonMutation = useCompleteLesson();

  const lessons =
    backendLessons && backendLessons.length > 0
      ? backendLessons.map((l) => ({ ...l, emoji: "📖" }))
      : FALLBACK_LESSONS[subject] || FALLBACK_LESSONS.math;

  const currentLesson = lessons[currentIndex];
  const completedIds = sessionProgress?.completedLessons?.map(String) || [];
  const isCompleted = currentLesson
    ? completedIds.includes(String(currentLesson.id))
    : false;

  const handleSpeak = () => {
    if (!synthRef.current || !currentLesson) return;
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${currentLesson.title}. ${currentLesson.body}`,
    );
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
    subject === "math"
      ? "🔢"
      : subject === "alphabet"
        ? "🔤"
        : subject === "science"
          ? "🔬"
          : subject === "telugu"
            ? "🌺"
            : subject === "hindi"
              ? "🪔"
              : subject === "tamil"
                ? "🌺"
                : "📖";

  const gradientClass = SUBJECT_GRADIENTS[subject] || SUBJECT_GRADIENTS.math;

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
        <p className="font-bold text-3xl text-muted-foreground">
          No lessons found!
        </p>
      </div>
    );
  }

  const lessonEmoji =
    (currentLesson as { emoji?: string }).emoji || subjectEmoji;

  return (
    <div className="animate-fade-slide-in max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="font-bold text-4xl md:text-5xl text-foreground">
          {subjectEmoji} {subjectLabel} Lessons
        </h1>
        <p className="font-nunito text-xl text-muted-foreground font-semibold">
          Lesson {currentIndex + 1} of {lessons.length}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {lessons.map((lesson, i) => {
          const done = completedIds.includes(String(lesson.id));
          return (
            <button
              key={String(lesson.id)}
              type="button"
              data-ocid={`lesson.item.${i + 1}`}
              onClick={() => {
                synthRef.current?.cancel();
                setIsSpeaking(false);
                setCurrentIndex(i);
              }}
              className={`w-5 h-5 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-tangerine-500 scale-125"
                  : done
                    ? "bg-grass-500"
                    : "bg-muted"
              }`}
            />
          );
        })}
      </div>

      {/* Lesson Card */}
      <div className="bg-card rounded-3xl border-4 border-sunshine-400 shadow-card overflow-hidden mb-6">
        {/* Full-width illustration area */}
        <div
          className={`bg-gradient-to-br ${gradientClass} h-64 md:h-72 flex flex-col items-center justify-center gap-4 relative`}
        >
          {currentLesson.image ? (
            <img
              src={currentLesson.image}
              alt={currentLesson.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <span
                className="select-none drop-shadow-lg leading-none"
                style={{ fontSize: "10rem" }}
              >
                {lessonEmoji}
              </span>
              <span className="font-bold text-3xl text-white drop-shadow-md text-center px-4">
                {currentLesson.title}
              </span>
            </>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="font-bold text-3xl text-foreground flex-1">
              {currentLesson.title}
            </h2>
            {isCompleted && (
              <CheckCircle className="text-grass-500 shrink-0 mt-1" size={32} />
            )}
          </div>
          <p className="font-nunito text-foreground leading-relaxed text-2xl">
            {currentLesson.body}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          data-ocid="lesson.toggle"
          onClick={handleSpeak}
          className={`touch-target flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-nunito font-bold text-lg shadow-fun hover:scale-105 active:scale-95 transition-all ${
            isSpeaking
              ? "bg-cherry-500 text-white"
              : "bg-tangerine-400 text-white hover:bg-tangerine-300"
          }`}
        >
          {isSpeaking ? <VolumeX size={22} /> : <Volume2 size={22} />}
          {isSpeaking ? "Stop" : "Listen"}
        </button>

        {identity && !isCompleted && (
          <button
            type="button"
            data-ocid="lesson.primary_button"
            onClick={handleComplete}
            disabled={completeLessonMutation.isPending}
            className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-grass-500 text-white font-nunito font-bold text-lg shadow-fun hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
          >
            <CheckCircle size={22} />
            {completeLessonMutation.isPending ? "Saving..." : "Mark Complete"}
          </button>
        )}
        {isCompleted && (
          <div
            data-ocid="lesson.success_state"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-grass-100 border-4 border-grass-400 text-grass-700 font-nunito font-bold text-lg"
          >
            <CheckCircle size={22} /> Completed!
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          data-ocid="lesson.pagination_prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-muted font-nunito font-bold text-lg hover:bg-muted/80 disabled:opacity-40 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={22} /> Prev
        </button>
        <button
          type="button"
          data-ocid="lesson.pagination_next"
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
          className="touch-target flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-sunshine-400 text-foreground font-nunito font-bold text-lg hover:bg-sunshine-300 disabled:opacity-40 transition-all shadow-fun hover:scale-105 active:scale-95"
        >
          Next <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
