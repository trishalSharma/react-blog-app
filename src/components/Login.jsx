import React, { useState } from 'react';
import { Link, useNavigate}  from 'react-router-dom';
import { login as authLogin, setLoading } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector} from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Loader from './Loader'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const loading = useSelector(state => state.auth.loading);
   
    const login = async(data) => {
        dispatch(setLoading(true));
        setError("");

        try {
            const session = await authService.login(data)
            
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally{
              dispatch(setLoading(false));
        }
    };

  return (
  <div
    className='flex items-center justify-center w-full h-[80vh]'>
        <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo />
                </span>
                </div>
        
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-white">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
        </p>
       
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />

                <Button
                type="submit"
                className={`px-4 py-2 rounded bg-blue-600 text-white flex items-center justify-center gap-2 
                    ${loading ? "opacity-70 cursor-not-allowed" : ""}`} loading = {loading}>
                    {loading? "Logging you in...": "Log in"}
                </Button>

            </div>
        </form>
        </div>
    </div>
  )
}

export default Login