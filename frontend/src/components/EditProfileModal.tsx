import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { useUpdateKidsProfile } from '../hooks/useQueries';
import type { KidsProfile } from '../backend';
import { toast } from 'sonner';

const AVATARS = ['🦁', '🐯', '🐻', '🐼', '🦊', '🐸', '🦄', '🐬', '🦋', '🐙', '🦕', '🐲'];

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: KidsProfile;
}

export default function EditProfileModal({ open, onClose, profile }: EditProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const updateProfile = useUpdateKidsProfile();

  useEffect(() => {
    if (open) {
      setName(profile.name);
      setAvatar(profile.avatar);
    }
  }, [open, profile]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name!');
      return;
    }
    try {
      await updateProfile.mutateAsync({
        ...profile,
        name: name.trim(),
        avatar,
      });
      toast.success('Profile updated! 🎉');
      onClose();
    } catch {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-fredoka text-cherry-600 text-center">
            ✏️ Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Name */}
          <div>
            <Label className="text-base font-fredoka text-gray-700 mb-1 block">Your Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-2 border-sunshine-200 focus:border-cherry-400 font-nunito text-lg h-12"
              maxLength={30}
            />
          </div>

          {/* Avatar */}
          <div>
            <Label className="text-base font-fredoka text-gray-700 mb-2 block">Pick Avatar</Label>
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
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl font-fredoka">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="bg-cherry-500 hover:bg-cherry-600 text-white rounded-xl font-fredoka"
          >
            {updateProfile.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
