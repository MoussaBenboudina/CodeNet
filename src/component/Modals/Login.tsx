import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaGooglePlus, FaLinkedin } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtoms";
import { auth } from "@/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const router = useRouter();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return alert("Please fill all fields");
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);
  return (
    <form
      className="space-y-3 px-6 pb-4 w-[500px] flex justify-center items-center flex-col"
      onSubmit={handleLogin}
    >
      <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>

      <div className="w-full">
        <button className="group relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none">
          <img
            src="/googleIcon.png"
            width={22}
            height={22}
            alt=""
            className="mx-2"
          />
          <span>Log in with Google</span>
        </button>
      </div>
      <div className="OR flex gap-2 w-full justify-center items-center py-2">
        <hr className="bg-gray-500 w-[calc(50%-10px)] h-[0.5px] my-1" />
        <span className="text-gray-500 w-[20px] text-sm">OR</span>
        <hr className="bg-gray-500 w-[calc(50%-10px)] h-[0.5px] my-1" />
      </div>
      <div className="w-full">
        <input
          className="border-input flex w-full  rounded-md border bg-white px-3 py-2 text-sm text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full">
        <input
          className="border-input flex w-full rounded-md border bg-white px-3 py-2 text-sm text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          placeholder="Password"
          type="password"
          onChange={handleInputChange}
          name="password"
          id="password"
        />
      </div>

      <button
        type="submit"
        className="font-semibold flex items-center justify-center rounded transition duration-100 ease-in-out focus:outline-none focus:ring-4 bg-main-color-1 text-white hover:bg-seconed-color disabled:border-gray-100 disabled:bg-gray-300 focus:ring-primary-700 px-3 py-2 text-sm mt-10 w-full"
      >
        {loading ? "Loading..." : "Log In"}
      </button>
      <div className="flex w-full justify-center items-center m-0 gap-0text-sm font-medium text-gray-500">
        Forgot Password?
        <a
          href="#"
          className="text-sm block text-main-color-1 hover:underline text-right"
          onClick={() => handleClick("forgotPassword")}
        >
          Send reset code.
        </a>
      </div>
      <div className="text-sm font-medium text-gray-500">
        Not Registered?{" "}
        <a
          onClick={() => handleClick("register")}
          href="#"
          className=" text-main-color-1 hover:underline"
          // onClick={() => handleClick("register")}
        >
          Create account
        </a>
      </div>
    </form>
  );
};
export default Login;
