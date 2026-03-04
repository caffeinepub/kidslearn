import { CheckCircle, MessageSquare, Send, Star } from "lucide-react";
import { useState } from "react";

const FEEDBACK_PROMPTS = [
  "What did you like most about KidsLearn?",
  "What could we improve?",
  "Which section is your child's favourite?",
  "Any suggestions for new content?",
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setMessage(`${prompt}\n\n`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || message.trim().length < 5) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-grass-100 via-sunshine-100 to-sky-100 flex items-center justify-center px-4"
        data-ocid="feedback.success_state"
      >
        <div className="max-w-md w-full text-center">
          <div className="bg-white border-4 border-grass-400 rounded-4xl p-10 shadow-fun-xl">
            <div className="text-8xl mb-4">🎉</div>
            <CheckCircle size={64} className="text-grass-500 mx-auto mb-4" />
            <h2 className="font-fredoka text-4xl text-grass-700 mb-3">
              Thank You!
            </h2>
            <p className="font-nunito text-lg text-gray-600 mb-6">
              Your feedback helps us make KidsLearn better for every child!
            </p>
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5]
                .filter((s) => s <= rating)
                .map((s) => (
                  <Star
                    key={`submitted-star-${s}`}
                    size={36}
                    className="text-sunshine-500 fill-sunshine-400"
                  />
                ))}
            </div>
            <button
              type="button"
              data-ocid="feedback.submit_button"
              onClick={() => {
                setSubmitted(false);
                setRating(0);
                setName("");
                setMessage("");
                setSelectedPrompt(null);
              }}
              className="kid-btn bg-grass-400 hover:bg-grass-500 text-white px-8 py-3 text-xl border-4 border-grass-600 shadow-fun"
            >
              Send More Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-lavender-100 via-sunshine-100 to-cherry-100 py-8 px-4"
      data-ocid="feedback.page"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageSquare size={40} className="text-lavender-600" />
            <h1 className="font-fredoka text-4xl sm:text-5xl text-lavender-700">
              Share Your Feedback
            </h1>
          </div>
          <p className="font-nunito text-lg text-gray-600 max-w-md mx-auto">
            We love hearing from parents, teachers, and kids! Tell us what you
            think about KidsLearn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="bg-white border-4 border-sunshine-400 rounded-4xl p-6 shadow-fun-xl text-center">
            <h2 className="font-fredoka text-2xl text-sunshine-700 mb-4">
              ⭐ How would you rate KidsLearn?
            </h2>
            <div className="flex justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={`star-btn-${star}`}
                  type="button"
                  data-ocid={`feedback.star.${star}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-125 active:scale-110"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={48}
                    className={
                      star <= (hoveredRating || rating)
                        ? "text-sunshine-500 fill-sunshine-400"
                        : "text-gray-300 fill-gray-200"
                    }
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="font-nunito text-sunshine-700 font-bold text-lg">
                {
                  [
                    "",
                    "Needs Work 😐",
                    "Okay 🙂",
                    "Good 😊",
                    "Great 😁",
                    "Amazing! 🌟",
                  ][rating]
                }
              </p>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="bg-white border-4 border-sky-400 rounded-4xl p-6 shadow-fun-xl">
            <h2 className="font-fredoka text-2xl text-sky-700 mb-4">
              💡 Quick Starters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEEDBACK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  data-ocid="feedback.prompt.button"
                  onClick={() => handlePromptSelect(prompt)}
                  className={`text-left p-3 rounded-2xl border-3 font-nunito text-sm transition-all hover:scale-102 ${
                    selectedPrompt === prompt
                      ? "bg-sky-100 border-sky-500 text-sky-700 shadow-fun"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-sky-300"
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="bg-white border-4 border-grass-400 rounded-4xl p-6 shadow-fun-xl">
            <label
              htmlFor="feedback-name"
              className="block font-fredoka text-2xl text-grass-700 mb-3"
            >
              👤 Your Name (Optional)
            </label>
            <input
              id="feedback-name"
              type="text"
              data-ocid="feedback.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Parent, Teacher, or leave blank..."
              className="w-full border-3 border-grass-300 rounded-2xl px-4 py-3 font-nunito text-lg focus:outline-none focus:border-grass-500 bg-grass-50"
            />
          </div>

          {/* Message */}
          <div className="bg-white border-4 border-lavender-400 rounded-4xl p-6 shadow-fun-xl">
            <label
              htmlFor="feedback-message"
              className="block font-fredoka text-2xl text-lavender-700 mb-3"
            >
              💬 Your Message *
            </label>
            <textarea
              id="feedback-message"
              data-ocid="feedback.textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think! Suggestions, compliments, or areas to improve..."
              rows={5}
              className="w-full border-3 border-lavender-300 rounded-2xl px-4 py-3 font-nunito text-lg focus:outline-none focus:border-lavender-500 bg-lavender-50 resize-none"
              required
            />
            <p className="font-nunito text-sm text-gray-500 mt-1 text-right">
              {message.length} characters
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            data-ocid="feedback.submit_button"
            disabled={rating === 0 || message.trim().length < 5}
            className="w-full kid-btn bg-cherry-400 hover:bg-cherry-500 text-white py-4 text-2xl border-4 border-cherry-600 shadow-fun-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={28} />
            Send Feedback!
          </button>

          {rating === 0 && (
            <p className="text-center font-nunito text-gray-500 text-sm">
              Please choose a star rating above to submit
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
