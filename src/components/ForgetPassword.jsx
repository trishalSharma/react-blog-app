import { useState } from "react";
import authService from "../appwrite/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await authService.sendPasswordRecovery(
        email,
        "http://localhost:5173/reset-password"
      );

      setMessage("Password reset link sent. Check your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a1e] px-4">
  <form
    onSubmit={handleSubmit}
    className="
      w-full max-w-md
      bg-white/10 backdrop-blur-xl
      border border-white/20
      rounded-2xl
      shadow-2xl
      p-8
      space-y-6
    "
  >
    <h2 className="text-2xl font-semibold text-white text-center">
      Forgot your password?
    </h2>

    <p className="text-sm text-gray-300 text-center">
      Enter your email and we’ll send you a reset link
    </p>

    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">
        Email Address
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="
          w-full px-4 py-3
          rounded-xl
          bg-white/10 text-white
          border border-white/20
          focus:outline-none focus:ring-2 focus:ring-blue-500
          placeholder-gray-400
        "
      />
    </div>

    {message && (
      <p className="text-sm text-green-400 text-center">
        {message}
      </p>
    )}

    {error && (
      <p className="text-sm text-red-400 text-center">
        {error}
      </p>
    )}

    <button
      type="submit"
      className="
        w-full py-3
        bg-blue-600 text-white
        rounded-xl
        font-medium
        hover:bg-blue-500
        active:scale-95 active:opacity-80
        transition-all duration-150
      "
    >
      Send reset link
    </button>
  </form>
</div>

  );
}
