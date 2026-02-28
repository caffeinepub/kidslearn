import React from 'react';
import { Task } from '../backend';

interface ProgressWidgetProps {
  completedLessons: number;
  totalLessons: number;
  quizzesTaken: number;
  tasks: Task[];
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  completedLessons,
  totalLessons,
  quizzesTaken,
  tasks,
}) => {
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const totalTasks = tasks.length;

  const lessonPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const items = [
    {
      label: 'Lessons Completed',
      emoji: '📖',
      value: completedLessons,
      total: totalLessons > 0 ? totalLessons : null,
      pct: lessonPct,
      barClass: 'bg-sky-400',
      bgClass: 'bg-sky-50 border-sky-200',
      textClass: 'text-sky-700',
    },
    {
      label: 'Tasks Done',
      emoji: '✅',
      value: completedTasks,
      total: totalTasks > 0 ? totalTasks : null,
      pct: taskPct,
      barClass: 'bg-grass-400',
      bgClass: 'bg-grass-50 border-grass-200',
      textClass: 'text-grass-700',
    },
    {
      label: 'Quizzes Taken',
      emoji: '🧠',
      value: quizzesTaken,
      total: null,
      pct: Math.min(quizzesTaken * 10, 100),
      barClass: 'bg-tangerine-400',
      bgClass: 'bg-tangerine-50 border-tangerine-200',
      textClass: 'text-tangerine-700',
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className={`rounded-2xl border-2 p-5 ${item.bgClass}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{item.emoji}</span>
              <span className={`font-heading text-xl ${item.textClass}`}>{item.label}</span>
            </div>
            <span className={`font-bold font-nunito text-xl ${item.textClass}`}>
              {item.total !== null ? `${item.value} / ${item.total}` : item.value}
            </span>
          </div>
          <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${item.barClass}`}
              style={{ width: `${item.pct}%` }}
            />
          </div>
          {item.pct === 100 && item.total !== null && (
            <p className="text-base font-nunito font-bold text-grass-600 mt-2 text-center">
              🎉 All done! Amazing!
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressWidget;
