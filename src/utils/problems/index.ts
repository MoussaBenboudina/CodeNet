import { Problem } from "../types/problem";
import { reverseLinkedList } from "./reverse-linked-list";
import { factoria } from "./factorial-Problem";
import { solveLinearEquation } from "./solve-linear-equation";
import { arraySum } from "./array-sum";
import { reverseInteger } from "./reverse-integer";
import { arrayPlusArray } from "./array-plus-array";
import { countOccurrencesProblem } from "./count-occurrences";
import { arrayIdentical } from "./array-identical";
import {reverseString} from "./reverse-string"
import {findDuplicates} from './find-duplicates'
interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "count-occurrences": countOccurrencesProblem,
  "reverse-linked-list": reverseLinkedList,
  "array-plus-array": arrayPlusArray,
  "factorial-Problem": factoria,
  "solve-linear-equation": solveLinearEquation,
  "array-sum": arraySum,
  "reverse-integer": reverseInteger,
  "array-identical": arrayIdentical,
  "reverse-string" : reverseString,
  "find-duplicates" :findDuplicates,
};
