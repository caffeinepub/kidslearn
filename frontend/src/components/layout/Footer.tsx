import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'kidslearn-app');

  return (
    <footer className="bg-white border-t-2 border-sunshine-200 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm font-nunito">
          <button onClick={() => navigate({ to: '/' })} className="text-gray-600 hover:text-cherry-500 transition-colors">
            Home
          </button>
          <button onClick={() => navigate({ to: '/alphabet-lesson/english' })} className="text-gray-600 hover:text-cherry-500 transition-colors">
            Alphabet
          </button>
          <button onClick={() => navigate({ to: '/numbers-lesson/english' })} className="text-gray-600 hover:text-cherry-500 transition-colors">
            Numbers
          </button>
          <button onClick={() => navigate({ to: '/quiz/math' })} className="text-gray-600 hover:text-cherry-500 transition-colors">
            Quiz
          </button>
          <button onClick={() => navigate({ to: '/progress' })} className="text-gray-600 hover:text-cherry-500 transition-colors">
            Progress
          </button>
          <button onClick={() => navigate({ to: '/donate' })} className="text-gray-600 hover:text-cherry-500 transition-colors">
            Support Us
          </button>
        </div>

        {/* Attribution */}
        <div className="text-center text-sm font-nunito text-gray-500">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-cherry-500 fill-cherry-500" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cherry-500 hover:text-cherry-600 font-semibold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1">© {year} KidsLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
