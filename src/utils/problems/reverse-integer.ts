import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeReverseInteger = `function reverseInteger(x) {
  // Write your code here
};`;

// Checks if the user has the correct code
const handlerReverseInteger = (fn: any) => {
  try {
    const testIntegers = [123, -123, 120, 0];
    const answers = [321, -321, 21, 0];

    // Loop through each test integer to check if the user's code is correct
    for (let i = 0; i < testIntegers.length; i++) {
      const result = fn(testIntegers[i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("reverseInteger handler function error");
    throw new Error(error);
  }
};

const starterCodeReverseIntegerJS = `function reverseInteger(x) {
  // Implement this function to reverse digits of an integer.
  // Write your code here
};`;

export const reverseInteger: Problem = {
  id: "reverse-integer",
  title: "Reverse Integer",
  problemStatement: `<p class='mt-3'>
    Given a 32-bit signed integer, reverse digits of an integer.
  </p>
  <p class='mt-3'>
    Note: Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [-2^31, 2^31 - 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "x = 123",
      outputText: "321",
      explanation: "The reverse of 123 is 321.",
    },
    {
      id: 2,
      inputText: "x = -123",
      outputText: "-321",
      explanation: "The reverse of -123 is -321.",
    },
    {
      id: 3,
      inputText: "x = 120",
      outputText: "21",
      explanation: "The reverse of 120 is 21 (ignoring the leading zero).",
    },
    {
      id: 4,
      inputText: "x = 0",
      outputText: "0",
      explanation: "The reverse of 0 is 0.",
    },
  ],
  constraints: `<li class='mt-2'>
    <code>Assume the environment does not allow you to store 64-bit integers (signed or unsigned).</code>
  </li>`,
  handlerFunction: handlerReverseInteger,
  starterCode: starterCodeReverseIntegerJS,
  order: 10,
  starterFunctionName: "function reverseInteger(",
};
