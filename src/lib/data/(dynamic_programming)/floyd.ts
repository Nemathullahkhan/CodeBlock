// 

export const floydsAlgorithmData = {
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
      moduleId: "cm7kklzg8000pbutcs2ksz8zq",
    },
  ],
  content: {
    title: "Floyd’s Algorithm (All-Pairs Shortest Paths)",
    description: "Understanding Floyd's Algorithm using Dynamic Programming",
    brief:
      "Floyd’s Algorithm (Floyd-Warshall Algorithm) is a dynamic programming algorithm used to find the shortest paths between all pairs of vertices in a weighted graph. It works by iteratively considering each vertex as an intermediate and updating the shortest path estimates dynamically.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/FloydWarshall.png",
    ],
    complexityAnalysis:
      "O(n³), where n is the number of vertices. This is due to the three nested loops used for updating shortest paths.",
    applications: [
      "Network Routing - Used to determine the shortest paths between all routers in a network.",
      "Traffic Systems - Helps in finding the shortest paths between all intersections in road networks.",
      "Graph Analysis - Useful in analyzing social networks and connectivity in graphs.",
      "Game Development - Used in pathfinding algorithms for AI movement.",
      "Bioinformatics - Applied in DNA sequence alignment and genome comparison.",
    ],
    advantages: [
      "Computes shortest paths between all pairs of vertices in a single execution.",
      "Handles negative edge weights (but not negative weight cycles).",
      "Easy to implement using a simple 3-loop structure.",
    ],
    disadvantages: [
      "Time complexity is O(n³), which makes it inefficient for very large graphs.",
      "Not suitable for graphs with negative weight cycles.",
      "Uses O(n²) space, which can be memory-intensive for large graphs.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=4NQ3HnhyNfQ",
      "https://www.youtube.com/watch?v=nV_wOZnhbog",
    ],
    topicId: "cm7kklzg8000pbutcs2ksz8zq",
  },
  faq: [
    {
      question: "What is Floyd’s Algorithm used for?",
      answer:
        "Floyd’s Algorithm (Floyd-Warshall Algorithm) is used to find the shortest paths between all pairs of vertices in a weighted graph.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "Can Floyd’s Algorithm handle negative weights?",
      answer:
        "Yes, it can handle negative edge weights, but it does not work with graphs containing negative weight cycles.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question: "What is the time complexity of Floyd’s Algorithm?",
      answer: "The time complexity is O(n³), where n is the number of vertices.",
      contentId: "cm7l9h70a0001bu8oovkc9zgb",
    },
    {
      question: "How does Floyd’s Algorithm differ from Dijkstra’s Algorithm?",
      answer:
        "Floyd’s Algorithm finds the shortest paths between all pairs of vertices, while Dijkstra’s Algorithm finds the shortest path from a single source to all other vertices.",
      contentId: "cm7l9h70a0001bu8oovkc9zgb",
    },
  ],
  questions: {
    question:
      "The problem is to find the shortest distances between every pair of vertices in a given edge-weighted directed graph. The graph is represented as an adjacency matrix. mat[i][j] denotes the weight of the edge from i to j. If mat[i][j] = -1, it means there is no edge from i to j. Note: Modify the distances for every pair in place.",
    examples: [
      {
        input: "mat = [[0, 25], [-1, 0 ]]",
        inputImage:
          "https://media.geeksforgeeks.org/wp-content/uploads/20221106202714/WhatsAppImage20221106at82359PM.jpeg",
        output: `[[0, 25],[-1, 0]]`,
        outputImage:
          "https://media.geeksforgeeks.org/wp-content/uploads/20221106202714/WhatsAppImage20221106at82359PM.jpeg",
        explanation:
          "The shortest distance between every pair is already given(if it exists).",
      },
      {
        input: "mat = [[0, 1, 43],[1, 0, 6], [-1, -1, 0]]",
        inputImage:
          "https://media.geeksforgeeks.org/wp-content/uploads/20221106203741/WhatsAppImage20221106at83711PM.jpeg",
        output: `[[0, 1, 7],[1, 0, 6],[-1, -1, 0]]`,
        outputImage:
          "https://media.geeksforgeeks.org/wp-content/uploads/20221106204057/WhatsAppImage20221106at84031PM.jpeg",
        explanation:
          "We can reach 2 from 0 as 0->1->2 and the cost will be 1+6=7 which is less than 43.",
      },
    ],
    constraints: ["1 <= mat.size() <= 100", "-1 <= mat[ i ][ j ] <= 1000"],
    difficulty: "Medium",
    averageTime: "25m",
    testcases: [
      {
        input: "2\n0 25\n-1 0",
        output: "0 25\n-1 0",
      },
      {
        input: "3\n0 1 43\n1 0 6\n-1 -1 0",
        output: "0 1 7\n1 0 6\n-1 -1 0",
      },
      {
        input: "3\n0 3 -1\n2 0 -1\n-1 7 0",
        output: "0 3 -1\n2 0 -1\n-1 5 0",
      },
    ],
  },
  working: {
    explanation:
      "Floyd's Algorithm iterates over all pairs of vertices and considers each vertex as an intermediate node. It updates the shortest path between two vertices if passing through the intermediate vertex results in a shorter path. This process is repeated for all vertices.",
    contentId: "cm7l9h70a0001bu8oovkc9zgb",
  },
  implementation: {
    intuition:
      "The Floyd-Warshall algorithm works by repeatedly improving the shortest path estimates between all pairs of vertices. It considers each vertex as an intermediate node and updates the shortest paths dynamically.",
    approach:
      "1. Initialize the distance matrix with given edge weights and set the distance of a node to itself as 0.\n2. Consider each vertex as an intermediate and update the shortest path between all pairs using:\n   dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\n3. Repeat for all vertices to find the shortest paths between all pairs.",
    code: [
      {
        language: "C",
        code: `#include <stdio.h>
#include <stdlib.h>
#define INF 99999

// Function to initialize the distance matrix
void initializeDistanceMatrix(int **graph, int **dist, int V) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            dist[i][j] = graph[i][j];
        }
    }
}

// Function to perform the Floyd-Warshall algorithm
void floydWarshallAlgorithm(int **dist, int V) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    int through_k_dist = dist[i][k] + dist[k][j];
                    if (through_k_dist < dist[i][j]) {
                        dist[i][j] = through_k_dist;
                    }
                }
            }
        }
    }
}

// Function to print the distance matrix
void printDistanceMatrix(int **dist, int V) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF) {
                printf("-1 ");
            } else {
                printf("%d ", dist[i][j]);
            }
        }
        printf("\n");
    }
}

// Main function
int main() {
    int V;
    scanf("%d", &V); // Read the number of vertices

    // Allocate memory for the graph
    int **graph = (int **)malloc(V * sizeof(int *));
    for (int i = 0; i < V; i++) {
        graph[i] = (int *)malloc(V * sizeof(int));
    }

    // Read the graph input as space-separated values
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            scanf("%d", &graph[i][j]);
            if (graph[i][j] == -1) {
                graph[i][j] = INF; // Replace -1 with INF
            }
        }
    }

    // Allocate memory for the distance matrix
    int **dist = (int **)malloc(V * sizeof(int *));
    for (int i = 0; i < V; i++) {
        dist[i] = (int *)malloc(V * sizeof(int));
    }

    // Initialize the distance matrix
    initializeDistanceMatrix(graph, dist, V);

    // Run Floyd-Warshall algorithm
    floydWarshallAlgorithm(dist, V);

    // Print the output
    printDistanceMatrix(dist, V);

    // Free allocated memory for graph and dist
    for (int i = 0; i < V; i++) {
        free(graph[i]);
        free(dist[i]);
    }
    free(graph);
    free(dist);

    return 0;
}`,
      },
      {
        language: "Java",
        code: `class FloydWarshall {
    static final int INF = 99999, V = 4;
    void floydWarshall(int graph[][]) {
        int dist[][] = new int[V][V];
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++)
                dist[i][j] = graph[i][j];
        for (int k = 0; k < V; k++)
            for (int i = 0; i < V; i++)
                for (int j = 0; j < V; j++)
                    if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
    }
}`,
      },
      {
        language: "Python",
        code: `def floydWarshall(graph):
    V = len(graph)
    dist = [row[:] for row in graph]
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`,
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "Floyd's Algorithm works by systematically updating the shortest paths between all pairs of vertices. Each vertex is considered as an intermediate, and the algorithm checks if going through this vertex reduces the shortest path between any two nodes.",
    tips: [
      "Ensure no negative weight cycles exist in the graph before using Floyd's Algorithm.",
      "Use adjacency matrix representation for efficient implementation.",
      "For large graphs, Dijkstra’s Algorithm may be a better choice if only single-source shortest paths are needed.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/FloydWarshall-1.webp",
      "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/FloydWarshall-2.webp",
    ],
    explanation: `Let's look at the working of Floyd's Algorithm with an example:

1. **Input Graph**:
   - Given a graph represented as an adjacency matrix.

2. **Initialization**:
   - Create a distance matrix initialized with direct edge weights.
   - Set distance[i][i] = 0 for all vertices.

3. **Iterate Over Intermediates**:
   - Consider each vertex k as an intermediate.
   - Update dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).

4. **Final Output**:
   - The distance matrix now contains the shortest paths between all pairs of vertices.
   - If dist[i][j] remains INF, no path exists between i and j.`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};