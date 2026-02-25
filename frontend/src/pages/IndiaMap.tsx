import { useState } from 'react';

type Language = 'english' | 'telugu' | 'hindi' | 'tamil';

const LANGUAGE_LABELS: Record<Language, string> = {
  english: '🇬🇧 English',
  telugu: '🌺 Telugu',
  hindi: '🪔 Hindi',
  tamil: '🌸 Tamil',
};

interface StateInfo {
  id: string;
  names: Record<Language, string>;
  capital: Record<Language, string>;
  emoji: string;
}

const STATES: StateInfo[] = [
  { id: 'andhra', emoji: '🌺', names: { english: 'Andhra Pradesh', telugu: 'ఆంధ్ర ప్రదేశ్', hindi: 'आंध्र प्रदेश', tamil: 'ஆந்திர பிரதேசம்' }, capital: { english: 'Amaravati', telugu: 'అమరావతి', hindi: 'अमरावती', tamil: 'அமராவதி' } },
  { id: 'arunachal', emoji: '🏔️', names: { english: 'Arunachal Pradesh', telugu: 'అరుణాచల్ ప్రదేశ్', hindi: 'अरुणाचल प्रदेश', tamil: 'அருணாசல பிரதேசம்' }, capital: { english: 'Itanagar', telugu: 'ఇటానగర్', hindi: 'ईटानगर', tamil: 'இட்டாநகர்' } },
  { id: 'assam', emoji: '🍵', names: { english: 'Assam', telugu: 'అస్సాం', hindi: 'असम', tamil: 'அசாம்' }, capital: { english: 'Dispur', telugu: 'డిస్పూర్', hindi: 'दिसपुर', tamil: 'டிஸ்பூர்' } },
  { id: 'bihar', emoji: '🏛️', names: { english: 'Bihar', telugu: 'బీహార్', hindi: 'बिहार', tamil: 'பீகார்' }, capital: { english: 'Patna', telugu: 'పాట్నా', hindi: 'पटना', tamil: 'பட்னா' } },
  { id: 'chhattisgarh', emoji: '🌾', names: { english: 'Chhattisgarh', telugu: 'ఛత్తీస్‌గఢ్', hindi: 'छत्तीसगढ़', tamil: 'சத்தீஸ்கர்' }, capital: { english: 'Raipur', telugu: 'రాయ్‌పూర్', hindi: 'रायपुर', tamil: 'ராய்பூர்' } },
  { id: 'goa', emoji: '🏖️', names: { english: 'Goa', telugu: 'గోవా', hindi: 'गोवा', tamil: 'கோவா' }, capital: { english: 'Panaji', telugu: 'పనాజీ', hindi: 'पणजी', tamil: 'பணாஜி' } },
  { id: 'gujarat', emoji: '🦁', names: { english: 'Gujarat', telugu: 'గుజరాత్', hindi: 'गुजरात', tamil: 'குஜராத்' }, capital: { english: 'Gandhinagar', telugu: 'గాంధీనగర్', hindi: 'गांधीनगर', tamil: 'காந்திநகர்' } },
  { id: 'haryana', emoji: '🌾', names: { english: 'Haryana', telugu: 'హర్యానా', hindi: 'हरियाणा', tamil: 'ஹரியானா' }, capital: { english: 'Chandigarh', telugu: 'చండీగఢ్', hindi: 'चंडीगढ़', tamil: 'சண்டிகர்' } },
  { id: 'himachal', emoji: '🏔️', names: { english: 'Himachal Pradesh', telugu: 'హిమాచల్ ప్రదేశ్', hindi: 'हिमाचल प्रदेश', tamil: 'இமாசல பிரதேசம்' }, capital: { english: 'Shimla', telugu: 'షిమ్లా', hindi: 'शिमला', tamil: 'சிம்லா' } },
  { id: 'jharkhand', emoji: '⛏️', names: { english: 'Jharkhand', telugu: 'జార్ఖండ్', hindi: 'झारखंड', tamil: 'ஜார்க்கண்ட்' }, capital: { english: 'Ranchi', telugu: 'రాంచీ', hindi: 'रांची', tamil: 'ரான்சி' } },
  { id: 'karnataka', emoji: '🌸', names: { english: 'Karnataka', telugu: 'కర్ణాటక', hindi: 'कर्नाटक', tamil: 'கர்நாடகா' }, capital: { english: 'Bengaluru', telugu: 'బెంగళూరు', hindi: 'बेंगलुरु', tamil: 'பெங்களூரு' } },
  { id: 'kerala', emoji: '🥥', names: { english: 'Kerala', telugu: 'కేరళ', hindi: 'केरल', tamil: 'கேரளா' }, capital: { english: 'Thiruvananthapuram', telugu: 'తిరువనంతపురం', hindi: 'तिरुवनंतपुरम', tamil: 'திருவனந்தபுரம்' } },
  { id: 'madhyapradesh', emoji: '🐯', names: { english: 'Madhya Pradesh', telugu: 'మధ్యప్రదేశ్', hindi: 'मध्य प्रदेश', tamil: 'மத்திய பிரதேசம்' }, capital: { english: 'Bhopal', telugu: 'భోపాల్', hindi: 'भोपाल', tamil: 'போபால்' } },
  { id: 'maharashtra', emoji: '🏙️', names: { english: 'Maharashtra', telugu: 'మహారాష్ట్ర', hindi: 'महाराष्ट्र', tamil: 'மகாராஷ்டிரா' }, capital: { english: 'Mumbai', telugu: 'ముంబై', hindi: 'मुंबई', tamil: 'மும்பை' } },
  { id: 'manipur', emoji: '🌺', names: { english: 'Manipur', telugu: 'మణిపూర్', hindi: 'मणिपुर', tamil: 'மணிப்பூர்' }, capital: { english: 'Imphal', telugu: 'ఇంఫాల్', hindi: 'इंफाल', tamil: 'இம்பால்' } },
  { id: 'meghalaya', emoji: '🌧️', names: { english: 'Meghalaya', telugu: 'మేఘాలయ', hindi: 'मेघालय', tamil: 'மேகாலயா' }, capital: { english: 'Shillong', telugu: 'షిల్లాంగ్', hindi: 'शिलांग', tamil: 'ஷில்லாங்' } },
  { id: 'mizoram', emoji: '🏔️', names: { english: 'Mizoram', telugu: 'మిజోరం', hindi: 'मिजोरम', tamil: 'மிசோரம்' }, capital: { english: 'Aizawl', telugu: 'ఐజ్వాల్', hindi: 'आइजोल', tamil: 'ஐஸ்வால்' } },
  { id: 'nagaland', emoji: '🦅', names: { english: 'Nagaland', telugu: 'నాగాలాండ్', hindi: 'नागालैंड', tamil: 'நாகாலாந்து' }, capital: { english: 'Kohima', telugu: 'కోహిమా', hindi: 'कोहिमा', tamil: 'கோஹிமா' } },
  { id: 'odisha', emoji: '🛕', names: { english: 'Odisha', telugu: 'ఒడిశా', hindi: 'ओडिशा', tamil: 'ஒடிசா' }, capital: { english: 'Bhubaneswar', telugu: 'భువనేశ్వర్', hindi: 'भुवनेश्वर', tamil: 'புவனேஸ்வர்' } },
  { id: 'punjab', emoji: '🌾', names: { english: 'Punjab', telugu: 'పంజాబ్', hindi: 'पंजाब', tamil: 'பஞ்சாப்' }, capital: { english: 'Chandigarh', telugu: 'చండీగఢ్', hindi: 'चंडीगढ़', tamil: 'சண்டிகர்' } },
  { id: 'rajasthan', emoji: '🏜️', names: { english: 'Rajasthan', telugu: 'రాజస్థాన్', hindi: 'राजस्थान', tamil: 'ராஜஸ்தான்' }, capital: { english: 'Jaipur', telugu: 'జైపూర్', hindi: 'जयपुर', tamil: 'ஜெய்ப்பூர்' } },
  { id: 'sikkim', emoji: '🏔️', names: { english: 'Sikkim', telugu: 'సిక్కిం', hindi: 'सिक्किम', tamil: 'சிக்கிம்' }, capital: { english: 'Gangtok', telugu: 'గాంగ్టక్', hindi: 'गंगटोक', tamil: 'கங்டோக்' } },
  { id: 'tamilnadu', emoji: '🌸', names: { english: 'Tamil Nadu', telugu: 'తమిళనాడు', hindi: 'तमिलनाडु', tamil: 'தமிழ்நாடு' }, capital: { english: 'Chennai', telugu: 'చెన్నై', hindi: 'चेन्नई', tamil: 'சென்னை' } },
  { id: 'telangana', emoji: '🌺', names: { english: 'Telangana', telugu: 'తెలంగాణ', hindi: 'तेलंगाना', tamil: 'தெலங்கானா' }, capital: { english: 'Hyderabad', telugu: 'హైదరాబాద్', hindi: 'हैदराबाद', tamil: 'ஹைதராபாத்' } },
  { id: 'tripura', emoji: '🌿', names: { english: 'Tripura', telugu: 'త్రిపుర', hindi: 'त्रिपुरा', tamil: 'திரிபுரா' }, capital: { english: 'Agartala', telugu: 'అగర్తలా', hindi: 'अगरतला', tamil: 'அகர்தலா' } },
  { id: 'uttarpradesh', emoji: '🕌', names: { english: 'Uttar Pradesh', telugu: 'ఉత్తర్ ప్రదేశ్', hindi: 'उत्तर प्रदेश', tamil: 'உத்தர பிரதேசம்' }, capital: { english: 'Lucknow', telugu: 'లక్నో', hindi: 'लखनऊ', tamil: 'லக்னோ' } },
  { id: 'uttarakhand', emoji: '🏔️', names: { english: 'Uttarakhand', telugu: 'ఉత్తరాఖండ్', hindi: 'उत्तराखंड', tamil: 'உத்தரகண்ட்' }, capital: { english: 'Dehradun', telugu: 'డెహ్రాడూన్', hindi: 'देहरादून', tamil: 'டேராடூன்' } },
  { id: 'westbengal', emoji: '🐯', names: { english: 'West Bengal', telugu: 'పశ్చిమ బెంగాల్', hindi: 'पश्चिम बंगाल', tamil: 'மேற்கு வங்காளம்' }, capital: { english: 'Kolkata', telugu: 'కోల్‌కతా', hindi: 'कोलकाता', tamil: 'கொல்கத்தா' } },
];

