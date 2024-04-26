import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Problems } from "../../mockProblems/Problems";
import ImageUser from "./ImageUser";
import { Problem } from "@/utils/types/problem";

const InformationUser = () => {
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
  const [started, setStarted] = useState(0);
  const [name, setName] = useState("user");
  const [easyProblemSolved, setEasyProblemSolved] = useState<number>(0);
  const [mediumProblemSolved, setMediumProblemSolved] = useState<number>(0);
  const [hardProblemSolved, setHardProblemSolved] = useState<number>(0);
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
        console.log(userData);
        setLike(userData.likedProblems.length);
        setDislike(userData.dislikedProblems.length);
        const easySolved = solvedProblems.filter((p: any) =>
          easyProblems.includes(p)
        ).length;
        const mediumSolved = solvedProblems.filter((p: any) =>
          mediumProblems.includes(p)
        ).length;
        const hardSolved = solvedProblems.filter((p: any) =>
          hardProblems.includes(p)
        ).length;

        setEasyProblemSolved(easySolved);
        setMediumProblemSolved(mediumSolved);
        setHardProblemSolved(hardSolved);
        setStarted(userData.starredProblems.length);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div className="bg-dark-color-1 w-full  text-white flex flex-col justify-center items-center">
        <div className="bg-dark-color-2 w-8/12 h-60 flex justify-around items-center">
          <div className="flex flex-col justify-center gap-3 ">
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
              Started : <span className="text-gray-300">{started}</span>
            </div>
          </div>

          <div className="flex flex-col w-[200px] sm:w-[280px] ml-[50px] sm:ml-0">
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
                <div key={index} className="text-[14px] mb-5">
                  <div className="flex justify-between ">
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
    </>
  );
};

export default InformationUser;
