export const knapSackData = {
    module: {
      name: "Design And Analysis of Algorithms",
      description:
        "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
    },
    topics: [
      {
        name: "Dynamic Programming",
        description:
          "Algorithms that solve problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant computations.",
        moduleId: "cm7j4tic90000buo8oh7a0scf",
      },
    ],
    content: {
      title: "0/1 Knapsack Problem",
      description: "Understanding the 0/1 Knapsack Problem using Dynamic Programming",
      brief:
        "The 0/1 Knapsack Problem is a classic optimization problem where the goal is to maximize the total value of items in a knapsack without exceeding its capacity. Each item can either be included (1) or excluded (0), hence the name '0/1 Knapsack'. Dynamic Programming is used to solve this problem efficiently by breaking it into smaller subproblems and storing their solutions.",
      photos: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20230706153706/Knapsack-Problem.png",
      ],
      complexityAnalysis: "O(nW), where n is the number of items and W is the knapsack capacity. Uses O(nW) space for the DP table.",
      applications: [
        "Resource Allocation - Used in scenarios where resources need to be allocated optimally, such as budgeting or scheduling.",
        "Inventory Management - Helps in selecting the most valuable items to stock within a limited storage capacity.",
        "Financial Portfolio Optimization - Used to select investments that maximize returns without exceeding risk limits.",
        "Network Routing - Applied in selecting the best paths in networks with limited bandwidth.",
        "Game Development - Used in game AI for decision-making under constraints.",
      ],
      advantages: [
        "Efficiently solves the problem using dynamic programming.",
        "Guarantees an optimal solution for the given constraints.",
        "Can handle large datasets with reasonable time and space complexity.",
      ],
      disadvantages: [
        "Time and space complexity can be high for large knapsack capacities.",
        "Not suitable for problems with fractional items (use Fractional Knapsack instead).",
      ],
      videos: [
        "https://www.youtube.com/watch?v=8LusJS5-AGo",
        "https://www.youtube.com/watch?v=nLmhmB6NzcM",
      ],
      topicId: "cm7f4otem000abue44msxb0xv",
    },
    faq: [
      {
        question: "What is the 0/1 Knapsack Problem?",
        answer: "The 0/1 Knapsack Problem is an optimization problem where the goal is to maximize the total value of items in a knapsack without exceeding its capacity. Each item can either be included (1) or excluded (0).",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "Why is it called '0/1 Knapsack'?",
        answer: "It is called '0/1 Knapsack' because each item can either be fully included (1) or fully excluded (0) from the knapsack. Fractional inclusion of items is not allowed.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    vivaQuestions: [
      {
        question: "What is the time complexity of the 0/1 Knapsack Problem using Dynamic Programming?",
        answer: "The time complexity is O(nW), where n is the number of items and W is the knapsack capacity.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "Can the 0/1 Knapsack Problem be solved using Greedy Algorithms?",
        answer: "No, the 0/1 Knapsack Problem cannot be solved optimally using Greedy Algorithms. Dynamic Programming is required for an optimal solution.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    working: {
      explanation:
        "The 0/1 Knapsack Problem is solved using Dynamic Programming by creating a 2D table where rows represent items and columns represent knapsack capacities. The table is filled iteratively, and the maximum value is computed by considering whether to include or exclude each item.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    implementation: {
      intuition:
        "The 0/1 Knapsack Problem is solved by breaking it into smaller subproblems and storing their solutions in a table. The solution to the main problem is derived by combining the solutions of these subproblems.",
      approach:
        `1. Create a 2D table dp[n+1][W+1], where n is the number of items and W is the knapsack capacity.\n2. Initialize the table with 0 for the first row and column.\n3. Fill the table by considering whether to include or exclude each item.\n4. The value dp[n][W] will contain the maximum value that can be achieved.`,
      code: [
        {
          language: "C",
          code: `#include <stdio.h>
  
  int max(int a, int b) { return (a > b) ? a : b; }
  
  int knapSack(int W, int weight[], int value[], int n) {
      int dp[n + 1][W + 1];
  
      for (int i = 0; i <= n; i++) {
          for (int w = 0; w <= W; w++) {
              if (i == 0 || w == 0)
                  dp[i][w] = 0;
              else if (weight[i - 1] <= w)
                  dp[i][w] = max(value[i - 1] + dp[i - 1][w - weight[i - 1]], dp[i - 1][w]);
              else
                  dp[i][w] = dp[i - 1][w];
          }
      }
  
      return dp[n][W];
  }
  
  int main() {
      int n = 3;
      int value[] = {60, 100, 120};
      int weight[] = {10, 20, 30};
      int W = 50;
  
      printf("Maximum value in 0/1 Knapsack: %d\\n", knapSack(W, weight, value, n));
      return 0;
  }`,
        },
        {
          language: "Python",
          code: `def knapSack(W, weight, value, n):
      dp = [[0] * (W + 1) for _ in range(n + 1)]
  
      for i in range(n + 1):
          for w in range(W + 1):
              if i == 0 or w == 0:
                  dp[i][w] = 0
              elif weight[i - 1] <= w:
                  dp[i][w] = max(value[i - 1] + dp[i - 1][w - weight[i - 1]], dp[i - 1][w])
              else:
                  dp[i][w] = dp[i - 1][w]
  
      return dp[n][W]
  
  value = [60, 100, 120]
  weight = [10, 20, 30]
  W = 50
  n = len(value)
  
  print("Maximum value in 0/1 Knapsack:", knapSack(W, weight, value, n))`,
        },
      ],
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    illustration: {
      summary:
        "The 0/1 Knapsack Problem is solved using Dynamic Programming by creating a 2D table where rows represent items and columns represent knapsack capacities. The table is filled iteratively, and the maximum value is computed by considering whether to include or exclude each item.",
      tips: [
        "Ensure the knapsack capacity is within reasonable limits to avoid high space complexity.",
        "Use memoization to optimize the recursive solution if the DP table is too large.",
      ],
      images: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Knapsack-1.webp",
      ],
      explanation: `1. **Input**: Values = [60, 100, 120], Weights = [10, 20, 30], Capacity = 50\n2. **Table Filling**: Compute max value for each subproblem\n3. **Result**: Maximum value = 220`,
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  };
  