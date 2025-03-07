export const bfsData = {
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
      title: "Breadth-First Search (BFS)",
      description: "Understanding Breadth-First Search (BFS) Algorithm",
      brief:
        "Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores all the vertices of a graph level by level. It uses a queue to visit adjacent nodes before moving deeper into the graph. BFS is widely used in shortest path algorithms, web crawling, and AI applications.",
      photos: [
        "https://media.geeksforgeeks.org/wp-content/uploads/BFS.png",
      ],
      complexityAnalysis: "O(V + E), where V is the number of vertices and E is the number of edges.",
      applications: [
        "Shortest Path in Unweighted Graph - Used in applications like GPS navigation.",
        "Web Crawlers - Helps in indexing web pages.",
        "AI and Robotics - Used in search algorithms in AI and maze-solving robots.",
        "Network Broadcasting - Used in peer-to-peer networks.",
        "Social Networks - Finds connections between people in social networks.",
      ],
      advantages: [
        "Guaranteed to find the shortest path in an unweighted graph.",
        "Works well for solving problems like connectivity and shortest paths.",
        "Can be implemented using a queue, making it easy to use.",
      ],
      disadvantages: [
        "Consumes more memory compared to DFS due to storing multiple levels in a queue.",
        "Inefficient for deep graphs due to high space complexity.",
      ],
      videos: [
        "https://www.youtube.com/watch?v=oDqjPvD54Ss",
        "https://www.youtube.com/watch?v=QRq6p9s8NVg",
      ],
      topicId: "cm7laee6v000lbu8ob1guc47t",
    },
    faq: [
      {
        question: "What is BFS used for?",
        answer:
          "BFS is used for finding the shortest path in unweighted graphs, network broadcasting, web crawling, and AI applications.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "How does BFS work?",
        answer:
          "BFS starts from a source node, explores all its neighbors, and then moves to their neighbors in a level-wise manner using a queue.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    vivaQuestions: [
      {
        question: "What is the data structure used in BFS?",
        answer: "BFS uses a queue to maintain the order of visited nodes.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "What is the time complexity of BFS?",
        answer: "O(V + E), where V is the number of vertices and E is the number of edges.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    questions: {
      question:
        `Given a undirected graph represented by an adjacency list adj, which is a vector of vectors where each adj[i] represents the list of vertices connected to vertex i. Perform a Breadth First Traversal (BFS) starting from vertex 0, visiting vertices from left to right according to the adjacency list, and return a list containing the BFS traversal of the graph.
        \n
        Note: Do traverse in the same order as they are in the adjacency list.`,
      examples: [
        { input: "adj = [[2,3,1], [0], [0,4], [0], [2]]", output: "[0, 2, 3, 1, 4]" },
        { input: "adj = [[], [3], [3], [], [0,1], [0,2]]", output: "[0, 1, 2, 3, 4]" },
        { input: "adj = [[1], [0, 2, 3], [1], [1, 4], [3]]", output: "[0, 1, 2, 3, 4]" },

      ],
      constraints: [
       " 1 ≤ adj.size() ≤ 10^4",
"1 ≤ adj[i][j] ≤ 10^4",
      ],
      difficulty: "easy",
      averageTime: "10m",
      testcases: [
        {
          input: "5\n2 3 1\n0\n0 4\n0\n2", // adj = [[2, 3, 1], [0], [0, 4], [0], [2]]
          output: "[0, 2, 3, 1, 4]",
        },
        {
          input: "6\n\n3\n3\n\n0 1\n0 2", // adj = [[], [3], [3], [], [0, 1], [0, 2]]
          output: "[0, 1, 2, 3, 4]",
        },
        {
          input: "5\n1\n0 2 3\n1\n1 4\n3", // adj = [[1], [0, 2, 3], [1], [1, 4], [3]]
          output: "[0, 1, 2, 3, 4]",
        },
        {
          input: "4\n\n0\n0\n0", // adj = [[], [0], [0], [0]]
          output: "[0, 1, 2, 3]",
        },
        {
          input: "5\n\n2\n3\n4\n", // adj = [[], [2], [3], [4], []]
          output: "[0, 1, 2, 3, 4]",
        },
      ],
    },
    working: {
      explanation:
        "BFS explores nodes level by level, visiting all adjacent nodes before moving deeper into the graph. It is implemented using a queue to store nodes to be visited next.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    illustration: {
      summary:
        "BFS is a graph traversal algorithm that visits nodes level-wise using a queue. It is useful for shortest path finding and connectivity checks.",
      tips: [
        "Use a queue to efficiently process nodes in level order.",
        "Mark nodes as visited to avoid infinite loops.",
        "BFS guarantees the shortest path in an unweighted graph.",
      ],
      images: [
        "https://media.geeksforgeeks.org/wp-content/uploads/BFS-Algorithm.png",
      ],
      explanation: `1. **Start from the source node** and enqueue it.  
      2. **Dequeue a node**, process it, and enqueue its unvisited neighbors.  
      3. **Repeat** until all nodes are visited.`,
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    implementation: {
      intuition:
        "BFS explores a graph in a breadth-wise manner, visiting all neighboring nodes before moving deeper into the graph.",
      approach:
        `1. Initialize a queue and push the starting node.\n
         2. While the queue is not empty, dequeue a node and visit its neighbors.\n
         3. Push unvisited neighbors into the queue and mark them as visited.\n
         4. Repeat the process until all nodes are visited.`,
      code: [
        {
          language: "C",
          code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_NODES 20

// Function to perform BFS
void bfs(int adj[MAX_NODES][MAX_NODES], int n, int start, int visited[MAX_NODES]) {
    int queue[MAX_NODES];
    int front = 0, rear = 0;

    // Mark the start node as visited and enqueue it
    queue[rear++] = start;
    visited[start] = 1;

    while (front < rear) {
        int current = queue[front++];

        // Explore all adjacent nodes
        for (int i = 0; i < n; i++) {
            if (adj[current][i] && !visited[i]) {
                queue[rear++] = i;
                visited[i] = 1;
            }
        }
    }
}

// Function to print the reachable nodes
void printReachableNodes(int visited[MAX_NODES], int n) {
    printf("[");
    int first = 1;
    for (int i = 0; i < n; i++) {
        if (visited[i]) {
            if (!first) printf(", ");
            printf("%d", i);
            first = 0;
        }
    }
    printf("]\n");
}

int main() {
    // New test cases
    int testCases[][MAX_NODES][MAX_NODES] = {
        { // Test case 1: adj = [[2,3,1], [0], [0,4], [0], [2]]
            {0, 0, 1, 1, 0},
            {1, 0, 0, 0, 0},
            {1, 0, 0, 0, 1},
            {1, 0, 0, 0, 0},
            {0, 0, 1, 0, 0}
        },
        { // Test case 2: adj = [[], [3], [3], [], [0,1], [0,2]]
            {0, 0, 0, 0, 0, 0},
            {0, 0, 0, 1, 0, 0},
            {0, 0, 0, 1, 0, 0},
            {0, 0, 0, 0, 0, 0},
            {1, 1, 0, 0, 0, 0},
            {1, 0, 1, 0, 0, 0}
        },
        { // Test case 3: adj = [[1], [0,2,3], [1], [1,4], [3]]
            {0, 1, 0, 0, 0},
            {1, 0, 1, 1, 0},
            {0, 1, 0, 0, 0},
            {0, 1, 0, 0, 1},
            {0, 0, 0, 1, 0}
        },
        { // Test case 4: adj = [[], [0], [0], [0]]
            {0, 0, 0, 0},
            {1, 0, 0, 0},
            {1, 0, 0, 0},
            {1, 0, 0, 0}
        },
        { // Test case 5: adj = [[], [2], [3], [4], []]
            {0, 0, 0, 0, 0},
            {0, 0, 1, 0, 0},
            {0, 0, 0, 1, 0},
            {0, 0, 0, 0, 1},
            {0, 0, 0, 0, 0}
        }
    };

    // Number of nodes for each test case
    int testSizes[] = {5, 6, 5, 4, 5};

    // Starting node for each test case
    int testStarts[] = {0, 0, 0, 0, 0};

    // Number of test cases
    int numTests = sizeof(testSizes) / sizeof(testSizes[0]);

    for (int t = 0; t < numTests; t++) {
        int n = testSizes[t];
        int start = testStarts[t];
        int visited[MAX_NODES] = {0};

        // Perform BFS
        bfs(testCases[t], n, start, visited);

        // Print reachable nodes
        printReachableNodes(visited, n);
    }

    return 0;
}
`
        },
        {
          language: "Java",
          code: `import java.util.*;
  
  class BFS {
      static void bfs(int start, List<List<Integer>> adj, int V) {
          boolean[] visited = new boolean[V];
          Queue<Integer> queue = new LinkedList<>();
          
          queue.add(start);
          visited[start] = true;
  
          while (!queue.isEmpty()) {
              int node = queue.poll();
              System.out.print(node + " ");
  
              for (int neighbor : adj.get(node)) {
                  if (!visited[neighbor]) {
                      queue.add(neighbor);
                      visited[neighbor] = true;
                  }
              }
          }
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
              System.out.print("Enter edge (U V): ");
              int u = sc.nextInt();
              int v = sc.nextInt();
              adj.get(u).add(v);
              adj.get(v).add(u);
          }
  
          System.out.print("Enter starting node: ");
          int start = sc.nextInt();
  
          System.out.println("BFS Traversal:");
          bfs(start, adj, V);
      }
  }`
        },
      ],
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  };
  