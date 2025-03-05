export const warshallData = {
  module: {
    name: "Design And Analysis of Algorithms",
    description:
      "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
  },
  topics: [
    {
      name: "Graph Algorithms",
      description:
        "Algorithms that work on graphs to determine paths, connectivity, and reachability.",
      moduleId: "cm7j4tic90000buo8oh7a0scf",
    },
  ],
  content: {
    title: "Warshall’s Algorithm (Transitive Closure)",
    description: "Understanding Warshall's Algorithm for Transitive Closure",
    brief:
      "Warshall’s Algorithm is used to find the transitive closure of a directed graph. It determines whether there is a path between two nodes by iteratively updating a reachability matrix.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20200429142719/warshall.png",
    ],
    complexityAnalysis: "O(V³), where V is the number of vertices.",
    applications: [
      "Graph Connectivity - Determines if all nodes in a graph are reachable.",
      "Database Query Optimization - Used in databases to check reachability.",
      "Network Routing - Finds whether a computer can communicate with another.",
      "Pathfinding in AI - Used in decision-making algorithms for AI.",
    ],
    advantages: [
      "Simple and easy to implement.",
      "Works efficiently for dense graphs.",
      "Finds transitive closure in a single pass after preprocessing.",
    ],
    disadvantages: [
      "Time complexity is O(V³), making it inefficient for large graphs.",
      "Consumes O(V²) space due to the adjacency matrix.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=9z2BunfoZ5Y",
      "https://www.youtube.com/watch?v=JQhciTuD3E8",
    ],
    topicId: "cm7laee6v000lbu8ob1guc47t",
  },
  faq: [
    {
      question: "What is Warshall’s Algorithm used for?",
      answer:
        "Warshall’s Algorithm is used to compute the transitive closure of a directed graph.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the time complexity of Warshall’s Algorithm?",
      answer: "The time complexity is O(V³), where V is the number of vertices.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "Can Warshall’s Algorithm handle weighted graphs?",
      answer:
        "No, Warshall’s Algorithm is designed for unweighted graphs. For weighted graphs, use the Floyd-Warshall Algorithm.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the space complexity of Warshall’s Algorithm?",
      answer:
        "The space complexity is O(V²) because it uses an adjacency matrix to store the graph.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question: "What is the input to Warshall’s Algorithm?",
      answer: "The input is an adjacency matrix representing a directed graph.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the output of Warshall’s Algorithm?",
      answer:
        "The output is a transitive closure matrix indicating reachability between nodes.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "How does Warshall’s Algorithm handle cycles in a graph?",
      answer:
        "Warshall’s Algorithm can handle cycles by iteratively updating the reachability matrix to account for indirect paths.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the significance of the intermediate vertex in Warshall’s Algorithm?",
      answer:
        "The intermediate vertex helps determine if there is a path from one vertex to another through an intermediate node.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  questions: {
    question:
      `You are given an adjacency matrix of a directed graph. Your task is to compute the transitive closure of the graph using Warshall’s Algorithm. The transitive closure of a graph is a matrix where each entry [i][j] is 1 if there is a path from vertex i to vertex j, and 0 otherwise.`,
    examples: [
      {
        input: "3\n0 1 0\n0 0 1\n0 0 0", // Number of vertices = 3, adjacency matrix
        output: "0 1 1\n0 0 1\n0 0 0", // Transitive closure matrix
      },
      {
        input: "4\n1 0 1 0\n0 1 0 0\n0 0 1 0\n1 0 0 1", // Number of vertices = 4, adjacency matrix
        output: "1 0 1 0\n0 1 0 0\n0 0 1 0\n1 0 1 1", // Transitive closure matrix
      },
      {
        input: "2\n0 1\n0 0", // Number of vertices = 2, adjacency matrix
        output: "0 1\n0 0", // Transitive closure matrix
      },
    ],
    constraints: [
      "2 ≤ number of vertices ≤ 10",
      "The input graph is represented as an adjacency matrix.",
      "The output is the transitive closure matrix.",
    ],
    difficulty: "Medium",
    averageTime: "20m",
    testcases: [
      {
        input: "3\n0 1 0\n0 0 1\n0 0 0", // Number of vertices = 3, adjacency matrix
        expectedOutput: "0 1 1\n0 0 1\n0 0 0", // Transitive closure matrix
      },
      {
        input: "4\n1 0 1 0\n0 1 0 0\n0 0 1 0\n1 0 0 1", // Number of vertices = 4, adjacency matrix
        expectedOutput: "1 0 1 0\n0 1 0 0\n0 0 1 0\n1 0 1 1", // Transitive closure matrix
      },
      {
        input: "2\n0 1\n0 0", // Number of vertices = 2, adjacency matrix
        expectedOutput: "0 1\n0 0", // Transitive closure matrix
      },
      {
        input: "4\n1 1 0 0\n0 1 1 0\n0 0 1 1\n0 0 0 1", // Number of vertices = 4, adjacency matrix
        expectedOutput: "1 1 1 1\n0 1 1 1\n0 0 1 1\n0 0 0 1", // Transitive closure matrix
      },
    ],
  },
  working: {
    explanation:
      "Warshall’s Algorithm processes a graph’s adjacency matrix iteratively, checking for indirect paths between nodes and updating the matrix accordingly.",
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  implementation: {
    intuition:
      "Warshall’s Algorithm iterates over all nodes as intermediate steps to update the reachability matrix.",
    approach:
      `1. Initialize an adjacency matrix.\n
       2. Iterate over all nodes, considering each as an intermediate vertex.\n
       3. If a path exists from i → k and k → j, mark i → j as reachable.\n
       4. Repeat until all paths are processed.`,
    code: [
      {
        language: "C",
        code: `#include <stdio.h>

#define V 4

void warshall(int graph[V][V]) {
    int reach[V][V], i, j, k;

    for (i = 0; i < V; i++)
        for (j = 0; j < V; j++)
            reach[i][j] = graph[i][j];

    for (k = 0; k < V; k++)
        for (i = 0; i < V; i++)
            for (j = 0; j < V; j++)
                reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);

    printf("Transitive Closure:\\n");
    for (i = 0; i < V; i++) {
        for (j = 0; j < V; j++)
            printf("%d ", reach[i][j]);
        printf("\\n");
    }
}

int main() {
    int graph[V][V] = { {1, 1, 0, 1},
                        {0, 1, 1, 0},
                        {0, 0, 1, 1},
                        {0, 0, 0, 1} };
    warshall(graph);
    return 0;
}`,
      },
      {
        language: "Python",
        code: `V = 4

def warshall(graph):
    reach = [[graph[i][j] for j in range(V)] for i in range(V)]

    for k in range(V):
        for i in range(V):
            for j in range(V):
                reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j])

    print("Transitive Closure:")
    for row in reach:
        print(" ".join(map(str, row)))

graph = [[1, 1, 0, 1],
         [0, 1, 1, 0],
         [0, 0, 1, 1],
         [0, 0, 0, 1]]

warshall(graph)`,
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "Warshall's Algorithm finds the transitive closure of a graph, helping determine which nodes are reachable from each other.",
    tips: [
      "Use an adjacency matrix for better efficiency.",
      "Iterate through each node as an intermediate vertex.",
      "Check for indirect connections between all pairs of nodes.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/warshall-example.png",
    ],
    explanation: `1. **Initialize the adjacency matrix.**  
    2. **Iterate through each node (k) as an intermediate vertex.**  
    3. **Update reachability:** If node i can reach k and k can reach j, set reachability[i][j] = 1.  
    4. **Continue until all indirect paths are considered.**`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};