export const kruskalData = {
  module: {
    name: "Design And Analysis of Algorithms",
    description:
      "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
  },
  topics: [
    {
      name: "Greedy Techniques",
      description:
        "Algorithms that make locally optimal choices at each step with the hope of finding a global optimum.",
      moduleId: "cm7f4ndrz0008bue4mhqje0qh",
    },
  ],
  content: {
    title: "Kruskal’s Algorithm (Minimum Spanning Tree)",
    description: "Understanding Kruskal’s Algorithm for Minimum Spanning Tree",
    brief:
      "Kruskal's Algorithm is a Greedy algorithm that finds the Minimum Spanning Tree (MST) for a weighted, undirected graph. It works by sorting all edges in non-decreasing order of weight and picking the smallest edges that don’t form a cycle until we get (V-1) edges.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20230806153920/Kruskal1.png",
    ],
    complexityAnalysis:
      "O(E log E) due to sorting edges, where E is the number of edges.",
    applications: [
      "Network Design - Used in designing LAN networks and circuit design.",
      "Clustering - Used in machine learning for hierarchical clustering.",
      "Transportation - Helps in planning roads and pipelines with minimal cost.",
      "Image Segmentation - Used in computer vision applications.",
      "Telecommunication - Used in laying out efficient cable networks.",
    ],
    advantages: [
      "Works well with sparse graphs.",
      "Efficient sorting makes it faster compared to Prim's Algorithm for large graphs.",
      "Easy to implement using Disjoint Set Union (DSU).",
    ],
    disadvantages: [
      "Requires sorting of edges, which can be costly in dense graphs.",
      "Not suitable for dynamically changing graphs.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=71UQH7Pr9kU",
      "https://www.youtube.com/watch?v=fAuF0EuZVCk",
    ],
    topicId: "cm7f4otem000abue44msxb0xv",
  },
  faq: [
    {
      question: "What is Kruskal’s Algorithm used for?",
      answer:
        "Kruskal’s Algorithm is used to find the Minimum Spanning Tree (MST) of a graph, which connects all vertices with the minimum total edge weight.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "How does Kruskal’s Algorithm ensure no cycles are formed?",
      answer:
        "Kruskal’s Algorithm uses the Disjoint Set Union (DSU) data structure to detect cycles while adding edges.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question: "What is the time complexity of Kruskal’s Algorithm?",
      answer: "O(E log E), where E is the number of edges in the graph.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "How does Kruskal’s Algorithm differ from Prim’s Algorithm?",
      answer:
        "Kruskal’s Algorithm sorts edges and picks the smallest ones, while Prim’s Algorithm grows the MST starting from a vertex.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  questions: {
    question: `You are given an undirected, connected and weighted graph G(V, E), consisting of V number of vertices (numbered from 0 to V-1) and E number of edges.

Find and print the total weight of the Minimum Spanning Tree (MST) using Kruskal's algorithm.

By definition, a minimum weight spanning tree is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.`,
    examples: [
      {
        input: `n = 6
               cost = {
              {0, 2, 3, 4, 5, 6},
              {2, 0, 1, 1, 2, 4},
              {3, 1, 0, 0, 7, 0},
              {4, 1, 0, 0, 0, 2},
              {5, 2, 7, 0, 0, 1},
              {6, 4, 0, 2, 1, 0}
          }`,
        output: "7",
      },
      {
        input: `n = 4
                cost = {
                    {0, 10, 6, 5},
                    {10, 0, 0, 15},
                    {6, 0, 0, 4},
                    {5, 15, 4, 0}
                }`,
        output: "15",
      },
    ],
    constraints: [
      " 1 <= n <= 100",
      " 0 <= edges.length <= min(1000, n * (n - 1) / 2)",
      "1 <= weight <= 10^6",
      "The graph is undirected and connected",
      "If the graph is disconnected, return -1",
    ],
    difficulty: "medium",
    averageTime: "30m",
    testcases: [
      {
        input:
          "6\n0 2 3 4 5 6\n2 0 1 1 2 4\n3 1 0 0 7 0\n4 1 0 0 0 2\n5 2 7 0 0 1\n6 4 0 2 1 0",
        output: "7",
      },
      {
        input: "4\n0 10 6 5\n10 0 0 15\n6 0 0 4\n5 15 4 0",
        output: "15",
      },
      {
        input: "5\n0 2 0 6 0\n2 0 3 8 5\n0 3 0 0 7\n6 8 0 0 9\n0 5 7 9 0",
        output: "16",
      },
    ],
  },
  working: {
    explanation:
      "Kruskal’s Algorithm sorts all edges in ascending order of weight and picks edges one by one, ensuring no cycles form until (V-1) edges are added.",
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "Kruskal’s Algorithm selects edges in increasing order of weight and ensures no cycles form, eventually connecting all nodes with minimal cost.",
    tips: [
      "Use Disjoint Set Union (DSU) to optimize cycle detection.",
      "For dense graphs, consider Prim’s Algorithm instead.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20230806153920/Kruskal2.png",
    ],
    explanation: `1. **Sort edges by weight**  
      2. **Pick the smallest edge** that doesn’t form a cycle.  
      3. **Repeat until (V-1) edges are added** to the MST.  
      4. **Final MST has the minimum possible total edge weight.**`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  implementation: {
    intuition:
      "Kruskal’s Algorithm builds the MST by always choosing the smallest available edge and ensuring no cycles are formed using Disjoint Set Union (DSU).",
    approach: `1. Sort all edges in non-decreasing order of weight.\n
         2. Use DSU to check if adding an edge forms a cycle.\n
         3. If no cycle, add the edge to the MST.\n
         4. Stop when (V-1) edges are added.`,
    code: [
      {
        language: "C",
        code: `#include <stdio.h>
#include <stdlib.h>

#define MAX 9

// Function prototypes
int find(int i, int parent[]);
int uni(int i, int j, int parent[]);
int kruskal(int n, int cost[MAX][MAX]);

// Kruskal's algorithm implementation
int kruskal(int n, int cost[MAX][MAX]) {
    int parent[MAX] = {0};
    int mincost = 0;
    int ne = 1;

    while (ne < n) {
        int min = 999;
        int a = -1, b = -1;

        // Find the minimum edge
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (cost[i][j] < min) {
                    min = cost[i][j];
                    a = i;
                    b = j;
                }
            }
        }

        // Check if adding this edge forms a cycle
        int u = find(a, parent);
        int v = find(b, parent);

        if (uni(u, v, parent)) {
            printf("Edge %d: (%d, %d) Cost: %d\n", ne++, a, b, min);
            mincost += min;
        }

        // Mark the edge as used
        cost[a][b] = cost[b][a] = 999;
    }

    return mincost;
}

// Find function to detect cycles
int find(int i, int parent[]) {
    while (parent[i]) {
        i = parent[i];
    }
    return i;
}

// Union function to merge two sets
int uni(int i, int j, int parent[]) {
    if (i != j) {
        parent[j] = i;
        return 1;
    }
    return 0;
}

// Main function
int main() {
    int n;
    int cost[MAX][MAX];

    printf("Enter the number of vertices: ");
    scanf("%d", &n);

    printf("Enter the cost adjacency matrix:\n");
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            scanf("%d", &cost[i][j]);
            if (cost[i][j] == 0) {
                cost[i][j] = 999; // Represent no edge with a large number
            }
        }
    }

    printf("Edges in the Minimum Cost Spanning Tree:\n");
    int mincost = kruskal(n, cost);
    printf("Minimum Cost: %d\n", mincost);

    return 0;
}`,
      },
      {
        language: "Java",
        code: `import java.util.*;
  
  class Kruskal {
      static class Edge implements Comparable<Edge> {
          int src, dest, weight;
          public int compareTo(Edge compareEdge) {
              return this.weight - compareEdge.weight;
          }
      }
  
      static class Subset {
          int parent, rank;
      }
  
      static int find(Subset subsets[], int i) {
          if (subsets[i].parent != i)
              subsets[i].parent = find(subsets, subsets[i].parent);
          return subsets[i].parent;
      }
  
      static void union(Subset subsets[], int x, int y) {
          int xroot = find(subsets, x);
          int yroot = find(subsets, y);
          if (subsets[xroot].rank < subsets[yroot].rank)
              subsets[xroot].parent = yroot;
          else if (subsets[xroot].rank > subsets[yroot].rank)
              subsets[yroot].parent = xroot;
          else {
              subsets[yroot].parent = xroot;
              subsets[xroot].rank++;
          }
      }
  
      static void kruskalMST(int[][] graph, int V) {
          Edge[] edges = new Edge[V * V];
          // Convert adjacency matrix to edge list (Skipping for brevity)
      }
  }`,
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};