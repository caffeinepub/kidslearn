import React from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Trophy, ArrowLeft, LogIn, LogOut, GraduationCap, Users } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerRole } from '../../hooks/useQueries';
import { UserRole } from '../../backend';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: role, isLoading: roleLoading } = useGetCallerRole();

  const isHome = location.pathname === '/';

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleDashboard = () => {
    if (role === UserRole.teacher) {
      navigate({ to: '/teacher-dashboard' });
    } else if (role === UserRole.parent) {
      navigate({ to: '/parent-dashboard' });
    }
  };

  const handleProgress = () => {
    navigate({ to: '/progress' });
  };

  return (
    <header className="sticky top-0 z-50 bg-sunshine-400 shadow-fun">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Back or Logo */}
        <div className="flex items-center gap-2">
          {!isHome && (
            <button
              onClick={handleBack}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/kidslearn-logo.dim_256x256.png"
              alt="KidsLearn"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <span className="text-white font-fredoka text-xl font-bold hidden sm:block">
              KidsLearn
            </span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Dashboard link for teacher/parent */}
          {isAuthenticated && !roleLoading && role && role !== UserRole.student && (
            <button
              onClick={handleDashboard}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white text-sm font-nunito font-bold"
              aria-label="Dashboard"
            >
              {role === UserRole.teacher ? (
                <>
                  <GraduationCap size={16} />
                  <span className="hidden sm:inline">Teacher</span>
                </>
              ) : (
                <>
                  <Users size={16} />
                  <span className="hidden sm:inline">Parent</span>
                </>
              )}
            </button>
          )}

          {/* Progress button */}
          <button
            onClick={handleProgress}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
            aria-label="View progress"
          >
            <Trophy size={20} />
          </button>

          {/* Login/Logout */}
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full font-nunito font-bold text-sm transition-all
              ${isAuthenticated
                ? 'bg-white/20 hover:bg-white/40 text-white'
                : 'bg-white text-sunshine-600 hover:bg-sunshine-50'
              }
              disabled:opacity-60
            `}
          >
            {isLoggingIn ? (
              <span className="animate-pulse">Logging in...</span>
            ) : isAuthenticated ? (
              <>
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span className="hidden sm:inline">Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
