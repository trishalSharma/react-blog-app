import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

export default function Verify(){
    const [params] = useSearchParams();
    const navigate = useNavigate();
    
    const userId = params.get("userId");
    const secret = params.get("secret");
    
    useEffect(() => {
        async function verifyEmail(){
            if(!userId || !secret){
                return;
            }
 try {
        await authService.updateMagicSession(userId, secret);
        navigate("/"); // login success
      } catch (err) {
        console.error("Magic login failed:", err);
      }
    }

    verifyLogin();
  }, []);

   
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Verifying login...
    </div>
  );
}