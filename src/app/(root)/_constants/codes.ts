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
};
