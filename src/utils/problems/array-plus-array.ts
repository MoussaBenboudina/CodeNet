import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeArrayPlusArray = `function arrayPlusArray(arr1, arr2) {
  // Write your code here
};`;

const handlerArrayPlusArray = (fn: any) => {
  try {
    const testCases = [
      { arr1: [1, 2, 3], arr2: [4, 5, 6], expected: [5, 7, 9] },
      { arr1: [-1, -2, -3], arr2: [-4, -5, -6], expected: [-5, -7, -9] },
      { arr1: [0, 0, 0], arr2: [0, 0, 0], expected: [0, 0, 0] },
      { arr1: [100, 200, 100], arr2: [100, 100, 0], expected: [200, 300, 100] },
    ];

    // Loop through each test case to check if the user's code is correct
    for (let testCase of testCases) {
      const result = fn(testCase.arr1, testCase.arr2);
      assert.deepStrictEqual(
        result,
        testCase.expected,
        `Test failed for inputs: ${testCase.arr1} and ${testCase.arr2}`
      );
    }
    return true;
  } catch (error: any) {
    console.log("arrayPlusArray handler function error");
    throw new Error(error);
  }
};

export const arrayPlusArray: Problem = {
  id: "array-plus-array",
  title: "Array Plus Array",
  problemStatement: `<p class='mt-3'>
    Write a function that receives two arrays of integers and returns a new array containing the element-wise sum of the two arrays.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "arr1 = [1, 2, 3], arr2 = [4, 5, 6]",
      outputText: "[5, 7, 9]",
      explanation:
        "Each element of the first array is added to the corresponding element of the second array.",
    },
    {
      id: 2,
      inputText: "arr1 = [-1, -2, -3], arr2 = [-4, -5, -6]",
      outputText: "[-5, -7, -9]",
      explanation:
        "Negative numbers are also added element-wise resulting in a new array of negative numbers.",
    },
  ],
  constraints: `<li class='mt-2'>
    <code>Both arrays will have the same length.</code>
  </li>
  <li class='mt-2'>
    <code>1 ≤ arr1.length, arr2.length ≤ 1000</code>
  </li>
  <li class='mt-2'>
    <code>-1000 ≤ arr1[i], arr2[i] ≤ 1000</code>
  </li>`,
  handlerFunction: handlerArrayPlusArray,
  starterCode: starterCodeArrayPlusArray,
  order: 20,
  starterFunctionName: "function arrayPlusArray(",
};
