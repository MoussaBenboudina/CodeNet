import { authModalState } from "@/atoms/authModalAtoms";
import useTheme from "next-theme";
import Image from "next/image";
import Link from "next/link";

import { useSetRecoilState } from "recoil";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handelClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex justify-between items-center h-20 w-full sm:px-12 px-2 md:px-24 bg-transparent z-50 text-white bg-dark-color-1 ">
      <Link href="/" className="h-[22px] flex-1">
        {/* <Image src="" alt="Logo" height={100} width={100} /> */}
        <div className="flex justify-start items-center gap-3 ">
          <Image src="/Logo.png" alt="" width={38} height={38} />
          <h2 className=" text-main-color-1 text-xl font-medium">CodeNet </h2>
        </div>
      </Link>
    </div>
  );
};
export default Navbar;
