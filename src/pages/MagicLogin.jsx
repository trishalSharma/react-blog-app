import React, { useState } from "react";
import authService from "../appwrite/auth";

export default function MagicLogin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleMagic = async () => {
    try {
      await authService.createMagicSession(email);
      setMsg("Magic link sent! Check your inbox.");
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="p-6 rounded-xl bg-black/30">
        <h2 className="text-xl mb-4">Login with Magic Link</h2>

        <input
          type="email"
          className="w-full p-2 mb-3 rounded bg-white/20"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleMagic}
          className="w-full py-2 bg-blue-600 rounded"
        >
          Send Magic Link
        </button>

        {msg && <p className="mt-3 text-gray-300">{msg}</p>}
      </div>
    </div>
  );
}
