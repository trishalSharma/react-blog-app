import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const userId = params.get("userId");
  const secret = params.get("secret");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  if (!userId || !secret) {
    return <p>Invalid or expired password reset link.</p>;
  }

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await authService.resetPassword(userId, secret, password);
      sessionStorage.setItem("Password_Reset_Success","true")
     
      navigate("/login");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a1e] px-4">
  <form
    onSubmit={handleReset}
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
      Reset your password
    </h2>

    <p className="text-sm text-gray-300 text-center">
      Enter a new password for your account
    </p>

    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">
        New Password
      </label>
      <input
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">
        Confirm Password
      </label>
      <input
        type="password"
        placeholder="••••••••"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
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
      Reset Password
    </button>
  </form>
</div>

  );
}
