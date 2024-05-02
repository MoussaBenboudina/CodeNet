// Import necessary libraries
import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
interface SolutionProps {
  SolutionId: string; // Ensures type safety
}

// The component function which destructures SolutionId directly from props
export default function Solution({ SolutionId }: SolutionProps) {
  const [solutions, setSolutions] = useState<DBProblem[]>([]); // Ensures state is always an array

  useEffect(() => {
    const getProblems = async () => {
      const q = query(collection(firestore, "solutions"));
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];

      querySnapshot.forEach((doc) => {
        tmp.push({ ...(doc.data() as DBProblem), id: doc.id }); // Ensuring proper typing
      });

      setSolutions(tmp); // Storing fetched data in state
    };

    getProblems();
  }, []); // Dependency array is empty, indicating this effect runs only once after the initial render

  // Debugging: Safely log properties when available
  // This effect runs whenever 'solutions' state changes

  const filteredSolutions = solutions.filter((s) => s.id === SolutionId); // Filter solutions based on the SolutionId
  const x = JSON.stringify(filteredSolutions);
  const solutionsData = JSON.parse(x);
  return (
    <div className="flex justify-center bg-dark-color-1 text-white">
      {solutionsData.map((data: any, index: number) => (
        <div
          key={index}
          className="max-w-4xl w-full  shadow-lg rounded-lg p-6 my-4"
        >
          <h2 className="text-2xl font-bold mb-4">Problem ID: {data.id}</h2>
          {data.solutions.map((solution: any, idx: number) => (
            <div key={idx} className="mb-6 bg-dark-layer-2 py-2">
              <div className="flex items-center mb-2">
                <Image
                  src={`/${solution.img}`}
                  alt={solution.Name}
                  className="w-12 h-12 rounded-full mr-4"
                  width={42}
                  height={42}
                />
                <h3 className="font-semibold text-gray-300">{solution.Name}</h3>
              </div>
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
              <pre className="bg-gray-200 rounded p-4"></pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Server-side rendering function to fetch SolutionId and pass it as a prop
export async function getServerSideProps(context: {
  params: { SolutionId: string };
}) {
  const { SolutionId } = context.params;

  return {
    props: { SolutionId },
  };
}
