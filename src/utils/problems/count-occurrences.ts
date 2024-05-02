import assert from "assert";
import { Problem } from "../types/problem";

// JS doesn't have a built-in function to count occurrences in a 2D array, so we'll create one
function countOccurrences(arr: string[][], char: string) {
  let count = 0;
  for (let row of arr) {
    for (let item of row) {
      if (item === char) {
        count++;
      }
    }
  }
  return count;
}

export const countOccurrencesHandler = (fn: any) => {
  try {
    const tests = [
      {
        array: [
          ["a", "b"],
          ["a", "c"],
        ],
        char: "a",
      },
      {
        array: [
          ["x", "x"],
          ["x", "x"],
        ],
        char: "x",
      },
      {
        array: [
          ["f", "f"],
          ["b", "f"],
        ],
        char: "f",
      },
      {
        array: [
          ["p", "q"],
          ["r", "s"],
        ],
        char: "z",
      },
      {
        array: [
          ["1", "2"],
          ["3", "4"],
        ],
        char: "1",
      },
    ];
    const answers = [2, 4, 3, 0, 1];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i].array, tests[i].char);
      assert.strictEqual(result, answers[i], `Test ${i + 1} failed`);
    }
    return true;
  } catch (error: any) {
    console.error("Error from countOccurrencesHandler: ", error);
    throw new Error(error);
  }
};

// Starter code for the function
const starterCodeCountOccurrencesJS = `
function countOccurrences(arr, char) {
    // Write your code here
};
`;

export const countOccurrencesProblem: Problem = {
  id: "count-occurrences",
  title: "Count Character Occurrences in a 2D Array",
  problemStatement: `<p class='mt-3'>Given a 2D array of characters and a character, count how many times the character occurs in the array.</p>`,
  examples: [
    {
      id: 0,
      inputText: "arr = [['a', 'b'], ['a', 'c']], char = 'a'",
      outputText: "2",
    },
    {
      id: 1,
      inputText: "arr = [['x', 'x'], ['x', 'x']], char = 'x'",
      outputText: "4",
    },
    {
      id: 2,
      inputText: "arr = [['f', 'f'], ['b', 'f']], char = 'f'",
      outputText: "3",
    },
    {
      id: 3,
      inputText: "arr = [['p', 'q'], ['r', 's']], char = 'z'",
      outputText: "0",
    },
    {
      id: 4,
      inputText: "arr = [['1', '2'], ['3', '4']], char = '1'",
      outputText: "1",
    },
  ],
  constraints: `<li class='mt-2'>The array can have at most 1000 elements in total.</li>
<li class='mt-2'><code>char</code> will always be a single character.</li>`,
  starterCode: starterCodeCountOccurrencesJS,
  handlerFunction: countOccurrencesHandler,
  starterFunctionName: "function countOccurrences(",
  order: 3,
};
