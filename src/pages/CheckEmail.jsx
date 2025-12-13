import React from "react";
import { Link } from "react-router-dom";

export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a1e] text-white">
      <div className="max-w-md text-center bg-slate-800 p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">
          Verify your email
        </h1>

        <p className="text-gray-300 mb-6">
          We’ve sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to continue.
        </p>

        <Link
  to="/resend-verification"
  className="text-blue-400 hover:underline"
>
  Resend verification email
</Link>


        <p className="text-sm text-gray-400">
          After verifying, you can{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            log in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
