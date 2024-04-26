import { useState, useEffect } from "react";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import Swal from "sweetalert2";
import PreferenceNav from "../PreferenceNav/PreferenceNav";
import MonacoEditor from "@monaco-editor/react";
import dynamic from "next/dynamic";
type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode);
  console.log("problem.starterCode" + userCode);
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [user] = useAuthState(auth);
  const {
    query: { pid },
  } = useRouter();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      // console.log("userCode 22" + userCode);
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      // console.log("usercode" + userCode);
      const cb = new Function(`return ${userCode}`)();
      // console.log("cb" + cb);
      const handler = problems[pid as string].handlerFunction;
      // console.log("cb" + cb);
      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          Swal.fire({
            icon: "success",
            background: "#fffs",
            text: "Congrats! All tests passed!",
            backdrop: `
            rgba(0,200,0,0.5)
              left top
              no-repeat
            `,
          });
          // console.log(userCode);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(pid),
          });

          const solutionsUser = {
            title: pid,
            solution: userCode,
          };

          const userRef2 = doc(firestore, "users", user.uid);
          await updateDoc(userRef2, {
            solutions: arrayUnion(solutionsUser),
          });

          const solution = userCode;
          const userRef3 = doc(firestore, "solutions", problem.id);
          await updateDoc(userRef3, {
            solutions: arrayUnion(solution),
          });

          // const userRef3 = doc(firestore, "solutions");
          // await updateDoc(userRef2, {
          //   solutions: arrayUnion(solutionsUser),
          // });

          setSolved(true);
          // setUserCode(problem.starterCode);
        }
      }
    } catch (error: any) {
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "error",
          text: error.message,
          background: "red",
          backdrop: `
          rgba(255,00,0,0.5)
            left top
            no-repeat
          `,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "error",
          text: error.message,
          backdrop: `
          rgba(255,0,0,0.5)
            left top
            no-repeat
          `,
        });
      }
    }
  };

  // useEffect(() => {
  //   const code = localStorage.getItem(`code-${pid}`);
  //   if (user) {
  //     setUserCode(code ? JSON.parse(code) : problem.starterCode);
  //   } else {
  //     setUserCode(problem.starterCode);
  //   }
  // }, [user, pid, problem.starterCode]);

  // const onChange = (value: string) => {
  //   setUserCode(value);
  //   // localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  // };
  const editorOptions = {
    fontSize: parseInt(settings.fontSize.replace("px", ""), 10), // Remove 'px' and convert to integer
  };
  const Rest = () => {
    setUserCode(problem.starterCode);
  };
  return (
    <div className="flex flex-col  bg-dark-color-2 relative overflow-x-hidden">
      <PreferenceNav
        settings={settings}
        setSettings={setSettings}
        Rest={Rest}
      />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          {/* <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
          /> */}

          <MonacoEditor
            theme="vs-dark"
            language="javascript"
            value={userCode}
            onChange={(value: any) => {
              setUserCode(value);
            }}
            options={editorOptions}
          />
        </div>
        <div className="w-full px-5 overflow-auto bg-dark-color-1">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 "
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};
export default dynamic(() => Promise.resolve(Playground), { ssr: false });
