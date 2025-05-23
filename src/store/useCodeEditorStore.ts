import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/app/types/types";

interface RuntimeConfig {
  language: string;
  version: string;
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => ({
  language: "c",
  theme: "github-dark",
  fontSize: 16,
  output: "",
  isRunning: false,
  error: null,
  editor: null,
  executionResult: null,
  userInput: "",
  verificationResult: null,
  testCases: [],
  testCaseResults: [],
  progress: "",

  getCode: () => get().editor?.getValue() || "",

  setEditor: (editor: Monaco) => {
    const savedCode = localStorage.getItem(`editor-code-${get().language}`);
    if (savedCode) editor.setValue(savedCode);
    set({ editor });
  },

  setLanguage: (language: string) => {
    const currentCode = get().editor?.getValue();
    if (currentCode) {
      localStorage.setItem(`editor-code-${get().language}`, currentCode);
    }
    localStorage.setItem("editor-language", language);
    set({ language, output: "", error: null });
  },

  setTheme: (theme: string) => {
    localStorage.setItem("editor-theme", theme);
    set({ theme });
  },

  setFontSize: (fontSize: number) => {
    localStorage.setItem("editor-font-size", fontSize.toString());
    set({ fontSize });
  },

  setUserInput: (input: string) => {
    set({ userInput: input });
  },

  setTestCases: (testCases: { input: string; expectedOutput: string }[]) => {
    set({ testCases });
  },

  runCode: async () => {
    const { language, getCode, userInput } = get();
    const code = getCode();

    if (!code) {
      set({ error: "Please enter some code" });
      return;
    }

    set({ isRunning: true, error: null, output: "" });

    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: code }],
          stdin: userInput,
        }),
      });

      const data = await response.json();
      console.log("Response from API:", data);

      if (data.message) {
        set({ error: data.message });
        return;
      }

      if (data.compile && data.compile.code !== 0) {
        set({ error: data.compile.stderr || data.compile.output });
        return;
      }

      if (data.run && data.run.code !== 0) {  
        set({ error: data.run.stderr || data.run.output });
        return;
      }

      set({ output: data.run.output.trim(), error: null });

    } catch (err) {
      console.log(err);
      set({ error: "Error running code" });
    } finally {
      set({ isRunning: false });
    }
  },
  executeCode: async (runtime: RuntimeConfig, code: string, userInput: string) => {
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: code }],
          stdin: userInput,
        }),
      });
  
      const data = await response.json();
  
      // Handle compile errors
      if (data.compile && data.compile.code !== 0) {
        return { type: "Compile Error", message: data.compile.stderr || data.compile.output };
      }
  
      // Handle runtime errors
      if (data.run && data.run.code !== 0) {
        return { type: "Runtime Error", message: data.run.stderr || data.run.output };
      }
  
      // Return the output if no errors
      return { type: "Success", output: data.run.output?.trim() };
    } catch (err) {
      console.error("Error executing code:", err);
      return { type: "Error", message: "Unable to execute code. Please try again"};
    }
  },
  

