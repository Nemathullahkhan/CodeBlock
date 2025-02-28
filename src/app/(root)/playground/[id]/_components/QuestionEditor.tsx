"use client";

import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect } from "react";
import { RotateCcwIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import LanguageSelector from "@/app/(root)/_components/LanguageSelector";
import FontSizeSelector from "@/app/(root)/_components/fontSize";
import ThemeSelector from "@/app/(root)/_components/ThemeSelector";
import RunButton from "@/app/(root)/_components/RunButton";

export default function QuestionEditorPanel() {
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();

  const mounted = useMounted(); // to render the component

  useEffect(() => {
    // saving the code
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;

    if (editor) editor.setValue(newCode);
  }, [LANGUAGE_CONFIG, editor, language]);

  useEffect(() => {
    //adjusting the font-size
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode; // add the main function of the editor
    if (editor) editor.setValue(defaultCode);

    localStorage.removeItme(`editor-code=${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      localStorage.setItem(`editor-code-${language}`, value);
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
      {/* Header */}
      <div className="flex items-center justify-around mb-4">
        <div className="flex items-center gap-3 ">
          {/* Language selector */}

          <LanguageSelector />

          {/* Font-Size*/}

          <FontSizeSelector
            fontSize={fontSize}
            handleFontSizeChange={handleFontSizeChange}
          />

          <div className="">
            <ThemeSelector />
          </div>

          {/*Run Button */}
          <RunButton />

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 bg-black border border-zinc-800 bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800/50 rounded-lg ring-1 ring-white/5 transition-colors"
            aria-label="Reset to default code"
          >
            <RotateCcwIcon className="size-4 text-gray-400" />
          </motion.button>
        </div>
      </div>
      {/* Editor */}
      <div className="w-full mx-auto ">
        <div className="overflow-hidden ring-2 ring-white/[0.05] rounded-lg p-1  bg-black ">
          <Editor
            height="460px"
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            onChange={handleEditorChange}
            theme={theme}
            beforeMount={defineMonacoThemes}
            // onMount={(editor) => setEditor(editor)}
            onMount={(editor, monaco) => {
              setEditor(editor);

              // Dynamic error diagnostics based on selected language
              switch (LANGUAGE_CONFIG[language].monacoLanguage) {
                case "javascript":
                case "typescript":
                  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                    {
                      noSemanticValidation: false,
                      noSyntaxValidation: false,
                    }
                  );

                  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                    {
                      noSemanticValidation: false,
                      noSyntaxValidation: false,
                    }
                  );

                  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
                    {
                      target: monaco.languages.typescript.ScriptTarget.ESNext,
                      allowNonTsExtensions: true,
                      strict: true,
                    }
                  );

                  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                    {
                      target: monaco.languages.typescript.ScriptTarget.ESNext,
                      strict: true,
                      moduleResolution:
                        monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                    }
                  );
                  break;

                case "python":
                  monaco.languages.register({ id: "python" });

                  monaco.languages.onLanguage("python", () => {
                    monaco.editor.setModelLanguage(editor.getModel(), "python");
                  });

                  monaco.languages.python = monaco.languages.python || {};
                  monaco.languages.python.diagnostics =
                    monaco.languages.python.diagnostics || {};
                  monaco.languages.python.diagnostics.options = {
                    validate: true,
                    lint: true,
                  };
                  break;

                case "cpp":
                  monaco.languages.register({ id: "cpp" });

                  monaco.languages.onLanguage("cpp", () => {
                    monaco.editor.setModelLanguage(editor.getModel(), "cpp");
                  });

                  monaco.languages.cpp = monaco.languages.cpp || {};
                  monaco.languages.cpp.diagnostics =
                    monaco.languages.cpp.diagnostics || {};
                  monaco.languages.cpp.diagnostics.options = {
                    validate: true,
                    lint: true,
                  };
                  break;

                case "java":
                  monaco.languages.register({ id: "java" });

                  monaco.languages.onLanguage("java", () => {
                    monaco.editor.setModelLanguage(editor.getModel(), "java");
                  });

                  monaco.languages.java = monaco.languages.java || {};
                  monaco.languages.java.diagnostics =
                    monaco.languages.java.diagnostics || {};
                  monaco.languages.java.diagnostics.options = {
                    validate: true,
                    lint: true,
                  };
                  break;
              }
            }}
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
