import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'kidslearn-app');

  return (
    <footer className="bg-sunshine-400 border-t-4 border-sunshine-600 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/kidslearn-logo.dim_256x256.png"
              alt="KidsLearn"
              className="w-8 h-8 rounded-xl"
            />
            <span className="font-fredoka text-white text-lg">KidsLearn</span>
          </div>

          <div className="flex items-center gap-4 text-sm font-nunito text-white/90">
            <Link to="/donation" className="hover:text-white underline">Support Us</Link>
            <Link to="/parent-dashboard" className="hover:text-white underline">Parent Dashboard</Link>
            <Link to="/progress" className="hover:text-white underline">Progress</Link>
          </div>

          <div className="text-center text-sm font-nunito text-white/90">
            <p>© {year} KidsLearn. All rights reserved.</p>
            <p className="flex items-center justify-center gap-1 mt-1">
              Built with <Heart size={14} className="text-cherry-300 fill-cherry-300" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white font-bold"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
