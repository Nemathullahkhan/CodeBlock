export const quickSortData = {
    module: {
      name: "Design And Analysis of Algorithms",
      description:
        "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
    },
    topics: [
      {
        name: "Divide and Conquer",
        description:
          "Algorithms that recursively divide problems into subproblems",
        moduleId: "cm7f4ndrz0008bue4mhqje0qh",
      },
    ],
    content: {
      title: "Quick Sort",
      description: "Understanding Quick Sort Algorithm",
      brief:
        "Quick Sort is a highly efficient sorting algorithm that uses the divide-and-conquer approach. It works by selecting a 'pivot' element from the array and partitioning the other elements into two subarrays: those less than the pivot and those greater than the pivot. The subarrays are then recursively sorted. This process continues until the entire array is sorted.",
      photos: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20230706153706/Quick-Sort-Algorithm.png",
      ],
      complexityAnalysis: "O(n log n) on average, O(n²) in the worst case (rare). Uses O(log n) extra space due to recursion.",
      applications: [
        "In-Memory Sorting - Efficient for sorting data that fits in memory, such as arrays and lists.",
        "Real-Time Systems - Used in systems where low latency is critical due to its average-case efficiency.",
        "Programming Libraries - Commonly implemented in standard libraries (e.g., C++ STL, Java Collections).",
        "Competitive Programming - Preferred for its speed and in-place sorting capability.",
        "Database Indexing - Used in database systems for sorting and partitioning data.",
      ],
      advantages: [
        "Efficient for large datasets",
        "In-place sorting (requires minimal extra memory)",
        "Average-case time complexity of O(n log n)",
      ],
      disadvantages: [
        "Worst-case time complexity of O(n²) (can be mitigated with randomized pivot selection)",
        "Not a stable sort (relative order of equal elements may change)",
      ],
      videos: [
        "https://www.youtube.com/watch?v=PgBzjlCcFvc",
        "https://www.youtube.com/watch?v=7h1s2SojIRw",
      ],
      topicId: "cm7f4otem000abue44msxb0xv",
    },
    faq: [
      {
        question: "What is Quick Sort?",
        answer: "Quick Sort is a divide-and-conquer sorting algorithm that selects a pivot element and partitions the array into two subarrays: elements less than the pivot and elements greater than the pivot. It then recursively sorts the subarrays.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "Why is Quick Sort called 'Quick'?",
        answer: "Quick Sort is named for its average-case efficiency, with a time complexity of O(n log n), making it one of the fastest sorting algorithms for large datasets.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    vivaQuestions: [
      {
        question: "What is the worst-case time complexity of Quick Sort?",
        answer: "The worst-case time complexity of Quick Sort is O(n²), which occurs when the pivot is consistently the smallest or largest element in the array.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
      {
        question: "How can the worst-case scenario of Quick Sort be avoided?",
        answer: "The worst-case scenario can be avoided by using techniques like randomized pivot selection or choosing the median of three elements as the pivot.",
        contentId: "cm7ja3jju000hbugs0bx8uvid",
      },
    ],
    questions: {
      question:
        `Implement Quick Sort, a Divide and Conquer algorithm, to sort an array, arr[] in ascending order. Given an array, arr[], with starting index low and ending index high, complete the functions partition() and quickSort(). Use the last element as the pivot so that all elements less than or equal to the pivot come before it, and elements greater than the pivot follow it.
        \n
        Note: The low and high are inclusive.
        `,
      examples: [
        { input: "[4, 1, 3, 9, 7]", output: "[1, 3, 4, 7, 9]" },
        {
          input: "[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]",
          output: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        },
        { input: "[1, 3, 2]", output: "[1, 2, 3]" },
      ],
      constraints: ["1 <= arr.size() <= 10^5", "1 <= arr[i] <= 10^5"],
      difficulty: "Medium",
      averageTime: "15m",
      testcases: [
        { input: "[4, 1, 3, 9, 7]", output: "[1, 3, 4, 7, 9]" },
        {
          input: "[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]",
          output: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        },
        { input: "[1, 3, 2]", output: "[1, 2, 3]" },
      ],
    },  
    working: {
      explanation:
        "Quick Sort works by selecting a pivot element and partitioning the array into two subarrays: one with elements less than the pivot and one with elements greater than the pivot. The algorithm then recursively sorts the subarrays. This process continues until the entire array is sorted.",
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    implementation: {
      intuition:
        "Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array into two subarrays. It then recursively sorts the subarrays.",
      approach:
        `1. Choose a pivot element (e.g., the last element in the array).\n2. Partition the array into two subarrays: elements less than the pivot and elements greater than the pivot.\n3. Recursively apply Quick Sort to the subarrays.\n4. Combine the sorted subarrays.`,
      code: [
        {
          language: "C",
          code: `#include <stdio.h>
  
  // Function to swap two elements
  void swap(int* a, int* b) {
      int temp = *a;
      *a = *b;
      *b = temp;
  }
  
  // Partition function
  int partition(int arr[], int low, int high) {
      int pivot = arr[high]; // Pivot element
      int i = (low - 1); // Index of smaller element
  
      for (int j = low; j <= high - 1; j++) {
          if (arr[j] < pivot) {
              i++; // Increment index of smaller element
              swap(&arr[i], &arr[j]);
          }
      }
      swap(&arr[i + 1], &arr[high]);
      return (i + 1);
  }
  
  // Quick Sort function
  void quickSort(int arr[], int low, int high) {
      if (low < high) {
          int pi = partition(arr, low, high); // Partitioning index
          quickSort(arr, low, pi - 1); // Sort left subarray
          quickSort(arr, pi + 1, high); // Sort right subarray
      }
  }
  
  // Function to print array
  void printArray(int arr[], int size) {
      for (int i = 0; i < size; i++) printf("%d ", arr[i]);
      printf("\\n");
  }
  
  int main() {
      int arr[] = {10, 7, 8, 9, 1, 5};
      int n = sizeof(arr) / sizeof(arr[0]);
  
      printf("Unsorted array:\\n");
      printArray(arr, n);
  
      quickSort(arr, 0, n - 1);
  
      printf("Sorted array:\\n");
      printArray(arr, n);
  
      return 0;
  }`,
        },
        {
          language: "JavaScript",
          code: `function quickSort(arr) {
      if (arr.length <= 1) return arr;
  
      const pivot = arr[arr.length - 1]; // Choose the last element as the pivot
      const left = [];
      const right = [];
  
      for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] < pivot) left.push(arr[i]);
          else right.push(arr[i]);
      }
  
      return [...quickSort(left), pivot, ...quickSort(right)];
  }
  
  console.log(quickSort([10, 7, 8, 9, 1, 5]));`,
        },
        {
          language: "Python",
          code: `def quickSort(arr):
      if len(arr) <= 1:
          return arr
  
      pivot = arr[-1]  # Choose the last element as the pivot
      left = [x for x in arr[:-1] if x < pivot]
      right = [x for x in arr[:-1] if x >= pivot]
  
      return quickSort(left) + [pivot] + quickSort(right)
  
  print(quickSort([10, 7, 8, 9, 1, 5]))`,
        },
      ],
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
    illustration: {
      summary:
        "Quick Sort works by selecting a pivot element and partitioning the array into two subarrays: elements less than the pivot and elements greater than the pivot. It then recursively sorts the subarrays.",
      tips: ["Use randomized pivot selection to avoid worst-case scenarios."," Quick Sort is efficient for large datasets but may not be suitable for small datasets due to overhead."],
      images: [
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Quick-Sort-1.webp",
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Quick-Sort-2.webp",
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163911/Quick-Sort-3.webp",
        "https://media.geeksforgeeks.org/wp-content/uploads/20240627163912/Quick-Sort-4.webp",
      ],
      explanation: `Let’s look at the working of Quick Sort with an example:
  
  1. **Initial Array**: [10, 7, 8, 9, 1, 5]
  2. **Choose Pivot**: Select the last element (5) as the pivot.
  3. **Partition**: Rearrange the array so that elements less than 5 are on the left, and elements greater than 5 are on the right.
     - Partitioned Array: [1, 7, 8, 9, 10, 5]
  4. **Recursively Sort Subarrays**:
     - Left Subarray: [1]
     - Right Subarray: [7, 8, 9, 10]
  5. **Combine**: Merge the sorted subarrays with the pivot to get the final sorted array: [1, 5, 7, 8, 9, 10].`,
      contentId: "cm7ja3jju000hbugs0bx8uvid",
    },
  };