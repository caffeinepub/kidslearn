import React from 'react';
import { Link } from '@tanstack/react-router';

interface GameCardProps {
  name: string;
  emoji: string;
  description: string;
  route: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

const GameCard: React.FC<GameCardProps> = ({
  name,
  emoji,
  description,
  route,
  bgClass,
  borderClass,
  textClass,
}) => {
  return (
    <Link
      to={route}
      className={`block rounded-3xl border-4 ${borderClass} ${bgClass} p-5 text-center
        hover:scale-105 hover:shadow-fun-xl active:scale-95
        transition-all duration-200 cursor-pointer no-underline`}
    >
      <div className="text-7xl mb-3">{emoji}</div>
      <h3 className={`font-heading text-xl ${textClass} leading-tight`}>{name}</h3>
      <p className="font-body text-sm text-gray-600 mt-1 leading-snug">{description}</p>
      <div className="mt-3 inline-block px-4 py-2 rounded-full text-sm font-bold font-nunito text-white"
        style={{ background: 'rgba(0,0,0,0.15)' }}
      >
        Play Now! 🎮
      </div>
    </Link>
  );
};

export default GameCard;
