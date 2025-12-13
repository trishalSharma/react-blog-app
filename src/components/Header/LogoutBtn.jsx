import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout} from "../../store/authSlice"

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await authService.logout();
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
