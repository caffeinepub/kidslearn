import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { UserRole } from '../backend';
import { useSetCallerRole } from '../hooks/useQueries';

interface RoleSelectionModalProps {
  open: boolean;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ open }) => {
  const navigate = useNavigate();
  const setCallerRole = useSetCallerRole();
  const [selecting, setSelecting] = useState<UserRole | null>(null);

  const handleSelectRole = async (role: UserRole) => {
    setSelecting(role);
    try {
      await setCallerRole.mutateAsync(role);
      navigate({ to: '/parent-dashboard' });
    } catch (err) {
      console.error('Failed to set role:', err);
      setSelecting(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md rounded-3xl border-4 border-sunshine-300 bg-white p-8"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold font-fredoka text-sunshine-600">
            👋 Welcome! Who are you?
          </DialogTitle>
          <DialogDescription className="text-grass-700 font-nunito mt-2">
            Please select your role to continue. This helps us show you the right dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => handleSelectRole(UserRole.parent)}
            disabled={!!selecting}
            className={`
              w-full py-5 rounded-2xl border-4 border-tangerine-300 bg-tangerine-50
              flex flex-col items-center gap-2
              hover:bg-tangerine-100 hover:border-tangerine-500 hover:scale-105
              transition-all duration-200 font-nunito
              disabled:opacity-60 disabled:cursor-not-allowed
              ${selecting === UserRole.parent ? 'scale-95 opacity-80' : ''}
            `}
          >
            <span className="text-5xl">👨‍👩‍👧</span>
            <span className="text-xl font-bold text-tangerine-700">I am a Parent</span>
            <span className="text-sm text-tangerine-500">Track my child's learning</span>
            {selecting === UserRole.parent && (
              <span className="text-xs text-tangerine-600 animate-pulse">Setting up...</span>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
