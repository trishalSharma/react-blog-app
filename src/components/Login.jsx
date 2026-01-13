import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { login as authLogin, setLoading } from "../store/authSlice";
import authService from "../appwrite/auth";

import { Button, Input, Logo } from "./index";
import AuthToast from "./AuthToast";

import googleIcon from "../assets/socials/google.svg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const loading = useSelector((state) => state.auth.loading);

  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

 
  useEffect(() => {
    const resetToast = sessionStorage.getItem("Password_Reset_Success");

    if (resetToast) {
      setToastMessage("Your password has been updated successfully.");
      sessionStorage.removeItem("Password_Reset_Success");
    }
  }, []);

  const login = async (data) => {
    dispatch(setLoading(true));
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }

        sessionStorage.setItem("loginToastShown", "true");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  return (
    <>
      {toastMessage && (
        <AuthToast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      <div className="relative min-h-screen flex items-center justify-center bg-[#071a1e] px-4">
        {/* Background Glow */}
        <div className="absolute inset-0 blur-[120px] opacity-40 bg-blue-900/20" />

        
        <div
          className="
            relative w-full max-w-md
            bg-white/10 backdrop-blur-xl
            border border-white/20
            rounded-2xl shadow-2xl
            p-10
          "
        >
          
          <div className="flex justify-center mb-6">
            <Logo width="90px" />
          </div>

          <h2 className="text-center text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>

          <p className="mt-3 text-center text-gray-300">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="ml-1 text-blue-400 hover:underline"
            >
              Sign up
            </Link>
          </p>

          
          {error && (
            <p
              className="
                mt-6 rounded-lg
                bg-red-500/20
                border border-red-500/30
                py-2 px-3
                text-center text-sm text-red-300
              "
            >
              {error}
            </p>
          )}

    
          <form
            onSubmit={handleSubmit(login)}
            className="mt-8 space-y-6"
          >
            <Input
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />

           
            <Button
              type="submit"
              loading={loading}
              className={`
                w-full px-4 py-3
                rounded-xl text-lg font-medium text-white
                bg-blue-600 hover:bg-blue-500
                active:scale-95 transition-all
                ${loading ? "opacity-70 cursor-not-allowed gap-3" : ""}
              `}
            >
              {loading ? "Logging you in..." : "Log in"}
            </Button>

            
            <Link
              to="/forgot-password"
              className="block text-center text-blue-500 hover:underline active:opacity-70"
            >
              Forgot password?
            </Link>

            <p className="text-center text-gray-400">——— OR ———</p>

           
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="
                w-full flex items-center justify-center gap-2
                px-4 py-2
                border border-white/50
                rounded-xl text-white
                hover:bg-white hover:text-black
                active:scale-95 transition-all duration-150
              "
            >
              <img
                src={googleIcon}
                alt="Google"
                className="w-6 h-6"
              />
              <span>Continue with Google</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;