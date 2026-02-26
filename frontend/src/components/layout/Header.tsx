import React from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { ArrowLeft, LayoutDashboard, User } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerRole } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { UserRole } from '../../backend';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const { data: role } = useGetCallerRole();

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

  const dashboardPath = role === UserRole.parent ? '/parent-dashboard' : null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-4 border-sunshine-300 shadow-fun">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Left: Back + Logo */}
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={() => router.history.back()}
              className="p-2 rounded-xl hover:bg-sunshine-100 transition-colors text-sunshine-600"
              aria-label="Go back"
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/kidslearn-logo.dim_256x256.png"
              alt="KidsLearn"
              className="w-10 h-10 rounded-xl border-2 border-sunshine-300"
            />
            <span className="font-fredoka text-xl text-sunshine-600 hidden sm:block">KidsLearn</span>
          </button>
        </div>

        {/* Right: Dashboard + Profile + Auth */}
        <div className="flex items-center gap-2">
          {isAuthenticated && dashboardPath && (
            <button
              onClick={() => navigate({ to: dashboardPath })}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-grass-100 hover:bg-grass-200 text-grass-700 font-nunito text-sm font-bold transition-colors border-2 border-grass-300"
              aria-label="Dashboard"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => navigate({ to: '/profile' })}
              className="p-2 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-700 transition-colors border-2 border-lavender-300"
              aria-label="My Profile"
            >
              <User size={20} />
            </button>
          )}

          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className={`px-4 py-2 rounded-xl font-bold font-nunito text-sm transition-colors border-2 disabled:opacity-50 ${
              isAuthenticated
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                : 'bg-sunshine-400 hover:bg-sunshine-500 text-white border-sunshine-500'
            }`}
          >
            {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
