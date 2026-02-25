import { Heart, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const BANK_DETAILS = [
  { label: 'Account Name', value: 'KidsLearn Foundation' },
  { label: 'Account Number', value: '1234 5678 9012 3456' },
  { label: 'IFSC Code', value: 'KIDS0001234' },
  { label: 'Bank Name', value: 'State Bank of India' },
  { label: 'Branch', value: 'Hyderabad Main Branch' },
];

const UPI_ID = 'kidslearn@upi';

export default function Donation() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cherry-100 to-sunshine-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart className="text-cherry-500 fill-cherry-500" size={40} />
            <h1 className="font-fredoka text-4xl sm:text-5xl text-cherry-700">Support KidsLearn</h1>
            <Heart className="text-cherry-500 fill-cherry-500" size={40} />
          </div>
          <p className="font-nunito text-muted-foreground text-lg max-w-md mx-auto">
            Your donation helps us create more free educational content for children in Telugu, Hindi, English, and Tamil!
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: '📚', label: 'Free Lessons', desc: 'For all children' },
            { emoji: '🌍', label: '4 Languages', desc: 'Telugu, Hindi, English, Tamil' },
            { emoji: '🎮', label: 'Fun Activities', desc: 'Games & quizzes' },
          ].map((item) => (
            <div key={item.label} className="bg-white border-4 border-cherry-200 rounded-3xl p-3 text-center shadow-fun">
              <div className="text-3xl mb-1">{item.emoji}</div>
              <p className="font-fredoka text-cherry-700 text-sm">{item.label}</p>
              <p className="font-nunito text-muted-foreground text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* UPI QR Code */}
        <div className="bg-white border-4 border-sunshine-400 rounded-4xl p-6 mb-6 shadow-fun-xl text-center">
          <h2 className="font-fredoka text-2xl text-sunshine-700 mb-4">📱 Scan to Pay via UPI</h2>
          <div className="flex justify-center mb-4">
            <div className="bg-white border-4 border-sunshine-300 rounded-3xl p-3 shadow-fun inline-block">
              <img
                src="/assets/generated/upi-qr.dim_300x300.png"
                alt="UPI QR Code"
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-sunshine-100 border-2 border-sunshine-400 rounded-2xl px-4 py-2 mx-auto">
            <span className="font-nunito font-bold text-sunshine-700">{UPI_ID}</span>
            <button
              onClick={() => handleCopy(UPI_ID, 'UPI ID')}
              className="text-sunshine-600 hover:text-sunshine-800 transition-colors"
            >
              {copiedField === 'UPI ID' ? <CheckCircle size={18} className="text-grass-500" /> : <Copy size={18} />}
            </button>
          </div>
          <p className="font-nunito text-muted-foreground text-sm mt-2">
            Works with PhonePe, Google Pay, Paytm, and all UPI apps
          </p>
        </div>

        {/* Bank Details */}
        <div className="bg-white border-4 border-lavender-300 rounded-4xl p-6 shadow-fun-xl">
          <h2 className="font-fredoka text-2xl text-lavender-700 mb-4">🏦 Bank Transfer Details</h2>
          <div className="space-y-3">
            {BANK_DETAILS.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center justify-between bg-lavender-50 border-2 border-lavender-200 rounded-2xl px-4 py-3"
              >
                <div>
                  <p className="font-nunito text-muted-foreground text-xs">{detail.label}</p>
                  <p className="font-nunito font-bold text-foreground">{detail.value}</p>
                </div>
                <button
                  onClick={() => handleCopy(detail.value, detail.label)}
                  className="text-lavender-500 hover:text-lavender-700 transition-colors ml-2 shrink-0"
                >
                  {copiedField === detail.label
                    ? <CheckCircle size={20} className="text-grass-500" />
                    : <Copy size={20} />
                  }
                </button>
              </div>
            ))}
          </div>
          <p className="font-nunito text-muted-foreground text-xs text-center mt-4">
            Please use "KidsLearn Donation" as the payment reference.
          </p>
        </div>

        {/* Thank You */}
        <div className="mt-8 text-center">
          <div className="bg-grass-400 border-4 border-grass-600 rounded-4xl p-6 shadow-fun-xl">
            <div className="text-5xl mb-2">🙏</div>
            <h2 className="font-fredoka text-2xl text-white mb-1">Thank You!</h2>
            <p className="font-nunito text-white/90">
              Every contribution, big or small, helps a child learn and grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
