import { Problem } from "../types/problem";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";
import { isValidBST } from "./is-valid-bst";
import { factoria } from "./factorial-Problem";
import { solveLinearEquation } from "./solve-linear-equation";
import { arraySum } from "./array-sum";
import { reverseInteger } from "./reverse-integer";
interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "factorial-Problem": factoria,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
  "is-valid-bst": isValidBST,
  "solve-linear-equation": solveLinearEquation,
  "array-sum": arraySum,
  "reverse-integer": reverseInteger,
};
