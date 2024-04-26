import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeFactorial = `function factorial(n) {
  // Write your code here
};`;

// Handler function to check if the user's code is correct
const handlerFactorial = (fn: (n: number) => number) => {
  try {
    const tests = [0, 1, 5, 10];
    const answers = [1, 1, 120, 3628800]; // Factorials of the tests respectively
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.strictEqual(result, answers[i], `Test case ${i} failed`);
    }
    return true;
  } catch (error: any) {
    console.log("Factorial handler function error", error);
    throw new Error(error);
  }
};

export const factoria: Problem = {
  id: "factorial",
  title: "Calculate Factorial",
  problemStatement: `<p class='mt-3'>
    Write a function that takes a non-negative integer <code>n</code> and returns the factorial of <code>n</code>.
  </p>
  <p>
    Factorial of a non-negative integer, is multiplication of all integers smaller than or equal to <code>n</code>. For example, factorial of 6 is <code>6*5*4*3*2*1</code> which is 720.
  </p>`,
  examples: [
    {
      id: 0,
      inputText: "n = 0",
      outputText: "1",
      explanation: "The factorial of 0 is 1.",
    },
    {
      id: 1,
      inputText: "n = 5",
      outputText: "120",
      explanation: "The factorial of 5 is 5*4*3*2*1 = 120.",
    },
  ],
  constraints: `<li><code>0 <= n <= 12</code></li>`,
  starterCode: starterCodeFactorial,
  handlerFunction: handlerFactorial,
  starterFunctionName: "function factorial(n)",
  order: 7,
};
