import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type LikedProps = {};

const Liked: React.FC<LikedProps> = () => {
  const [user] = useAuthState(auth);
  const [Liked, setLiked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Ensure user is not null before attempting to fetch
      const db = getFirestore();
      const docRef = doc(db, "users", user.uid); // Use user.uid directly
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.likedProblems) {
          setLiked(userData.likedProblems);
        } else {
          console.log("No solutions found for this user.");
        }
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [user]); // Include user in the dependency array to re-run the effect when user changes

  return (
    <div className="">
      {Liked.map((pl, index) => (
        <div
          key={index}
          className=" h-16 my-2 rounded-md bg-dark-layer-2 w-full flex items-center text-white px-10 text-xl"
        >
          {pl}
        </div>
      ))}
    </div>
  );
};
export default Liked;
