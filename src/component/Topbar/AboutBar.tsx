import Link from "next/link";
import React from "react";

type AboutBarProps = {};

const AboutBar: React.FC<AboutBarProps> = () => {
  return (
    <div className="aboutBar flex w-56 h-72 bg-gray-100 justify-center items-center absolute top-12  z-50 text-black hover:flex-col rounded-sm shadow-lg">
      <Link href={"/"} className=" hover:text-main-color-1">
        who we ?
      </Link>
      <Link href={"/"} className=" hover:text-main-color-1">
        our tame
      </Link>
      <Link href={"/"} className=" hover:text-main-color-1">
        about
      </Link>
    </div>
  );
};
export default AboutBar;
