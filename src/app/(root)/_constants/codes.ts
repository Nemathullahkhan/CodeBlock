type LanguageCode = {
  language: string; // Language name (e.g., "python", "java", "cpp", "c")
  monacoLanguage: string; // Monaco editor language ID (e.g., "python", "java", "cpp", "c")
  defaultCode: string; // Starting code for the problem in this language
};

type Problem = {
  id: string; // Unique problem ID
  title: string; // Problem title
  description: string; // Problem description
  difficulty: "easy" | "medium" | "hard"; // Problem difficulty
  languages: LanguageCode[]; // Starting code for each language
};

export const CODE_CONFIG: Record<string, Problem> = {
  "Merge Sort": {
    id: "merge-sort",
    title: "Merge Sort",
    description:
      "Implement the merge sort algorithm to sort an array of integers. The merge sort algorithm works by recursively dividing the array into two halves, sorting each half, and then merging the sorted halves.",
    difficulty: "medium",
    languages: [
      {
        language: "python",
        monacoLanguage: "python",
        defaultCode: `def merge(arr, l, m, r):
    # Implement the merge function here
    pass
  
def mergeSort(arr, l, r):
      # Implement the mergeSort function here
      pass
  
def printArray(A, size):
      print("[", end="")
      for i in range(size):
          print(A[i], end="")
          if i < size - 1:
              print(",", end="")
      print("]")
  
# Test cases
testCases = [
      [4, 1, 3, 9, 7],
      [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      [1, 3, 2],
      [2, 9, 0, 1]
  ]
  
testSizes = [5, 10, 3, 4]
  
numTests = len(testSizes)
  
for i in range(numTests):
      mergeSort(testCases[i], 0, testSizes[i] - 1)
      printArray(testCases[i], testSizes[i])
  `,
      },
      {
        language: "java",
        monacoLanguage: "java",
        defaultCode: `public class Main {
      public static void merge(int arr[], int l, int m, int r) {
          // Implement the merge function here
      }
  
      public static void mergeSort(int arr[], int l, int r) {
          // Implement the mergeSort function here
      }

  
  
      public static void printArray(int A[], int size) {
          System.out.print("[");
          for (int i = 0; i < size; i++) {
              System.out.print(A[i]);
              if (i < size - 1) {
                  System.out.print(",");
              }
          }
          System.out.println("]");
      }
  
      public static void main(String[] args) {
          // Test cases
          int[][] testCases = {
              {4, 1, 3, 9, 7},
              {10, 9, 8, 7, 6, 5, 4, 3, 2, 1},
              {1, 3, 2},
              {2, 9, 0, 1}
          };
  
          int[] testSizes = {5, 10, 3, 4};
  
          int numTests = testSizes.length;
  
          for (int i = 0; i < numTests; i++) {
              mergeSort(testCases[i], 0, testSizes[i] - 1);
              printArray(testCases[i], testSizes[i]);
          }
      }
  }`,
      },
      {
        language: "cpp",
        monacoLanguage: "cpp",
        defaultCode: `#include <iostream>
  using namespace std;
  
  void merge(int arr[], int l, int m, int r) {
      // Implement the merge function here
  }
  
  void mergeSort(int arr[], int l, int r) {
      // Implement the mergeSort function here
  }
  
  void printArray(int A[], int size) {
      cout << "[";
      for (int i = 0; i < size; i++) {
          cout << A[i];
          if (i < size - 1) {
              cout << ",";
          }
      }
      cout << "]" << endl;
  }
  
  int main() {
      // Test cases
      int testCases[][10] = {
          {4, 1, 3, 9, 7},
          {10, 9, 8, 7, 6, 5, 4, 3, 2, 1},
          {1, 3, 2},
          {2, 9, 0, 1}
      };
  
      int testSizes[] = {5, 10, 3, 4};
  
      int numTests = sizeof(testSizes) / sizeof(testSizes[0]);
  
      for (int i = 0; i < numTests; i++) {
          mergeSort(testCases[i], 0, testSizes[i] - 1);
          printArray(testCases[i], testSizes[i]);
      }
  
      return 0;
  }`,
      },
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>
  
  void merge(int arr[], int l, int m, int r) {
      // Implement the merge function here
  }
  
  void mergeSort(int arr[], int l, int r) {
      // Implement the mergeSort function here
  }
  
  void printArray(int A[], int size) {
      printf("[");
      for (int i = 0; i < size; i++) {
          printf("%d", A[i]);
          if (i < size - 1) {
              printf(",");
          }
      }
      printf("] ");
  }
  
  int main() {
      // Test cases
      int testCases[][10] = {
          {4,1,3,9,7},
          {10,9,8,7,6,5,4,3,2,1},
          {1,3,2},
          {2,9,0,1}
      };
  
      int testSizes[] = {5, 10, 3, 4};
  
      int numTests = sizeof(testSizes) / sizeof(testSizes[0]);
  
      for (int i = 0; i < numTests; i++) {
          mergeSort(testCases[i], 0, testSizes[i] - 1);
          printArray(testCases[i], testSizes[i]);
      }
  
      return 0;
  }`,
      },
    ],
  },
  "Quick Sort": {
    id: "quick-sort",
    title: "Quick Sort",
    description:
      "Implement the quick sort algorithm to sort an array of integers. The quick sort algorithm works by selecting a pivot element, partitioning the array around the pivot, and then recursively sorting the subarrays.",
    difficulty: "medium",
    languages: [
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>

void swap(int* a, int* b) {
    // Write the functionality to swap two numbers
}

int partition(int arr[], int low, int high) {
    // Implement the partition function here
}

void quickSort(int arr[], int low, int high) {
    // Implement the quickSort function here
}




// Ignore the below code implementation

/*-----------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
---------------------------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
--------------------------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/
void printArray(int A[], int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("%d", A[i]);
        if (i < size - 1) {
            printf(",");
        }
    }
    printf("] ");
}

int main() {
    // Test cases
    int testCases[][10] = {
        {4, 1, 3, 9, 7},
        {10, 9, 8, 7, 6, 5, 4, 3, 2, 1},
        {1, 3, 2},
        {2, 9, 0, 1}
    };

    int testSizes[] = {5, 10, 3, 4};

    int numTests = sizeof(testSizes) / sizeof(testSizes[0]);

    for (int i = 0; i < numTests; i++) {
        quickSort(testCases[i], 0, testSizes[i] - 1);
        printArray(testCases[i], testSizes[i]);
    }

    return 0;
}`,
      },
      {
        language: "cpp",
        monacoLanguage: "cpp",
        defaultCode: `#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    // Implement the parition function here
}

void quickSort(int arr[], int low, int high) {
    // Implement the quickSort function here
}







// Ignore the below code implementation

/*-----------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
----------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
---------------------------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
--------------------------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

void printArray(int A[], int size) {
    cout << "[";
    for (int i = 0; i < size; i++) {
        cout << A[i];
        if (i < size - 1) {
            cout << ",";
        }
    }
    cout << "]" << endl;
}

int main() {
    // Test cases
    int testCases[][10] = {
        {4, 1, 3, 9, 7},
        {10, 9, 8, 7, 6, 5, 4, 3, 2, 1},
        {1, 3, 2},
        {2, 9, 0, 1}
    };

    int testSizes[] = {5, 10, 3, 4};

    int numTests = sizeof(testSizes) / sizeof(testSizes[0]);

    for (int i = 0; i < numTests; i++) {
        quickSort(testCases[i], 0, testSizes[i] - 1);
        printArray(testCases[i], testSizes[i]);
    }

    return 0;
}`,
      },
      {
        language: "java",
        monacoLanguage: "java",
        defaultCode: `public class Main {
    public static int partition(int arr[], int low, int high) {
    // Start writing from here
    }

    public static void quickSort(int arr[], int low, int high) {
    // Start writing from here
    }

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 



    public static void printArray(int A[], int size) {
        System.out.print("[");
        for (int i = 0; i < size; i++) {
            System.out.print(A[i]);
            if (i < size - 1) {
                System.out.print(",");
            }
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {4, 1, 3, 9, 7},
            {10, 9, 8, 7, 6, 5, 4, 3, 2, 1},
            {1, 3, 2},
            {2, 9, 0, 1}
        };

        int[] testSizes = {5, 10, 3, 4};

        int numTests = testSizes.length;

        for (int i = 0; i < numTests; i++) {
            quickSort(testCases[i], 0, testSizes[i] - 1);
            printArray(testCases[i], testSizes[i]);
        }
    }
}`,
      },
      {
        language: "python",
        monacoLanguage: "python",
        defaultCode: `def partition(arr, low, high):
    # Implement the partition function here

def quickSort(arr, low, high):
    # Implement the quicksort recursive function here





 
 
 
 
# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX---------------------------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   
#In the grand scheme of this intricate and meticulously designed program,\n #it is of utmost importance to note that the specific implementation of the function that is commonly referred to as the main function is not,\n #in any way, the central point of focus or the primary aspect of concern in our current context.\n #Rather, its presence in the codebase should be viewed solely as an auxiliary, supplementary, and non-essential inclusion whose fundamental role is exclusively confined to the generation of output corresponding to the execution of the present iteration of the program.\n #This means that any attempt to analyze, dissect, or infer deeper significance from its structure, logic, or overall presence in the broader context of the program would be an exercise in futility, as it does not contribute to the core functionality or intended purpose of the primary algorithmic logic under discussion.\n #Thus, for all intents and purposes, one should consciously and deliberately divert their attention away from this particular implementation,\n #acknowledging it only as an incidental artifact of the coding process—one that exists purely to facilitate the verification of the current state of execution.\n #Any further deliberation on its mechanics is neither necessary nor beneficial in the understanding of the core subject matter at hand.
def printArray(A, size):
    print("[", end="")
    for i in range(size):
        print(A[i], end="")
        if i < size - 1:
            print(",", end="")
    print("]")

# Test cases
testCases = [
    [4, 1, 3, 9, 7],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [1, 3, 2],
    [2, 9, 0, 1]
]

testSizes = [5, 10, 3, 4]

numTests = len(testSizes)

for i in range(numTests):
    quickSort(testCases[i], 0, testSizes[i] - 1)
    printArray(testCases[i], testSizes[i])`,
      },
    ],
  },
  "0/1 Knapsack Problem": {
    id: "knapsack-problem",
    title: "0/1 Knapsack Problem",
    description:
      "Implement the merge sort algorithm to sort an array of integers. The merge sort algorithm works by recursively dividing the array into two halves, sorting each half, and then merging the sorted halves.",
    difficulty: "medium",
    languages: [
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>
  
  void merge(int arr[], int l, int m, int r) {
      // Implement the merge function here
  }
  
  void mergeSort(int arr[], int l, int r) {
      // Implement the mergeSort function here
  }
  
  void printArray(int A[], int size) {
      printf("[");
      for (int i = 0; i < size; i++) {
          printf("%d", A[i]);
          if (i < size - 1) {
              printf(",");
          }
      }
      printf("] ");
  }
  
  int main() {
      // Test cases
      int testCases[][10] = {
          {4,1,3,9,7},
          {10,9,8,7,6,5,4,3,2,1},
          {1,3,2},
          {2,9,0,1}
      };
  
      int testSizes[] = {5, 10, 3, 4};
  
      int numTests = sizeof(testSizes) / sizeof(testSizes[0]);
  
      for (int i = 0; i < numTests; i++) {
          mergeSort(testCases[i], 0, testSizes[i] - 1);
          printArray(testCases[i], testSizes[i]);
      }
  
      return 0;
  }`,
      },
    ],
  },
  "Floyd Algorithm (All-Pairs Shortest Paths)": {
    id: "floyd-algorithm",
    title: "Floyd Algorithm",
    description:
      "The problem is to find the shortest distances between every pair of vertices in a given edge-weighted directed graph. The graph is represented as an adjacency matrix of size n*n. Matrix[i][j] denotes the weight of the edge from i to j. If Matrix[i][j]=-1, it means there is no edge from i to j.Do it in-place.",
    difficulty: "medium",
    languages: [
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>
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
    ],
  },
  "Warshall Algorithm (Transitive Closure)": {
    id: "warshall-algorithm",
    title: "warshall Algorithm",
    description:
      "To solve the problem of finding the shortest distances between every pair of vertices in a given edge-weighted directed graph, we can use the Floyd-Warshall algorithm. This algorithm is suitable for this task because it computes the shortest paths between all pairs of vertices in a weighted graph with positive or negative edge weights (but no negative cycles).",
    difficulty: "easy",
    languages: [
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>
#include <stdlib.h>

void warshall(int graph[10][10], int n) {
    int i, j, k;
    
    // Warshall's algorithm for transitive closure
    for (k = 0; k < n; k++) {
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                graph[i][j] = graph[i][j] || (graph[i][k] && graph[k][j]);
            }
        }
    }
}

void printMatrix(int graph[10][10], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            printf("%d", graph[i][j]);
            if (j < n - 1) {
                printf(" ");  // Add space between elements
            }
        }
    }
     printf("\\n");  // Ensure each row prints on a new line
}

int main() {
    // Test Case 1: 3x3 matrix
    int testCase1[10][10] = {
        {0, 1, 0},
        {0, 0, 1},
        {0, 0, 0}
    };
    int size1 = 3;
    
    // Test Case 2: 4x4 matrix
    int testCase2[10][10] = {
        {1, 0, 1, 0},
        {0, 1, 0, 0},
        {0, 0, 1, 0},
        {1, 0, 0, 1}
    };
    int size2 = 4;
    
    // Test Case 3: 2x2 matrix
    int testCase3[10][10] = {
        {0, 1},
        {0, 0}
    };
    int size3 = 2;
    
    // Test Case 4: 4x4 matrix
    int testCase4[10][10] = {
        {1, 1, 0, 0},
        {0, 1, 1, 0},
        {0, 0, 1, 1},
        {0, 0, 0, 1}
    };
    int size4 = 4;
    
    warshall(testCase1, size1);
    printMatrix(testCase1, size1);
    
    warshall(testCase2, size2);
    printMatrix(testCase2, size2);
    
    warshall(testCase3, size3);
    printMatrix(testCase3, size3);
    
    warshall(testCase4, size4);
    printMatrix(testCase4, size4);
    
    return 0;
}`,
        
      },
      
    ],
  },
  "Dijkstra Algorithm (Single-Source Shortest Path)": {
    id: "dijkstra-algorithm",
    title: "dijkstra Algorithm",
    description:
      "Implement Dijkstra's Algorithm to find the shortest path from a given source vertex to all other vertices in a weighted graph represented as an adjacency matrix.",
    difficulty: "medium",
    languages: [
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>
#include <limits.h>

#define INF INT_MAX

void dijkstra(int n, int src, int cost[10][10], int dist[10]) {
    int visited[10] = {0};
    for (int i = 0; i < n; i++) {
        dist[i] = INF;
    }
    dist[src] = 0;

    for (int count = 0; count < n - 1; count++) {
        int u = -1;
        for (int v = 0; v < n; v++) {
            if (!visited[v] && (u == -1 || dist[v] < dist[u])) {
                u = v;
            }
        }
        if (dist[u] == INF) break; // No more reachable vertices
        visited[u] = 1;

        for (int v = 0; v < n; v++) {
            if (!visited[v] && cost[u][v] != INF && dist[u] != INF && dist[u] + cost[u][v] < dist[v]) {
                dist[v] = dist[u] + cost[u][v];
            }
        }
    }
}

void printShortestDistances(int dist[], int n, int src) {
    printf("[");
    for (int i = 0; i < n; i++) {
        if (i == src) {
            printf("0");
        } else if (dist[i] == INF) {
            printf("INF");
        } else {
            printf("%d", dist[i]);
        }
        if (i < n - 1) {
            printf(", ");
        }
    }
    printf("]\\n");
}

int main() {
    int n, src;
    int cost[10][10];
    int dist[10];

    // Predefined test cases
    int testCases[][10][10] = {
        { // Test case 1
            {0, 9, INF, INF},
            {9, 0, INF, INF},
            {INF, INF, 0, INF},
            {INF, INF, INF, 0}
        },
        { // Test case 2
            {0, 1, 6, INF},
            {1, 0, 3, INF},
            {6, 3, 0, INF},
            {INF, INF, INF, 0}
        },
        { // Test case 3 (new test case)
            {0, 4, 8, 7},
            {1, 0, 2, 3},
            {2, 4, 0, 1},
            {1, 2, 3, 0}
        }
    };

    int testSizes[] = {2, 3, 4}; // Number of nodes for each test case
    int testSrcs[] = {0, 2, 1}; // Source vertex for each test case (0-based index)
    int numTests = sizeof(testSizes) / sizeof(testSizes[0]);

    for (int i = 0; i < numTests; i++) {
        n = testSizes[i];
        src = testSrcs[i];

        // Copy the cost matrix from the predefined test case
        for (int j = 0; j < n; j++) {
            for (int k = 0; k < n; k++) {
                cost[j][k] = testCases[i][j][k];
            }
        }

        // Compute shortest paths
        dijkstra(n, src, cost, dist);

        // Print shortest distances
        printf("Test case %d:\\n", i + 1);
        printShortestDistances(dist, n, src);
    }

    return 0;
}`,
        
      },
      
    ],
  },
  "Topological Sorting": {
    id: "dijkstra-algorithm",
    title: "dijkstra Algorithm",
    description:
      "Implement Dijkstra's Algorithm to find the shortest path from a given source vertex to all other vertices in a weighted graph represented as an adjacency matrix.",
    difficulty: "medium",
    languages: [
      {
        language: "c",
        monacoLanguage: "c",
        defaultCode: `#include <stdio.h>
#include <limits.h>

#define INF INT_MAX

void dijkstra(int n, int src, int cost[10][10], int dist[10]) {
    int visited[10] = {0};
    for (int i = 0; i < n; i++) {
        dist[i] = INF;
    }
    dist[src] = 0;

    for (int count = 0; count < n - 1; count++) {
        int u = -1;
        for (int v = 0; v < n; v++) {
            if (!visited[v] && (u == -1 || dist[v] < dist[u])) {
                u = v;
            }
        }
        if (dist[u] == INF) break; // No more reachable vertices
        visited[u] = 1;

        for (int v = 0; v < n; v++) {
            if (!visited[v] && cost[u][v] != INF && dist[u] != INF && dist[u] + cost[u][v] < dist[v]) {
                dist[v] = dist[u] + cost[u][v];
            }
        }
    }
}

void printShortestDistances(int dist[], int n, int src) {
    printf("[");
    for (int i = 0; i < n; i++) {
        if (i == src) {
            printf("0");
        } else if (dist[i] == INF) {
            printf("INF");
        } else {
            printf("%d", dist[i]);
        }
        if (i < n - 1) {
            printf(", ");
        }
    }
    printf("]\\n");
}

int main() {
    int n, src;
    int cost[10][10];
    int dist[10];

    // Predefined test cases
    int testCases[][10][10] = {
        { // Test case 1
            {0, 9, INF, INF},
            {9, 0, INF, INF},
            {INF, INF, 0, INF},
            {INF, INF, INF, 0}
        },
        { // Test case 2
            {0, 1, 6, INF},
            {1, 0, 3, INF},
            {6, 3, 0, INF},
            {INF, INF, INF, 0}
        },
        { // Test case 3 (new test case)
            {0, 4, 8, 7},
            {1, 0, 2, 3},
            {2, 4, 0, 1},
            {1, 2, 3, 0}
        }
    };

    int testSizes[] = {2, 3, 4}; // Number of nodes for each test case
    int testSrcs[] = {0, 2, 1}; // Source vertex for each test case (0-based index)
    int numTests = sizeof(testSizes) / sizeof(testSizes[0]);

    for (int i = 0; i < numTests; i++) {
        n = testSizes[i];
        src = testSrcs[i];

        // Copy the cost matrix from the predefined test case
        for (int j = 0; j < n; j++) {
            for (int k = 0; k < n; k++) {
                cost[j][k] = testCases[i][j][k];
            }
        }

        // Compute shortest paths
        dijkstra(n, src, cost, dist);

        // Print shortest distances
        printf("Test case %d:\\n", i + 1);
        printShortestDistances(dist, n, src);
    }

    return 0;
}`,
      },
    ],
  },
  "Breadth-First Search (BFS)": {
    "id": "bfs-algorithm",
    "title": "Breadth-First Search (BFS)",
    "description": "Implement Breadth-First Search (BFS) to traverse or search a graph represented as an adjacency matrix. BFS explores all the neighbors of a node before moving to the next level of nodes.",
    "difficulty": "easy",
    "languages": [
      {
        "language": "c",
        "monacoLanguage": "c",
        "defaultCode": `
    #include <stdio.h>
#include <stdlib.h>

// BFS function for adjacency list
int bfs(int n, int* adj[], int adjSize[], int startNode, int result[20]) {
    int visited[20] = {0};
    int queue[20];
    int front = 0, rear = -1;
    int resultIndex = 0;

    queue[++rear] = startNode; // No need to adjust for 0-based indexing
    visited[startNode] = 1;

    while (front <= rear) {
        int current = queue[front++];
        result[resultIndex++] = current; // Store result

        // Traverse all neighbors of the current node
        for (int i = 0; i < adjSize[current]; i++) {
            int neighbor = adj[current][i];
            if (!visited[neighbor]) {
                queue[++rear] = neighbor;
                visited[neighbor] = 1;
            }
        }
    }

    return resultIndex;
}

// Function to print the result in a customizable way
void printResult(int result[20], int count, const char* format) {
    printf("[");
    for (int i = 0; i < count; i++) {
        printf(format, result[i]);
        if (i < count - 1) {
            printf(", ");
        }
    }
    printf("]\\n");
}

int main() {
    // Predefined test cases (adjacency lists)
    int* adj1[] = {
        (int[]){2, 3, 1},
        (int[]){0},
        (int[]){0, 4},
        (int[]){0},
        (int[]){2}
    };
    int adjSize1[] = {3, 1, 2, 1, 1}; // Sizes of each adjacency list

    int* adj2[] = {
        (int[]){1},
        (int[]){0, 2, 3},
        (int[]){1},
        (int[]){1, 4},
        (int[]){3}
    };
    int adjSize2[] = {1, 3, 1, 2, 1}; // Sizes of each adjacency list

    // Number of nodes in each test case
    int n1 = 5, n2 = 5;

    // Starting nodes for each test case
    int startNode1 = 0, startNode2 = 0;

    // Results array
    int result[20];

    // Test Case 1
    int count1 = bfs(n1, adj1, adjSize1, startNode1, result);
    printResult(result, count1, "%d");

    // Test Case 2
    int count2 = bfs(n2, adj2, adjSize2, startNode2, result);
    printResult(result, count2, "%d");

    return 0;
}
    `
      }
    ]
  },
  "Depth-First Search (DFS)": {
    "id": "bfs-algorithm",
    "title": "Breadth-First Search (BFS)",
    "description": "Implement Depth-First Search (BFS) to traverse or search a graph represented as an adjacency matrix. DFS explores all the nodes of the graph by traversing the graph/tree in depth going downward untill the leaf node or entire tree/graph is traversed.",
    "difficulty": "easy",
    "languages": [
      {
        "language": "c",
        "monacoLanguage": "c",
        "defaultCode": `#include <stdio.h>
#include <stdlib.h>


int main() {
    printf("Hello world\\n");
    
    return 0;
}
    `
      }
    ]
  },
  "Kruskal Algorithm (Minimum Spanning Tree)": {
    "id": "bfs-algorithm",
    "title": "Breadth-First Search (BFS)",
    "description": "Kruskal Algorithm (Minimum Spanning Tree).",
    "difficulty": "easy",
    "languages": [
      {
        "language": "c",
        "monacoLanguage": "c",
        "defaultCode": `#include <stdio.h>
#include <stdlib.h>


int main() {
    printf("Hello world\\n");
    
    return 0;
}
    `
      }
    ]
  }
};
