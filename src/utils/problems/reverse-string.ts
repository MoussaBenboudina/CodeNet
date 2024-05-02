import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeReverseString = `function reverseString(s){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerReverseString = (fn: any) => {
  // fn is the callback that user's code is passed into
  try {
    const inputs = ["hello", "world", "!", "1234"];

    const answers = ["olleh", "dlrow", "!", "4321"];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < inputs.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fn(inputs[i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("reverseString handler function error");
    throw new Error(error);
  }
};

export const reverseString: Problem = {
  id: "reverse-string",
  title: "Reverse String",
  problemStatement: `<p class='mt-3'>
  Given a string <code>s</code>, return the string with its characters reversed.
</p>`,
  examples: [
    {
      id: 1,
      inputText: 's = "hello"',
      outputText: '"olleh"',
      explanation: "Reversing the string 'hello' gives 'olleh'.",
    },
    {
      id: 2,
      inputText: 's = "world"',
      outputText: '"dlrow"',
      explanation: "Reversing the string 'world' gives 'dlrow'.",
    },
    {
      id: 3,
      inputText: 's = "!"',
      outputText: '"!"',
      explanation: "Reversing the string '!' gives '!'.",
    },
    {
      id: 4,
      inputText: 's = "1234"',
      outputText: '"4321"',
      explanation: "Reversing the string '1234' gives '4321'.",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>1 ≤ s.length ≤ 100</code>
</li> <li class='mt-2'>
<code>s consists only of printable ASCII characters.</code>
</li>`,
  handlerFunction: handlerReverseString,
  starterCode: starterCodeReverseString,
  order: 2,
  starterFunctionName: "function reverseString(",
};
