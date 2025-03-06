export const dijkstraData = {
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
    title: "Dijkstra’s Algorithm (Single-Source Shortest Path)",
    description: "Understanding Dijkstra's Algorithm for Shortest Path",
    brief:
      "Dijkstra’s Algorithm finds the shortest paths from a single source node to all other nodes in a weighted graph. It uses a priority queue (or min-heap) to always extend the shortest known path first, ensuring optimal results.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/dijkstra.png",
    ],
    complexityAnalysis:
      "O(V²) using adjacency matrix, O((V+E) log V) using adjacency list with a priority queue.",
    applications: [
      "Navigation Systems - Used in Google Maps for shortest route calculation.",
      "Network Routing - Finds the best path for packet delivery.",
      "AI Pathfinding - Used in game development for shortest path movement.",
      "Telecommunication Networks - Optimizes communication paths.",
      "Logistics & Transport - Helps in finding the shortest delivery routes.",
    ],
    advantages: [
      "Efficient for graphs with non-negative weights.",
      "Works well with priority queues (Binary Heaps/Fibonacci Heaps) for optimization.",
      "Guarantees the shortest path from the source node.",
    ],
    disadvantages: [
      "Does not work with graphs containing negative weight edges.",
      "For dense graphs, Floyd-Warshall can be more efficient for all-pairs shortest paths.",
      "Can be slow for large graphs if implemented without heaps.",
    ],
    videos: [
      "https://www.youtube.com/watch?v=V6H1qAeB-l4",
      "https://www.youtube.com/watch?v=XB4MIexjvY0",
    ],
    topicId: "cm7laee6v000lbu8ob1guc47t",
  },
  faq: [
    {
      question: "What is Dijkstra’s Algorithm used for?",
      answer:
        "Dijkstra’s Algorithm is used to find the shortest paths from a single source node to all other nodes in a weighted graph.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "Does Dijkstra’s Algorithm work with negative weights?",
      answer:
        "No, Dijkstra’s Algorithm does not work correctly with graphs that contain negative weight edges.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  vivaQuestions: [
    {
      question: "What data structure is used in an optimized Dijkstra’s Algorithm?",
      answer: "A priority queue (min-heap) is used for optimization.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    {
      question: "What is the time complexity of Dijkstra’s Algorithm?",
      answer:
        "O(V²) with an adjacency matrix, O((V+E) log V) using a priority queue.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  ],
  questions: {
    question:
      `Given a weighted, undirected and connected graph where you have given adjacency list adj. You have to find the shortest distance of all the vertices from the source vertex src, and return a list of integers denoting the shortest distance between each node and source vertex src.\n Note: The Graph doesn't contain any negative weight edge.`,
    examples: [
      {
        input: "adj = [[[1, 9]], [[0, 9]]], src = 0",
        output: "[0, 9]",
      },
      {
        input: "adj = [[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]], src = 2",
        output: "[4, 3, 0]",
      },
    ],
    constraints: [
      "1 ≤ no. of vertices ≤ 1000",
      "0 ≤ adj[i][j] ≤ 1000",
      "0 ≤ src < no. of vertices",
    ],
    difficulty: "Medium",
    averageTime: "25m",
    testcases: [
      {
        input: "2\n0 1 9\n1 0 9\n0", // adj = [[[1, 9]], [[0, 9]]], src = 0
        expectedOutput: "[0, 9]", // Expected output
      },
      {
        input: "3\n0 1 1\n0 2 6\n1 2 3\n1 0 1\n2 1 3\n2 0 6\n2", // adj = [[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]], src = 2
        expectedOutput: "[4, 3, 0]", // Expected output
      },
    ],
  },
  working: {
    explanation:
      "Dijkstra’s Algorithm starts from a source vertex and iteratively selects the vertex with the smallest known distance. It then updates the distances of its neighbors. This process continues until all shortest paths are found.",
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  illustration: {
    summary:
      "Dijkstra's Algorithm efficiently finds the shortest path from a source node to all other nodes by iteratively selecting the nearest node and updating the distances of its neighbors.",
    tips: [
      "Use a priority queue to optimize the performance for large graphs.",
      "Ensure no negative weights are present in the graph.",
      "For all-pairs shortest paths, consider Floyd-Warshall instead.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/dijkstra-demo.png",
    ],
    explanation: `1. **Initialize distances**: Set the distance to the source as 0 and all other nodes as infinity.
  2. **Use a priority queue**: Extract the node with the smallest distance.
  3. **Update neighbors**: If a shorter path is found, update it in the queue.
  4. **Repeat**: Continue until all nodes have been processed.
  5. **Final output**: The shortest path from the source to all other nodes is found.`,
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
  implementation: {
    intuition:
      "Dijkstra’s Algorithm maintains a set of visited nodes and a priority queue to process the nearest unvisited node first.",
    approach:
      `1. Initialize distances, set source distance to 0, all others to infinity.\n
       2. Use a priority queue to process the nearest node.\n
       3. Update distances of adjacent nodes if a shorter path is found.\n
       4. Continue until all nodes are processed.`,
    code: [
      {
        language: "C",
        code: `#include <stdio.h>
#include <limits.h>

#define V 5
#define INF 99999

int minDistance(int dist[], int visited[]) {
    int min = INF, min_index;
    for (int v = 0; v < V; v++)
        if (!visited[v] && dist[v] <= min)
            min = dist[v], min_index = v;
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V], visited[V] = {0};

    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = 1;
        for (int v = 0; v < V; v++)
            if (!visited[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }

    printf("Vertex   Distance from Source\\n");
    for (int i = 0; i < V; i++) printf("%d \\t %d\\n", i, dist[i]);
}`,
      },
      {
        language: "Python",
        code: `import heapq

def dijkstra(graph, src):
    V = len(graph)
    dist = {i: float('inf') for i in range(V)}
    dist[src] = 0
    pq = [(0, src)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    
    print("Vertex Distance from Source")
    for v in range(V):
        print(v, dist[v])

graph = {0: [(1, 10), (3, 5)], 1: [(2, 1)], 2: [(3, 4)], 3: [(1, 3), (2, 9)]}
dijkstra(graph, 0)`,
      },
    ],
    contentId: "cm7ja3jju000hbugs0bx8uvid",
  },
};