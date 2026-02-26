import { useNavigate, useSearch } from '@tanstack/react-router';

const subjects = [
  { id: 'math', label: 'Math', emoji: '🔢', color: 'bg-sunshine-400', border: 'border-sunshine-600', image: '/assets/generated/subject-math.dim_128x128.png' },
  { id: 'alphabet', label: 'Alphabet', emoji: '🔤', color: 'bg-grass-400', border: 'border-grass-600', image: '/assets/generated/subject-alphabet.dim_128x128.png' },
  { id: 'science', label: 'Science', emoji: '🔬', color: 'bg-sky-400', border: 'border-sky-600', image: '/assets/generated/subject-science.dim_128x128.png' },
  { id: 'telugu', label: 'Telugu', emoji: '🌺', color: 'bg-tangerine-400', border: 'border-tangerine-600', image: '/assets/generated/subject-telugu.dim_128x128.png' },
  { id: 'hindi', label: 'Hindi', emoji: '🪔', color: 'bg-cherry-400', border: 'border-cherry-600', image: '/assets/generated/subject-hindi.dim_128x128.png' },
  { id: 'english', label: 'English', emoji: '📚', color: 'bg-lavender-400', border: 'border-lavender-600', image: '/assets/generated/subject-english.dim_128x128.png' },
];

const activities = [
  { label: 'Lessons', emoji: '📖', path: '/lessons' },
  { label: 'Flashcards', emoji: '🃏', path: '/flashcards' },
  { label: 'Quiz', emoji: '🧠', path: '/quiz' },
  { label: 'Mini-Game', emoji: '🎮', path: '/mini-game' },
  { label: 'Matching Game', emoji: '🔗', path: '/matching-game' },
  { label: 'Puzzle', emoji: '🧩', path: '/puzzle' },
  { label: 'Timed Challenge', emoji: '⚡', path: '/timed-challenge' },
];

export default function SubjectSelection() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { ageGroup?: string };
  const ageGroup = search.ageGroup || 'early';

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-grass-700 mb-2">
          Choose a Subject! 📚
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-8">
          Pick what you want to learn
        </p>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {subjects.map((subject, i) => (
            <button
              key={subject.id}
              onClick={() => navigate({ to: '/lessons', search: { ageGroup, subject: subject.id } })}
              className={`card-enter-${i + 1} ${subject.color} border-4 ${subject.border} rounded-3xl p-4 flex flex-col items-center gap-2 shadow-fun-lg hover:scale-105 active:scale-95 transition-all duration-200`}
            >
              <img src={subject.image} alt={subject.label} className="w-16 h-16 rounded-2xl" />
              <span className="text-2xl">{subject.emoji}</span>
              <span className="font-fredoka text-white text-xl drop-shadow-sm">{subject.label}</span>
            </button>
          ))}
        </div>

        {/* Activities */}
        <h2 className="font-fredoka text-3xl text-center text-tangerine-600 mb-4">Activities 🎯</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activities.map((activity, i) => (
            <button
              key={activity.path}
              onClick={() => navigate({ to: activity.path, search: { ageGroup, subject: 'math' } })}
              className={`card-enter-${i + 1} bg-white border-4 border-sunshine-400 rounded-3xl p-3 flex flex-col items-center gap-1 shadow-fun hover:scale-105 active:scale-95 transition-all duration-200`}
            >
              <span className="text-3xl">{activity.emoji}</span>
              <span className="font-fredoka text-sunshine-700 text-base">{activity.label}</span>
            </button>
          ))}
        </div>

        {/* Special Sections */}
        <h2 className="font-fredoka text-3xl text-center text-sky-600 mt-10 mb-4">Explore More 🌍</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Numbers', emoji: '🔢', path: '/numbers' },
            { label: 'Alphabet', emoji: '🔤', path: '/alphabet' },
            { label: 'Poems', emoji: '📖', path: '/poems' },
            { label: 'Vocabulary', emoji: '🌟', path: '/vocabulary' },
            { label: 'India Map', emoji: '🗺️', path: '/map' },
          ].map((item, i) => (
            <button
              key={item.path}
              onClick={() => navigate({ to: item.path })}
              className={`card-enter-${i + 1} bg-sky-100 border-4 border-sky-400 rounded-3xl p-3 flex flex-col items-center gap-1 shadow-fun hover:scale-105 active:scale-95 transition-all duration-200`}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="font-fredoka text-sky-700 text-base">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
