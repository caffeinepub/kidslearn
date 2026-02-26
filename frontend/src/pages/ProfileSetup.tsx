import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateKidsProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Star } from 'lucide-react';

const AVATARS = ['🦁', '🐯', '🐻', '🐼', '🦊', '🐸', '🦄', '🐬', '🦋', '🐙', '🦕', '🐲'];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const createProfile = useCreateKidsProfile();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [age, setAge] = useState('');
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sunshine-100">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-fredoka text-cherry-600 mb-2">Please Log In First!</h2>
          <p className="text-muted-foreground">You need to log in to create your profile.</p>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please enter your name!';
    if (!avatar) newErrors.avatar = 'Please pick an avatar!';
    if (!age || isNaN(Number(age)) || Number(age) < 1 || Number(age) > 18) {
      newErrors.age = 'Please enter a valid age (1-18)!';
    }
    if (!/^\d{4}$/.test(pin)) newErrors.pin = 'PIN must be exactly 4 numbers!';
    if (pin !== pinConfirm) newErrors.pinConfirm = 'PINs do not match!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createProfile.mutateAsync({
        name: name.trim(),
        avatar,
        age: BigInt(Number(age)),
        pin,
      });
      navigate({ to: '/' });
    } catch (err) {
      setErrors({ submit: 'Oops! Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sunshine-50 to-tangerine-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-6 text-center">
        <img
          src="/assets/generated/kidslearn-logo.dim_256x256.png"
          alt="KidsLearn Logo"
          className="w-24 h-24 mx-auto mb-3 drop-shadow-lg"
        />
        <h1 className="text-4xl font-fredoka text-cherry-600 drop-shadow-sm">Create Your Profile!</h1>
        <p className="text-lg text-tangerine-700 font-nunito mt-1">Let's get you set up 🎉</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-fun p-8 w-full max-w-lg space-y-6"
      >
        {/* Name */}
        <div>
          <Label className="text-xl font-fredoka text-cherry-600 mb-2 block">
            👤 What's your name?
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="text-xl h-14 rounded-2xl border-2 border-sunshine-300 focus:border-cherry-400 font-nunito"
            maxLength={30}
          />
          {errors.name && <p className="text-cherry-500 text-sm mt-1 font-nunito">{errors.name}</p>}
        </div>

        {/* Avatar */}
        <div>
          <Label className="text-xl font-fredoka text-cherry-600 mb-3 block">
            🎭 Pick your avatar!
          </Label>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setAvatar(emoji)}
                className={`text-3xl p-2 rounded-2xl transition-all duration-200 hover:scale-110 ${
                  avatar === emoji
                    ? 'bg-sunshine-300 ring-4 ring-cherry-400 scale-110 shadow-md'
                    : 'bg-sunshine-50 hover:bg-sunshine-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          {errors.avatar && <p className="text-cherry-500 text-sm mt-1 font-nunito">{errors.avatar}</p>}
        </div>

        {/* Age */}
        <div>
          <Label className="text-xl font-fredoka text-cherry-600 mb-2 block">
            🎂 How old are you?
          </Label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Your age..."
            min={1}
            max={18}
            className="text-xl h-14 rounded-2xl border-2 border-sunshine-300 focus:border-cherry-400 font-nunito w-32"
          />
          {errors.age && <p className="text-cherry-500 text-sm mt-1 font-nunito">{errors.age}</p>}
        </div>

        {/* PIN */}
        <div>
          <Label className="text-xl font-fredoka text-cherry-600 mb-2 block">
            🔐 Create a 4-digit PIN
          </Label>
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="••••"
            maxLength={4}
            className="text-2xl h-14 rounded-2xl border-2 border-sunshine-300 focus:border-cherry-400 font-nunito w-40 tracking-widest text-center"
          />
          {errors.pin && <p className="text-cherry-500 text-sm mt-1 font-nunito">{errors.pin}</p>}
        </div>

        {/* Confirm PIN */}
        <div>
          <Label className="text-xl font-fredoka text-cherry-600 mb-2 block">
            🔐 Confirm your PIN
          </Label>
          <Input
            type="password"
            value={pinConfirm}
            onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="••••"
            maxLength={4}
            className="text-2xl h-14 rounded-2xl border-2 border-sunshine-300 focus:border-cherry-400 font-nunito w-40 tracking-widest text-center"
          />
          {errors.pinConfirm && <p className="text-cherry-500 text-sm mt-1 font-nunito">{errors.pinConfirm}</p>}
        </div>

        {errors.submit && (
          <div className="bg-cherry-50 border-2 border-cherry-300 rounded-2xl p-3 text-cherry-600 font-nunito text-center">
            {errors.submit}
          </div>
        )}

        <Button
          type="submit"
          disabled={createProfile.isPending}
          className="w-full h-16 text-2xl font-fredoka rounded-2xl bg-cherry-500 hover:bg-cherry-600 text-white shadow-fun transition-all duration-200 hover:scale-105"
        >
          {createProfile.isPending ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Star className="mr-2 h-6 w-6" />
              Let's Go! 🚀
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
