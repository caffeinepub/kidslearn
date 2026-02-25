import { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

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

const LANG_COLORS: Record<Language, { card: string; header: string; btn: string; tab: string; tabActive: string }> = {
  english: {
    card: 'border-sky-400',
    header: 'bg-sky-100',
    btn: 'bg-sky-500 hover:bg-sky-600',
    tab: 'border-sky-300 text-sky-700 hover:bg-sky-50',
    tabActive: 'bg-sky-500 border-sky-700 text-white shadow-fun',
  },
  telugu: {
    card: 'border-grass-400',
    header: 'bg-grass-100',
    btn: 'bg-grass-500 hover:bg-grass-600',
    tab: 'border-grass-300 text-grass-700 hover:bg-grass-50',
    tabActive: 'bg-grass-500 border-grass-700 text-white shadow-fun',
  },
  hindi: {
    card: 'border-tangerine-400',
    header: 'bg-tangerine-100',
    btn: 'bg-tangerine-500 hover:bg-tangerine-600',
    tab: 'border-tangerine-300 text-tangerine-700 hover:bg-tangerine-50',
    tabActive: 'bg-tangerine-500 border-tangerine-700 text-white shadow-fun',
  },
  tamil: {
    card: 'border-cherry-400',
    header: 'bg-cherry-100',
    btn: 'bg-cherry-500 hover:bg-cherry-600',
    tab: 'border-cherry-300 text-cherry-700 hover:bg-cherry-50',
    tabActive: 'bg-cherry-500 border-cherry-700 text-white shadow-fun',
  },
};

interface Poem {
  id: string;
  title: string;
  lines: string[];
  emoji: string;
  description: string;
}

const POEMS_DATA: Record<Language, Poem[]> = {
  english: [
    {
      id: 'twinkle',
      title: 'Twinkle Twinkle Little Star',
      emoji: '⭐',
      description: 'A classic bedtime nursery rhyme',
      lines: [
        'Twinkle, twinkle, little star,',
        'How I wonder what you are!',
        'Up above the world so high,',
        'Like a diamond in the sky.',
        'Twinkle, twinkle, little star,',
        'How I wonder what you are!',
      ],
    },
    {
      id: 'humpty',
      title: 'Humpty Dumpty',
      emoji: '🥚',
      description: 'A fun rhyme about a big fall',
      lines: [
        "Humpty Dumpty sat on a wall,",
        "Humpty Dumpty had a great fall.",
        "All the king's horses and all the king's men,",
        "Couldn't put Humpty together again.",
      ],
    },
    {
      id: 'baa',
      title: 'Baa Baa Black Sheep',
      emoji: '🐑',
      description: 'A rhyme about a woolly sheep',
      lines: [
        'Baa, baa, black sheep,',
        'Have you any wool?',
        'Yes sir, yes sir,',
        'Three bags full!',
        'One for the master,',
        'One for the dame,',
        'And one for the little boy',
        'Who lives down the lane.',
      ],
    },
    {
      id: 'jackjill',
      title: 'Jack and Jill',
      emoji: '🪣',
      description: 'A rhyme about two children fetching water',
      lines: [
        'Jack and Jill went up the hill,',
        'To fetch a pail of water.',
        'Jack fell down and broke his crown,',
        'And Jill came tumbling after.',
      ],
    },
    {
      id: 'rain',
      title: 'Rain, Rain, Go Away',
      emoji: '🌧️',
      description: 'A rainy day rhyme for children',
      lines: [
        'Rain, rain, go away,',
        'Come again another day.',
        'Little children want to play,',
        'Rain, rain, go away!',
      ],
    },
  ],
  telugu: [
    {
      id: 'chandamama',
      title: 'చందమామ రావే',
      emoji: '🌙',
      description: 'Moon come down — a beloved Telugu lullaby',
      lines: [
        'చందమామ రావే జాబిల్లి రావే,',
        'పాల పిండి వంటలు చేసే,',
        'పాపకు పెట్టే,',
        'పాప నవ్వే,',
        'పాప పాడే,',
        'పాప ఆడే.',
      ],
    },
    {
      id: 'ammamma',
      title: 'అమ్మ పాట',
      emoji: '👩',
      description: 'A sweet song about mother',
      lines: [
        'అమ్మ అమ్మ ఎంత మంచిది,',
        'ప్రేమతో పెంచే ఎంత గొప్పది,',
        'పాలు పోసి నిద్ర పుచ్చే,',
        'కథలు చెప్పి నవ్వించే,',
        'అమ్మ లేని జీవితం లేదు,',
        'అమ్మ ప్రేమకు సాటి లేదు.',
      ],
    },
    {
      id: 'pakshi',
      title: 'పక్షి పాట',
      emoji: '🐦',
      description: 'A song about a little bird',
      lines: [
        'పక్షి పక్షి ఎక్కడికి వెళ్ళావు,',
        'ఆకాశంలో ఎగిరావు,',
        'పాట పాడావు,',
        'మళ్ళీ వచ్చావు,',
        'గూటికి చేరావు,',
        'పిల్లలకు తిండి తెచ్చావు.',
      ],
    },
    {
      id: 'chinni',
      title: 'చిన్ని చిన్ని ఆశ',
      emoji: '🌟',
      description: 'Little little wishes — a popular Telugu rhyme',
      lines: [
        'చిన్ని చిన్ని ఆశ,',
        'చిలిపి కళ్ళ వేషం,',
        'చిన్ని చిన్ని నవ్వు,',
        'చిందు వేసే మనసు,',
        'పాటలు పాడే పాప,',
        'ఆడుకునే బాప.',
      ],
    },
    {
      id: 'gulaabi',
      title: 'గులాబి పువ్వు',
      emoji: '🌹',
      description: 'A poem about a beautiful rose',
      lines: [
        'గులాబి పువ్వు ఎంత అందం,',
        'ఎర్రగా ఉంది ఎంత మందం,',
        'తోటలో పూసింది,',
        'సువాసన వేసింది,',
        'అందరికీ నచ్చింది,',
        'మనసు దోచింది.',
      ],
    },
  ],
  hindi: [
    {
      id: 'machhli',
      title: 'मछली जल की रानी है',
      emoji: '🐟',
      description: 'Fish is the queen of water',
      lines: [
        'मछली जल की रानी है,',
        'जीवन उसका पानी है।',
        'हाथ लगाओ डर जाएगी,',
        'बाहर निकालो मर जाएगी।',
      ],
    },
    {
      id: 'chanda',
      title: 'चंदा मामा दूर के',
      emoji: '🌙',
      description: 'Uncle Moon far away — a classic Hindi lullaby',
      lines: [
        'चंदा मामा दूर के,',
        'पुए पकाए बूर के।',
        'आप खाएं थाली में,',
        'मुन्ने को दें प्याली में।',
        'प्याली गई टूट,',
        'मुन्ना गया रूठ।',
      ],
    },
    {
      id: 'aloo',
      title: 'आलू कचालू',
      emoji: '🥔',
      description: 'A funny rhyme about potatoes',
      lines: [
        'आलू कचालू बेटा कहाँ गए थे,',
        'बन्दर की टोपी लेकर भागे थे।',
        'बन्दर ने मारी लात,',
        'आलू हो गए पस्त।',
        'अम्मा ने दिया प्यार,',
        'आलू हुए तैयार।',
      ],
    },
    {
      id: 'lakdi',
      title: 'लकड़ी की काठी',
      emoji: '🐴',
      description: 'A playful rhyme about a wooden horse',
      lines: [
        'लकड़ी की काठी, काठी पे घोड़ा,',
        'घोड़े की दुम पे जो मारा हथौड़ा,',
        'दौड़ा दौड़ा दौड़ा घोड़ा दुम उठाके दौड़ा।',
        'घोड़ा दौड़ा, घोड़ा दौड़ा,',
        'हम भी दौड़े, तुम भी दौड़ो।',
      ],
    },
    {
      id: 'nani',
      title: 'नानी तेरी मोरनी',
      emoji: '🦚',
      description: 'Grandma\'s peacock — a beloved Hindi rhyme',
      lines: [
        'नानी तेरी मोरनी को मोर ले गए,',
        'बाकी जो बचा था काले चोर ले गए।',
        'नानी ने बुलाया, नाना ने सुना,',
        'मोरनी को ढूंढो, जल्दी से चलो।',
      ],
    },
  ],
  tamil: [
    {
      id: 'nilavu',
      title: 'நிலாவே நிலாவே',
      emoji: '🌙',
      description: 'Moon, oh Moon — a Tamil lullaby',
      lines: [
        'நிலாவே நிலாவே வா வா வா,',
        'நீலவானில் ஓடி வா,',
        'குழந்தைகளுக்கு வெளிச்சம் தா,',
        'கதை சொல்லி தூங்க வை,',
        'இனிமையாய் பாடி வா,',
        'இரவெல்லாம் காத்திரு.',
      ],
    },
    {
      id: 'kaakaa',
      title: 'காக்கா காக்கா',
      emoji: '🐦',
      description: 'Crow, crow — a fun Tamil rhyme',
      lines: [
        'காக்கா காக்கா கரு காக்கா,',
        'கல்லு எடுத்து கரும் காக்கா,',
        'கல்லு எறிஞ்சு ஓட காக்கா,',
        'கரும் காக்கா ஓடி போ,',
        'மீண்டும் வராதே காக்கா,',
        'சாப்பிட வேண்டாம் காக்கா.',
      ],
    },
    {
      id: 'paapaa',
      title: 'பாப்பா பாட்டு',
      emoji: '👶',
      description: 'Baby song — a sweet Tamil nursery rhyme',
      lines: [
        'பாப்பா பாப்பா பால் குடி,',
        'பாலை குடித்து வளர்ந்திடு,',
        'நல்லவனாய் வாழ்ந்திடு,',
        'நாட்டுக்கு நலம் செய்திடு,',
        'படித்து பெரியவனாகு,',
        'பாரதம் காத்திடு.',
      ],
    },
    {
      id: 'aaduvome',
      title: 'ஆடுவோமே பள்ளு பாடுவோமே',
      emoji: '🎶',
      description: 'Let us dance and sing — a joyful Tamil rhyme',
      lines: [
        'ஆடுவோமே பள்ளு பாடுவோமே,',
        'ஆனந்தமாய் வாழ்ந்திடுவோமே,',
        'கூடி விளையாடுவோமே,',
        'கொண்டாடி மகிழ்வோமே,',
        'நட்பாய் இருப்போமே,',
        'நலமாய் வாழ்வோமே.',
      ],
    },
    {
      id: 'chinna',
      title: 'சின்ன சின்ன ஆசை',
      emoji: '🌟',
      description: 'Little little wishes — a popular Tamil song',
      lines: [
        'சின்ன சின்ன ஆசை,',
        'சிறகு விரிக்கும் பாசை,',
        'வானில் பறக்க வேண்டும்,',
        'வண்ணம் தெரிய வேண்டும்,',
        'பூக்கள் மலர வேண்டும்,',
        'புன்னகை பூக்க வேண்டும்.',
      ],
    },
  ],
};

function speakPoem(lines: string[], langCode: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const text = lines.join(' ');
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export default function PoemsLesson() {
  const [language, setLanguage] = useState<Language>('english');
  const [expandedPoem, setExpandedPoem] = useState<string | null>(null);
  const [speakingPoem, setSpeakingPoem] = useState<string | null>(null);

  const handleSpeak = (poem: Poem) => {
    setSpeakingPoem(poem.id);
    speakPoem(poem.lines, LANG_CODES[language]);
    const duration = poem.lines.join(' ').length * 80;
    setTimeout(() => setSpeakingPoem(null), Math.min(duration, 15000));
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setSpeakingPoem(null);
  };

  const poems = POEMS_DATA[language];
  const colors = LANG_COLORS[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-tangerine-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-tangerine-700 mb-2">
          Poems & Rhymes 📖
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Read and listen to beautiful poems in 4 languages!
        </p>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setExpandedPoem(null); handleStop(); }}
              className={`font-nunito font-bold px-5 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-base ${
                language === lang
                  ? colors.tabActive
                  : colors.tab
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Poems count badge */}
        <div className="flex justify-center mb-6">
          <span className={`font-nunito font-bold px-4 py-1 rounded-full text-sm bg-white border-2 ${colors.card} text-tangerine-700`}>
            <BookOpen size={14} className="inline mr-1" />
            {poems.length} poems in {LANGUAGE_LABELS[language]}
          </span>
        </div>

        {/* Poems List */}
        <div className="flex flex-col gap-4">
          {poems.map((poem, i) => {
            const isExpanded = expandedPoem === poem.id;
            const isSpeaking = speakingPoem === poem.id;
            return (
              <div
                key={poem.id}
                className={`card-enter-${Math.min(i + 1, 8)} bg-white border-4 ${colors.card} rounded-3xl shadow-fun-lg overflow-hidden`}
              >
                {/* Header */}
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer ${colors.header} transition-colors`}
                  onClick={() => setExpandedPoem(isExpanded ? null : poem.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{poem.emoji}</span>
                    <div>
                      <h2 className="font-fredoka text-xl sm:text-2xl text-gray-800 leading-tight">{poem.title}</h2>
                      <p className="font-nunito text-sm text-gray-500">{poem.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSpeaking) {
                          handleStop();
                        } else {
                          handleSpeak(poem);
                        }
                      }}
                      className={`${colors.btn} text-white rounded-2xl px-3 py-2 flex items-center gap-1 font-nunito font-bold text-sm transition-all hover:scale-105 active:scale-95 ${isSpeaking ? 'animate-pulse' : ''}`}
                    >
                      <Volume2 size={16} />
                      {isSpeaking ? 'Stop' : 'Read Aloud'}
                    </button>
                    <span className="text-gray-400">
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronDown size={20} className="rotate-[-90deg]" />}
                    </span>
                  </div>
                </div>

                {/* Poem Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-4 border-t-2 border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      {poem.lines.map((line, lineIdx) => (
                        <p
                          key={lineIdx}
                          className="font-nunito text-lg text-gray-700 leading-relaxed text-center"
                          style={{ fontFamily: language === 'english' ? 'Nunito, sans-serif' : 'Nunito, sans-serif' }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => {
                          if (isSpeaking) {
                            handleStop();
                          } else {
                            handleSpeak(poem);
                          }
                        }}
                        className={`${colors.btn} text-white rounded-2xl px-6 py-3 flex items-center gap-2 font-nunito font-bold text-base transition-all hover:scale-105 active:scale-95 ${isSpeaking ? 'animate-pulse' : ''}`}
                      >
                        <Volume2 size={20} />
                        {isSpeaking ? '🔊 Reading... (tap to stop)' : '🔊 Read Aloud'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="font-nunito text-center text-muted-foreground text-sm mt-8">
          🔊 Tap "Read Aloud" to hear the poem spoken in the selected language!
        </p>
      </div>
    </div>
  );
}
