import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetKidsProfile, useVerifyKidsPin } from '../hooks/useQueries';
import { usePinLock } from '../hooks/usePinLock';
import { Loader2, Delete } from 'lucide-react';

export default function PinEntry() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetKidsProfile();
  const verifyPin = useVerifyKidsPin();
  const { unlock } = usePinLock();

  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleDigit = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');

    if (newPin.length === 4) {
      handleVerify(newPin);
    }
  };

  const handleDelete = () => {
    setPin((p) => p.slice(0, -1));
    setError('');
  };

  const handleVerify = async (pinToVerify: string) => {
    try {
      const isCorrect = await verifyPin.mutateAsync(pinToVerify);
      if (isCorrect) {
        unlock();
        navigate({ to: '/' });
      } else {
        setShaking(true);
        setError("Oops! That's not right. Try again! 😊");
        setTimeout(() => {
          setPin('');
          setShaking(false);
        }, 600);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setPin('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-sunshine-100">
        <Loader2 className="h-12 w-12 animate-spin text-cherry-500" />
      </div>
    );
  }

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/pin-bg.dim_1200x800.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-sky-900/40 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Avatar & Greeting */}
        <div className="text-center">
          <div className="text-8xl mb-3 drop-shadow-lg">{profile?.avatar || '🌟'}</div>
          <h1 className="text-4xl font-fredoka text-white drop-shadow-lg">
            Hi, {profile?.name || 'Friend'}! 👋
          </h1>
          <p className="text-xl text-sky-100 font-nunito mt-1">Enter your PIN to play!</p>
        </div>

        {/* PIN Dots */}
        <div className={`flex gap-4 ${shaking ? 'animate-bounce' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full border-4 transition-all duration-200 ${
                i < pin.length
                  ? 'bg-sunshine-400 border-sunshine-300 scale-110'
                  : 'bg-white/30 border-white/60'
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-cherry-500/90 text-white rounded-2xl px-6 py-3 text-center font-nunito text-lg shadow-lg">
            {error}
          </div>
        )}

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {digits.map((digit, idx) => {
            if (digit === '') {
              return <div key={idx} />;
            }
            if (digit === 'del') {
              return (
                <button
                  key={idx}
                  onClick={handleDelete}
                  disabled={verifyPin.isPending}
                  className="h-20 rounded-2xl bg-white/20 active:scale-95 transition-all duration-150 flex items-center justify-center text-white shadow-lg backdrop-blur-sm border border-white/30 hover:bg-white/30"
                >
                  <Delete className="h-8 w-8" />
                </button>
              );
            }
            return (
              <button
                key={idx}
                onClick={() => handleDigit(digit)}
                disabled={verifyPin.isPending || pin.length >= 4}
                className="h-20 rounded-2xl bg-white/20 active:scale-95 transition-all duration-150 text-4xl font-fredoka text-white shadow-lg backdrop-blur-sm border border-white/30 hover:bg-sunshine-400/60"
              >
                {digit}
              </button>
            );
          })}
        </div>

        {verifyPin.isPending && (
          <div className="flex items-center gap-2 text-white font-nunito">
            <Loader2 className="h-5 w-5 animate-spin" />
            Checking...
          </div>
        )}
      </div>
    </div>
  );
}
