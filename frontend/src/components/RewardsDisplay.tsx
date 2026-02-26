import React from 'react';
import { Task } from '../backend';

const ALL_BADGES = [
  { id: 'first_lesson', label: 'First Lesson', emoji: '📖' },
  { id: 'quiz_master', label: 'Quiz Master', emoji: '🧠' },
  { id: 'perfect_score', label: 'Perfect Score', emoji: '💯' },
  { id: 'streak_3', label: '3-Day Streak', emoji: '🔥' },
  { id: 'alphabet_hero', label: 'Alphabet Hero', emoji: '🔤' },
  { id: 'number_ninja', label: 'Number Ninja', emoji: '🔢' },
  { id: 'word_wizard', label: 'Word Wizard', emoji: '✨' },
  { id: 'poem_reader', label: 'Poem Reader', emoji: '🎵' },
  { id: 'game_champion', label: 'Game Champion', emoji: '🏆' },
  { id: 'fast_learner', label: 'Fast Learner', emoji: '⚡' },
  { id: 'curious_mind', label: 'Curious Mind', emoji: '🔍' },
];

interface RewardsDisplayProps {
  earnedBadges: string[];
  tasks: Task[];
}

const RewardsDisplay: React.FC<RewardsDisplayProps> = ({ earnedBadges, tasks }) => {
  const totalPoints = tasks
    .filter((t) => t.isCompleted)
    .reduce((sum, t) => sum + Number(t.points), 0);

  return (
    <div className="space-y-4">
      {/* Points display */}
      <div className="bg-gradient-to-r from-sunshine-300 to-tangerine-300 rounded-3xl border-4 border-sunshine-400 p-5 text-center shadow-fun">
        <div className="flex items-center justify-center gap-3 mb-1">
          <img
            src="/assets/generated/star-icon.dim_128x128.png"
            alt="Star"
            className="w-10 h-10 object-contain drop-shadow"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-heading text-5xl text-white drop-shadow-md">{totalPoints}</span>
          <img
            src="/assets/generated/trophy-icon.dim_128x128.png"
            alt="Trophy"
            className="w-10 h-10 object-contain drop-shadow"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <p className="font-heading text-xl text-white drop-shadow">Total Points Earned! ⭐</p>
        <p className="font-body text-sm text-white/80 mt-1">Complete tasks to earn more points!</p>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-heading text-lg text-lavender-700 mb-2 flex items-center gap-2">
          🏅 My Badges
          <span className="text-sm font-nunito font-bold bg-lavender-100 text-lavender-600 px-2 py-0.5 rounded-full">
            {earnedBadges.length}/{ALL_BADGES.length}
          </span>
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {ALL_BADGES.map((badge) => {
            const earned = earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-all ${
                  earned
                    ? 'border-sunshine-300 bg-sunshine-50 shadow-fun'
                    : 'border-gray-200 bg-gray-50 opacity-40 grayscale'
                }`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <span className="text-xs font-nunito text-center text-gray-600 leading-tight">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RewardsDisplay;
