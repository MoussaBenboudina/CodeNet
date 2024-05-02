import React, { ChangeEvent, useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Problems } from "../../mockProblems/Problems";
import { Problem } from "@/utils/types/problem";
import ImageUser from "./ImageUser";
import { storage } from "@/firebase/firebase"; // Make sure the path is correct
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SkillCircle from "./SkillCircleProps";
import Image from "next/image";

const InformationUser = () => {
  //add image user
  const [user1] = useAuthState(auth);
  const [image, setImage] = useState<string>("user-1.png"); // Default image or fetched from Firestore

  useEffect(() => {
    // Fetch the image URL from Firestore when the component mounts or user changes
    const fetchImage = async () => {
      if (user1) {
        const db = getFirestore();
        const userRef = doc(db, "users", user1.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setImage(userData.image || "user-1.png"); // Use stored image or default
        }
      }
    };

    fetchImage();
  }, [user1]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.log("No file selected.");
      return;
    }

    const file = files[0];
    const storageRef = ref(storage, `images/${user?.uid}/${file.name}`); // Use user UID for unique path

    try {
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      setImage(downloadURL);
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { image: downloadURL }); // Save the URL to Firestore
      }
      console.log("File uploaded and URL retrieved:", downloadURL);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error);
    }
  };
  const allProblems = Problems.length;

  const easyProblems = Problems.filter(
    (problem) => problem.difficulty === "Easy"
  ).map((p) => p.id);
  const mediumProblems = Problems.filter(
    (problem) => problem.difficulty === "Medium"
  ).map((p) => p.id);
  const hardProblems = Problems.filter(
    (problem) => problem.difficulty === "Hard"
  ).map((p) => p.id);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [favorite, setFavorite] = useState(0);
  const [name, setName] = useState("user");
  const [easyProblemSolved, setEasyProblemSolved] = useState<number>(0);
  const [mediumProblemSolved, setMediumProblemSolved] = useState<number>(0);
  const [hardProblemSolved, setHardProblemSolved] = useState<number>(0);
  const [allProblemSolved, setAllProblemsSolved] = useState<number>(0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const solvedProblems = userData.solvedProblems || [];
        setName(userData.displayName);
        // console.log(userData);
        setLike(userData.likedProblems.length);
        setDislike(userData.dislikedProblems.length);
        const allProblemSolved = solvedProblems.length;
        const easySolved = solvedProblems.filter((p: any) =>
          easyProblems.includes(p)
        ).length;
        const mediumSolved = solvedProblems.filter((p: any) =>
          mediumProblems.includes(p)
        ).length;
        const hardSolved = solvedProblems.filter((p: any) =>
          hardProblems.includes(p)
        ).length;
        setAllProblemsSolved(allProblemSolved);
        setEasyProblemSolved(easySolved);
        setMediumProblemSolved(mediumSolved);
        setHardProblemSolved(hardSolved);
        setFavorite(userData.starredProblems.length);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [easyProblems, mediumProblems, hardProblems, user]);

  const percentage = (allProblemSolved * 100) / allProblems;

  return (
    <>
      <div className="bg-dark-color-1 w-full  text-white flex flex-col justify-center items-center">
        <div className="bg-dark-color-2 w-9/12 h-60 flex gap-6  justify-between items-center">
          <div className="flex justify-center items-start">
            <div className="cardImg b-red-600 w-42  pl-10 pr-4  h-fit">
              <div className="imageUSer bg-gray-300 rounded-3xl relative w-[100px] h-[100px] flex  overflow-hidden">
                <ImageUser image={image} />
                <div className="editImageUser absolute w-full h-full flex justify-center items-center">
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="fileInput" className="icon-button">
                    <Image src="/camera.png" alt="" width={40} height={40} />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 mr-10 max-w-1/4">
              <div className="">
                Email : <span className="text-gray-300">{user?.email}</span>
              </div>
              <div className="">
                Name : <span className="text-gray-300">{name}</span>
              </div>
              <div className="">
                Like : <span className="text-gray-300">{like}</span>
              </div>
              <div className="">
                Dislike : <span className="text-gray-300">{dislike}</span>
              </div>
              <div className="">
                Favorite : <span className="text-gray-300">{favorite}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 w-1/2">
            <SkillCircle
              percentage={percentage}
              label="solved"
              problemSolved={allProblemSolved}
              allProblems={allProblems}
            />

            <div className="flex flex-col w-[220px] sm:w-[300px] ml-12 sm:ml-0 ">
              {["Easy", "Medium", "Hard"].map((level, index) => {
                const solved = [
                  easyProblemSolved,
                  mediumProblemSolved,
                  hardProblemSolved,
                ][index];
                const total = [
                  easyProblems.length,
                  mediumProblems.length,
                  hardProblems.length,
                ][index];
                const percentage = (solved / total) * 100;
                const color = ["green", "orange", "red"][index];

                return (
                  <div key={index} className="text-[14px] mb-5  ">
                    {/* <div className="bg-orang-600 bg-green-600 bg-orange-600 bg-red-600 text-red-500 text-orange-500 text-green-500  bg-transparent"></div> */}
                    <div className="flex justify-between">
                      <span className={`text-${color}-500`}>{level}</span>
                      <span className={`text-xl text-${color}-500`}>
                        {`${solved} / `}{" "}
                        <span className=" text-sm ">{total}</span>{" "}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-400 rounded">
                      <div
                        className={`h-full rounded bg-${color}-600`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationUser;
