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
import { speakWord } from "../utils/speech";

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
      body: "1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣\nOne, Two, Three, Four, Five!\n\nఒకటి రెండు మూడు నాలుగు అయిదు (Telugu)\nएक दो तीन चार पाँच (Hindi)\nஒன்று இரண்டு மூன்று நான்கு ஐந்து (Tamil)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "🍎",
    },
    {
      id: 2n,
      title: "Counting to 10",
      body: "Count the stars! ⭐\n1 2 3 4 5 6 7 8 9 10\n\nఒకటి నుండి పది (Telugu)\nएक से दस (Hindi)\nஒன்று முதல் பத்து (Tamil)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "⭐",
    },
    {
      id: 3n,
      title: "Simple Addition",
      body: "2 + 3 = 5\n🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎\n\nTwo apples PLUS three = Five!\nరెండు + మూడు = అయిదు (Telugu)\nدو + تین = पाँच (Hindi)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "➕",
    },
    {
      id: 4n,
      title: "Simple Subtraction",
      body: "5 − 2 = 3\n🍌🍌🍌🍌🍌 − 🍌🍌 = 🍌🍌🍌\n\nFive MINUS two = Three!\nఅయిదు − రెండు = మూడు (Telugu)\nपाँच − दो = तीन (Hindi)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "➖",
    },
    {
      id: 5n,
      title: "Shapes: Circle & Square",
      body: "○ Circle — Sun ☀️, Ball 🏀, Clock ⏰\n□ Square — Dice 🎲, Tile, Window\n\nవృత్తం = Circle | చతురస్రం = Square (Telugu)\nवृत्त = Circle | वर्ग = Square (Hindi)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "○",
    },
    {
      id: 6n,
      title: "Multiplication Tables",
      body: "2 × 3 = 6\n3 × 4 = 12\n5 × 5 = 25\n\n🍪🍪 | 🍪🍪 | 🍪🍪 = 6 cookies!\nమూడు × నాలుగు = పన్నెండు (Telugu)\nतीन × चार = बारह (Hindi)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "✖️",
    },
    {
      id: 7n,
      title: "Division (Sharing)",
      body: "8 ÷ 2 = 4\n🥭🥭🥭🥭🥭🥭🥭🥭 ÷ 2 friends = 4 each!\n\n10 ÷ 5 = 2\nఆరు ÷ రెండు = మూడు (Telugu)\nआठ ÷ दो = चार (Hindi)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "÷",
    },
    {
      id: 8n,
      title: "Telling Time",
      body: "⏰ Short hand = Hours\n🕒 Long hand = Minutes\n\n12 = Noon or Midnight\n3 o'clock = both make an L!\n\nఆరు గంటలు = 6 o'clock (Telugu)\nछह बजे (Hindi)",
      image: "/assets/generated/lesson-math.dim_400x400.png",
      emoji: "⏰",
    },
  ],
  alphabet: [
    {
      id: 11n,
      title: "a is for apple 🍎",
      body: "English: a - apple 🍎\nతెలుగు: అ - అమ్మ 🤰\nहिंदी: अ - अनार 🍊\nதமிழ்: அ - அம்மா 👩",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🍎",
    },
    {
      id: 12n,
      title: "b is for ball 🏀",
      body: "English: b - ball 🏀\nతెలుగు: బ - బంతి 🏀\nहिंदी: ब - बनाना 🍌\nதமிழ்: ப - பந்து 🏀",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🏀",
    },
    {
      id: 13n,
      title: "c is for cat 🐱",
      body: "English: c - cat 🐱\nతెలుగు: క - కాకి 🐦\nहिंदी: क - कमल 🌸\nதமிழ்: க - கை ✋",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🐱",
    },
    {
      id: 14n,
      title: "d is for dog 🐶",
      body: "English: d - dog 🐶\nతెలుగు: డ - డబ్బు 💰\nहिंदी: द - दरवाजा 🚪\nதமிழ்: ட - டம்ளர் 🥁",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🐶",
    },
    {
      id: 15n,
      title: "e is for elephant 🐘",
      body: "English: e - elephant 🐘\nతెలుగు: ఏ - ఏనుగు 🐘\nहिंदी: ए - एलाइची\nதமிழ்: ஏ - ஏணி 🔦",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🐘",
    },
    {
      id: 16n,
      title: "f • g • h",
      body: "f - fish 🐟 | g - grapes 🍇 | h - house 🏠\n\nతెలుగు: ఫ - ఫలం | గ - గుర్రం 🐎 | హ - హంస\nहिंदी: फ - फूल 🌸 | ग - गाय 🐄 | घ - घर 🏠\nதமிழ்: ப - பால் | க - குதிரை | வ - வீடு",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🍇",
    },
    {
      id: 17n,
      title: "i • j • k • l",
      body: "i - ice cream 🍨 | j - jump 🤸 | k - kite 🪁 | l - lion 🦁\n\nతెలుగు: ఇ - ఇల్లు | జ - జిరాఫా 🦒\nहिंदी: इ - इमली | ज - जहाज ⛵\nதமிழ்: இ - இலை 🍃 | ச - சேவல் 🐓",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🦁",
    },
    {
      id: 18n,
      title: "m • n • o • p",
      body: "m - mango 🥭 | n - nest 🪹 | o - orange 🍊 | p - parrot 🦜\n\nతెలుగు: మ - మావిడి 🥭 | న - నదీ 🌊\nहिंदी: म - मंगो | न - नदी 🌊\nதமிழ்: ம - மாம்பழம் | ந - நட்சத்திரம் ⭐",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🥭",
    },
    {
      id: 19n,
      title: "q • r • s • t",
      body: "q - queen 👑 | r - rainbow 🌈 | s - sun ☀️ | t - tiger 🐯\n\nతెలుగు: ర - రాత్రి 🌙 | స - సూర్యుడు ☀️\nहिंदी: र - राजा 👑 | स - सूरज ☀️\nதமிழ்: ர - ராஜா 👑 | ச - சூரியன் ☀️",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🐯",
    },
    {
      id: 20n,
      title: "u • v • w • x • y • z",
      body: "u - umbrella ☂️ | v - violin 🎻 | w - whale 🐋\nx - xylophone 🎹 | y - yak 🐂 | z - zebra 🦓\n\nతెలుగు: వ - వర్షం 🌧️ | జ - జిరాఫా 🦒\nहिंदी: व - वर्षा | ज - ज़ेब्रा 🦓",
      image: "/assets/generated/lesson-alphabet.dim_400x400.png",
      emoji: "🦓",
    },
  ],
  science: [
    {
      id: 21n,
      title: "Plants Need Sun & Water",
      body: "Plants are living things! 🌱\n☀️ Sunlight to make food\n💧 Water to grow\n💨 Air to breathe\n\nచెట్టుకి నీళ్ళు, వెలుతురు, గాలి కావాలి (Telugu)\nपेड़ को पानी, रोशनी, हवा चाहिए (Hindi)",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "🌳",
    },
    {
      id: 22n,
      title: "Wild & Domestic Animals",
      body: "Wild 🌳: 🦁 Lion | 🐘 Elephant | 🐯 Tiger | 🦒 Giraffe\nDomestic 🏠: 🐄 Cow | 🐕 Dog | 🐈 Cat | 🐔 Hen\n\nఅడవి జంతువులు vs ఇంటి జంతువులు (Telugu)\nजंगली vs घरेलू जानवर (Hindi)",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "🦁",
    },
    {
      id: 23n,
      title: "Human Body Parts",
      body: "👤 Head — తల / सिर / தலை\n👁️ Eyes — కళ్ళు / आंखें / கண்கள்\n👃 Nose — ముక్కు / नाक / மூக்கு\n👄 Mouth — నోరు / मुंह / வாய்\n🤲 Hands — చేతులు / हाथ / கைகள்\n🦵 Legs — కాళ్ళు / पैर / கால்கள்",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "🫀",
    },
    {
      id: 24n,
      title: "Weather & Seasons",
      body: "☀️ Sunny | 🌧️ Rainy | ⛅ Cloudy | ❄️ Snowy\n\n4 Seasons:\n🌸 Spring | ☀️ Summer | 🍂 Autumn | ❄️ Winter\n\nరుతువులు (Telugu) | ऋतुएं (Hindi) | பருவங்கள் (Tamil)",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "⛅",
    },
    {
      id: 25n,
      title: "Water Cycle",
      body: "1️⃣ Sun heats water → Evaporation ☀️\n2️⃣ Water rises to sky → Clouds ☁️\n3️⃣ Clouds get heavy → Rain 🌧️\n4️⃣ Rain fills rivers → Back to sea 🌊\n\nనీటి ప్రసరణం (Telugu) | जल चक्र (Hindi)",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "💧",
    },
    {
      id: 26n,
      title: "Sun, Moon & Stars",
      body: "☀️ Sun — gives heat and light\n🌕 Moon — reflects sunlight at night\n⭐ Stars — far away suns!\n\n🌍 Earth = 365 days around the Sun = 1 year!\nపృథ్వి / पृथ्वी / பூமி — our home planet!",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "☀️",
    },
    {
      id: 27n,
      title: "Fruits & Vegetables",
      body: "Fruits (have seeds):\n🍎 Apple | 🍌 Banana | 🥭 Mango | 🍊 Orange\n\nVegetables (roots/leaves):\n🥕 Carrot | 🥦 Broccoli | 🧅 Onion | 🍅 Tomato\n\nపండ్లు (fruits) | కూరలు (vegetables) (Telugu)",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "🍎",
    },
    {
      id: 28n,
      title: "Insects & Bugs",
      body: "Insects = 6 legs + 3 body parts!\n🦋 Butterfly | 🐝 Bee | 🐜 Ant | 🐞 Ladybug\n\nBees make honey 🍯\nButterflies start as caterpillars! 🐛→🦋\n\nకీటకాలు (Telugu) | கீடங்கள் (Tamil)",
      image: "/assets/generated/lesson-science.dim_400x400.png",
      emoji: "🦋",
    },
  ],
  telugu: [
    {
      id: 31n,
      title: "అ - అమ్మ 🤰",
      body: "అచ్చులు (Telugu Vowels):\n\nఅ - అమ్మ (Mother) 🤰\nఆ - ఆవు (Cow) 🐄\nఇ - ఇల్లు (House) 🏠\nఈ - ఈగ (Fly)\nఉ - ఉడుత (Squirrel) 🐿️\nఊ - ఉషధం (Medicine) 💊",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "✏️",
    },
    {
      id: 32n,
      title: "క - కాకి 🐦",
      body: "హల్లులు (Telugu Consonants):\n\nక - కాకి (Crow) 🐦\nఖ - ఖడ్గం (Sword) ⚔️\nగ - గుర్రం (Horse) 🐎\nఘ - ఘంట (Bell) 🔔\nచ - చేప (Fish) 🐟\nజ - జడ (Braid) 🌀",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🐦",
    },
    {
      id: 33n,
      title: "జంతువులు (Animals)",
      body: "జంతువులు (Animals in Telugu):\n\nఆవు = Cow 🐄\nగుర్రం = Horse 🐎\nఏనుగు = Elephant 🐘\nపులి = Tiger 🐯\nసింహం = Lion 🦁\nచేప = Fish 🐟",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🐘",
    },
    {
      id: 34n,
      title: "రంగులు (Colors)",
      body: "రంగులు (Colors in Telugu):\n\nఎరుపు = Red 🔴\nపచ్చ = Green 🟢\nపసుపు = Yellow 🟡\nనీలం = Blue 🔵\nతెలుపు = White ⚪\nనలుపు = Black ⚫",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🎨",
    },
    {
      id: 35n,
      title: "సంఖ్యలు (Numbers 1-10)",
      body: "1 = ఒకటి\n2 = రెండు\n3 = మూడు\n4 = నాలుగు\n5 = అయిదు\n6 = ఆరు\n7 = ఏడు\n8 = ఎనిమిది\n9 = తొమ్మిది\n10 = పది",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🔢",
    },
    {
      id: 36n,
      title: "శరీర భాగాలు (Body Parts)",
      body: "తల = Head 👤\nకళ్ళు = Eyes 👁️\nముక్కు = Nose 👃\nనోరు = Mouth 👄\nచెవి = Ear 👂\nచేతులు = Hands 🤲\nకాళ్ళు = Legs 🦵",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🫀",
    },
    {
      id: 37n,
      title: "పళ్ళు (Fruits)",
      body: "మావిడి = Mango 🥭\nఅరటి = Banana 🍌\nద్రాక్ష = Grapes 🍇\nనిమ్మ = Lemon 🍋\nనారింజ = Orange 🍊\nసేబు = Apple 🍎",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🥭",
    },
    {
      id: 38n,
      title: "మర్యాదలు (Greetings)",
      body: "నమస్కారం = Hello 🙏\nధన్యవాదాలు = Thank you\nశుభోదయం = Good morning 🌞\nశుభసాయంత్రం = Good evening 🌇\nశుభరాత్రి = Good night 🌙",
      image: "/assets/generated/lesson-telugu.dim_400x400.png",
      emoji: "🙏",
    },
  ],
  hindi: [
    {
      id: 39n,
      title: "अ - अनार",
      body: "हिंदी स्वर (Hindi Vowels):\n\nअ - अनार (Pomegranate) 🍊\nआ - आम (Mango) 🥭\nइ - इमली (Tamarind) 🌳\nई - ईख (Sugarcane) 🌾\nउ - उल्लू (Owl) 🦉\nऊ - ऊँट (Camel) 🐪",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "✏️",
    },
    {
      id: 40n,
      title: "क - कमल 🌸",
      body: "हिंदी व्यंजन (Hindi Consonants):\n\nक - कमल (Lotus) 🌸\nख - खरगोश (Rabbit) 🐰\nग - गाय (Cow) 🐄\nघ - घर (House) 🏠\nच - चाँद (Moon) 🌙\nछ - छतरी (Umbrella) ☂️",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🌸",
    },
    {
      id: 41n,
      title: "जानवर (Animals)",
      body: "गाय = Cow 🐄\nघोड़ा = Horse 🐎\nहाथी = Elephant 🐘\nशेर = Lion 🦁\nबाघ = Tiger 🐯\nमछली = Fish 🐟\nतोता = Parrot 🦜",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🐘",
    },
    {
      id: 42n,
      title: "रंग (Colors)",
      body: "लाल = Red 🔴\nहरा = Green 🟢\nपीला = Yellow 🟡\nनीला = Blue 🔵\nसफेद = White ⚪\nकाला = Black ⚫\nगुलाबी = Pink 🩷",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🎨",
    },
    {
      id: 43n,
      title: "संख्या (Numbers 1-10)",
      body: "1 = एक\n2 = दो\n3 = तीन\n4 = चार\n5 = पाँच\n6 = छह\n7 = सात\n8 = आठ\n9 = नौ\n10 = दस",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🔢",
    },
    {
      id: 44n,
      title: "शरीर के अंग (Body Parts)",
      body: "सिर = Head 👤\nआँखें = Eyes 👁️\nनाक = Nose 👃\nमुंह = Mouth 👄\nकान = Ear 👂\nहाथ = Hands 🤲\nपैर = Legs 🦵",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🫀",
    },
    {
      id: 45n,
      title: "फल (Fruits)",
      body: "आम = Mango 🥭\nकेला = Banana 🍌\nअंगूर = Grapes 🍇\nनींबू = Lemon 🍋\nसंतरा = Orange 🍊\nसेब = Apple 🍎",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🥭",
    },
    {
      id: 46n,
      title: "अभिवादन (Greetings)",
      body: "नमस्ते = Hello 🙏\nधन्यवाद = Thank you\nशुभ प्रभात = Good morning 🌞\nशुभ संध्या = Good evening 🌇\nशुभ रात्रि = Good night 🌙",
      image: "/assets/generated/lesson-hindi.dim_400x400.png",
      emoji: "🙏",
    },
  ],
  english: [
    {
      id: 47n,
      title: "Greetings & Feelings",
      body: "Hello! 👋 Good morning! 🌞\nHow are you? I am fine, thank you! 😊\n\n😊 Happy | 😢 Sad | 😠 Angry\n😱 Scared | 🤯 Surprised | 😄 Excited",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "👋",
    },
    {
      id: 48n,
      title: "Colors of the Rainbow",
      body: "🌈 Rainbow has 7 colors!\nR - Red 🔴\nO - Orange 🟠\nY - Yellow 🟡\nG - Green 🟢\nB - Blue 🔵\nI - Indigo | V - Violet\n\nRemember: ROY G BIV!",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "🌈",
    },
    {
      id: 49n,
      title: "Wild Animals",
      body: "🦁 Lion — King of the jungle\n🐘 Elephant — largest land animal\n🐯 Tiger — fastest big cat\n🦒 Giraffe — tallest animal\n🐻 Bear — loves honey 🍯\n🐊 Crocodile — lives in rivers",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "🦁",
    },
    {
      id: 50n,
      title: "Fruits We Love",
      body: "🍎 Apple — keeps the doctor away!\n🍌 Banana — monkeys love it!\n🥭 Mango — king of fruits!\n🍊 Orange — full of Vitamin C!\n🍇 Grapes — come in bunches!\n🍓 Strawberry — red and sweet!",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "🍎",
    },
    {
      id: 51n,
      title: "Vegetables & Health",
      body: "🥕 Carrot — good for your eyes 👀\n🥦 Broccoli — like little trees!\n🍅 Tomato — red and juicy\n🧅 Onion — makes us cry! 😭\n🌽 Corn — yellow and sweet\n🥔 Potato — chips are made from this!",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "🥦",
    },
    {
      id: 52n,
      title: "Numbers 1 to 20",
      body: "1️⃣ One | 2️⃣ Two | 3️⃣ Three | 4️⃣ Four | 5️⃣ Five\n6️⃣ Six | 7️⃣ Seven | 8️⃣ Eight | 9️⃣ Nine | 🔟 Ten\n\n11 Eleven | 12 Twelve | 13 Thirteen | 14 Fourteen | 15 Fifteen\n16–20: Sixteen, Seventeen, Eighteen, Nineteen, Twenty!",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "🔢",
    },
    {
      id: 53n,
      title: "Action Words (Verbs)",
      body: "🏃 Run | 🦘 Jump | 🍽️ Eat | 💤 Sleep\n🎮 Play | 📚 Read | ✍️ Write | 🎵 Sing\n💃 Dance | 😂 Laugh | 🏄 Swim\n🧐 Think | 🗣️ Talk | 👁️ Look",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "🏃",
    },
    {
      id: 54n,
      title: "Family Members",
      body: "👩 Mother (Amma / Maa / Amma)\n👨 Father (Nanna / Papa / Appa)\n👧 Sister (Akka / Didi / Akka)\n👦 Brother (Anna / Bhai / Anna)\n👵 Grandmother (Paati / Dadi / Paati)\n👴 Grandfather (Thatha / Dada / Thatha)",
      image: "/assets/generated/lesson-english.dim_400x400.png",
      emoji: "👨‍👩‍👧‍👦",
    },
  ],
  tamil: [
    {
      id: 57n,
      title: "அ - அம்மா 👩",
      body: "தமிழ் உயிரெழுத்துகள் (Vowels):\n\nஅ - அம்மா (Mother) 👩\nஆ - ஆடு (Goat) 🐐\nஇ - இலை (Leaf) 🍃\nஈ - ஈசல்\nஉ - உணவு (Food) 🍚\nஊ - ஊசி (Needle) 🧵",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "✏️",
    },
    {
      id: 58n,
      title: "க - கொழி 🐓",
      body: "தமிழ் மெய்யெழுத்துகள் (Consonants):\n\nக - கொழி (Hen) 🐓\nச - சேவல் (Rooster) 🐓\nட - டம்ளர் 🥁\nத - தாய் (Mother) 👩\nப - பறவை (Bird) 🐦\nம - மரம் (Tree) 🌳",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🐓",
    },
    {
      id: 59n,
      title: "விலங்குகள் (Animals)",
      body: "பசு = Cow 🐄\nகுதிரை = Horse 🐎\nயானை = Elephant 🐘\nசிங்கம் = Lion 🦁\nபுலி = Tiger 🐯\nமீன் = Fish 🐟\nகிளி = Parrot 🦜",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🐘",
    },
    {
      id: 60n,
      title: "வண்ணங்கள் (Colors)",
      body: "சிவப்பு = Red 🔴\nபச்சை = Green 🟢\nமஞ்சள் = Yellow 🟡\nநீலம் = Blue 🔵\nவெள்ளை = White ⚪\nகறுப்பு = Black ⚫",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🎨",
    },
    {
      id: 61n,
      title: "எண்கள் (Numbers 1-10)",
      body: "1 = ஒன்று\n2 = இரண்டு\n3 = மூன்று\n4 = நான்கு\n5 = ஐந்து\n6 = ஆறு\n7 = ஏழு\n8 = எட்டு\n9 = ஒம்பது\n10 = பத்து",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🔢",
    },
    {
      id: 62n,
      title: "உடல் உறுப்புகள் (Body Parts)",
      body: "தலை = Head 👤\nகண்கள் = Eyes 👁️\nமூக்கு = Nose 👃\nவாய் = Mouth 👄\nகாது = Ear 👂\nகைகள் = Hands 🤲\nகால்கள் = Legs 🦵",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🫀",
    },
    {
      id: 63n,
      title: "பழங்கள் (Fruits)",
      body: "மாம்பழம் = Mango 🥭\nவாழைப்பழம் = Banana 🍌\nதிராட்சை = Grapes 🍇\nஎலுமிச்சம்பழம் = Lemon 🍋\nஆரஞ்சு = Orange 🍊\nஆப்பிள் = Apple 🍎",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🥭",
    },
    {
      id: 64n,
      title: "வணக்கம் (Greetings)",
      body: "வணக்கம் = Hello 🙏\nநன்றி = Thank you\nகாலை வணக்கம் = Good morning 🌞\nமாலை வணக்கம் = Good evening 🌇\nஇரவு வணக்கம் = Good night 🌙",
      image: "/assets/generated/lesson-tamil.dim_400x400.png",
      emoji: "🙏",
    },
  ],
};

