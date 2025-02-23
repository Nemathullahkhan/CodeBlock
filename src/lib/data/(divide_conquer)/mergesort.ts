export const mergeSortData = {
    module: {
      name: "Design And Analysis of Algorithms",
      description:
        "Practical course on Design & Analysis of Algorithms based on the syllabus followed at Engineering colleges in India.",
    },
    topics: [
      {
        name: "Divide and Conquer",
        description: "Algorithms that recursively divide problems into subproblems",
        moduleId: "cm7f4ndrz0008bue4mhqje0qh",
      },
    ],
    content: {
      title: "Merge Sort",
      description: "Understanding Merge Sort Algorithm",
      photos: ["https://example.com/merge-sort.png"],
      complexityAnalysis: "O(n log n) in all cases, uses extra space O(n).",
      applications: "Used in external sorting, linked lists, and stable sorting scenarios.",
      advantages: ["Stable", "Efficient for large datasets", "Guaranteed O(n log n)"],
      disadvantages: ["Requires extra memory", "Slower for small datasets"],
      topicId: "cm7f4otem000abue44msxb0xv",
    },
    faq: [
      {
        question: "What is Merge Sort?",
        answer: "Merge Sort is a divide-and-conquer sorting algorithm.",
        contentId: "cm7g2rs5j0003buf8uumw3bgr",
      },
    ],
    vivaQuestions: [
      {
        question: "Why is Merge Sort preferred for Linked Lists?",
        answer: "Because linked lists do not support random access, Merge Sort is better suited for them than Quick Sort.",
        contentId: "cm7g2rs5j0003buf8uumw3bgr",
      },
    ],
    working: {
      explanation:
        "Merge Sort works by recursively dividing the array into smaller subarrays until they consist of a single element, then merging them in sorted order.",
      contentId: "cm7g2rs5j0003buf8uumw3bgr",
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
      contentId: "cm7g2rs5j0003buf8uumw3bgr",
    },
    illustration: {
      summary:
        "Merge Sort works by splitting an array into halves and merging them in sorted order.",
      tips: "Use recursion for efficient implementation. Avoid Merge Sort when memory constraints exist.",
      images: ["https://example.com/merge-sort-illustration.png"],
      contentId: "cm7g2rs5j0003buf8uumw3bgr",
    },
  };
  