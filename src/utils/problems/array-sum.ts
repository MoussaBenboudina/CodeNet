import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeArraySum = `function arraySum(nums) {
  // Write your code here
};`;

// Checks if the user has the correct code
const handlerArraySum = (fn: any) => {
  try {
    const testArrays = [
      [1, 2, 3, 4],
      [0, 0, 0, 0],
      [-1, -1, 2],
    ];
    const answers = [10, 0, 0];

    // Loop through each test array to check if the user's code is correct
    for (let i = 0; i < testArrays.length; i++) {
      const result = fn(testArrays[i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("arraySum handler function error");
    throw new Error(error);
  }
};

const starterCodeArraySumJS = `function arraySum(nums) {
  // Implement this function to calculate the sum of elements in nums
  // Write your code here
};`;

export const arraySum: Problem = {
  id: "array-sum",
  title: "Array Sum",
  problemStatement: `<p class='mt-3'>
    Write a function that takes an array of integers as input and returns the sum of all the elements in the array.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [1, 2, 3, 4]",
      outputText: "10",
      explanation: "The sum of all elements in the array is 10.",
    },
    {
      id: 2,
      inputText: "nums = [0, 0, 0, 0]",
      outputText: "0",
      explanation:
        "The sum of all elements in the array is 0 as all elements are zero.",
    },
    {
      id: 3,
      inputText: "nums = [-1, -1, 2]",
      outputText: "0",
      explanation: "The sum of all elements in the array is 0.",
    },
  ],
  constraints: `<li>The length of the array is at most 10,000.</li>
  <li>Each element in the array can be any integer between -10,000 and 10,000.</li>`,
  handlerFunction: handlerArraySum,
  starterCode: starterCodeArraySumJS,
  order: 9,
  starterFunctionName: "function arraySum(",
};
