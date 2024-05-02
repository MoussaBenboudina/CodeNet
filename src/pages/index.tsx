import { Inter, Vazirmatn } from "next/font/google";

import Topbar from "@/component/Topbar/Topbar";
import ProblemsTable from "@/component/ProblemsTable/ProblemsTable";

import { ChangeEvent, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "@/firebase/firebase";

import Cover from "@/component/HomePage/Cover";
import HomePage from "@/component/HomePage/PageHome";
import { doc, setDoc } from "firebase/firestore";

import Search from "@/component/ProblemsTable/Search";
// import ParticleBackground from "@/component/HomePage/ParticleBackground";
// import Particle from "@/component/HomePage/Particle";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [user] = useAuthState(auth);
  const [difficulty, setDifficulty] = useState<string>("All");
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 1,
    likes: 0,
    dislikes: 0,
  });

  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPorblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newPorblem);
    alert("saved to database");
  };
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      {!user ? (
        <HomePage />
      ) : (
        <main className=" bg-dark-color-1 min-h-screen ">
          <Topbar />
          <div className="flex flex-col justify-center items-center mb-6">
            <h1
              className="text-2xl text-center text-main-color-1 dark:text-gray-400 font-medium
    			uppercase mt-10 mb-5"
            >
              &ldquo; QUALITY OVER QUANTITY &rdquo;
            </h1>
            <Search setSearchTerm={setSearchTerm} />
          </div>
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}

          <table className="text-sm text-left text-gray-100 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <>
                <thead className="text-xs text-gray-200 uppercase dark:text-gray-100 border-b ">
                  <tr>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      <div className="">
                        <select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className={`bg-transparent p-2`}
                        >
                          <option value="All" className="bg-gray-800 p-22">
                            All
                          </option>
                          <option
                            value="Easy"
                            className=" o text-green-500 h-20"
                          >
                            Easy
                          </option>
                          <option value="Medium" className="text-orange-500">
                            Medium
                          </option>
                          <option value="Hard" className="text-red-500">
                            Hard
                          </option>
                        </select>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Solution
                    </th>
                  </tr>
                </thead>
              </>
            )}
            <ProblemsTable
              setLoadingProblems={setLoadingProblems}
              difficulty={difficulty}
              searchTerm={searchTerm}
            />
          </table>
          <form
            className="flex flex-col bg-orange-500 gap-3 w-[500px] m-auto mb-9 py-6 px-6"
            onSubmit={handelSubmit}
          >
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="problem id"
              name="id"
            />
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="title"
              name="title"
            />
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="difficulty"
              name="difficulty"
            />
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="category"
              name="category"
            />
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="order"
              name="order"
            />
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="videoId?"
              name="videoId"
            />
            <input
              onChange={handelInputChange}
              type="text"
              placeholder="link?"
              name="link"
            />
            <button className="bg-gray-500">Save to db</button>
          </form>
        </main>
      )}
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
