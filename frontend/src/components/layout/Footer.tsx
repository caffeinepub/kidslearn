import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerRole } from '../../hooks/useQueries';
import { UserRole } from '../../backend';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: role } = useGetCallerRole();

  const appId = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'kidslearn-app';
  const caffeineUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`;

  return (
    <footer className="bg-sunshine-400 text-white py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm font-nunito">
          <button onClick={() => navigate({ to: '/' })} className="hover:text-sunshine-100 transition-colors">
            Home
          </button>
          <button onClick={() => navigate({ to: '/alphabet' })} className="hover:text-sunshine-100 transition-colors">
            Alphabet
          </button>
          <button onClick={() => navigate({ to: '/numbers' })} className="hover:text-sunshine-100 transition-colors">
            Numbers
          </button>
          <button onClick={() => navigate({ to: '/quiz' })} className="hover:text-sunshine-100 transition-colors">
            Quiz
          </button>
          <button onClick={() => navigate({ to: '/progress' })} className="hover:text-sunshine-100 transition-colors">
            Progress
          </button>
          {isAuthenticated && role === UserRole.parent && (
            <button onClick={() => navigate({ to: '/parent-dashboard' })} className="hover:text-sunshine-100 transition-colors">
              Parent Dashboard
            </button>
          )}
          <button onClick={() => navigate({ to: '/donate' })} className="hover:text-sunshine-100 transition-colors">
            Support Us
          </button>
        </div>

        {/* Attribution */}
        <div className="text-center text-xs font-nunito text-white/80 space-y-1">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart size={12} className="fill-cherry-400 text-cherry-400" /> using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p>© {new Date().getFullYear()} KidsLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
