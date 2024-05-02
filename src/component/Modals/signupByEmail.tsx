import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtoms";
import { auth, firestore } from "@/firebase/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Image from "next/image";

type SignupProps = {};

const SignupByEmail: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [
    createUserWithEmailAndPassword,
    userWithEmail,
    loadingWithEmail,
    errorWithEmail,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, userWithGoogle, loadingWithGoogle, errorWithGoogle] =
    useSignInWithGoogle(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) {
      toast.error("Please fill all fields");
      return;
    }
    toast.loading("Creating your account");
    await createUserWithEmailAndPassword(inputs.email, inputs.password);
  };

  useEffect(() => {
    if (errorWithEmail) toast.error(errorWithEmail.message);
    if (userWithEmail) {
      const userData = {
        uid: userWithEmail.user.uid,
        email: userWithEmail.user.email,
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
      setDoc(doc(firestore, "users", userWithEmail.user.uid), userData);
      router.push("/");
    }
  }, [userWithEmail, errorWithEmail]);

  useEffect(() => {
    if (errorWithGoogle) toast.error(errorWithGoogle.message);
    if (userWithGoogle) {
      const userData = {
        uid: userWithGoogle.user.uid,
        email: userWithGoogle.user.email,
        displayName: userWithGoogle.user.displayName || "Google User",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        solutions: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
        image: "user-1.png",
      };
      setDoc(doc(firestore, "users", userWithGoogle.user.uid), userData);
      router.push("/");
    }
  }, [userWithGoogle, errorWithGoogle]);

  return (
    <div className="w-full">
      <button
        type="button"
        className="group relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none"
        onClick={() => signInWithGoogle()}
        disabled={loadingWithGoogle}
      >
        <Image
          src="/googleIcon.png"
          width={22}
          height={22}
          alt="Google Sign-in"
          className="mx-2"
        />
        <span>Log in with Google</span>
      </button>
    </div>
  );
};

export default SignupByEmail;
