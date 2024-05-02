import { authModalState } from "@/atoms/authModalAtoms";
import { auth, firestore } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Anybody } from "next/font/google";
import Image from "next/image";
import SignupByEmail from "./signupByEmail";
import SignupByGitHub from "./signupByGithub";

type SingupProps = {};

const Singup: React.FC<SingupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert("Please fill all fields");
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        solutions: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
        image: "user-1.png",
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form
      className="space-y-3 w-full px-6 pb-4 flex justify-center flex-col items-center"
      onSubmit={handleRegister}
    >
      <h3 className="text-xl font-medium text-white">Sign up to CodeNet</h3>
      <div className="w-full flex flex-col gap-3 justify-center items-center ">
        {/* <button className="group relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none"> */}
        <SignupByEmail />
        <SignupByGitHub />
        {/* </button> */}
      </div>
      <div className="OR flex gap-2 w-full justify-center items-center py-2">
        <hr className="bg-gray-500 w-[calc(50%-10px)] h-[0.5px] my-1" />
        <span className="text-gray-500 w-[20px] text-sm">OR</span>
        <hr className="bg-gray-500 w-[calc(50%-10px)] h-[0.5px] my-1" />
      </div>
      <div className="w-full">
        <input
          className="border-input flex w-full  rounded-md border bg-white px-3 py-2 text-sm text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
        />
      </div>

      <div className="w-full">
        <input
          className="border-input flex w-full rounded-md border bg-white px-3 py-2 text-sm text-black  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          placeholder="Name"
        />
      </div>
      <div className="w-full">
        <input
          className="border-input flex w-full rounded-md border bg-white px-3 py-2 text-sm text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChangeInput}
          id="password"
        />
      </div>

      <button
        type="submit"
        className="font-semibold flex items-center justify-center rounded transition duration-100 ease-in-out focus:outline-none focus:ring-4 bg-main-color-1 text-white hover:bg-seconed-color disabled:border-gray-100 disabled:bg-gray-300 focus:ring-primary-700 px-3 py-2 text-sm mt-10 w-full"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-500">
        Already have an account?{" "}
        <a
          onClick={() => handleClick("login")}
          href="#"
          className=" text-main-color-1 hover:underline"
        >
          Log In
        </a>
      </div>
    </form>
  );
};
export default Singup;
