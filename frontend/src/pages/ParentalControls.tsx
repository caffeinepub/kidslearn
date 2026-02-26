import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useGetKidsProfile,
  useUpdateKidsProfile,
  useUpdateKidsPin,
  useGetParentalControls,
  useSetParentalControls,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft, Save, Shield, User, Lock, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const AVATARS = ['🦁', '🐯', '🐻', '🐼', '🦊', '🐸', '🦄', '🐬', '🦋', '🐙', '🦕', '🐲'];

const SUBJECTS = [
  { id: 'math', label: 'Math', emoji: '🔢' },
  { id: 'alphabet', label: 'Alphabet', emoji: '🔤' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'telugu', label: 'Telugu', emoji: '🇮🇳' },
  { id: 'hindi', label: 'Hindi', emoji: '🇮🇳' },
  { id: 'english', label: 'English', emoji: '📚' },
];

export default function ParentalControls() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetKidsProfile();
  const { data: controls, isLoading: controlsLoading } = useGetParentalControls();
  const updateProfile = useUpdateKidsProfile();
  const updatePin = useUpdateKidsPin();
  const setControls = useSetParentalControls();

  // Profile edit state
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [age, setAge] = useState('');

  // PIN change state
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Content restrictions state
  const [restrictedSubjects, setRestrictedSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAvatar(profile.avatar);
      setAge(String(Number(profile.age)));
    }
  }, [profile]);

  useEffect(() => {
    if (controls) {
      setRestrictedSubjects(controls.contentRestrictions);
    }
  }, [controls]);

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sunshine-100">
        <div className="text-center p-8">
          <Shield className="h-16 w-16 text-cherry-500 mx-auto mb-4" />
          <h2 className="text-2xl font-fredoka text-cherry-600 mb-2">Authentication Required</h2>
          <p className="text-muted-foreground font-nunito">Please log in to access parental controls.</p>
          <Button onClick={() => navigate({ to: '/' })} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    if (!profile) return;
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 18) {
      toast.error('Please enter a valid age (1-18)');
      return;
    }
    try {
      await updateProfile.mutateAsync({
        name: name.trim(),
        avatar,
        age: BigInt(ageNum),
        pin: profile.pin,
      });
      toast.success('Profile updated! ✅');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePin = async () => {
    setPinError('');
    if (!/^\d{4}$/.test(newPin)) {
      setPinError('PIN must be exactly 4 digits');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('PINs do not match');
      return;
    }
    try {
      await updatePin.mutateAsync(newPin);
      setNewPin('');
      setConfirmPin('');
      toast.success('PIN updated! 🔐');
    } catch {
      toast.error('Failed to update PIN');
    }
  };

  const toggleSubject = (subjectId: string) => {
    setRestrictedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((s) => s !== subjectId) : [...prev, subjectId]
    );
  };

  const handleSaveControls = async () => {
    try {
      await setControls.mutateAsync({
        contentRestrictions: restrictedSubjects,
        gamesAllowed: controls?.gamesAllowed ?? [],
      });
      toast.success('Parental controls saved! 🛡️');
    } catch {
      toast.error('Failed to save parental controls');
    }
  };

  if (profileLoading || controlsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-cherry-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sunshine-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: '/profile' })}
            className="rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cherry-500" />
            <h1 className="text-3xl font-fredoka text-cherry-600">Parental Controls</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Edit Profile Section */}
          <div className="bg-white rounded-3xl shadow-fun p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-6 w-6 text-tangerine-500" />
              <h2 className="text-2xl font-fredoka text-tangerine-600">Edit Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-fredoka text-gray-700 mb-1 block">Child's Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-2 border-sunshine-200 focus:border-tangerine-400 font-nunito"
                  maxLength={30}
                />
              </div>

              <div>
                <Label className="text-base font-fredoka text-gray-700 mb-2 block">Avatar</Label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatar(emoji)}
                      className={`text-2xl p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                        avatar === emoji
                          ? 'bg-sunshine-300 ring-4 ring-cherry-400 scale-110'
                          : 'bg-sunshine-50 hover:bg-sunshine-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-fredoka text-gray-700 mb-1 block">Age</Label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={1}
                  max={18}
                  className="rounded-xl border-2 border-sunshine-200 focus:border-tangerine-400 font-nunito w-24"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={updateProfile.isPending}
                className="bg-tangerine-500 hover:bg-tangerine-600 text-white rounded-xl font-fredoka"
              >
                {updateProfile.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Profile
              </Button>
            </div>
          </div>

          {/* Change PIN Section */}
          <div className="bg-white rounded-3xl shadow-fun p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-cherry-500" />
              <h2 className="text-2xl font-fredoka text-cherry-600">Change PIN</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-fredoka text-gray-700 mb-1 block">New PIN (4 digits)</Label>
                <Input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  maxLength={4}
                  className="rounded-xl border-2 border-sunshine-200 focus:border-cherry-400 font-nunito w-32 tracking-widest text-center text-xl"
                />
              </div>

              <div>
                <Label className="text-base font-fredoka text-gray-700 mb-1 block">Confirm New PIN</Label>
                <Input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  maxLength={4}
                  className="rounded-xl border-2 border-sunshine-200 focus:border-cherry-400 font-nunito w-32 tracking-widest text-center text-xl"
                />
              </div>

              {pinError && (
                <p className="text-cherry-500 text-sm font-nunito">{pinError}</p>
              )}

              <Button
                onClick={handleChangePin}
                disabled={updatePin.isPending || !newPin || !confirmPin}
                className="bg-cherry-500 hover:bg-cherry-600 text-white rounded-xl font-fredoka"
              >
                {updatePin.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                Update PIN
              </Button>
            </div>
          </div>

          {/* Content Restrictions Section */}
          <div className="bg-white rounded-3xl shadow-fun p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-grass-600" />
              <h2 className="text-2xl font-fredoka text-grass-700">Content Restrictions</h2>
            </div>
            <p className="text-sm text-muted-foreground font-nunito mb-4">
              Toggle off subjects you want to restrict for your child.
            </p>

            <div className="space-y-3">
              {SUBJECTS.map((subject) => {
                const isRestricted = restrictedSubjects.includes(subject.id);
                return (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-sunshine-50 border border-sunshine-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.emoji}</span>
                      <span className="font-fredoka text-lg text-gray-700">{subject.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-nunito ${isRestricted ? 'text-cherry-500' : 'text-grass-600'}`}>
                        {isRestricted ? 'Restricted' : 'Allowed'}
                      </span>
                      <Switch
                        checked={!isRestricted}
                        onCheckedChange={() => toggleSubject(subject.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={handleSaveControls}
              disabled={setControls.isPending}
              className="mt-4 bg-grass-600 hover:bg-grass-700 text-white rounded-xl font-fredoka"
            >
              {setControls.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Restrictions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