const SUBJECT_GRADIENTS: Record<string, string> = {
  math: "from-sunshine-300 to-tangerine-400",
  alphabet: "from-sky-300 to-lavender-400",
  science: "from-grass-300 to-mint-400",
  telugu: "from-tangerine-300 to-cherry-400",
  hindi: "from-cherry-200 to-lavender-400",
  english: "from-sky-200 to-grass-300",
  tamil: "from-mint-300 to-sky-400",
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
    if (!currentLesson) return;
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakWord(`${currentLesson.title}. ${currentLesson.body}`, "en-US").then(
      () => {
        setIsSpeaking(false);
      },
    );
  };

  const handleComplete = async () => {
    if (!currentLesson || isCompleted || !identity) return;
    try {
      await completeLessonMutation.mutateAsync(BigInt(currentLesson.id));
    } catch {
      // ignore
    }
  };

  const handlePrev = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentIndex((i) => Math.min(lessons.length - 1, i + 1));
  };

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
                ? "🌸"
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

  const lessonImage = (currentLesson as { image?: string }).image || "";
  const lessonEmoji =
    (currentLesson as { emoji?: string }).emoji || subjectEmoji;

  return (
    <div
      className="flex flex-col w-full min-h-screen bg-gray-50"
      data-ocid="lesson.page"
    >
      {/* Progress dots strip */}
      <div className="flex justify-center gap-2 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100 flex-wrap px-4">
        {lessons.map((lesson, i) => {
          const done = completedIds.includes(String(lesson.id));
          return (
            <button
              key={String(lesson.id)}
              type="button"
              data-ocid={`lesson.item.${i + 1}`}
              onClick={() => {
                window.speechSynthesis?.cancel();
                setIsSpeaking(false);
                setCurrentIndex(i);
              }}
              className={`w-4 h-4 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-tangerine-500 scale-125 ring-2 ring-tangerine-300"
                  : done
                    ? "bg-grass-500"
                    : "bg-gray-300"
              }`}
            />
          );
        })}
        <span className="text-sm font-bold text-gray-500 ml-2 self-center">
          {currentIndex + 1}/{lessons.length}
        </span>
      </div>

      {/* FULL-SCREEN image area */}
      <div
        className={`relative bg-gradient-to-br ${gradientClass} flex-shrink-0`}
        style={{ height: "55vw", maxHeight: "420px", minHeight: "240px" }}
      >
        {lessonImage ? (
          <img
            src={lessonImage}
            alt={currentLesson.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="select-none drop-shadow-2xl"
              style={{ fontSize: "clamp(5rem, 18vw, 10rem)" }}
            >
              {lessonEmoji}
            </span>
          </div>
        )}
        {/* Lesson counter badge */}
        <div className="absolute top-3 right-3 bg-black/40 text-white text-sm font-bold rounded-full px-3 py-1 backdrop-blur-sm">
          {subjectEmoji} {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </div>
        {isCompleted && (
          <div className="absolute top-3 left-3 bg-grass-500 text-white text-sm font-bold rounded-full px-3 py-1 flex items-center gap-1">
            <CheckCircle size={14} /> Done!
          </div>
        )}
      </div>

      {/* Title */}
      <div className="bg-white px-5 pt-4 pb-2">
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800 leading-tight">
          {currentLesson.title}
        </h2>
      </div>

      {/* Body text */}
      <div className="flex-1 bg-white px-5 pb-4 overflow-y-auto">
        <p className="text-gray-700 leading-relaxed text-xl font-bold whitespace-pre-line">
          {currentLesson.body}
        </p>
      </div>

      {/* Controls */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
        <button
          type="button"
          data-ocid="lesson.pagination_prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center justify-center gap-1 px-4 py-3 rounded-2xl bg-gray-100 font-bold text-base hover:bg-gray-200 disabled:opacity-40 transition-all active:scale-95 min-w-[64px]"
        >
          <ChevronLeft size={20} /> Prev
        </button>

        <button
          type="button"
          data-ocid="lesson.toggle"
          onClick={handleSpeak}
          className={`flex items-center justify-center gap-1 px-4 py-3 rounded-2xl font-bold text-base transition-all active:scale-95 ${
            isSpeaking
              ? "bg-cherry-500 text-white"
              : "bg-tangerine-400 text-white hover:bg-tangerine-300"
          }`}
        >
          {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
          {isSpeaking ? "Stop" : "Listen"}
        </button>

        {identity && !isCompleted && (
          <button
            type="button"
            data-ocid="lesson.primary_button"
            onClick={handleComplete}
            disabled={completeLessonMutation.isPending}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-2xl bg-grass-500 text-white font-bold text-base transition-all active:scale-95 disabled:opacity-60"
          >
            <CheckCircle size={18} />
            {completeLessonMutation.isPending ? "Saving..." : "Complete"}
          </button>
        )}

        <button
          type="button"
          data-ocid="lesson.pagination_next"
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
          className="flex items-center justify-center gap-1 px-4 py-3 rounded-2xl bg-sunshine-400 text-gray-800 font-bold text-base hover:bg-sunshine-300 disabled:opacity-40 transition-all active:scale-95 min-w-[64px]"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
