import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const userData = await authService.getCurrentUser();

        if (!userData) {
          dispatch(logout());
          navigate("/login");
          return;
        }

        if (!userData.emailVerification) {
          await authService.logout();
          dispatch(logout());
          navigate("/check-email");
          return;
        }
        dispatch(login({ userData }));
      } catch (error) {
        dispatch(logout());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [dispatch, navigate]);

  // Prevent UI flicker while checking auth
  if (loading) {
    return null;
  }

  return (
    <div className="text-white min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
