import assert from "assert";

interface TestCase {
  a: number;
  b: number;
}

interface Example {
  id: number;
  inputText: string;
  outputText: string;
  explanation: string;
}

interface Problem {
  id: string;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  starterCode: string;
  handlerFunction: (
    solveEquation: (a: number, b: number) => number | null
  ) => boolean;
  starterFunctionName: string;
  order: number;
}

const handleSolveLinearEquation = (
  solveEquation: (a: number, b: number) => number | null
): boolean => {
  const testCases: TestCase[] = [
    { a: 2, b: -8 },
    { a: 5, b: 5 },
    { a: 10, b: 0 },
    { a: 0, b: 5 }, // No solution case
  ];
  const answers: (number | null)[] = [4, -1, 0, null];

  for (let i = 0; i < testCases.length; i++) {
    const result = solveEquation(testCases[i].a, testCases[i].b);
    assert.strictEqual(result, answers[i]);
  }
  return true;
};

const starterCodeValidParenthesesJS = `
function solveLinearEquation(a,b){
// your code
};`;

export const solveLinearEquation: Problem = {
  id: "solve-linear-equation",
  title: "Solve First-Degree Equation",
  problemStatement:
    "Given a linear equation in the form ax + b = 0, find the value of x.",
  examples: [
    {
      id: 1,
      inputText: "a = 2, b = -8",
      outputText: "4",
      explanation: "Solving the equation 2x - 8 = 0 gives x = 4.",
    },
    {
      id: 2,
      inputText: "a = 5, b = 5",
      outputText: "-1",
      explanation: "Solving the equation 5x + 5 = 0 gives x = -1.",
    },
    {
      id: 3,
      inputText: "a = 10, b = 0",
      outputText: "0",
      explanation: "Solving the equation 10x = 0 gives x = 0.",
    },
    {
      id: 4,
      inputText: "a = 0, b = 5",
      outputText: "null",
      explanation: "The equation 0x + 5 = 0 has no solution.",
    },
  ],
  constraints: "1 <= a, b <= 10^4",
  starterCode: starterCodeValidParenthesesJS,
  handlerFunction: handleSolveLinearEquation,
  starterFunctionName: "function solveLinearEquation(",
  order: 8,
};
