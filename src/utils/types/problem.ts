export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

// export type StarterCode = {
//   JavaScript: string;
//   Python: string;
//   Java: string;
// };

// local problem data
export type Problem = {
  id: string;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number;
  starterCode: any;
  handlerFunction: ((fn: any) => boolean) | string;
  starterFunctionName: any;
};

export type DBProblem = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  order: number;
  videoId?: string;
  solutions: any;
  link?: string;
};

export type DBsolutions = {
  id: string;
  solutionsUser: any;
};