// quicksort,mergeSort,knapsack.

  runAndVerifyCode: async () => {
    const { language, getCode, testCases, executeCode } = get();
    const code = getCode();
  
    if (!code) {
      set({ error: "Please write some code." });
      return;
    }
  
    set({ isRunning: true, error: null, output: "", testCaseResults: [] });
  
    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const results = [];
  
      // Log the combined input for all test cases
      const combinedInput = testCases.map((testCase) => testCase.input).join(" ");
      console.log("Combined Input for Test Cases:", combinedInput);
  
      const executionResult = await executeCode(runtime, code, combinedInput);
  
      // Handle errors
      if (executionResult.type === "Compile Error" || executionResult.type === "Runtime Error") {
        console.error(`Error Type: ${executionResult.type}`, `Message: ${executionResult.message}`);
        set({ error: `${executionResult.type}: ${executionResult.message}` });
        return;
      }
  
      // Log the raw output from the execution
      console.log("Raw Output from Execution:", executionResult.output);
  
      // Split the output by spaces
      const outputSections:string[]  = executionResult.output?.trim().split(/\s+/) || [];
  
      // Compare each section with the corresponding test case
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const actualOutput = outputSections[i] || ""; // Use empty string if no output section exists
  
        // Log the inputs and outputs for each test case
        console.log(`Test Case ${i + 1} Input:`, testCase.input);
        console.log(`Expected Output:`, testCase.expectedOutput);
        console.log(`Actual Output:`, actualOutput);
  
        // Normalize the expected and actual outputs by removing spaces
        const normalizedExpected = testCase.expectedOutput.replace(/\s+/g, "");
        const normalizedActual = actualOutput.replace(/\s+/g, "");
  
        // Log normalized outputs for debugging
        console.log(`Normalized Expected Output: ${normalizedExpected}`);
        console.log(`Normalized Actual Output: ${normalizedActual}`);
  
        // Compare the normalized outputs
        const isCorrect = normalizedActual === normalizedExpected;
  
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: actualOutput,
          passed: isCorrect,
        });
  
        // Log whether the test case passed or failed
        console.log(`Test Case ${i + 1} ${isCorrect ? "Passed" : "Failed"}`);
      }
  
      set({ testCaseResults: results });
    } catch (err) {
      console.error("Error running code:", err);
      set({ error: "Error running code" });
    } finally {
      set({ isRunning: false });
    }
  },


  runfloydAndVerifyCode: async () => {
    const { language, getCode, testCases, executeCode } = get();
    const code = getCode();

    if (!code) {
        set({ error: "Please write some code." });
        return;
    }

    set({ isRunning: true, error: null, output: "", testCaseResults: [] });

    try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const results = [];

        // Log the combined input for all test cases
        const combinedInput = testCases.map((testCase) => testCase.input).join(" ");
        console.log("Combined Input for Test Cases:", combinedInput);

        const executionResult = await executeCode(runtime, code, combinedInput);

        // Handle errors
        if (executionResult.type === "Compile Error" || executionResult.type === "Runtime Error") {
            console.error(`Error Type: ${executionResult.type}`, `Message: ${executionResult.message}`);
            set({ error: `${executionResult.type}: ${executionResult.message}` });
            return;
        }

        // Log the raw output from the execution
        console.log("Raw Output from Execution:", executionResult.output);

        // Normalize the output by trimming and replacing multiple spaces with single spaces
        const normalizedOutput = executionResult.output?.trim().replace(/\s+/g, " ") ?? "";

        // Compare the normalized output with the expected output for each test case
        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const normalizedExpected = testCase.expectedOutput?.replace(/\s+/g, " ").trim();

            // Log the inputs and outputs for each test case
            console.log(`Test Case ${i + 1} Input:`, testCase.input);
            console.log(`Expected Output:`, normalizedExpected);
            console.log(`Actual Output:`, normalizedOutput);

            // Compare the normalized outputs
            const isCorrect = normalizedOutput === normalizedExpected;

            results.push({
                input: testCase.input,
                expected: normalizedExpected,
                actual: normalizedOutput,
                passed: isCorrect,
            });

            // Log whether the test case passed or failed
            console.log(`Test Case ${i + 1} ${isCorrect ? "Passed" : "Failed"}`);
        }

        set({ testCaseResults: results });
    } catch (err) {
        console.error("Error running code:", err);
        set({ error: "Error running code" });
    } finally {
        set({ isRunning: false });
    }
},
runWarshallAndVerifyCode: async () => {
  const { language, getCode, testCases, executeCode } = get();
  const code = getCode();

  if (!code) {
    set({ error: "Please write some code." });
    return;
  }

  set({ isRunning: true, error: null, output: "", testCaseResults: [] });

  try {
    const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
    const results = [];

    // Log the combined input for all test cases
    const combinedInput = testCases.map((testCase) => testCase.input).join("\n");
    console.log("Combined Input for Test Cases:", combinedInput);

    const executionResult = await executeCode(runtime, code, combinedInput);

    // Handle errors
    if (executionResult.type === "Compile Error" || executionResult.type === "Runtime Error") {
      console.error(`Error Type: ${executionResult.type}`, `Message: ${executionResult.message}`);
      set({ error: `${executionResult.type}: ${executionResult.message}` });
      return;
    }

    // Log the raw output from the execution
    console.log("Raw Output from Execution:", executionResult.output);

    // Split the output by lines
    const outputLines:string[] = executionResult.output?.trim().split("\n") || [];

    // Compare each line with the corresponding test case
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const actualOutput = outputLines[i] || ""; // Use empty string if no output line exists

      // Log the inputs and outputs for each test case
      console.log(`Test Case ${i + 1} Input:`, testCase.input);
      console.log(`Expected Output:`, testCase.expectedOutput);
      console.log(`Actual Output:`, actualOutput);

      // Normalize the expected and actual outputs by removing spaces
      const normalizedExpected = testCase.expectedOutput.replace(/\s+/g, "");
      const normalizedActual = actualOutput.replace(/\s+/g, "");

      // Log normalized outputs for debugging
      console.log(`Normalized Expected Output: ${normalizedExpected}`);
      console.log(`Normalized Actual Output: ${normalizedActual}`);

      // Compare the normalized outputs
      const isCorrect = normalizedActual === normalizedExpected;

      results.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: actualOutput,
        passed: isCorrect,
      });

      // Log whether the test case passed or failed
      console.log(`Test Case ${i + 1} ${isCorrect ? "Passed" : "Failed"}`);
    }

    set({ testCaseResults: results });
  } catch (err) {
    console.error("Error running code:", err);
    set({ error: "Error running code" });
  } finally {
    set({ isRunning: false });
  }
},

