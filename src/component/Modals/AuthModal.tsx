import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Login from "./Login";
import Singup from "./Singup";
import Restpassword from "./Restpassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtoms";
type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const closeModal = useCloseModal();
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-blue-gray-100 bg-opacity-60"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-red  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="rounded-lg shadow relative w-full bg-gradient-to-b bg-transparent mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModal}
              >
                <AiOutlineClose className="h-5 w-5" />
              </button>
            </div>

            {authModal.type === "login" ? (
              <Login  />
            ) : authModal.type === "register" ? (
              <Singup />
            ) : (
              <Restpassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;

function useCloseModal() {
  const setAuthModal = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return closeModal;
}

// /* Frame 2 */

// position: absolute;
// width: 480px;
// height: 796px;
// right: 60px;
// top: calc(50% - 796px/2);

// /* Glass1 Fill-Carey

// Make ya fill as glass
// */
// background: linear-gradient(321.23deg, rgba(191, 191, 191, 0.062) 5.98%, rgba(0, 0, 0, 0) 66.28%), rgba(0, 0, 0, 0.14);
// box-shadow: -8px 4px 5px rgba(0, 0, 0, 0.24);
// backdrop-filter: blur(26.5px);
// /* Note: backdrop-filter has minimal browser support */
// border-radius: 20px;
