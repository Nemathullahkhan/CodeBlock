export const primsData = {
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
    title: "Prim’s Algorithm (Minimum Spanning Tree)",
    description: "Understanding Prim’s Algorithm for Minimum Spanning Tree",
    brief:
      "Prim’s Algorithm is a Greedy Algorithm that finds the Minimum Spanning Tree (MST) by starting from a single node and expanding the tree by adding the smallest edge that connects a new node to the MST.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20230806153508/Prim2.png",
    ],
    complexityAnalysis:
      "O(V²) using an adjacency matrix, O(E log V) using a priority queue.",
    applications: [
      "Network Design - Used in LAN networking, circuit design, and laying cables.",
      "Clustering - Used in machine learning for hierarchical clustering.",
      "Telecommunication - Laying efficient cable connections with minimal cost.",
      "Transportation - Designing road networks with the least cost.",
      "Graph-Based Data Structuring - Used in AI and game development.",
    ],
    advantages: [
      "Works well with dense graphs.",
      "Can be optimized using priority queues.",
      "Ensures connectivity of all nodes in the MST.",
    ],
    disadvantages: [
      "Slower than Kruskal’s Algorithm for sparse graphs.",
      "Not ideal for dynamic graphs where edges change frequently.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=jsmMtJpPnhU",
      "https://www.youtube.com/watch?v=ufL4A3HhVzQ",
    ],
    topicId: "cm7f4otem000abue44msxb0xv",
  },
  faq: [
    {
      question: "What is Prim’s Algorithm used for?",
      answer:
        "Prim’s Algorithm is used to find the Minimum Spanning Tree (MST) of a graph, ensuring all nodes are connected with the minimum total edge weight.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "How does Prim’s Algorithm differ from Kruskal’s Algorithm?",
      answer:
        "Prim’s Algorithm starts from a node and grows the MST, whereas Kruskal’s Algorithm sorts all edges and picks the smallest available edge.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question:
        "What data structure is commonly used to optimize Prim’s Algorithm?",
      answer:
        "A priority queue (min-heap) is used to optimize Prim’s Algorithm for large graphs.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the time complexity of Prim’s Algorithm?",
      answer:
        "O(V²) using an adjacency matrix, O(E log V) using a priority queue.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  questions: {
    question: `You are given an undirected, connected, and weighted graph G(V, E), consisting of V number of vertices (numbered from 0 to V-1) and E number of edges.
  
  Find and print the total weight of the Minimum Spanning Tree (MST) using Prim’s Algorithm.
  
  By definition, a minimum weight spanning tree is a subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.`,
    examples: [
      {
        input: `n = 6
                cost = {
                  {0, 2, 3, 4, 5, 6},\n
                  {2, 0, 1, 1, 2, 4},\n
                  {3, 1, 0, 0, 7, 0},\n
                  {4, 1, 0, 0, 0, 2},\n
                  {5, 2, 7, 0, 0, 1},\n
                  {6, 4, 0, 2, 1, 0}\n
                }`,
        output: "7",
        explanation: "The MST consists of edges with weights 1, 1, 1, 2, 2, and 2. The total weight is 7.",
      },
      {
        input: `n = 4
                cost = {
                  {0, 10, 6, 5},\n
                  {10, 0, 0, 15}\n,
                  {6, 0, 0, 4},\n
                  {5, 15, 4, 0}\n
                }`,
        output: "15",
        explanation: "The MST consists of edges with weights 4, 5, and 6. The total weight is 15.",
      },
    ],
    constraints: [
      "1 <= V <= 1000 (number of vertices)",
      "1 <= E <= V * (V - 1) / 2 (number of edges)",
      "0 <= u, v < V (vertices are numbered from 0 to V-1)",
      "1 <= weight <= 10^6 (edge weights are positive integers)",
      "The graph is connected and undirected.",
    ],
    difficulty: "medium",
    averageTime: "30m",
    testcases: [
      {
        input: "6\n0 2 3 4 5 6\n2 0 1 1 2 4\n3 1 0 0 7 0\n4 1 0 0 0 2\n5 2 7 0 0 1\n6 4 0 2 1 0",
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
      "Prim’s Algorithm starts from a source node, then repeatedly adds the smallest edge that connects a new node to the MST, ensuring all nodes are connected with minimum total weight.",
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "Prim’s Algorithm builds the MST incrementally by selecting the smallest edge that expands the tree, ensuring minimal cost.",
    tips: [
      "Use a priority queue to improve efficiency for large graphs.",
      "Best suited for dense graphs where the number of edges is high.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20230806153508/Prim1.png",
    ],
    explanation: `1. **Start from any node** in the graph.  
      2. **Add the smallest edge** that connects to an unvisited node.  
      3. **Repeat until all nodes are included** in the MST.  
      4. **The result is a tree with the minimum total edge weight.**`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  implementation: {
    intuition:
      "Prim’s Algorithm grows the MST from an arbitrary starting node by adding the smallest edge that connects to a new node.",
    approach: `1. Start with any node and mark it as visited.\n
         2. Find the smallest edge that connects to an unvisited node.\n
         3. Add the edge to the MST and mark the new node as visited.\n
         4. Repeat until all nodes are included.`,
    code: [
      {
        language: "C",
        code: `#include<stdio.h>
  #define INF 9999999
  #define V 5 
  
  int main() {
      int G[V][V] = {
          {0, 2, 0, 6, 0},
          {2, 0, 3, 8, 5},
          {0, 3, 0, 0, 7},
          {6, 8, 0, 0, 9},
          {0, 5, 7, 9, 0}
      };
      int selected[V] = {0};
      int no_edges = 0;
      selected[0] = 1;
      
      printf("Edge : Weight\\n");
      
      while (no_edges < V - 1) {
          int min = INF, x = 0, y = 0;
          for (int i = 0; i < V; i++) {
              if (selected[i]) {
                  for (int j = 0; j < V; j++) {
                      if (!selected[j] && G[i][j]) {
                          if (min > G[i][j]) {
                              min = G[i][j];
                              x = i;
                              y = j;
                          }
                      }
                  }
              }
          }
          printf("%d - %d : %d\\n", x, y, G[x][y]);
          selected[y] = 1;
          no_edges++;
      }
      return 0;
  }`,
      },
      {
        language: "Java",
        code: `import java.util.*;
  
  class Prim {
      static final int V = 5;
      static int minKey(int key[], boolean mstSet[]) {
          int min = Integer.MAX_VALUE, minIndex = -1;
          for (int v = 0; v < V; v++)
              if (!mstSet[v] && key[v] < min) {
                  min = key[v];
                  minIndex = v;
              }
          return minIndex;
      }
  
      static void primMST(int graph[][]) {
          int parent[] = new int[V], key[] = new int[V];
          boolean mstSet[] = new boolean[V];
  
          Arrays.fill(key, Integer.MAX_VALUE);
          key[0] = 0;
          parent[0] = -1;
  
          for (int count = 0; count < V - 1; count++) {
              int u = minKey(key, mstSet);
              mstSet[u] = true;
              for (int v = 0; v < V; v++)
                  if (graph[u][v] != 0 && !mstSet[v] && graph[u][v] < key[v]) {
                      parent[v] = u;
                      key[v] = graph[u][v];
                  }
          }
          System.out.println("Edge Weight");
          for (int i = 1; i < V; i++)
              System.out.println(parent[i] + " - " + i + " " + graph[i][parent[i]]);
      }
  
      public static void main(String[] args) {
          int graph[][] = {
              {0, 2, 0, 6, 0},
              {2, 0, 3, 8, 5},
              {0, 3, 0, 0, 7},
              {6, 8, 0, 0, 9},
              {0, 5, 7, 9, 0}
          };
          primMST(graph);
      }
  }`,
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};
