import assert from "assert";

interface TestCase {
  matrix: number[][];
  expected: { mainDiagonal: number; secondaryDiagonal: number };
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
    diagonalSums: (matrix: number[][]) => {
      mainDiagonal: number;
      secondaryDiagonal: number;
    }
  ) => boolean;
  starterFunctionName: string;
  order: number;
}

// This is the function the users will implement
const starterCodeDiagonalSums = `function diagonalSums(matrix){
  // Write your code here
};`;

// This function will test the users' implementation against predefined cases
const handleDiagonalSums = (
  diagonalSums: (matrix: number[][]) => {
    mainDiagonal: number;
    secondaryDiagonal: number;
  }
): boolean => {
  const testCases: TestCase[] = [
    {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      expected: { mainDiagonal: 15, secondaryDiagonal: 15 },
    },
    {
      matrix: [
        [2, 3],
        [4, 5],
      ],
      expected: { mainDiagonal: 7, secondaryDiagonal: 7 },
    },
    { matrix: [[10]], expected: { mainDiagonal: 10, secondaryDiagonal: 10 } },
  ];

  testCases.forEach((testCase) => {
    const result = diagonalSums(testCase.matrix);
    assert.deepStrictEqual(result, testCase.expected);
  });
  return true;
};

export const diagonalSumsProblem: Problem = {
  id: "diagonal-sums",
  title: "Sum of Matrix Diagonals",
  problemStatement:
    "Given a square matrix, calculate the sum of the main diagonal (top-left to bottom-right) and the secondary diagonal (top-right to bottom-left).",
  examples: [
    {
      id: 1,
      inputText: "Matrix: [[1,2,3],[4,5,6],[7,8,9]]",
      outputText: "{ mainDiagonal: 15, secondaryDiagonal: 15 }",
      explanation:
        "The sum of the main diagonal (1, 5, 9) and the secondary diagonal (3, 5, 7) both add up to 15.",
    },
    {
      id: 2,
      inputText: "Matrix: [[2,3],[4,5]]",
      outputText: "{ mainDiagonal: 7, secondaryDiagonal: 7 }",
      explanation: "The sum of both diagonals (2, 5) and (3, 4) is 7.",
    },
    {
      id: 3,
      inputText: "Matrix: [[10]]",
      outputText: "{ mainDiagonal: 10, secondaryDiagonal: 10 }",
      explanation: "With only one element, both diagonals sum to 10.",
    },
  ],
  constraints:
    "Matrix will be a square (n x n), where 1 ≤ n ≤ 100 and each element is between -10³ and 10³.",
  starterCode: starterCodeDiagonalSums,
  handlerFunction: handleDiagonalSums,
  starterFunctionName: "function diagonalSums(",
  order: 5,
};
