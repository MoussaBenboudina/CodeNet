import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Problems } from "../../mockProblems/Problems";
import MonacoEditor from "@monaco-editor/react";
import { Problem } from "@/utils/types/problem";

const ProblemSolverUser = () => {
  const [user] = useAuthState(auth);
  const [solutionsUser, setSolutionsUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Ensure user is not null before attempting to fetch
      const db = getFirestore();
      const docRef = doc(db, "users", user.uid); // Use user.uid directly
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.solutions) {
          setSolutionsUser(userData.solutions);
        } else {
          console.log("No solutions found for this user.");
        }
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div className="">
        {solutionsUser.map((solution: any, index) => (
          <div key={index} className=" w-full m-auto my-10 rounded-md">
            <div className=" text-white bg-dark-layer-2 p-3 my-1 text-xl rounded-lg">
              {solution.title}
            </div>
            <div>
              <MonacoEditor
                height="150px"
                language="javascript"
                theme="vs-dark"
                value={solution.solution}
                // options={{
                //   readOnly: true,
                //   // minimap: { enabled: false },
                // }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProblemSolverUser;