const REGION_COLORS = [
  'bg-sunshine-400 border-sunshine-600 hover:bg-sunshine-500',
  'bg-grass-400 border-grass-600 hover:bg-grass-500',
  'bg-tangerine-400 border-tangerine-600 hover:bg-tangerine-500',
  'bg-cherry-400 border-cherry-600 hover:bg-cherry-500',
  'bg-sky-400 border-sky-600 hover:bg-sky-500',
  'bg-lavender-400 border-lavender-600 hover:bg-lavender-500',
];

export default function IndiaMap() {
  const [language, setLanguage] = useState<Language>('english');
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-grass-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-sky-700 mb-2">
          India Map 🗺️
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-6">
          Explore all states of India!
        </p>

        {/* Language Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`font-nunito font-bold px-5 py-2 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 text-base ${
                language === lang
                  ? 'bg-sky-500 border-sky-700 text-white shadow-fun'
                  : 'bg-white border-sky-300 text-sky-700 hover:bg-sky-50'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Image */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative bg-white rounded-4xl border-4 border-sky-300 shadow-fun-xl overflow-hidden p-4">
              <img
                src="/assets/generated/india-map.dim_900x1000.png"
                alt="India Map"
                className="w-full max-w-lg mx-auto rounded-3xl"
              />
              <p className="font-nunito text-center text-muted-foreground text-sm mt-2">
                Click a state from the list to learn about it!
              </p>
            </div>
          </div>

          {/* State Info Panel */}
          <div className="lg:w-80 flex flex-col gap-4">
            {selectedState && (
              <div className="bg-white border-4 border-sky-400 rounded-4xl p-5 shadow-fun-xl animate-bounce-in">
                <div className="text-center mb-3">
                  <span className="text-5xl">{selectedState.emoji}</span>
                  <h2 className="font-fredoka text-2xl text-sky-700 mt-2">
                    {selectedState.names[language]}
                  </h2>
                  <p className="font-nunito text-muted-foreground">
                    Capital: <strong>{selectedState.capital[language]}</strong>
                  </p>
                </div>
                <div className="space-y-1">
                  {(Object.keys(LANGUAGE_LABELS) as Language[]).map(lang => (
                    <div key={lang} className="flex justify-between items-center bg-sky-50 rounded-2xl px-3 py-1">
                      <span className="font-nunito text-xs text-muted-foreground">{LANGUAGE_LABELS[lang]}</span>
                      <span className="font-nunito font-bold text-sky-700 text-sm">{selectedState.names[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* States List */}
            <div className="bg-white border-4 border-sky-200 rounded-4xl p-4 shadow-fun max-h-96 overflow-y-auto">
              <h3 className="font-fredoka text-xl text-sky-700 mb-3 text-center">All States</h3>
              <div className="grid grid-cols-1 gap-2">
                {STATES.map((state, i) => {
                  const colorClass = REGION_COLORS[i % REGION_COLORS.length];
                  const isSelected = selectedState?.id === state.id;
                  return (
                    <button
                      key={state.id}
                      onClick={() => setSelectedState(state)}
                      className={`${colorClass} border-2 rounded-2xl px-3 py-2 flex items-center gap-2 transition-all hover:scale-102 active:scale-98 text-left ${isSelected ? 'ring-4 ring-sky-400 scale-105' : ''}`}
                    >
                      <span className="text-xl">{state.emoji}</span>
                      <span className="font-nunito font-bold text-white text-sm leading-tight">
                        {state.names[language]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
