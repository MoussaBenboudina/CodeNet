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
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "8-k1C6ehKuw",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Hard",
    category: "Linked List",
    order: 2,
    videoId: "",
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Dynamic Programming",
    order: 3,
    videoId: "",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 4,
    videoId: "xty7fr-k0TU",
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    order: 5,
    videoId: "ZfFl4torNg4",
  },
  {
    id: "is-valid-bst",
    title: "Validate Binary Search Tree",
    category: "Data Structures",
    difficulty: "Hard",
    order: 6,
    videoId: "",
  },
  {
    id: "factorial-Problem",
    title: "Calculate Factorial",
    difficulty: "Easy",
    category: "Mathematical Algorithms",
    order: 7,
    videoId: "",
  },
  {
    id: "solve-linear-equation",
    title: "Solve Linear Equation",
    difficulty: "Easy",
    category: "Tree",
    order: 8,
    videoId: "4qYTqOiRMoM",
  },
  {
    id: "array-sum",
    title: "array sum",
    difficulty: "Easy",
    category: "Array",
    order: 9,
    videoId: "",
  },
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    order: 10,
    videoId: "",
  },
];
