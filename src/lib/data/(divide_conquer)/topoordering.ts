export const topologicalSortData = {
    module: {
      name: "Design And Analysis of Algorithms",
      description:
        "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
    },
    topics: [
      {
        name: "Divide and Conquer", // Same as in quickSortData
        description:
          "Algorithms that recursively divide problems into subproblems",
        moduleId: "cm7f4ndrz0008bue4mhqje0qh",
      },
    ],
    content: {
      title: "Topological Sort",
      description: "Understanding Topological Sort Algorithm",
      brief:
        "Topological Sort is an algorithm used to linearly order the vertices of a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. It is commonly used in scheduling tasks, dependency resolution, and course prerequisites.",
      photos: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20230706153706/Topological-Sort-Algorithm.png",
      ],
      complexityAnalysis: "O(V + E), where V is the number of vertices and E is the number of edges.",
      applications: [
        "Task Scheduling - Used to schedule tasks with dependencies, such as build systems or project management.",
        "Dependency Resolution - Resolves dependencies in package managers like npm or pip.",
        "Course Prerequisites - Determines the order of courses based on prerequisites in academic programs.",
        "Deadlock Detection - Helps detect deadlocks in operating systems by analyzing resource allocation graphs.",
        "Data Processing - Used in data pipelines to determine the order of operations.",
      ],
      advantages: [
        "Efficient for directed acyclic graphs (DAGs)",
        "Linear time complexity (O(V + E))",
        "Useful for dependency resolution and scheduling",
      ],
      disadvantages: [
        "Only works for directed acyclic graphs (DAGs)",
        "Cannot handle cyclic dependencies",
      ],
      videos: [
        "https://www.youtube.com/watch?v=ddTC4Zovtbc",
        "https://www.youtube.com/watch?v=QaI45-uf6iE",
      ],
      topicId: "cm7f4otem000abue44msxb0xv",
    },
    faq: [
      {
        question: "What is Topological Sort?",
        answer: "Topological Sort is an algorithm used to linearly order the vertices of a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "Why is Topological Sort only applicable to DAGs?",
        answer: "Topological Sort requires a directed acyclic graph (DAG) because cyclic dependencies create a loop, making it impossible to determine a valid linear order.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    vivaQuestions: [
      {
        question: "What is the time complexity of Topological Sort?",
        answer: "The time complexity of Topological Sort is O(V + E), where V is the number of vertices and E is the number of edges in the graph.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "How can you detect if a graph has a cycle using Topological Sort?",
        answer: "If the number of vertices in the topological order is less than the total number of vertices in the graph, the graph contains a cycle.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    working: {
      explanation:
        "Topological Sort works by performing a Depth-First Search (DFS) on the graph. It starts from a vertex with no incoming edges, adds it to the result, and recursively processes its neighbors. The final result is the reverse of the order in which vertices are finished during DFS.",
      contentId: "cm7jgu49i0005butcn9bw8bnf",
    },
    implementation: {
      intuition:
        "Topological Sort is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering.",
      approach:
        `1. Perform a Depth-First Search (DFS) on the graph.\n2. Track the order in which vertices are finished during DFS.\n3. Reverse the order to get the topological sort.`,
      code: [
        {
          language: "C",
          code: `#include <stdio.h>
  #include <stdlib.h>
  
  #define MAX 100
  
  typedef struct {
      int items[MAX];
      int top;
  } Stack;
  
  void push(Stack *s, int value) {
      if (s->top == MAX - 1) return;
      s->items[++(s->top)] = value;
  }
  
  int pop(Stack *s) {
      if (s->top == -1) return -1;
      return s->items[(s->top)--];
  }
  
  void dfs(int node, int vis[], Stack *st, int adj[MAX][MAX], int V) {
      vis[node] = 1;
      for (int i = 0; i < V; i++) {
          if (adj[node][i] == 1 && vis[i] == 0) {
              dfs(i, vis, st, adj, V);
          }
      }
      push(st, node);
  }
  
  void topoSort(int V, int adj[MAX][MAX], int ans[]) {
      int vis[MAX] = {0};
      Stack st;
      st.top = -1;
  
      for (int i = 0; i < V; i++) {
          if (vis[i] == 0) {
              dfs(i, vis, &st, adj, V);
          }
      }
  
      int i = 0;
      while (st.top != -1) {
          ans[i++] = pop(&st);
      }
  }
  
  int main() {
      int V = 6;
      int adj[MAX][MAX] = {0}; 
  
      adj[2][3] = 1;
      adj[3][1] = 1;
      adj[4][0] = 1;
      adj[4][1] = 1;
      adj[5][0] = 1;
      adj[5][2] = 1;
  
      int ans[MAX];
      topoSort(V, adj, ans);
  
      printf("Topological Sorting Order: ");
      for (int i = 0; i < V; i++) {
          printf("%d ", ans[i]);
      }
      printf("\\n");
  
      return 0;
  }`,
        },
        {
          language: "C++",
          code: `#include <bits/stdc++.h>
  using namespace std;
  
  class Solution {
  private:
      void dfs(int node, int vis[], stack<int> &st, vector<int> adj[]) {
          vis[node] = 1;
          for (auto it : adj[node]) {
              if (!vis[it]) dfs(it, vis, st, adj);
          }
          st.push(node);
      }
  public:
      vector<int> topoSort(int V, vector<int> adj[]) {
          int vis[V] = {0};
          stack<int> st;
          for (int i = 0; i < V; i++) {
              if (!vis[i]) {
                  dfs(i, vis, st, adj);
              }
          }
  
          vector<int> ans;
          while (!st.empty()) {
              ans.push_back(st.top());
              st.pop();
          }
          return ans;
      }
  };
  
  int main() {
      vector<int> adj[6] = {{}, {}, {3}, {1}, {0, 1}, {0, 2}};
      int V = 6;
      Solution obj;
      vector<int> ans = obj.topoSort(V, adj);
  
      for (auto node : ans) {
          cout << node << " ";
      }
      cout << endl;
  
      return 0;
  }`,
        },
        {
          language: "Java",
          code: `import java.util.*;
  
  class Solution {
      private static void dfs(int node, int vis[], Stack<Integer> st, ArrayList<ArrayList<Integer>> adj) {
          vis[node] = 1;
          for (int it : adj.get(node)) {
              if (vis[it] == 0) dfs(it, vis, st, adj);
          }
          st.push(node);
      }
  
      static int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {
          int vis[] = new int[V];
          Stack<Integer> st = new Stack<>();
          for (int i = 0; i < V; i++) {
              if (vis[i] == 0) {
                  dfs(i, vis, st, adj);
              }
          }
  
          int ans[] = new int[V];
          int i = 0;
          while (!st.isEmpty()) {
              ans[i++] = st.pop();
          }
          return ans;
      }
  
      public static void main(String[] args) {
          int V = 6;
          ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
          for (int i = 0; i < V; i++) {
              adj.add(new ArrayList<>());
          }
          adj.get(2).add(3);
          adj.get(3).add(1);
          adj.get(4).add(0);
          adj.get(4).add(1);
          adj.get(5).add(0);
          adj.get(5).add(2);
  
          int[] ans = topoSort(V, adj);
          for (int node : ans) {
              System.out.print(node + " ");
          }
          System.out.println("");
      }
  }`,
        },
      ],
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    illustration: {
      summary:
        "Topological Sort works by performing a Depth-First Search (DFS) on the graph and reversing the order in which vertices are finished.",
      tips: [
        "Ensure the graph is a directed acyclic graph (DAG).",
        "Use DFS for efficient implementation.",
        "Handle cycles by checking if the number of vertices in the result matches the total number of vertices.",
      ],
      images: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Topological-Sort-1.webp",
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Topological-Sort-2.webp",
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163911/Topological-Sort-3.webp",
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163912/Topological-Sort-4.webp",
      ],
      explanation: `Let’s look at the working of Topological Sort with an example:
  
  1. **Graph**:
     0 → 1 → 3 → 4 → 5
     0 → 2 → 3 → 4 → 5

  
  2. **DFS Traversal**:
     - Start from vertex 0.
     - Traverse to vertex 1, then vertex 3, then vertex 4, and finally vertex 5.
     - Backtrack and traverse to vertex 2, then vertex 3 (already visited), and so on.
  
  3. **Topological Order**:
     - The order in which vertices are finished: [5, 4, 3, 1, 2, 0].
     - Reverse the order to get the topological sort: [0, 2, 1, 3, 4, 5].`,
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  };