import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login, setLoading } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const loading = useSelector((state) => state.auth.loading);

    const create = async (data) => {
      dispatch(setLoading(true));
      setError("");

      try {
        const userData = await authService.createAccount(data);

         if (userData.status === "VERIFICATION_REQUIRED") {
      navigate("/verify");
      return;
    }

      } catch (error) {
        setError(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a1e] px-4 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 blur-[120px] opacity-40 bg-blue-900/20"></div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl 
                      border border-white/20 rounded-2xl shadow-2xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="90px" />
        </div>

        <h2 className="text-center text-3xl font-bold text-white tracking-tight">
          Create Your Account
        </h2>

        <p className="mt-3 text-center text-gray-300">
          Already have an account?
          <Link to="/login" className="text-blue-400 hover:underline ml-1">
            Sign in
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <p className="bg-red-500/20 text-red-300 text-center py-2 px-3 rounded-lg mt-6 text-sm border border-red-500/30">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">

          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: true })}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className={`
              w-full px-4 py-3 rounded-xl text-white text-lg font-medium
              bg-blue-600 hover:bg-blue-500 active:scale-95
              flex justify-center items-center transition-all 
              ${loading ? "opacity-70 cursor-not-allowed gap-3" : ""}
            `}
            loading={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
