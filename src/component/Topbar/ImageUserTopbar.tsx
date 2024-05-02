// Import statements
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase"; // Ensure this path is correct
import Image from "next/image";

type ImageUserTopbarProps = {};

const ImageUserTopbar: React.FC<ImageUserTopbarProps> = () => {
  const [image, setImage] = useState<string>("user-1.png");
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Function to fetch user image URL from Firestore
    const fetchImage = async () => {
      if (user) {
        const db = getFirestore(); // Initialize Firestore
        const userRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
        const userSnap = await getDoc(userRef); // Get user document snapshot

        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Check if the image field exists and update state, otherwise set default
          setImage(userData.image || "user-1.png");
        } else {
          // Set default image if no document exists
          setImage("user-1.png");
        }
      }
    };

    fetchImage();
  }, [user]); // Dependency array, re-run effect when `user` changes

  return (
    <div>
      <Image src={image} alt="User" width={32} height={32} />
    </div>
  );
};

export default ImageUserTopbar;
