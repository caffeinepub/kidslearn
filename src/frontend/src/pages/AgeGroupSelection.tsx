import { useNavigate } from "@tanstack/react-router";

const ageGroups = [
  {
    id: "toddler",
    label: "Toddlers",
    age: "2–4 years",
    emoji: "🧸",
    bgGradient: "from-sunshine-300 to-tangerine-400",
    border: "border-sunshine-600",
    description: "Big pictures & playful learning for tiny tots!",
    topics: [
      "🐘 Animals with pictures",
      "🔤 A-B-C Alphabet",
      "🔢 Numbers 1–5",
      "🟡 Shapes & Colors",
      "➕ Simple addition",
      "🍎 Fruits & Food",
    ],
  },
  {
    id: "early",
    label: "Early Learners",
    age: "5–7 years",
    emoji: "📖",
    bgGradient: "from-grass-300 to-mint-400",
    border: "border-grass-600",
    description: "Words, numbers, nature & science with pictures!",
    topics: [
      "🔤 Full Alphabet (A–Z)",
      "🔢 Numbers 1–20",
      "🌿 Plants & Nature",
      "🐾 Animals & Birds",
      "🫀 Human body",
      "🔬 Basic Science",
    ],
  },
  {
    id: "older",
    label: "Older Kids",
    age: "8–12 years",
    emoji: "🎓",
    bgGradient: "from-sky-300 to-lavender-400",
    border: "border-sky-600",
    description: "Deep learning in math, science, history & more!",
    topics: [
      "🔢 Numbers 1–100",
      "🫀 Body Parts & Science",
      "➕ Math: Add, Sub, Mul, Div",
      "🌍 World Geography",
      "🏛️ History & Culture",
      "🔬 Science & Nature",
    ],
  },
];

export default function AgeGroupSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-lavender-50 to-sunshine-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="font-bold text-4xl sm:text-5xl text-sky-700 mb-3">
            Who is learning today?
          </h1>
          <p className="text-lg text-gray-600 font-semibold">
            Pick your age group to begin your learning adventure!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {ageGroups.map((group, i) => (
            <button
              key={group.id}
              type="button"
              data-ocid={`age_group.item.${i + 1}`}
              onClick={() =>
                navigate({ to: "/subjects", search: { ageGroup: group.id } })
              }
              className={`bg-gradient-to-br ${group.bgGradient} border-4 ${group.border} rounded-3xl overflow-hidden shadow-fun-xl hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col text-left`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4 flex flex-col items-center gap-3">
                <span className="text-8xl drop-shadow-lg">{group.emoji}</span>
                <div className="text-center">
                  <h2 className="font-bold text-white text-3xl drop-shadow-sm mb-1">
                    {group.label}
                  </h2>
                  <p className="font-bold text-white/90 text-lg bg-black/20 rounded-xl px-3 py-1">
                    {group.age}
                  </p>
                </div>
                <p className="text-white/90 font-semibold text-base text-center leading-snug">
                  {group.description}
                </p>
              </div>

              {/* Topics List */}
              <div className="px-4 pb-6 space-y-2">
                {group.topics.map((topic) => (
                  <div
                    key={topic}
                    className="bg-white/25 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-sm font-bold border border-white/40"
                  >
                    {topic}
                  </div>
                ))}
              </div>

              {/* CTA bar */}
              <div className="mx-4 mb-4 bg-white/30 hover:bg-white/50 rounded-2xl py-3 text-center text-white font-bold text-lg border-2 border-white/50 transition-all">
                Start Learning! 🚀
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
