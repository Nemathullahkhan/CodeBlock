"use client"
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

export default function RandomComponentForTesting() {
  const { testCaseResults } = useCodeEditorStore();
  return (
    <>
      {testCaseResults?.map((result, idx) => (
        <div key={idx}>
          <p>{result.input}</p>
          {result.passed ? (
            <p>pass {idx+1}</p>
          ):(
            <p>failed</p>
          )}
        </div>
      ))}
    </>
  );
}
