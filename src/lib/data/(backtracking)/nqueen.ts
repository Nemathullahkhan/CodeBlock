export const nQueensData = {
  module: {
    name: "Design And Analysis of Algorithms",
    description:
      "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
  },
  topics: [
    {
      name: "Backtracking",
      description:
        "Algorithms that incrementally build a solution and backtrack if a conflict occurs.",
      moduleId: "cm7j4tic90000buo8oh7a0scf",
    },
  ],
  content: {
    title: "N-Queens Problem",
    description: "Understanding the N-Queens Problem using Backtracking",
    brief:
      "The N-Queens problem involves placing N queens on an N×N chessboard such that no two queens threaten each other. The backtracking approach is used to systematically explore possible placements.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20201216231951/N-Queens.jpg",
    ],
    complexityAnalysis:
      "O(N!), since each queen has N choices initially, leading to an exponential growth in possibilities.",
    applications: [
      "Constraint Satisfaction Problems - Used in solving Sudoku and puzzle problems.",
      "Artificial Intelligence - Used in search and optimization problems.",
      "Computer Vision - Applied in image processing for pattern recognition.",
      "Robotics - Helps in path planning and positioning algorithms.",
    ],
    advantages: [
      "Efficiently finds all valid solutions using backtracking.",
      "Demonstrates the power of recursion in solving combinatorial problems.",
    ],
    disadvantages: [
      "Exponential time complexity makes it infeasible for large values of N.",
      "Backtracking may require large memory for storing intermediate states.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=i05Ju7AftcM",
      "https://www.youtube.com/watch?v=xouin83ebxE",
    ],
    topicId: "cm7laee6v000lbu8ob1guc47t",
  },
  faq: [
    {
      question: "What is the N-Queens problem?",
      answer:
        "The N-Queens problem is a classic backtracking problem that involves placing N queens on an N×N chessboard such that no two queens attack each other.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "Why is backtracking used for the N-Queens problem?",
      answer:
        "Backtracking systematically explores all possible queen placements and eliminates invalid configurations early, making it an efficient approach.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question:
        "What is the base case for solving the N-Queens problem using backtracking?",
      answer:
        "The base case occurs when all N queens are successfully placed on the board without conflicts.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question:
        "What is the time complexity of the N-Queens solution using backtracking?",
      answer:
        "The worst-case time complexity is O(N!), where N is the size of the chessboard.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  questions: {
    question: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.
 `,
    examples: [
      {
        input: "n = 4",
        output: `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`,
      },
      {
        input: "n = 1",
        output: `[["Q"]]`,
      },
    ],
    constraints: ["1 <= n <= 9"],
    difficulty: "Hard",
    averageTime: "1hr",
    testcases: [
      {
        input: {
          n: 4,
        },
        output: [
          [".Q..", "...Q", "Q...", "..Q."],
          ["..Q.", "Q...", "...Q", ".Q.."],
        ],
        description:
          "Standard test case for n = 4. There are 2 distinct solutions.",
      },
      {
        input: {
          n: 1,
        },
        output: [["Q"]],
        description:
          "Edge case for n = 1. Only one queen can be placed on the board.",
      },
      {
        input: {
          n: 2,
        },
        output: [],
        description: "Edge case for n = 2. No valid solutions exist.",
      },
      {
        input: {
          n: 3,
        },
        output: [],
        description: "Edge case for n = 3. No valid solutions exist.",
      },
      {
        input: {
          n: 5,
        },
        output: [
          ["Q....", "..Q..", "....Q", ".Q...", "...Q."],
          ["Q....", "...Q.", ".Q...", "....Q", "..Q.."],
          [".Q...", "...Q.", "Q....", "..Q..", "....Q"],
          [".Q...", "....Q", "..Q..", "Q....", "...Q."],
          ["..Q..", "Q....", "...Q.", ".Q...", "....Q"],
          ["..Q..", "....Q", ".Q...", "...Q.", "Q...."],
          ["...Q.", "Q....", "..Q..", "....Q", ".Q..."],
          ["...Q.", ".Q...", "....Q", "..Q..", "Q...."],
          ["....Q", ".Q...", "...Q.", "Q....", "..Q.."],
          ["....Q", "..Q..", "Q....", "...Q.", ".Q..."],
        ],
      },
    ],
  },
  working: {
    explanation:
      "The N-Queens problem is solved using backtracking by placing queens row by row and checking for conflicts. If a conflict is found, the algorithm backtracks and tries another position.",
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "The N-Queens problem places N queens on an N×N chessboard without attacking each other, using backtracking to find valid placements.",
    tips: [
      "Use a helper function to check if a queen can be placed in a given position.",
      "Backtrack when a placement leads to conflicts and explore alternative placements.",
      "Start from the first row and proceed recursively.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20200429201551/N-Queens-Solutions.jpg",
    ],
    explanation: `1. **Initialize an N×N chessboard with all cells empty.**  
      2. **Start placing queens row by row.**  
      3. **For each row, check valid columns where a queen can be placed.**  
      4. **If no valid column is found, backtrack to the previous row and try a different placement.**  
      5. **Continue until all queens are placed.**`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  implementation: {
    intuition:
      "Backtracking is used to explore all possible placements and revert if a conflict is detected.",
    approach: `1. Place a queen in the first available column in a row.\n
         2. Move to the next row and attempt to place another queen.\n
         3. If a placement is invalid, backtrack and try the next available column.\n
         4. Continue this process until all queens are placed.`,
    code: [
      {
        language: "C",
        code: `#include <stdio.h>
  #define N 8
  
  int board[N][N] = {0};
  
  int isSafe(int row, int col) {
      for (int i = 0; i < col; i++)
          if (board[row][i]) return 0;
  
      for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
          if (board[i][j]) return 0;
  
      for (int i = row, j = col; j >= 0 && i < N; i++, j--)
          if (board[i][j]) return 0;
  
      return 1;
  }
  
  int solveNQueens(int col) {
      if (col >= N) return 1;
  
      for (int i = 0; i < N; i++) {
          if (isSafe(i, col)) {
              board[i][col] = 1;
  
              if (solveNQueens(col + 1))
                  return 1;
  
              board[i][col] = 0;
          }
      }
      return 0;
  }
  
  void printSolution() {
      for (int i = 0; i < N; i++) {
          for (int j = 0; j < N; j++)
              printf("%d ", board[i][j]);
          printf("\\n");
      }
  }
  
  int main() {
      if (solveNQueens(0))
          printSolution();
      else
          printf("Solution does not exist\\n");
      return 0;
  }`,
      },
      {
        language: "Java",
        code: `class NQueens {
      static final int N = 8;
      static int board[][] = new int[N][N];
  
      static boolean isSafe(int row, int col) {
          for (int i = 0; i < col; i++)
              if (board[row][i] == 1) return false;
  
          for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
              if (board[i][j] == 1) return false;
  
          for (int i = row, j = col; i < N && j >= 0; i++, j--)
              if (board[i][j] == 1) return false;
  
          return true;
      }
  
      static boolean solveNQueens(int col) {
          if (col >= N) return true;
  
          for (int i = 0; i < N; i++) {
              if (isSafe(i, col)) {
                  board[i][col] = 1;
  
                  if (solveNQueens(col + 1)) return true;
  
                  board[i][col] = 0;
              }
          }
          return false;
      }
  
      static void printSolution() {
          for (int i = 0; i < N; i++) {
              for (int j = 0; j < N; j++)
                  System.out.print(board[i][j] + " ");
              System.out.println();
          }
      }
  
      public static void main(String args[]) {
          if (solveNQueens(0))
              printSolution();
          else
              System.out.println("Solution does not exist");
      }
  }`,
      },
      {
        language: "Python",
        code: `N = 8
  board = [[0] * N for _ in range(N)]
  
  def isSafe(row, col):
      for i in range(col):
          if board[row][i]: return False
  
      for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
          if board[i][j]: return False
  
      for i, j in zip(range(row, N, 1), range(col, -1, -1)):
          if board[i][j]: return False
  
      return True
  
  def solveNQueens(col):
      if col >= N:
          return True
  
      for i in range(N):
          if isSafe(i, col):
              board[i][col] = 1
              if solveNQueens(col + 1):
                  return True
              board[i][col] = 0
  
      return False
  
  solveNQueens(0)
  for row in board:
      print(row)`,
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};
