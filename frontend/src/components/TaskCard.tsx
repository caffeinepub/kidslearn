import React from 'react';
import { CheckCircle2, Circle, Loader2, Star } from 'lucide-react';
import { Task } from '../backend';
import { useMarkTaskComplete } from '../hooks/useQueries';

interface TaskCardProps {
  task: Task;
  onCompleted?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onCompleted }) => {
  const markComplete = useMarkTaskComplete();

  const handleComplete = async () => {
    if (task.isCompleted || markComplete.isPending) return;
    try {
      await markComplete.mutateAsync(task.id);
      onCompleted?.();
    } catch {
      // silently fail
    }
  };

  return (
    <div
      className={`relative rounded-3xl border-4 p-4 transition-all duration-300 ${
        task.isCompleted
          ? 'border-grass-300 bg-grass-50 opacity-80'
          : 'border-sunshine-300 bg-white hover:border-sunshine-500 hover:shadow-fun-lg hover:scale-[1.02]'
      }`}
    >
      {/* Points badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-sunshine-100 border-2 border-sunshine-300 rounded-full px-2 py-0.5">
        <Star size={12} className="text-sunshine-500 fill-sunshine-400" />
        <span className="text-xs font-bold font-nunito text-sunshine-700">{Number(task.points)} pts</span>
      </div>

      <div className="flex items-start gap-3 pr-16">
        {/* Checkbox button */}
        <button
          onClick={handleComplete}
          disabled={task.isCompleted || markComplete.isPending}
          className={`shrink-0 mt-0.5 transition-all duration-200 ${
            task.isCompleted
              ? 'text-grass-500 cursor-default'
              : 'text-sunshine-400 hover:text-sunshine-600 hover:scale-110 active:scale-95'
          } disabled:cursor-not-allowed`}
          aria-label={task.isCompleted ? 'Task completed' : 'Mark task complete'}
        >
          {markComplete.isPending ? (
            <Loader2 size={32} className="animate-spin text-sunshine-400" />
          ) : task.isCompleted ? (
            <CheckCircle2 size={32} className="text-grass-500 fill-grass-100" />
          ) : (
            <Circle size={32} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-heading text-lg leading-tight ${
              task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`font-body text-sm mt-1 leading-snug ${
                task.isCompleted ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      {task.isCompleted && (
        <div className="mt-2 text-center">
          <span className="text-xs font-bold font-nunito text-grass-600 bg-grass-100 px-3 py-1 rounded-full">
            ✅ Done! Great job!
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
