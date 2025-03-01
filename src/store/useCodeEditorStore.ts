// import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
// import { create } from "zustand";
// import { Monaco } from "@monaco-editor/react";
// import { CodeEditorState } from "@/app/types/types";


// export const useCodeEditorStore = create<CodeEditorState>((set, get) => ({
//   language: "c",
//   theme: "github-dark",
//   fontSize: 16,
//   output: "",
//   isRunning: false,
//   error: null,
//   editor: null,
//   executionResult: null,
//   userInput: "",  // <-- New state for user input
//   verificationResult: null,
//   testCases: [],
//   testCaseResults:[],
  

//   getCode: () => get().editor?.getValue() || "",

//   setEditor: (editor: Monaco) => {
//     const savedCode = localStorage.getItem(`editor-code-${get().language}`);
//     if (savedCode) editor.setValue(savedCode);
//     set({ editor });
//   },

//   setLanguage: (language: string) => {
//     const currentCode = get().editor?.getValue();
//     if (currentCode) {
//       localStorage.setItem(`editor-code-${get().language}`, currentCode);
//     }
//     localStorage.setItem("editor-language", language);
//     set({ language, output: "", error: null });
//   },

//   setTheme: (theme: string) => {
//     localStorage.setItem("editor-theme", theme);
//     set({ theme });
//   },

//   setFontSize: (fontSize: number) => {
//     localStorage.setItem("editor-font-size", fontSize.toString());
//     set({ fontSize });
//   },

//   setUserInput: (input: string) => {  // <-- Function to update user input
//     set({ userInput: input });
//   },

  
//   setTestCases: (testCases:string[])=> {
//     set({testCases});
//   },

  
//   runCode: async () => {
//     const { language, getCode, userInput } = get();
//     const code = getCode();

//     if (!code) {
//       set({ error: "Please enter some code" });
//       return;
//     }

//     set({ isRunning: true, error: null, output: "" });

//     try {
//       const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           language: runtime.language,
//           version: runtime.version,
//           files: [{ content: code }],
//           stdin: userInput, // <-- Pass user input here
//         }),
//       });

//       const data = await response.json();
//       console.log("Response from API:", data);

//       if (data.message) {
//         set({ error: data.message });
//         return;
//       }

//       if (data.compile && data.compile.code !== 0) {
//         set({ error: data.compile.stderr || data.compile.output });
//         return;
//       }

//       if (data.run && data.run.code !== 0) {
//         set({ error: data.run.stderr || data.run.output });
//         return;
//       }

//       set({ output: data.run.output.trim(), error: null });

//     } catch (err) {
//       console.log(err);
//       set({ error: "Error running code", });
//     } finally {
//       set({ isRunning: false });
//     }
//   },


// }));



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

      if (data.message) {
        return data.message;
      }

      if (data.compile && data.compile.code !== 0) {
        return data.compile.stderr || data.compile.output;
      }

      if (data.run && data.run.code !== 0) {
        return data.run.stderr || data.run.output;
      }

      return data.run.output.trim();
    } catch (err) {
      console.error("Error executing code:", err);
      return "Error running code";
    }
  },
  runAndVerifyCode: async () => {
    const { language, getCode, testCases, executeCode } = get();
    const code = getCode();
  
    if (!code) {
      set({ error: "Please enter some code" });
      return;
    }
  
    set({ isRunning: true, error: null, output: "", testCaseResults: [] });
  
    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const results = [];
  
      // Execute the code once with all test case inputs combined
      const combinedInput = testCases.map((testCase) => testCase.input).join(" ");
      const executionResult = await executeCode(runtime, code, combinedInput);
  
      // Split the output by spaces
      const outputSections = executionResult.trim().split(/\s+/);
  
      // Compare each section with the corresponding test case
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const actualOutput = outputSections[i] || ""; // Use empty string if no output section exists
  
        // Normalize the expected and actual outputs by removing spaces
        const normalizedExpected = testCase.expectedOutput.replace(/\s+/g, "");
        const normalizedActual = actualOutput.replace(/\s+/g, "");
  
        // Compare the normalized outputs
        const isCorrect = normalizedActual === normalizedExpected;
  
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: actualOutput,
          passed: isCorrect,
        });
      }
  
      set({ testCaseResults: results });
    } catch (err) {
      console.log(err);
      set({ error: "Error running code" });
    } finally {
      set({ isRunning: false });
    }
  },
}));


