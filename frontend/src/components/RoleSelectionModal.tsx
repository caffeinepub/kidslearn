import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useGetCallerUserProfile } from '../hooks/useQueries';

interface RoleSelectionModalProps {
  open: boolean;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ open }) => {
  const navigate = useNavigate();
  const { data: userProfile, isFetched: profileFetched, isLoading: profileLoading } = useGetCallerUserProfile();

  // Navigate based on profile completeness when modal opens
  useEffect(() => {
    if (!open) return;
    if (profileLoading) return;

    if (profileFetched) {
      // If profile exists and has a name, go to dashboard; otherwise go to profile setup
      if (userProfile && userProfile.name && userProfile.name.trim() !== '') {
        navigate({ to: '/kids-dashboard' });
      } else {
        navigate({ to: '/post-login-profile' });
      }
    }
  }, [open, profileFetched, profileLoading, userProfile, navigate]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md rounded-3xl border-4 border-sunshine-300 bg-white p-8"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold font-fredoka text-sunshine-600">
            🌟 Welcome to KidsLearn!
          </DialogTitle>
          <DialogDescription className="text-grass-700 font-nunito mt-2">
            {profileLoading ? 'Loading your profile...' : 'Taking you to your dashboard...'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <span className="text-6xl animate-bounce">🚀</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
