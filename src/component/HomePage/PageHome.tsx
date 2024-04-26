import Navbar from "@/component/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-theme";
import Login from "@/component/Modals/Login";
import AuthModal from "@/component/Modals/AuthModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import Cover from "@/component/HomePage/Cover";
import Topbar from "../Topbar/Topbar";
import { ReactTyped } from "react-typed";
import { optionsParticles } from "./particleOptions";
import { FaEye } from "react-icons/fa6";
import Encryption from "./Encryption";
import Skills from "./Skills";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type HomePage = {};

const HomePage: React.FC<HomePage> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handelClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  const Section1 = () => {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-5rem)] z-10 text-white flex-col relative">
        {!authModal.isOpen && (
          <>
            <h2 className="main-text-1 gradient-text text-center text-4xl font-semibold leading-10 sm:text-4xl md:text-5xl md:leading-[3.5rem] lg:text-6xl lg:leading-[4rem] xl:text-6xl">
              Solve complexities
            </h2>
            <h2 className="main-text-2 gradient-text text-center text-4xl font-semibold leading-10 sm:text-4xl md:text-5xl md:leading-[3.5rem] lg:text-6xl lg:leading-[4rem] xl:text-6xl ">
              through challenge
            </h2>
            <h3 className="second-text  max-w-4xl text-2xl text-center  mb-8 z-20">
              <ReactTyped
                strings={[
                  "We help students develop their skills ",
                  "We help companies develop the strongest tech teams around.",
                  "We help candidates sharpen their tech skills and pursue job opportunities.",
                ]}
                typeSpeed={50}
                backSpeed={15}
                // attr="placeholder"
                loop
              />
            </h3>
            <div className="flex justify-center items-center gap-4">
              <Link
                href={"/auth"}
                className="main-btn group flex h-14 items-center justify-center rounded-lg text-lg font-semibold text-white transition-all duration-100 glow-sm hover:glow-md w-56"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-6 w-6 transition-all duration-150 group-hover:translate-x-2"
                >
                  <path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
                </svg>
              </Link>

              <Link
                href={"https://Discord"}
                className="btn-try h-14 flex justify-center items-center w-44 rounded-lg border-2 text-lg font-medium text-white transition duration-150  ease-in-out hover:border-secondary-400 hover:text-secondary-400"
              >
                Join Discord
              </Link>
            </div>
            <span className="text-gray-500  -mb-32 mt-40 text-xl">
              Lots of developers all over the world and the company uses{" "}
              <span className=" text-main-color-1">CodeNet</span>
            </span>
            {/* <Cover /> */}
          </>
        )}

        {authModal.isOpen && <AuthModal />}
      </div>
    );
  };

  const Section2 = () => {
    return (
      <div
        id="Explor"
        className="text-white flex flex-col justify-center items-center mt-20 h-screen z-10  relative"
        data-aos="fade-right"
      >
        <img src="/exploration.png" width={120} height={120} />
        <div className="mb-8">
          <h1 className="text-4xl">What can I use Codewars for ?</h1>
        </div>
        <div className="cards flex justify-center items-center  w-full">
          <div className="card rounded-md  flex flex-col justify-center items-center px-6 h-56  ">
            <span className=" text-main-color-1 my-3 text-2xl flex flex-col justify-center items-center h-28">
              <img src="/thinking.png" width={70} height={40} alt="" />
              Get new perspectives
            </span>
            <hr className="bg-gray-300 w-full h-0.5 my-1" />
            <span className="text-center  h-48 px-6">
              Solve challenges then view how others solved the same challenge.
              Pickup new techniques from some of the most skilled developers in
              the world.
            </span>
          </div>

          <div className="card rounded-md  flex flex-col justify-center items-center  px-6 h-56">
            <span className=" text-main-color-1 my-3 text-2xl flex flex-col justify-center items-center h-28">
              <img src="/coding-language.png" width={70} height={40} alt="" />
              Learn new languages
            </span>
            <hr className="bg-gray-300 w-full h-0.5 my-1" />
            <span className="text-center  h-48 px-6">
              Solve challenges in a language you are comfortable with, then do
              it in a language you want to improve with. Level up across
              different languages.
            </span>
          </div>

          <div className="card rounded-md  flex flex-col justify-center items-center  px-6 h-56">
            <span className=" text-main-color-1 my-3 text-2xl flex flex-col justify-center items-center h-28">
              <img src="/creativity.png" width={70} height={40} alt="" />
              Compete with peers
            </span>
            <hr className="bg-gray-300 w-full h-0.5 my-1" />
            <span className="text-center  h-48 px-6">
              Compete against your friends, colleagues, and the community at
              large. Allow competition to motivate you towards mastering your
              craft.
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    // <ThemeProvider defaultTheme='system' attribute='class'>
    <div className=" bg-dark-color-1 min-h-screen relative overflow-x-hidden">
      <Topbar />
      <Section1 />
      <Section2 />
      <Skills />
      {/* <Encryption /> */}

      <Cover />
    </div>
    // </ThemeProvider>
  );
};
export default HomePage;

/* Ellipse 1 */

// position: absolute;
// width: 302px;
// height: 302px;
// left: 749px;
// top: 81px;
