import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
// import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Logout from "../Buttons/Logout";
import { authModalState } from "@/atoms/authModalAtoms";
import Timer from "../Timer/Timer";
import AboutBar from "./AboutBar";
import { FaChevronDown } from "react-icons/fa";
// import Timer from "../Timer/Timer";
// import { useRouter } from "next/router";
// import { problems } from "@/utils/problems";
// import { Problem } from "@/utils/types/problem";
import dynamic from "next/dynamic";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  // const router = useRouter();

  // const handleProblemChange = (isForward: boolean) => {
  // 	const { order } = problems[router.query.pid as string] as Problem;
  // 	const direction = isForward ? 1 : -1;
  // 	const nextProblemOrder = order + direction;
  // 	const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

  // 	if (isForward && !nextProblemKey) {
  // 		const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
  // 		router.push(`/problems/${firstProblemKey}`);
  // 	} else if (!isForward && !nextProblemKey) {
  // 		const lastProblemKey = Object.keys(problems).find(
  // 			(key) => problems[key].order === Object.keys(problems).length
  // 		);
  // 		router.push(`/problems/${lastProblemKey}`);
  // 	} else {
  // 		router.push(`/problems/${nextProblemKey}`);
  // 	}
  // };

  return (
    <nav className=" flex h-[50px] w-full shrink-0 items-center px-12 pr-32 text-white h-22 bg-dark-color-1 relative shadow-2xl">
      <div
        className={`relative flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : " bg-dark-color-1"
        }`}
      >
        <Link href="/" className="h-[22px] flex-1">
          <h2 className="text-xl">
            Code<span className=" text-main-color-1">Net</span>
          </h2>
        </Link>

        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            {/* <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              // onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div> */}
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            {/* <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              // onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div> */}
          </div>
        )}

        {!problemPage && !user && (
          <ul className="flex justify-center items-center gap-5">
            <li className="text-xl hover:text-main-color-1">
              <a href="#Explor">Explor</a>
            </li>
            <li className="liAbout text-xl  relative">
              <a href="" className=" hover:text-main-color-1 py-8 ">
                <span className="flex justify-center items-center gap-1">
                  About
                  <FaChevronDown className="mt-1" />
                </span>
              </a>
              <AboutBar />
            </li>

            <Link href={"/OurTeam"} className="text-xl hover:text-main-color-1">
              our team
            </Link>
            <li className="text-xl hover:text-main-color-1">
              <a href="">Blog</a>
            </li>
            <li className="text-xl hover:text-main-color-1">
              <a href="">Contact Us</a>
            </li>
            <li className="text-xl hover:text-main-color-1">
              <a href=""></a>
            </li>
          </ul>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            {/* <a
              href="https://www.buymeacoffee.com/burakorkmezz"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a> */}
            {/* <button className="brightness-200 w-32 h-12 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600">
              <div className="px-1 py-2 backdrop-blur-xl bg-black/80 rounded-lg font-bold w-full h-full">
                <div className="group-hover:scale-100 flex justify-center group-hover:text-yellow-500 text-yellow-600 ">
                  Premium
                </div>
              </div>
            </button> */}
          </div>

          {!user && (
            <>
              <Link
                href="/auth"
                className="main-btn group flex h-8 items-center justify-center rounded-lg text-md font-semibold text-white transition-all duration-100 glow-sm hover:glow-md w-28"
              >
                JOIN
              </Link>
            </>
          )}
          {user && problemPage && <Timer />}
          {user && (
            <div className="cursor-pointer group relative flex justify-center items-center">
              <Link href={"/MyProfile"}>
                <Image
                  src="/img-user.png"
                  alt="Avatar"
                  width={33}
                  height={33}
                  className="rounded-full flex items-center justify-center"
                />
              </Link>

              <div
                className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default dynamic(() => Promise.resolve(Topbar), { ssr: false });
