
"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Code2 } from "lucide-react";

export default function InputPanel() {
  const { userInput, setUserInput } = useCodeEditorStore();

  return (
    <div className="h-full flex flex-col bg-black rounded-xl p-4 ring-2 ring-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">User Input</span>
        </div>
      </div>

      {/* User Input Textarea */}
      <div className="relative flex-grow">
        <textarea
          className="w-full h-full p-3 text-white bg-black border border-zinc-800 rounded-xl resize-none overflow-auto 
               focus-visible:outline-none focus:border-zinc-600 scrollbar-thin scrollbar-thumb-zinc-600 
               scrollbar-track-black hover:scrollbar-thumb-zinc-500 transition-all monaco-cursor tracking-tight text-sm p-4"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter input for the program..."
         
        />
      </div>
    </div>
  );
}