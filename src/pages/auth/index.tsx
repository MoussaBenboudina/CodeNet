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
type AuthProps = {};

const Auth: React.FC<AuthProps> = () => {
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

  return (
    // <ThemeProvider defaultTheme='system' attribute='class'>
    <div className="sdas bg-dark-color-1">
      <Navbar />

      <div className="flex justify-around items-center">
        <div className="flex justify-center items-center h-[calc(100vh-5rem)] bg-dark-color-1 relative text-white flex-col">
          {/* <Cover /> */}
          {!authModal.isOpen && (
            <>
              <h2 className=" max-w-md  text-5xl text-center mb-6">
                Skills speak louder than words
              </h2>
              <h3 className="  max-w-2xl text-2xl text-center text-gray-300 mb-8">
                We help companies develop the strongest tech teams around. We
                help candidates sharpen their tech skills and pursue job
                opportunities.
              </h3>
              <div>
                <div className="btns flex gap-8">
                  <button
                    className="overflow-hidden w-32 p-2 h-12 bg-transparent border-white  border-solid border-x-2 border-y-2 text-white rounded-md text-md font-bold cursor-pointer relative z-10 group"
                    onClick={() =>
                      setAuthModalState((prev) => ({
                        ...prev,
                        isOpen: true,
                        type: "register",
                      }))
                    }
                  >
                    JOIN
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2  bg-main-color-1 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                    <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10">
                      Sing Up
                    </span>
                  </button>

                  <button
                    className="overflow-hidden w-42 p-2 h-12 bg-transparent border-white  border-solid border-x-2 border-y-2 text-white rounded-md text-md font-bold cursor-pointer relative z-10 group"
                    onClick={() =>
                      setAuthModalState((prev) => ({
                        ...prev,
                        isOpen: true,
                        type: "login",
                      }))
                    }
                  >
                    I have an account
                    <span className="absolute w-56 h-32 -top-8 -left-12 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                    <span className="absolute w-56 h-32 -top-8 -left-12 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                    <span className="absolute w-56 h-32 -top-8 -left-12  bg-main-color-1 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                    <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-14 z-10 ">
                      Log In
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}

          {authModal.isOpen && <AuthModal />}
        </div>
        {!authModal.isOpen && (
          <div className="img">
            <img src="mainIconsdark.svg" width={500} height={500} alt="" />
          </div>
        )}
      </div>
    </div>
    // </ThemeProvider>
  );
};
export default Auth;

/* Ellipse 1 */

// position: absolute;
// width: 302px;
// height: 302px;
// left: 749px;
// top: 81px;
