export const topologicalSortData = {
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
    title: "Topological Sorting",
    description: "Understanding Topological Sorting in Graphs",
    brief:
      "Topological Sorting is an ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (U → V), vertex U appears before vertex V in the ordering. It is used in scheduling problems, task dependency management, and compiler design.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/topological-sorting.png",
    ],
    complexityAnalysis: "O(V + E) using DFS or Kahn's Algorithm (BFS-based approach).",
    applications: [
      "Task Scheduling - Used in job scheduling where tasks have dependencies.",
      "Compiler Design - Determines the order of compilation of modules.",
      "Dependency Resolution - Used in package managers (npm, apt) to resolve dependencies.",
      "Course Prerequisites - Helps in determining course dependencies in academic planning.",
      "Circuit Design - Used in VLSI design to order computations.",
    ],
    advantages: [
      "Efficient O(V + E) time complexity.",
      "Provides a linear ordering of tasks in DAGs.",
      "Works well with dependency graphs.",
    ],
    disadvantages: [
      "Applicable only to Directed Acyclic Graphs (DAGs).",
      "If the graph has cycles, topological sorting is not possible.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=qe_pQCh09yU",
      "https://www.youtube.com/watch?v=QF3EZl9mfzM",
    ],
    topicId: "cm7laee6v000lbu8ob1guc47t",
  },
  faq: [
    {
      question: "What is Topological Sorting?",
      answer:
        "Topological Sorting is the linear ordering of vertices in a DAG such that for every directed edge (U → V), vertex U appears before V in the ordering.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "Can Topological Sorting be done on graphs with cycles?",
      answer:
        "No, Topological Sorting is only possible for Directed Acyclic Graphs (DAGs).",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question: "What are the methods to implement Topological Sorting?",
      answer:
        "Topological Sorting can be implemented using **Depth-First Search (DFS)** or **Kahn’s Algorithm (BFS-based approach).**",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the time complexity of Topological Sorting?",
      answer: "O(V + E), where V is the number of vertices and E is the number of edges.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  questions: {
    question:
      `Given an adjacency list for a Directed Acyclic Graph (DAG) where adj[u] contains a list of all vertices v such that there exists a directed edge u -> v. Return topological sort for the given graph.

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v in the ordering.\n

Note: As there are multiple Topological orders possible, you may return any of them. If your returned Topological sort is correct then the output will be 1 else 0.`,
    examples: [
      { input: "adj = [[], [0], [0], [0]]", output: "1" },
      { input: "adj = [[], [3], [3], [], [0,1], [0,2]]", output: "1" },
    ],
    constraints: [
      "2 ≤ V ≤ 10^3",
      "1 ≤ E ≤ (V * (V - 1)) / 2",
    ],
    difficulty: "Medium",
    averageTime: "15m",
    testcases: [
      {
        input: "4\n1\n0\n2\n0\n3\n0", // adj = [[], [0], [0], [0]]
        expectedOutput: "1",
      },
      {
        input: "6\n1\n3\n2\n3\n4\n0 1\n5\n0 2", // adj = [[], [3], [3], [], [0,1], [0,2]]
        expectedOutput: "1",
      },
      {
        input: "5\n1\n2\n2\n3\n3\n4\n4\n", // adj = [[], [2], [3], [4], []]
        expectedOutput: "1",
      },
      {
        input: "3\n1\n2\n2\n", // adj = [[], [2], []]
        expectedOutput: "1",
      },
      {
        input: "4\n1\n2 3\n2\n3\n3\n", // adj = [[], [2, 3], [3], []]
        expectedOutput: "1",
      },
    ],
  },
  working: {
    explanation:
      "Topological Sorting arranges vertices in a way where each directed edge U → V ensures U appears before V in the ordering. This is done using **DFS (recursion and stack) or BFS (in-degree method).**",
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "Topological Sorting ensures a valid ordering of nodes in a Directed Acyclic Graph (DAG) where dependencies are respected.",
    tips: [
      "Use DFS-based approach for easy recursion-based implementation.",
      "For large graphs, use Kahn’s Algorithm (BFS with an in-degree array) for better control.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20210302124855/topological-sorting-example.png",
    ],
    explanation: `1. **Identify a node with in-degree 0** (no incoming edges).  
    2. **Add it to the sorted order and remove it from the graph.**  
    3. **Reduce in-degrees of its neighbors.**  
    4. **Repeat until all nodes are included in the order.**`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  implementation: {
    intuition:
      "Topological Sorting ensures that all dependencies are resolved in a DAG before processing the next dependent node.",
    approach:
      `1. Perform **DFS-based sorting** where nodes are pushed onto a stack after visiting all their dependencies.\n
       2. Alternatively, use **Kahn’s Algorithm (BFS)** which removes nodes with zero in-degree iteratively.\n
       3. The final ordering of nodes is a valid Topological Sort.`,
    code: [
      {
        language: "C",
        code: `#include <stdio.h>
#include <stdlib.h>

#define MAX 100

int adj[MAX][MAX], visited[MAX], stack[MAX], top = -1;

void dfs(int node, int n) {
    visited[node] = 1;
    for (int i = 0; i < n; i++) {
        if (adj[node][i] && !visited[i]) {
            dfs(i, n);
        }
    }
    stack[++top] = node;
}

void topologicalSort(int n) {
    for (int i = 0; i < n; i++)
        visited[i] = 0;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i])
            dfs(i, n);
    }

    printf("Topological Sorting Order: ");
    while (top >= 0)
        printf("%d ", stack[top--]);
    printf("\\n");
}

int main() {
    int n, edges, u, v;
    printf("Enter number of vertices: ");
    scanf("%d", &n);
    printf("Enter number of edges: ");
    scanf("%d", &edges);

    for (int i = 0; i < edges; i++) {
        printf("Enter edge (U -> V): ");
        scanf("%d %d", &u, &v);
        adj[u][v] = 1;
    }

    topologicalSort(n);
    return 0;
}`
      },
      {
        language: "Java",
        code: `import java.util.*;

class TopologicalSort {
    static void dfs(int node, boolean[] visited, Stack<Integer> stack, List<List<Integer>> adj) {
        visited[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor])
                dfs(neighbor, visited, stack, adj);
        }
        stack.push(node);
    }

    static void topologicalSort(int V, List<List<Integer>> adj) {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[V];

        for (int i = 0; i < V; i++)
            if (!visited[i])
                dfs(i, visited, stack, adj);

        System.out.println("Topological Sorting Order:");
        while (!stack.isEmpty())
            System.out.print(stack.pop() + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of vertices: ");
        int V = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();

        for (int i = 0; i < V; i++)
            adj.add(new ArrayList<>());

        System.out.print("Enter number of edges: ");
        int E = sc.nextInt();

        for (int i = 0; i < E; i++) {
            System.out.print("Enter edge (U -> V): ");
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
        }

        topologicalSort(V, adj);
    }
}`
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};