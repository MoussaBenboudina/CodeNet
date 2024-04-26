import React, { useState, ChangeEvent } from "react";
import InformationUser from "./InformationUser";
import Navbar from "@/component/Navbar/Navbar";
import Liked from "./Liked";
import Star from "./star";
import ProblemSolverUser from "./ProblemSolverUser";

const MyProfile: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Liked");

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-dark-color-1 min-h-screen">
      <Navbar />
      <InformationUser />

      <div className="w-8/12 bg-dark-color-2 min-h-screen rounded-t-3xl mt-12 px-8">
        <div className="w-full my-6 bg-dark-color-2  mt-12 flex flex-col items-center">
          <div className="flex rounded-xl select-none w-full px-2">
            <label className="radio flex flex-grow items-center justify-center rounded-md p-1 cursor-pointer">
              <input
                type="radio"
                name="radio"
                value="Liked"
                className="peer hidden"
                checked={selectedOption === "Liked"}
                onChange={handleRadioChange}
              />
              <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[gray] peer-checked:to-[gray] peer-checked:text-white text-gray-200 p-2 rounded-lg transition duration-150 ease-in-out px-6">
                Liked
              </span>
            </label>
            <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
              <input
                type="radio"
                name="radio"
                value="Problems"
                className="peer hidden"
                checked={selectedOption === "Problems"}
                onChange={handleRadioChange}
              />
              <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[gray] peer-checked:to-[gray] peer-checked:text-white text-gray-200 p-2 rounded-lg transition duration-150 ease-in-out px-6">
                Problems
              </span>
            </label>
            <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
              <input
                type="radio"
                name="radio"
                value="Solutions"
                className="peer hidden"
                checked={selectedOption === "Solutions"}
                onChange={handleRadioChange}
              />
              <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[gray] peer-checked:to-[gray] peer-checked:text-white text-gray-200 p-2 rounded-lg transition duration-150 ease-in-out px-6">
                Solutions
              </span>
            </label>
            <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
              <input
                type="radio"
                name="radio"
                value="Star"
                className="peer hidden"
                checked={selectedOption === "Star"}
                onChange={handleRadioChange}
              />
              <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[gray] peer-checked:to-[gray] peer-checked:text-white text-gray-200 p-2 rounded-lg transition duration-150 ease-in-out px-6">
                Star
              </span>
            </label>
          </div>
        </div>
        {selectedOption == "Liked" ? (
          <Liked />
        ) : selectedOption == "Star" ? (
          <Star />
        ) : selectedOption == "Solutions" ? (
          <ProblemSolverUser />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyProfile;
