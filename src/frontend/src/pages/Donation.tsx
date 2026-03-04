import { CheckCircle, Copy, Heart, Star } from "lucide-react";
import { useState } from "react";

const UPI_ID = "kamerarajendra098@ptyes";
const ACCOUNT_NAME = "Kamera Rajendraprasad";

// Supporters wall — add names here as donations come in
const SUPPORTERS: {
  name: string;
  tier: "gold" | "silver" | "bronze";
  message?: string;
}[] = [
  {
    name: "Kamera Rajendraprasad",
    tier: "gold",
    message: "Founder & Creator of KidsLearn",
  },
  {
    name: "A Generous Friend",
    tier: "silver",
    message: "Supporting children's education",
  },
  { name: "Anonymous Supporter", tier: "bronze" },
];

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
            <h1 className="font-fredoka text-4xl sm:text-5xl text-cherry-700">
              Support KidsLearn
            </h1>
            <Heart className="text-cherry-500 fill-cherry-500" size={40} />
          </div>
          <p className="font-nunito text-muted-foreground text-lg max-w-md mx-auto">
            Your donation helps us create more free educational content for
            children in Telugu, Hindi, English, and Tamil!
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: "📚", label: "Free Lessons", desc: "For all children" },
            {
              emoji: "🌍",
              label: "4 Languages",
              desc: "Telugu, Hindi, English, Tamil",
            },
            { emoji: "🎮", label: "Fun Activities", desc: "Games & quizzes" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white border-4 border-cherry-200 rounded-3xl p-3 text-center shadow-fun"
            >
              <div className="text-3xl mb-1">{item.emoji}</div>
              <p className="font-fredoka text-cherry-700 text-sm">
                {item.label}
              </p>
              <p className="font-nunito text-muted-foreground text-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* UPI QR Code */}
        <div className="bg-white border-4 border-sunshine-400 rounded-4xl p-6 mb-6 shadow-fun-xl text-center">
          <h2 className="font-fredoka text-2xl text-sunshine-700 mb-1">
            📱 Scan to Pay via UPI
          </h2>
          <p className="font-nunito text-muted-foreground text-sm mb-4">
            Scan with Paytm, PhonePe, Google Pay, BHIM, or any UPI app
          </p>

          {/* QR Code Image */}
          <div className="flex justify-center mb-5">
            <div
              className="bg-white border-4 border-sky-400 rounded-3xl p-3 shadow-fun inline-block"
              style={{
                background: "linear-gradient(135deg, #e0f7ff 0%, #ffffff 100%)",
              }}
            >
              <img
                src="/assets/generated/upi-qr.dim_300x300.png"
                alt="Paytm UPI QR Code for Kamera Rajendraprasad"
                className="w-56 h-56 sm:w-72 sm:h-72 rounded-2xl object-contain"
              />
            </div>
          </div>

          {/* Account Name */}
          <p className="font-fredoka text-xl text-cherry-700 mb-3">
            {ACCOUNT_NAME}
          </p>

          {/* UPI ID with copy */}
          <div className="inline-flex items-center gap-2 bg-sunshine-100 border-2 border-sunshine-400 rounded-2xl px-4 py-2 mx-auto mb-2">
            <span className="font-nunito font-bold text-sunshine-700">
              {UPI_ID}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(UPI_ID, "UPI ID")}
              className="text-sunshine-600 hover:text-sunshine-800 transition-colors"
              aria-label="Copy UPI ID"
            >
              {copiedField === "UPI ID" ? (
                <CheckCircle size={18} className="text-grass-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          <p className="font-nunito text-muted-foreground text-xs mt-1">
            Tap the copy icon to copy the UPI ID
          </p>
        </div>

        {/* How to Pay */}
        <div className="bg-white border-4 border-grass-300 rounded-4xl p-6 shadow-fun-xl mb-6">
          <h2 className="font-fredoka text-2xl text-grass-700 mb-4">
            💡 How to Pay
          </h2>
          <ol className="space-y-3 font-nunito text-gray-700">
            {[
              {
                step: "1",
                text: "Open any UPI app (Paytm, PhonePe, Google Pay, BHIM)",
              },
              { step: "2", text: 'Tap "Scan QR" or "Pay via QR"' },
              { step: "3", text: "Scan the QR code above" },
              { step: "4", text: "Enter the amount you wish to donate" },
              {
                step: "5",
                text: 'Add "KidsLearn Donation" as the note and confirm payment',
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-3">
                <span className="bg-grass-400 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-sm">
                  {item.step}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Supporters Wall */}
        <div className="bg-white border-4 border-lavender-400 rounded-4xl p-6 shadow-fun-xl mb-6">
          <h2 className="font-fredoka text-2xl text-lavender-700 mb-1 text-center">
            🌟 Our Supporters
          </h2>
          <p className="font-nunito text-muted-foreground text-sm text-center mb-5">
            A heartfelt thank you to everyone who has supported KidsLearn!
          </p>
          <div className="space-y-3">
            {SUPPORTERS.map((supporter) => {
              const tierConfig = {
                gold: {
                  bg: "bg-sunshine-100 border-sunshine-400",
                  badge: "bg-sunshine-400 text-white",
                  label: "Gold",
                  stars: 3,
                },
                silver: {
                  bg: "bg-sky-100 border-sky-400",
                  badge: "bg-sky-400 text-white",
                  label: "Silver",
                  stars: 2,
                },
                bronze: {
                  bg: "bg-tangerine-100 border-tangerine-400",
                  badge: "bg-tangerine-400 text-white",
                  label: "Bronze",
                  stars: 1,
                },
              }[supporter.tier];

              return (
                <div
                  key={supporter.name}
                  className={`flex items-center gap-4 border-2 rounded-2xl px-4 py-3 ${tierConfig.bg}`}
                  data-ocid="donation.supporters.item"
                >
                  {/* Avatar circle */}
                  <div
                    className={`w-12 h-12 rounded-full ${tierConfig.badge} flex items-center justify-center shrink-0 text-xl font-fredoka shadow-fun`}
                  >
                    {supporter.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-fredoka text-lg text-gray-800 truncate">
                      {supporter.name}
                    </p>
                    {supporter.message && (
                      <p className="font-nunito text-xs text-gray-500 truncate">
                        {supporter.message}
                      </p>
                    )}
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: tierConfig.stars }).map((_, i) => (
                      <Star
                        key={`star-${supporter.name}-${i}`}
                        size={16}
                        className="text-sunshine-500 fill-sunshine-400"
                      />
                    ))}
                  </div>
                  {/* Tier badge */}
                  <span
                    className={`${tierConfig.badge} font-fredoka text-xs px-2 py-1 rounded-full shrink-0`}
                  >
                    {tierConfig.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="font-nunito text-xs text-muted-foreground text-center mt-4">
            Your name will appear here after your donation is confirmed. Contact
            us to be added!
          </p>
        </div>

        {/* Thank You */}
        <div className="mt-4 text-center">
          <div className="bg-grass-400 border-4 border-grass-600 rounded-4xl p-6 shadow-fun-xl">
            <div className="text-5xl mb-2">🙏</div>
            <h2 className="font-fredoka text-2xl text-white mb-1">
              Thank You!
            </h2>
            <p className="font-nunito text-white/90">
              Every contribution, big or small, helps a child learn and grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
