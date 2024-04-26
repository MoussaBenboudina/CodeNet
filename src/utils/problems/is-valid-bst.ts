import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeIsValidBST = `function isValidBST(root){
  // Write your code here
};`;

// Checks if the user has the correct code
const handlerIsValidBST = (fn: any) => {
  try {
    const tree1 = { val: 2, left: { val: 1 }, right: { val: 3 } };
    const tree2 = {
      val: 5,
      left: { val: 1 },
      right: { val: 4, left: { val: 3 }, right: { val: 6 } },
    };
    const tree3 = { val: 1, left: { val: 1 } };

    const answers = [true, false, false];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < answers.length; i++) {
      const result = fn([tree1, tree2, tree3][i]);
      assert.strictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("isValidBST handler function error");
    throw new Error(error);
  }
};

const starterCodeValidateBSTJS = `function isValidBST(root) {
  // Write your code here
};`;

export const isValidBST: Problem = {
  id: "is-valid-bst",
  title: "Validate Binary Search Tree",
  problemStatement: `<p class='mt-3'>
    Given the root of a binary tree, determine if it is a valid binary search tree (BST).
  </p>
  <p class='mt-3'>
    A valid BST is defined as follows:
    <ul>
      <li>The left subtree of a node contains only nodes with keys less than the node's key.</li>
      <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
      <li>Both the left and right subtrees must also be binary search trees.</li>
    </ul>
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "root = [2,1,3]",
      outputText: "true",
      explanation: "The given tree is a binary search tree.",
    },
    {
      id: 2,
      inputText: "root = [5,1,4,null,null,3,6]",
      outputText: "false",
      explanation:
        "The 4 in the right subtree of root should not have a left child with value 3.",
    },
    {
      id: 3,
      inputText: "root = [1,1]",
      outputText: "false",
      explanation:
        "Both children of the root are the same, which is not allowed in a BST.",
    },
  ],
  constraints: `<li class='mt-2'>
    <code>The number of nodes in the tree is in the range [1, 10^4]</code>
  </li> <li class='mt-2'>
  <code>-10^4 <= Node.val <= 10^4</code>
  </li>`,
  handlerFunction: handlerIsValidBST,
  starterCode: starterCodeValidateBSTJS,
  order: 6,
  starterFunctionName: "function isValidBST(",
};
