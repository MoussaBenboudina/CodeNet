import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import ImageUserTopbar from "./ImageUserTopbar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ImageUser from "@/pages/MyProfile/ImageUser";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const [image, setImage] = useState<string>("user-1.png");

  useEffect(() => {
    // Fetch the image URL from Firestore when the component mounts or user changes
    const fetchImage = async () => {
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.image) setImage(userData.image);
          else setImage("user-1.png"); // Use stored image or default
        }
      }
    };

    fetchImage();
  }, [user]);

  return (
    <nav className=" flex h-[50px] w-full shrink-0 items-center px-12 pr-32 text-white h-22 bg-dark-color-1 relative shadow-2xl">
      <div
        className={`relative flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : " bg-dark-color-1"
        }`}
      >
        <Link href="/" className="h-[22px] flex-1  flex justify-start">
          {/* <h2 className="text-xl">
            Code<span className=" text-main-color-1">Net</span>
          </h2> */}
          <div className="flex justify-center items-center gap-3">
            <Image src="/Logo.png" alt="" width={38} height={38} />
            <h2 className=" text-main-color-1 text-xl font-medium">CodeNet </h2>
          </div>
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
              className="flex transition items-center gap-1 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer hover:text-main-color-1"
            >
              <div className="  ">
                <BsList className="text-2xl" />
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
          {user && !problemPage && (
            <div className="cursor-pointer group relative flex justify-center items-center">
              <Link href={"/MyProfile"}>
                {/* <img
                  src={image}
                  alt="Avatar"
                  width={33}
                  height={33}
                  className="rounded-full flex items-center justify-center"
                /> */}
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden  z-40">
                  <ImageUser image={image} />
                </div>
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
