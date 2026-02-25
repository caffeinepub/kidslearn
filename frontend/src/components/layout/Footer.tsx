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
          {isAuthenticated && role === UserRole.teacher && (
            <button onClick={() => navigate({ to: '/teacher-dashboard' })} className="hover:text-sunshine-100 transition-colors">
              Teacher Dashboard
            </button>
          )}
          <button onClick={() => navigate({ to: '/donate' })} className="hover:text-sunshine-100 transition-colors">
            Donate
          </button>
        </div>

        {/* Attribution */}
        <div className="text-center text-sm font-nunito text-sunshine-100">
          <p>
            Built with{' '}
            <Heart size={14} className="inline text-cherry-300 fill-cherry-300" />{' '}
            using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1 text-xs text-sunshine-200">
            © {new Date().getFullYear()} KidsLearn — Learning made fun for every child 🌟
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
