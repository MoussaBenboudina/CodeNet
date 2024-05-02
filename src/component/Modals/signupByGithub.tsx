import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtoms";
import { auth, firestore } from "@/firebase/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGithub, // Import useSignInWithGithub
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Image from "next/image";

type SignupProps = {};

const SignupByGitHub: React.FC<SignupProps> = () => {
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
  const [signInWithGithub, userWithGithub, loadingWithGithub, errorWithGithub] =
    useSignInWithGithub(auth); // Changed to useSignInWithGithub

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
      };
      setDoc(doc(firestore, "users", userWithEmail.user.uid), userData);
      router.push("/");
    }
  }, [userWithEmail, errorWithEmail]);

  useEffect(() => {
    if (errorWithGithub) toast.error(errorWithGithub.message);
    if (userWithGithub) {
      const userData = {
        uid: userWithGithub.user.uid,
        email: userWithGithub.user.email,
        displayName: userWithGithub.user.displayName || "GitHub User",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setDoc(doc(firestore, "users", userWithGithub.user.uid), userData);
      router.push("/");
    }
  }, [userWithGithub, errorWithGithub]);

  return (
    <div className="w-full">
      <button
        type="button"
        className="group relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none"
        onClick={() => signInWithGithub()}
        disabled={loadingWithGithub}
      >
        <Image
          src="/github.png" // Change the icon to a GitHub icon
          width={26}
          height={26}
          alt="GitHub Sign-in"
          className="mx-2"
        />
        <span>Log in with GitHub</span>
      </button>
    </div>
  );
};

export default SignupByGitHub;
