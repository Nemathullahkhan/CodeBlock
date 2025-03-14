"use client";

import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect } from "react";
import { RotateCcwIcon, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes } from "@/app/(root)/_constants";
import LanguageSelector from "@/app/(root)/_components/LanguageSelector";
import FontSizeSelector from "@/app/(root)/_components/fontSize";
import ThemeSelector from "@/app/(root)/_components/ThemeSelector";
import { CODE_CONFIG } from "@/app/(root)/_constants/codes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface QuestionEditorPanelProps {
  id: string; // Problem ID
  programName: string | null; // Program name (e.g., "Merge Sort")
}

export default function QuestionEditorPanel({
  id,
  programName,
}: QuestionEditorPanelProps) {
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();

  const mounted = useMounted(); // to render the component

  // Get the problem from CODE_CONFIG using the programName
  const problem = programName ? CODE_CONFIG[programName] : null;
  const languageCode = problem?.languages.find(
    (lang) => lang.language === language
  );

  useEffect(() => {
    // Load the default code for the selected problem and language
    const savedCode = localStorage.getItem(`editor-code-${language}-${id}`);
    const newCode = savedCode || languageCode?.defaultCode || "";

    if (editor) editor.setValue(newCode);
  }, [editor, language, id, languageCode]);

  useEffect(() => {
    // Adjust the font size
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    // Reset to the default code for the selected problem and language
    const defaultCode = languageCode?.defaultCode || "";
    if (editor) editor.setValue(defaultCode);

    localStorage.removeItem(`editor-code-${language}-${id}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      localStorage.setItem(`editor-code-${language}-${id}`, value);
    }
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="-mt-1">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 rounded-md">
        {/* Left Section - Language Selector */}
        <LanguageSelector />

        {/* Right Section - Settings & Actions */}
        <div className="flex items-center gap-1">
          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:bg-zinc-800 transition">
                <Settings className="w-5 h-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg"
            >
              {/* Font-Size Selector */}
              <FontSizeSelector
                fontSize={fontSize}
                handleFontSizeChange={handleFontSizeChange}
              />
              {/* Theme Selector */}
              <ThemeSelector />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset Button with Animation */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 bg-zinc-900/30 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all"
            aria-label="Reset Code"
          >
            <RotateCcwIcon className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </div>
      {/* Editor */}
      <div className="w-full mx-auto ">
        <div className="overflow-hidden ring-2 ring-white/[0.05] rounded-lg p-1  bg-black ">
          <Editor
            height="460px"
            language={languageCode?.monacoLanguage || "plaintext"}
            onChange={handleEditorChange}
            theme={theme}
            beforeMount={defineMonacoThemes}
            onMount={(editor) => setEditor(editor)}
            options={{
              minimap: { enabled: false },
              fontSize,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderWhitespace: "selection",
              fontFamily: '"Fira Code","Cascadia Code",Consolas, monospace',
              fontLigatures: true,
              cursorBlinking: "smooth",
              smoothScrolling: true,
              contextmenu: true,
              renderLineHighlight: "all",
              lineHeight: 1.6,
              letterSpacing: 0.5,
              roundedSelection: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
