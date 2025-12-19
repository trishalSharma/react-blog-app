import { useEffect } from "react";

export default function AuthToast({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-none">
      <div
        role="status"
        aria-live="polite"
        className="
          pointer-events-auto
          relative flex items-start gap-4
          w-[360px]
          rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-green-500/30
          px-5 py-4
          shadow-[0_0_30px_-10px_rgba(34,197,94,0.6)]
          animate-slide-in
        "
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
          <span className="text-lg font-semibold">✓</span>
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-green-300">
            Success
          </p>
          <p className="text-sm text-green-200 leading-snug">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close notification"
          className="
            absolute top-2 right-2
            text-green-300/70
            hover:text-green-400
            transition-colors
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
}
