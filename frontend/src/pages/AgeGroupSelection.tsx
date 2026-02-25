import { useNavigate } from '@tanstack/react-router';

const ageGroups = [
  {
    id: 'toddler',
    label: 'Toddlers',
    age: '2–4 years',
    emoji: '🐣',
    color: 'bg-sunshine-400',
    border: 'border-sunshine-600',
    image: '/assets/generated/age-group-toddler.dim_400x300.png',
  },
  {
    id: 'early',
    label: 'Early Learners',
    age: '5–7 years',
    emoji: '🌱',
    color: 'bg-grass-400',
    border: 'border-grass-600',
    image: '/assets/generated/age-group-early-learner.dim_400x300.png',
  },
  {
    id: 'older',
    label: 'Older Kids',
    age: '8–12 years',
    emoji: '🚀',
    color: 'bg-sky-400',
    border: 'border-sky-600',
    image: '/assets/generated/age-group-older-kids.dim_400x300.png',
  },
];

export default function AgeGroupSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sunshine-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-fredoka text-4xl sm:text-5xl text-center text-sunshine-700 mb-2">
          Who is learning today? 🎉
        </h1>
        <p className="font-nunito text-center text-muted-foreground text-lg mb-10">
          Choose your age group to get started!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ageGroups.map((group, i) => (
            <button
              key={group.id}
              onClick={() => navigate({ to: '/subjects', search: { ageGroup: group.id } })}
              className={`card-enter-${i + 1} ${group.color} border-4 ${group.border} rounded-4xl overflow-hidden shadow-fun-xl hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col`}
            >
              <img
                src={group.image}
                alt={group.label}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <div className="text-4xl mb-1">{group.emoji}</div>
                <h2 className="font-fredoka text-white text-2xl drop-shadow-sm">{group.label}</h2>
                <p className="font-nunito text-white/90 font-bold text-sm">{group.age}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
