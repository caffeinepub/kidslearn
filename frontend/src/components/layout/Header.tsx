import React from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { usePinLock } from '../../hooks/usePinLock';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { User, ArrowLeft, LogOut, LogIn, Loader2 } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const router = useRouter();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { lock } = usePinLock();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      lock();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error?.message === 'User is already authenticated') {
          await clear();
          lock();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const canGoBack = window.history.length > 1;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-sunshine-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Back + Logo */}
        <div className="flex items-center gap-2">
          {canGoBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
              className="rounded-full hover:bg-sunshine-100"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          )}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/kidslearn-logo.dim_256x256.png"
              alt="KidsLearn"
              className="h-10 w-10 rounded-xl"
            />
            <span className="font-fredoka text-xl text-cherry-600 hidden sm:block">KidsLearn</span>
          </button>
        </div>

        {/* Right: Profile + Auth */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/profile' })}
              className="rounded-full hover:bg-sunshine-100"
              aria-label="Profile"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          )}

          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            variant={isAuthenticated ? 'outline' : 'default'}
            size="sm"
            className={`rounded-full font-fredoka ${
              isAuthenticated
                ? 'border-2 border-gray-300 hover:bg-gray-100'
                : 'bg-cherry-500 hover:bg-cherry-600 text-white'
            }`}
          >
            {isLoggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isAuthenticated ? (
              <>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
