export const dfsData = {
    module: {
      name: "Design And Analysis of Algorithms",
      description:
        "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
    },
    topics: [
      {
        name: "Graph Algorithms",
        description:
          "Algorithms that work on graphs to find paths, cycles, and connectivity.",
        moduleId: "cm7j4tic90000buo8oh7a0scf",
      },
    ],
    content: {
      title: "Depth-First Search (DFS)",
      description: "Understanding Depth-First Search (DFS) Algorithm",
      brief:
        "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It is implemented using recursion or an explicit stack. DFS is widely used in cycle detection, pathfinding, and connectivity checking.",
      photos: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20200619193030/DFS.png",
      ],
      complexityAnalysis: "O(V + E), where V is the number of vertices and E is the number of edges.",
      applications: [
        "Cycle Detection - Used in detecting cycles in directed and undirected graphs.",
        "Pathfinding - Used in AI and game development for exploring paths.",
        "Topological Sorting - Helps in scheduling tasks in dependency graphs.",
        "Solving Mazes - Used in AI to explore paths in mazes.",
        "Connected Components - Finds connected components in a graph.",
      ],
      advantages: [
        "Uses less memory compared to BFS for deep graphs.",
        "Can be implemented using recursion, making it easier to understand.",
        "Efficient for topological sorting and connected component detection.",
      ],
      disadvantages: [
        "May get stuck in infinite loops if cycles are not handled.",
        "Does not guarantee the shortest path in unweighted graphs.",
      ],
      videos: [
        "https://www.youtube.com/watch?v=7fujbpJ0LB4",
        "https://www.youtube.com/watch?v=pcKY4hjDrxk",
      ],
      topicId: "cm7laee6v000lbu8ob1guc47t",
    },
    faq: [
      {
        question: "What is the time complexity of DFS?",
        answer:
          "The time complexity of DFS is O(V + E), where V is the number of vertices and E is the number of edges.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "Where is DFS used?",
        answer:
          "DFS is widely used in pathfinding, cycle detection, topological sorting, and connected component detection in graphs.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    vivaQuestions: [
      {
        question: "What data structure is used in DFS?",
        answer: "DFS uses recursion (implicit stack) or an explicit stack for traversal.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "Does DFS guarantee the shortest path?",
        answer: "No, DFS does not guarantee the shortest path in an unweighted graph.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    questions:{
      question:`Check whether a given graph is connected or not using DFS method.`,
      examples:[
          {input:"G = [[2,3,1], [0], [0,4], [0], [2]]",
          output: "1"
          },
          {
            input: "adj = [[1], [0, 2], [1], [4], [3]]",
            output: "0",
          },
      ],
      constraints:[
        "1 ≤ adj.size() ≤ 10^4",
"1 ≤ adj[i][j] ≤ 104"
      ],
      difficulty: "easy",
      averageTime:"10m",
      testcases:[
        {
          input: "4\n2 1 2\n2 0 3\n2 0 3\n2 1 2", // adj = [[1, 2], [0, 3], [0, 3], [1, 2]]
          output: "1",
        },
        {
          input: "5\n1 1\n2 0 2\n1 1\n1 4\n1 3", // adj = [[1], [0, 2], [1], [4], [3]]
          output: "0",
        },
      ]
    },
    working: {
      explanation:
        "DFS starts from a given source node and explores as far as possible along each branch before backtracking. It continues until all nodes are visited.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    illustration: {
      summary:
        "DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It is useful for pathfinding and cycle detection.",
      tips: [
        "Use recursion or an explicit stack to explore nodes.",
        "Mark nodes as visited to prevent infinite loops.",
        "DFS is preferred for problems where deep exploration is required.",
      ],
      images: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20200619193030/DFS.png",
      ],
      explanation: `1. **Start from the source node** and mark it as visited.  
      2. **Explore deeper** by recursively visiting unvisited neighbors.  
      3. **Backtrack** when no further nodes can be visited and explore alternative paths.`,
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    implementation: {
      intuition:
        "DFS explores as far as possible before backtracking. It can be implemented using recursion or an explicit stack.",
      approach:
        `1. Start from the given source node.\n
         2. Mark the node as visited and process it.\n
         3. Recursively visit all unvisited neighbors.\n
         4. Backtrack when no more nodes can be visited.`,
      code: [
        {
          language: "C",
          code: `#include <stdio.h>
  #include <stdlib.h>
  
  #define MAX 10
  
  int adj[MAX][MAX], visited[MAX], n;
  
  void dfs(int v) {
      printf("%d ", v);
      visited[v] = 1;
  
      for (int i = 0; i < n; i++) {
          if (adj[v][i] && !visited[i]) {
              dfs(i);
          }
      }
  }
  
  int main() {
      int edges, u, v;
      
      printf("Enter number of vertices: ");
      scanf("%d", &n);
  
      printf("Enter number of edges: ");
      scanf("%d", &edges);
  
      for (int i = 0; i < edges; i++) {
          printf("Enter edge (u v): ");
          scanf("%d %d", &u, &v);
          adj[u][v] = adj[v][u] = 1;
      }
  
      for (int i = 0; i < n; i++) visited[i] = 0;
  
      printf("DFS Traversal: ");
      dfs(0);
      return 0;
  }`
        },
        {
          language: "Java",
          code: `import java.util.*;
  
  class DFS {
      static void dfs(int v, boolean visited[], List<List<Integer>> adj) {
          visited[v] = true;
          System.out.print(v + " ");
  
          for (int neighbor : adj.get(v)) {
              if (!visited[neighbor]) {
                  dfs(neighbor, visited, adj);
              }
          }
      }
  
      public static void main(String args[]) {
          Scanner sc = new Scanner(System.in);
          System.out.print("Enter number of vertices: ");
          int n = sc.nextInt();
          System.out.print("Enter number of edges: ");
          int edges = sc.nextInt();
  
          List<List<Integer>> adj = new ArrayList<>();
          for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
  
          System.out.println("Enter edges:");
          for (int i = 0; i < edges; i++) {
              int u = sc.nextInt();
              int v = sc.nextInt();
              adj.get(u).add(v);
              adj.get(v).add(u);
          }
  
          boolean visited[] = new boolean[n];
          System.out.print("DFS Traversal: ");
          dfs(0, visited, adj);
          sc.close();
      }
  }`
        },
        {
          language: "Python",
          code: `def dfs(graph, node, visited):
      if node not in visited:
          print(node, end=" ")
          visited.add(node)
          for neighbor in graph[node]:
              dfs(graph, neighbor, visited)
  
  graph = {
      0: [1, 2],
      1: [0, 3, 4],
      2: [0, 5],
      3: [1],
      4: [1, 5],
      5: [2, 4]
  }
  
  visited = set()
  print("DFS Traversal:", end=" ")
  dfs(graph, 0, visited)`
        }
      ],
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  };
  