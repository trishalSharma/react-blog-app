import { useEffect } from "react";

export default function AuthToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-10 right-6 z-50">
      <div
        className="relative flex items-center gap-3 rounded-lg
                   bg-green-500/10 border border-green-500/30
                   px-5 py-4 text-green-400 shadow-lg backdrop-blur
                   transition-all duration-300"
      >
        <span className="text-lg">✅</span>

        <p className="text-sm font-medium">
          {message}
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-green-300 hover:text-green-500 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
