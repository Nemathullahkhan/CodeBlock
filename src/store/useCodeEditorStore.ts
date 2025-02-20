

import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/app/types/types";


export const useCodeEditorStore = create<CodeEditorState>((set, get) => ({
  language: "c",
  theme: "github-dark",
  fontSize: 16,
  output: "",
  isRunning: false,
  error: null,
  editor: null,
  executionResult: null,
  userInput: "",  // <-- New state for user input

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

  setUserInput: (input: string) => {  // <-- Function to update user input
    set({ userInput: input });
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
          stdin: userInput, // <-- Pass user input here
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

    } catch (error) {
      set({ error: "Error running code" });
    } finally {
      set({ isRunning: false });
    }
  },
}));