runTopologicalSortAndVerifyCode: async () => {
  const { language, getCode, testCases, executeCode } = get();
  const code = getCode();

  if (!code) {
    set({ error: "Please write some code." });
    return;
  }

  set({ isRunning: true, error: null, output: "", testCaseResults: [] });

  try {
    const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
    const results = [];

    // Combine all test case inputs into a single input string
    const combinedInput = testCases.map((testCase) => testCase.input).join("\n");

    // Execute the code with the combined input
    const executionResult = await executeCode(runtime, code, combinedInput);

    // Handle errors
    if (executionResult.type === "Compile Error" || executionResult.type === "Runtime Error") {
      console.error(`Error Type: ${executionResult.type}`, `Message: ${executionResult.message}`);
      set({ error: `${executionResult.type}: ${executionResult.message}` });
      return;
    }

    // Log the raw output from the execution
    console.log("Raw Output from Execution:", executionResult.output);

    // Split the output into individual lines
    const outputLines:string[] = executionResult.output?.trim().split("\n") || [];

    // Compare each line with the corresponding test case's expected output
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const expectedOutput = testCase.expectedOutput.trim();
      const actualOutput = outputLines[i] || ""; // Use empty string if no output line exists

      // Log the inputs and outputs for each test case
      console.log(`Test Case ${i + 1} Input:`, testCase.input);
      console.log(`Expected Output:`, expectedOutput);
      console.log(`Actual Output:`, actualOutput);

      // Compare the actual output with the expected output
      const isCorrect = actualOutput === expectedOutput;

      results.push({
        input: testCase.input,
        expected: expectedOutput,
        actual: actualOutput,
        passed: isCorrect,
      });

      // Log whether the test case passed or failed
      console.log(`Test Case ${i + 1} ${isCorrect ? "Passed" : "Failed"}`);
    }

    set({ testCaseResults: results });
  } catch (err) {
    console.error("Error running code:", err);
    set({ error: "Error running code" });
  } finally {
    set({ isRunning: false });
  }
},
}));


