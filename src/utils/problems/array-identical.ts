import assert from "assert";
import { Problem } from "../types/problem";
interface TestCase {
  array1: number[];
  array2: number[];
  expected: boolean;
}

const starterCodeArrayIdentical = `function areArraysIdentical(array1, array2) {
  // Write your code here
};`;

const handleArrayIdentical = (
  fn: (array1: number[], array2: number[]) => boolean
) => {
  const testCases: TestCase[] = [
    { array1: [1, 2, 3], array2: [1, 2, 3], expected: true },
    { array1: [1, 2, 3], array2: [1, 2, 4], expected: false },
    { array1: [1, 2], array2: [1, 2, 3], expected: false },
  ];

  // Loop through all test cases to check if user's code is correct
  testCases.forEach((testCase) => {
    const result = fn(testCase.array1, testCase.array2);
    assert.strictEqual(
      result,
      testCase.expected,
      `Failed on arrays ${testCase.array1} and ${testCase.array2}`
    );
  });

  console.log("All tests passed!");
  return true;
};

export const arrayIdentical: Problem = {
  id: "array-identical",
  title: "Check if Two Arrays are Identical",
  problemStatement: `<p class="mt-3">
    Write a function to determine if two 1D arrays are identical. Two arrays are considered identical if they have the same length and elements in the same order.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "array1 = [1, 2, 3], array2 = [1, 2, 3]",
      outputText: "true",
      explanation:
        "Both arrays are identical as they have the same elements in the same order.",
    },
    {
      id: 2,
      inputText: "array1 = [1, 2, 3], array2 = [1, 2, 4]",
      outputText: "false",
      explanation: "The arrays are not identical as the last element differs.",
    },
    {
      id: 3,
      inputText: "array1 = [1, 2], array2 = [1, 2, 3]",
      outputText: "false",
      explanation: "The arrays are not identical as their lengths differ.",
    },
  ],
  constraints: `<li class="mt-2">
    Arrays may contain integers only.
  </li>
  <li class="mt-2">
    0 ≤ array1.length, array2.length ≤ 100
  </li>`,
  starterCode: starterCodeArrayIdentical,
  handlerFunction: handleArrayIdentical,
  starterFunctionName: "function areArraysIdentical(",
  order: 1,
};
