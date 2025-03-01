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
          defaultCode: 
`def merge(arr, l, m, r):
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
    // Add more problems here...
  };