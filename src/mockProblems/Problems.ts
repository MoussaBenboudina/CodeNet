export type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  order: number;
  videoId?: string;
};

export const Problems: Problem[] = [
  {
    category: "Array",
    difficulty: "Medium",
    id: "count-occurrences",
    order: 1,
    title: "Count Character Occurrences in a 2D Array",
    videoId: "",
  },
  {
    category: "Array",
    difficulty: "Easy",
    id: "array-plus-array",
    order: 2,
    title: "Array Plus Array",
    videoId: "Fw4BwCcPu54",
  },

  {
    category: "Mathematics",
    difficulty: "Hard",
    id: "reverse-integer",
    order: 3,
    title: "Reverse Integer",
    videoId: "",
  },
  {
    category: "Array",
    difficulty: "Easy",
    id: "array-identical",
    order: 4,
    title: "Check if Two Arrays are Identical",
    videoId: "83l9bSQXoq0",
  },
  {
    category: "Array",
    difficulty: "Easy",
    id: "array-sum",
    order: 5,
    title: "Array Sum",
    videoId: "",
  },
  {
    category: "Mathematics",
    difficulty: "Medium",
    id: "diagonal-sums",
    order: 6,
    title: "Sum of Matrix Diagonals",
    videoId: "6_ryHmbw4ic",
  },
  {
    category: "Mathematical Algorithms",
    difficulty: "Easy",
    id: "solve-linear-equation",
    order: 7,
    title: "Solve First-Degree Equation",
    videoId: "",
  },
  {
    category: "String",
    difficulty: "Medium",
    id: "reverse-string",
    order: 8,
    title: "Reverse String",
    videoId: "",
  },
  {
    category: "Mathematical Algorithms",
    difficulty: "Easy",
    id: "factorial-Problem",
    order: 9,
    title: "Calculate Factorial",
    videoId: "",
  },
];
