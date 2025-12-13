import React, { useState } from "react";
import authService from "../appwrite/auth";

export default function ResendVerification() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResend() {
    setLoading(true);
    setMessage("");

    try {
      await authService.resendVerification();
      setMessage("Verification email sent again. Please check your inbox.");
    } catch {
      setMessage("Unable to resend verification email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a1e] text-white">
      <div className="bg-slate-800 p-6 rounded-xl shadow text-center max-w-md">
        <h1 className="text-xl font-semibold mb-4">
          Resend verification email
        </h1>

        {message && (
          <p className="mb-4 text-sm text-gray-300">
            {message}
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend Email"}
        </button>
      </div>
    </div>
  );
}
