import { useNavigate } from "@tanstack/react-router";

const ageGroups = [
  {
    id: "toddler",
    label: "Toddlers",
    age: "2–4 years",
    emoji: "🐣",
    color: "bg-sunshine-400",
    border: "border-sunshine-600",
    image: "/assets/generated/age-group-toddler.dim_400x300.png",
    description: "Animals, Shapes, A-B-C, 1-2-3 with big pictures!",
    topics: ["🐘 Animals & Shapes", "🔤 A-B-C Alphabet", "🔢 Numbers 1-2-3"],
  },
  {
    id: "early",
    label: "Early Learners",
    age: "5–7 years",
    emoji: "🌱",
    color: "bg-grass-400",
    border: "border-grass-600",
    image: "/assets/generated/age-group-early-learner.dim_400x300.png",
    description: "Alphabet, Numbers 1–20, Words & Nature with pictures!",
    topics: ["🔤 Full Alphabet", "🔢 Numbers 1–20", "🌿 Words & Nature"],
  },
  {
    id: "older",
    label: "Older Kids",
    age: "8–12 years",
    emoji: "🚀",
    color: "bg-sky-400",
    border: "border-sky-600",
    image: "/assets/generated/age-group-older-kids.dim_400x300.png",
    description: "Full Alphabet, Numbers 1–100, Body Parts, Math & Science!",
    topics: [
      "🔢 Numbers 1–100",
      "🫀 Body Parts & Science",
      "➕ Math Operations",
    ],
  },
];

export default function AgeGroupSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sunshine-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bold text-4xl sm:text-5xl text-center text-sunshine-700 mb-2">
          Who is learning today? 🎉
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-10">
          Choose your age group to get started!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ageGroups.map((group, i) => (
            <button
              key={group.id}
              type="button"
              data-ocid={`age_group.item.${i + 1}`}
              onClick={() =>
                navigate({ to: "/subjects", search: { ageGroup: group.id } })
              }
              className={`card-enter-${i + 1} ${group.color} border-4 ${group.border} rounded-4xl overflow-hidden shadow-fun-xl hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col text-left`}
            >
              <img
                src={group.image}
                alt={group.label}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <div className="text-4xl mb-2">{group.emoji}</div>
                <h2 className="font-bold text-white text-2xl drop-shadow-sm mb-1">
                  {group.label}
                </h2>
                <p className="font-nunito text-white font-bold text-base mb-3">
                  {group.age}
                </p>
                <p className="font-nunito text-white/90 text-sm mb-3 leading-snug">
                  {group.description}
                </p>
                <ul className="space-y-1">
                  {group.topics.map((topic) => (
                    <li
                      key={topic}
                      className="bg-white/20 rounded-xl px-3 py-1.5 font-nunito text-white text-sm font-semibold text-left"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
