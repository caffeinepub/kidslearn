import React from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { ArrowLeft, LayoutDashboard, User } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const canGoBack = router.history.length > 1;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b-4 border-sunshine-300 shadow-fun">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: back button + logo */}
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={() => router.history.back()}
              className="p-2 rounded-2xl bg-sunshine-100 hover:bg-sunshine-200 text-sunshine-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <button
            onClick={() => navigate({ to: isAuthenticated ? '/kids-dashboard' : '/' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/kidslearn-logo.dim_256x256.png"
              alt="KidsLearn"
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-sunshine-300"
            />
            <span className="font-heading text-2xl text-sunshine-600 hidden sm:block">KidsLearn</span>
          </button>
        </div>

        {/* Right: dashboard shortcut + profile + login */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={() => navigate({ to: '/kids-dashboard' })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-700 font-nunito font-bold text-sm transition-colors"
              aria-label="Kids Dashboard"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => navigate({ to: '/profile' })}
              className="p-2 rounded-2xl bg-lavender-100 hover:bg-lavender-200 text-lavender-700 transition-colors"
              aria-label="Profile"
            >
              <User size={22} />
            </button>
          )}

          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className={`px-4 py-2 rounded-2xl font-nunito font-bold text-sm transition-all ${
              isAuthenticated
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-sunshine-400 hover:bg-sunshine-500 text-white shadow-fun'
            } disabled:opacity-50`}
          >
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
