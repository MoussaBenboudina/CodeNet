import React from "react";
import { auth } from "@/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

const Logout: React.FC = () => {
  const [signOut, , signOutError] = useSignOut(auth);
  const router = useRouter();

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent any default behavior

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    });

    if (result.isConfirmed) {
      // Perform sign out
      await signOut();
      // Redirect to auth page
      router.push("/auth");
    }
  };

  if (signOutError) {
    console.error("Sign Out Error:", signOutError);
  }

  return (
    <div
      onClick={handleLogout}
      className="group flex items-center justify-start w-8 h-8 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-28 hover:rounded-lg active:translate-x-1 active:translate-y-1"
    >
      <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
        <FiLogOut className="w-4 h-4 text-white" />
      </div>
      <span className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Logout
      </span>
    </div>
  );
};

export default Logout;
