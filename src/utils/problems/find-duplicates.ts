import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeFindDuplicates = `function findDuplicates(nums) {
  // Write your code here
};`;

// Checks if the user's code is correct
const handlerFindDuplicates = (fn: any) => {
  try {
    const inputs = [
      [4, 3, 2, 7, 8, 2, 3, 1],
      [1, 1, 2],
      [1, 2, 3, 4],
    ];
    const answers = [[2, 3], [1], []];

    // Loop all tests to check if the user's code is correct
    for (let i = 0; i < inputs.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fn(inputs[i]);
      assert.deepStrictEqual(
        result.sort((a: any, b: any) => a - b),
        answers[i].sort((a, b) => a - b)
      );
    }
    return true;
  } catch (error: any) {
    console.log("findDuplicates handler function error");
    throw new Error(error);
  }
};

export const findDuplicates: Problem = {
  id: "find-duplicates",
  title: "Find All Duplicates in an Array",
  problemStatement: `<p class='mt-3'>
  Given an array of integers, some elements appear twice and others appear once. Find all the elements that appear twice in this array.
</p>
<p class='mt-3'>
  You may return the answer in any order.
</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [4,3,2,7,8,2,3,1]",
      outputText: "[2,3]",
      explanation: "2 and 3 appear twice in the array.",
    },
    {
      id: 2,
      inputText: "nums = [1,1,2]",
      outputText: "[1]",
      explanation: "1 appears twice in the array.",
    },
    {
      id: 3,
      inputText: "nums = [1,2,3,4]",
      outputText: "[]",
      explanation: "No duplicates in the array.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ nums.length ≤ 20</code>
</li> <li class='mt-2'>
  <code>1 ≤ nums[i] ≤ 20</code>
</li>`,
  handlerFunction: handlerFindDuplicates,
  starterCode: starterCodeFindDuplicates,
  order: 3,
  starterFunctionName: "function findDuplicates(",
};
