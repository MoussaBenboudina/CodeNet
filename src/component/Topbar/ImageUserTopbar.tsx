import { auth } from "@/firebase/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type ImageUserTopbarProps = {};

const ImageUserTopbar: React.FC<ImageUserTopbarProps> = () => {
  const [image, setImage] = useState<string>("user-1.png");
  const [user] = useAuthState(auth);
  useEffect(() => {
    // Fetch the image URL from Firestore when the component mounts or user changes
    const fetchImage = async () => {
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setImage(userData.image || "user-1.png"); // Use stored image or default
        }
      }
    };

    fetchImage();
  }, [user]);

  return (
    <div>
      <img src={image} alt="" width={32} height={32} />
    </div>
  );
};
export default ImageUserTopbar;
