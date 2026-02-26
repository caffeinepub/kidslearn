import React from 'react';
import { Link } from '@tanstack/react-router';

interface LearningCardProps {
  name: string;
  emoji: string;
  route: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

const LearningCard: React.FC<LearningCardProps> = ({
  name,
  emoji,
  route,
  bgClass,
  borderClass,
  textClass,
}) => {
  return (
    <Link
      to={route}
      className={`block rounded-3xl border-4 ${borderClass} ${bgClass} p-4 text-center
        hover:scale-105 hover:shadow-fun-xl active:scale-95
        transition-all duration-200 cursor-pointer no-underline`}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className={`font-heading text-base ${textClass} leading-tight`}>{name}</h3>
      <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold font-nunito text-white"
        style={{ background: 'rgba(0,0,0,0.15)' }}
      >
        Learn! 📚
      </div>
    </Link>
  );
};

export default LearningCard;
