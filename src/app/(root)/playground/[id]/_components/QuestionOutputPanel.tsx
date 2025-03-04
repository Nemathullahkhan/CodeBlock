"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Terminal,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import SubmitButton from "./SubmitButton";

export default function QuestionOutputPanel({ questionId }:{questionId:string}) {
  const { output, error, isRunning, testCaseResults } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedTestCases, setExpandedTestCases] = useState<number[]>([]);

  const hasContent = error || output || testCaseResults.length > 0;

  const allTestCasesPassed =
    testCaseResults.length > 0 &&
    testCaseResults.every((result) => result.passed);

  const passedCount = testCaseResults.filter((result) => result.passed).length;

  // Showing confetti
  useEffect(() => {
    if (allTestCasesPassed && testCaseResults.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [allTestCasesPassed, testCaseResults.length]);

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Toggle a specific test case's expanded state
  const toggleTestCase = (index: number) => {
    setExpandedTestCases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Toggle all test cases' expanded state
  const toggleAllTestCases = () => {
    if (expandedTestCases.length === testCaseResults.length) {
      setExpandedTestCases([]);
    } else {
      setExpandedTestCases(testCaseResults.map((_, index) => index));
    }
  };

  return (
    <div className="h-full flex flex-col bg-black rounded-xl p-4 ring-2 ring-zinc-900">
      {/* Confetti Animation */}
      {showConfetti && (
        <>
          <Confetti
            className="flex justify-center"
            width={2000}
            height={200}
            recycle={false}
          />
          <div className="bg-green-800/20 text-green-400 p-3 rounded-md mb-4 text-center">
            <h3 className="font-bold text-lg">All Test Cases Passed! 🎉</h3>
            <p>You can now submit your solution</p>
          </div>
        </>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">Output</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Submit button - only enabled when all test cases pass */}
          {questionId && (
            <SubmitButton
              id={questionId}
              disabled={!allTestCasesPassed} // Disable button if not all test cases are passed
            />
          )}

          {/* Copy button */}
          {hasContent && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Output area */}
      <div className="relative flex-grow">
        <div
          className="h-full relative bg-black rounded-xl p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black text-sm"
          style={{
            fontFamily: '"Fira Code","Cascadia Code",Consolas, monospace',
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {isRunning ? (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              <span>Running...</span>
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">
                  {error.startsWith("Compile Error") || error.startsWith("Runtime Error")
                    ? error.split(":")[0]
                    : "Error"}
                </div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error.split(":")[1]?.trim() || error}
                </pre>
              </div>
            </div>
          ) : testCaseResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black p-3 rounded-md">
                <div className="flex items-center gap-2">
                  {allTestCasesPassed ? (
                    <CheckCircle className="w-5 h-5 text-[#3fb950]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium text-gray-300">
                    {passedCount}/{testCaseResults.length} TestCases
                  </span>
                </div>
                <button
                  onClick={toggleAllTestCases}
                  className="text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] px-2 py-1 rounded flex items-center gap-1"
                >
                  {expandedTestCases.length === testCaseResults.length ? (
                    <>Collapse All <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Expand All <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              </div>
              <div className="space-y-2">
                {testCaseResults.map((result, index) => (
                  <div
                    key={index}
                    className="border border-[#30363d] rounded-md overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-3 bg-[#161b22] cursor-pointer"
                      onClick={() => toggleTestCase(index)}
                    >
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-[#3fb950]" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#f85149]" />
                        )}
                        <span className="text-sm font-medium text-[#c9d1d9]">
                          Test Case {index + 1}
                        </span>
                      </div>
                      {expandedTestCases.includes(index) ? (
                        <ChevronUp className="w-4 h-4 text-[#8b949e]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8b949e]" />
                      )}
                    </div>

                    {expandedTestCases.includes(index) && (
                      <div className="p-3 bg-[#0d1117] space-y-3 border-t border-[#30363d]">
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-[#8b949e]">
                            Input:
                          </div>
                          <div className="p-2 bg-[#161b22] rounded-md text-[#c9d1d9] text-xs">
                            {result.input || "<empty>"}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-medium text-[#8b949e]">
                            Expected Output:
                          </div>
                          <div className="p-2 bg-[#161b22] rounded-md text-[#d2a8ff] text-xs">
                            {result.expected || "<empty>"}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-medium text-[#8b949e]">
                            Your Output:
                          </div>
                          <div
                            className={`p-2 bg-[#161b22] rounded-md text-sm tracking-widest ${
                              result.passed
                                ? "text-[#7ee787]"
                                : "text-[#f85149]"
                            }`}
                          >
                            {result.actual || "<empty>"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">
                {output}
              </pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl ring-1 ring-gray-700/50 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center text-xs tracking-tight">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}