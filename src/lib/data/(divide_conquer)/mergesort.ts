export const mergeSortData = {
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
    title: "Merge Sort",
    description: "Understanding Merge Sort Algorithm",
    brief:
      "Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array. : In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted.",
    photos: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20230706153706/Merge-Sort-Algorithm-(1).png",
    ],
    complexityAnalysis: "O(n log n) in all cases, uses extra space O(n).",
    applications: [
      "External Sorting - Used in sorting large datasets that do not fit in memory, such as database sorting and file systems.",
      "Linked Lists - Preferred for sorting linked lists since it does not require random access and works efficiently with node-based structures.",
      "Stable Sorting - Ensures that the relative order of equal elements remains unchanged, making it ideal for sorting records with multiple keys.",
      "Inversion Count Problems - Used in competitive programming and computer vision to count the number of inversions in an array efficiently.",
      "Multithreading and Parallel Computing - Can be optimized to work efficiently with multithreading by dividing and merging subarrays concurrently.",
    ],
    advantages: [
      "Stable",
      "Efficient for large datasets",
      "Guaranteed O(n log n)",
    ],
    disadvantages: ["Requires extra memory", "Slower for small datasets"],
    videos: [
      "https://www.youtube.com/watch?v=iKGAgWdgoRk&t=2s",
      "https://www.youtube.com/watch?v=iKGAgWdgoRk&t=2s",
    ],
    topicId: "cm7f4otem000abue44msxb0xv",
  },
  faq: [
    {
      question: "What is Merge Sort?",
      answer: "Merge Sort is a divide-and-conquer sorting algorithm.",
      contentId: "cm7j5g8wc0003bugszt63oddx",
    },
  ],
  vivaQuestions: [
    {
      question: "Why is Merge Sort preferred for Linked Lists?",
      answer:
        "Because linked lists do not support random access, Merge Sort is better suited for them than Quick Sort.",
      contentId: "cm7j5g8wc0003bugszt63oddx",
    },
  ],
  questions: {
    question:
      "Given an array arr[], its starting position l and its ending position r. Sort the array using the merge sort algorithm.",
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
      "Merge Sort works by recursively dividing the array into smaller subarrays until they consist of a single element, then merging them in sorted order.",
    contentId: "cm7j5g8wc0003bugszt63oddx",
  },
  implementation: {
    intuition:
      "Merge Sort is a divide-and-conquer algorithm that splits an array into two halves, sorts them recursively, and merges them back.",
    approach:
      "Break the array into halves recursively until each half contains a single element. Then, merge the sorted halves back together.",
    code: [
      {
        language: "C",
        code: `#include <stdio.h>
  
  // Function to merge two subarrays
  void merge(int arr[], int left, int mid, int right) {
      int n1 = mid - left + 1;
      int n2 = right - mid;
      int L[n1], R[n2];
  
      for (int i = 0; i < n1; i++) L[i] = arr[left + i];
      for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
  
      int i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
          arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
      }
  
      while (i < n1) arr[k++] = L[i++];
      while (j < n2) arr[k++] = R[j++];
  }
  
  // Merge Sort function
  void mergeSort(int arr[], int left, int right) {
      if (left < right) {
          int mid = left + (right - left) / 2;
          mergeSort(arr, left, mid);
          mergeSort(arr, mid + 1, right);
          merge(arr, left, mid, right);
      }
  }
  
  // Function to print array
  void printArray(int arr[], int size) {
      for (int i = 0; i < size; i++) printf("%d ", arr[i]);
      printf("\\n");
  }
  
  int main() {
      int arr[] = {12, 11, 13, 5, 6, 7};
      int size = sizeof(arr) / sizeof(arr[0]);
  
      printf("Unsorted array:\\n");
      printArray(arr, size);
  
      mergeSort(arr, 0, size - 1);
  
      printf("Sorted array:\\n");
      printArray(arr, size);
  
      return 0;
  }`,
      },
      {
        language: "JavaScript",
        code: `function merge(left, right) {
      let sortedArray = [];
      while (left.length && right.length) {
          if (left[0] < right[0]) sortedArray.push(left.shift());
          else sortedArray.push(right.shift());
      }
      return [...sortedArray, ...left, ...right];
  }
  
  function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      let mid = Math.floor(arr.length / 2);
      let left = mergeSort(arr.slice(0, mid));
      let right = mergeSort(arr.slice(mid));
      return merge(left, right);
  }
  
  console.log(mergeSort([12, 11, 13, 5, 6, 7]));`,
      },
      {
        language: "Python",
        code: `def merge_sort(arr):
      if len(arr) <= 1:
          return arr
      mid = len(arr) // 2
      left = merge_sort(arr[:mid])
      right = merge_sort(arr[mid:])
  
      result = []
      while left and right:
          result.append(left.pop(0) if left[0] < right[0] else right.pop(0))
      
      return result + left + right
  
  print(merge_sort([12, 11, 13, 5, 6, 7]))`,
      },
    ],
    contentId: "cm7j5g8wc0003bugszt63oddx",
  },
  illustration: {
    summary:
      "Merge Sort works by splitting an array into halves and merging them in sorted order.",
    tips: [
      "Use recursion for efficient implementation.",
      " Avoid Merge Sort when memory constraints exist.",
    ],
    images: [
      "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Merge-Sort-1.webp",
      "https://media.geeksforgeeks.org/wp-content/uploads/20240627163910/Merge-Sort-2.webp",
      "https://media.geeksforgeeks.org/wp-content/uploads/20240627163911/Merge-Sort-3.webp",
      "https://media.geeksforgeeks.org/wp-content/uploads/20240627163912/Merge-Sort-4.webp",
    ],
    explanation: `Let’s look at the working of above example: 
      \n

Divide: 


[38, 27, 43, 10]  is divided into  [38, 27  ] and  [43, 10]  . 
[38, 27]  is divided into  [38]  and  [27]  . 
[43, 10]  is divided into  [43]  and  [10]  . 
Conquer: 


[38]  is already sorted. 
[27]  is already sorted. 
[43]  is already sorted. 
[10]  is already sorted. 
Merge: 


Merge  [38]  and  [27]  to get  [27, 38]  . 
Merge  [43]  and  [10]  to get  [10,43]  . 
Merge  [27, 38]  and  [10,43]  to get the final sorted list  [10, 27, 38, 43] 
Therefore, the sorted list is  [10, 27, 38, 43]  . `,
    contentId: "cm7j5g8wc0003bugszt63oddx",
  },
};
