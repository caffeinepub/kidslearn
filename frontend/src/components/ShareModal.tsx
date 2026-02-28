import React, { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { SiWhatsapp, SiX, SiFacebook } from 'react-icons/si';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kidslearn.app';
  const shareText = '🌟 Check out KidsLearn! A fun app to learn Alphabets, Numbers & Words in Telugu, Hindi, Tamil & English! 🎉';
  const encodedUrl = encodeURIComponent(appUrl);
  const encodedText = encodeURIComponent(`${shareText} ${appUrl}`);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KidsLearn 🌟',
          text: shareText,
          url: appUrl,
        });
      } catch {
        // User cancelled or error — do nothing
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = appUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openShareUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOptions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <SiWhatsapp size={28} />,
      bgClass: 'bg-green-500 hover:bg-green-600',
      textClass: 'text-white',
      action: () => openShareUrl(`https://wa.me/?text=${encodedText}`),
    },
    {
      id: 'twitter',
      label: 'Twitter / X',
      icon: <SiX size={26} />,
      bgClass: 'bg-gray-900 hover:bg-black',
      textClass: 'text-white',
      action: () => openShareUrl(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`),
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: <SiFacebook size={28} />,
      bgClass: 'bg-blue-600 hover:bg-blue-700',
      textClass: 'text-white',
      action: () => openShareUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-sm rounded-3xl border-4 border-sunshine-400 bg-white p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-sky-400 via-lavender-400 to-cherry-400 px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-2xl p-2">
                <Share2 size={24} className="text-white" />
              </div>
              <div>
                <DialogTitle className="font-heading text-2xl text-white">Share KidsLearn!</DialogTitle>
                <DialogDescription className="text-white/80 font-body text-sm">
                  Spread the joy of learning 🌟
                </DialogDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4">
          {/* App URL preview */}
          <div className="bg-sunshine-50 border-2 border-sunshine-300 rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">🔗</span>
            <span className="font-body text-sm text-gray-600 truncate flex-1">{appUrl}</span>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 font-heading text-lg transition-all duration-200 ${
              copied
                ? 'bg-grass-400 border-grass-500 text-white scale-95'
                : 'bg-sunshine-100 border-sunshine-400 text-sunshine-700 hover:bg-sunshine-200 hover:scale-105'
            }`}
          >
            {copied ? (
              <>
                <Check size={22} className="text-white" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={22} />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Native Share (only shown when supported) */}
          {typeof navigator !== 'undefined' && !!navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 bg-sky-100 border-sky-400 text-sky-700 hover:bg-sky-200 hover:scale-105 font-heading text-lg transition-all duration-200"
            >
              <Share2 size={22} />
              <span>Share via…</span>
            </button>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="font-body text-sm text-gray-400">or share on</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-2xl ${option.bgClass} ${option.textClass} font-body text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-md`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
