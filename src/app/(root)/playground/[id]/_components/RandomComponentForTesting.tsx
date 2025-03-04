"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";

// Define TypeScript interfaces for test cases and results
export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface TestCaseResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

const TestCaseComponent = ({ id }: { id: string }) => {
  // Zustand store
  const { setTestCases } = useCodeEditorStore();

  // Local state to store test cases and their results
  const [testCases, setLocalTestCases] = useState<TestCase[]>([]);
  const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await fetch(`/api/testcases/${id}`);
        const fetchedTestCases = await response.json();

        // Ensure the fetched data is an array, or fallback to an empty array
        if (Array.isArray(fetchedTestCases)) {
          setTestCases(fetchedTestCases);
          setLocalTestCases(fetchedTestCases);
        } else {
          console.error("Invalid data format received for test cases:", fetchedTestCases);
          setLocalTestCases([]); // Reset to empty array in case of invalid data
        }
      } catch (error) {
        console.error("Error fetching test cases:", error);
        setLocalTestCases([]); // Reset in case of an error
      }
    };

    fetchTestCases();
  }, [id, setTestCases]);

  return (
    <div>
      <h2 className="text-lg font-bold">Test Cases</h2>
      {testCases.length === 0 ? (
        <p>Loading test cases...</p>
      ) : (
        <ul className="list-disc ml-5">
          {testCases.map((testCase, index) => (
            <li key={index}>
              <strong>Input:</strong> {testCase.input} | <strong>Expected:</strong>{" "}
              {testCase.expectedOutput}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestCaseComponent;
