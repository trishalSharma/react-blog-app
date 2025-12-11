import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin, setLoading } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const loading = useSelector((state) => state.auth.loading);

  const login = async (data) => {
    dispatch(setLoading(true));
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
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

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl 
                      border border-white/20 rounded-2xl shadow-2xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="90px" />
        </div>

        <h2 className="text-center text-3xl font-bold text-white tracking-tight">
          Welcome Back
        </h2>

        <p className="mt-3 text-center text-gray-300">
          Don't have an account?
          <Link to="/signup" className="text-blue-400 hover:underline ml-1">
            Sign up
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <p className="bg-red-500/20 text-red-300 text-center py-2 px-3 rounded-lg mt-6 text-sm border border-red-500/30">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">

          <Input
            label="Email Address"
            placeholder="you@example.com"
            type="email"
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
            {loading ? "Logging you in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
