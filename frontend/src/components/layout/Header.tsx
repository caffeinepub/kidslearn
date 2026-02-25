import { useNavigate, useRouter } from '@tanstack/react-router';
import { ArrowLeft, Trophy, Heart, LogIn, LogOut, User } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const navigate = useNavigate();
  const router = useRouter();
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleBack = () => {
    router.history.back();
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (e) {
      console.error('Login error', e);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-sunshine-400 shadow-fun border-b-4 border-sunshine-600">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1 bg-white/80 hover:bg-white text-sunshine-700 font-nunito font-bold px-3 py-2 rounded-2xl shadow-fun transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Center: Logo */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <img
            src="/assets/generated/kidslearn-logo.dim_256x256.png"
            alt="KidsLearn"
            className="w-10 h-10 rounded-2xl shadow-fun"
          />
          <span className="font-fredoka text-2xl text-white drop-shadow-md hidden sm:block">
            KidsLearn
          </span>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate({ to: '/donation' })}
            className="flex items-center gap-1 bg-cherry-500 hover:bg-cherry-600 text-white font-nunito font-bold px-3 py-2 rounded-2xl shadow-fun transition-all hover:scale-105 active:scale-95 text-sm"
          >
            <Heart size={16} />
            <span className="hidden sm:inline">Donate</span>
          </button>

          <button
            onClick={() => navigate({ to: '/progress' })}
            className="flex items-center gap-1 bg-grass-500 hover:bg-grass-600 text-white font-nunito font-bold px-3 py-2 rounded-2xl shadow-fun transition-all hover:scale-105 active:scale-95 text-sm"
          >
            <Trophy size={16} />
            <span className="hidden sm:inline">Progress</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate({ to: '/parent-dashboard' })}
                className="flex items-center gap-1 bg-lavender-500 hover:bg-lavender-600 text-white font-nunito font-bold px-3 py-2 rounded-2xl shadow-fun transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <User size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-white/80 hover:bg-white text-sunshine-700 font-nunito font-bold px-3 py-2 rounded-2xl shadow-fun transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white font-nunito font-bold px-3 py-2 rounded-2xl shadow-fun transition-all hover:scale-105 active:scale-95 text-sm disabled:opacity-60"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">{isLoggingIn ? 'Logging in...' : 'Parent Login'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
