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

// "use client";

// import useMounted from "@/hooks/useMounted";
// import { useCodeEditorStore } from "@/store/useCodeEditorStore";
// import { useEffect } from "react";
// import { RotateCcwIcon } from "lucide-react";
// import { motion } from "framer-motion";
// import { Editor } from "@monaco-editor/react";
// import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
// import LanguageSelector from "@/app/(root)/_components/LanguageSelector";
// import FontSizeSelector from "@/app/(root)/_components/fontSize";
// import ThemeSelector from "@/app/(root)/_components/ThemeSelector";
// import OutputRunButton from "./QuestionRunButton";

// export default function QuestionEditorPanel({id}:{id:string}) {
//   const { language, theme, fontSize, editor, setFontSize, setEditor } =
//     useCodeEditorStore();

//   const mounted = useMounted(); // to render the component

//   useEffect(() => {
//     // saving the code
//     const savedCode = localStorage.getItem(`editor-code-${language}`);
//     const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;

//     if (editor) editor.setValue(newCode);
//   }, [LANGUAGE_CONFIG, editor, language]);

//   useEffect(() => {
//     //adjusting the font-size
//     const savedFontSize = localStorage.getItem("editor-font-size");
//     if (savedFontSize) setFontSize(parseInt(savedFontSize));
//   }, [setFontSize]);

//   const handleRefresh = () => {
//     const defaultCode = LANGUAGE_CONFIG[language].defaultCode; // add the main function of the editor
//     if (editor) editor.setValue(defaultCode);

//     localStorage.removeItme(`editor-code=${language}`);
//   };

//   const handleEditorChange = (value: string | undefined) => {
//     if (value) {
//       localStorage.setItem(`editor-code-${language}`, value);
//     }
//   };

//   const handleFontSizeChange = (newSize: number) => {
//     const size = Math.min(Math.max(newSize, 12), 24);
//     setFontSize(size);
//     localStorage.setItem("editor-font-size", size.toString());
//   };

//   if (!mounted) return null;

//   return (
//     <div className="-mt-1">
//       {/* Header */}
//       <div className="flex items-center justify-around mb-4">
//         <div className="flex items-center gap-3 ">
//           {/* Language selector */}
//           <LanguageSelector />

//           {/* Font-Size*/}

//           <FontSizeSelector
//             fontSize={fontSize}
//             handleFontSizeChange={handleFontSizeChange}
//           />

//           <div className="">
//             <ThemeSelector />
//           </div>

//           {/*Run Button */}
//           <OutputRunButton id = {id} />

//           {/* Reset Button */}
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleRefresh}
//             className="p-2 bg-black border border-zinc-800 bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800/50 rounded-lg ring-1 ring-white/5 transition-colors"
//             aria-label="Reset to default code"
//           >
//             <RotateCcwIcon className="size-4 text-gray-400" />
//           </motion.button>
//         </div>
//       </div>
//       {/* Editor */}
//       <div className="w-full mx-auto ">
//         <div className="overflow-hidden ring-2 ring-white/[0.05] rounded-lg p-1  bg-black ">
//           <Editor
//             height="460px"
//             language={LANGUAGE_CONFIG[language].monacoLanguage}
//             onChange={handleEditorChange}
//             theme={theme}
//             beforeMount={defineMonacoThemes}
//             // onMount={(editor) => setEditor(editor)}
//             onMount={(editor, monaco) => {
//               setEditor(editor);

//               // Dynamic error diagnostics based on selected language
//               switch (LANGUAGE_CONFIG[language].monacoLanguage) {
//                 case "javascript":
//                 case "typescript":
//                   monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
//                     {
//                       noSemanticValidation: false,
//                       noSyntaxValidation: false,
//                     }
//                   );

//                   monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
//                     {
//                       noSemanticValidation: false,
//                       noSyntaxValidation: false,
//                     }
//                   );

//                   monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
//                     {
//                       target: monaco.languages.typescript.ScriptTarget.ESNext,
//                       allowNonTsExtensions: true,
//                       strict: true,
//                     }
//                   );

//                   monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
//                     {
//                       target: monaco.languages.typescript.ScriptTarget.ESNext,
//                       strict: true,
//                       moduleResolution:
//                         monaco.languages.typescript.ModuleResolutionKind.NodeJs,
//                     }
//                   );
//                   break;

//                 case "python":
//                   monaco.languages.register({ id: "python" });

//                   monaco.languages.onLanguage("python", () => {
//                     monaco.editor.setModelLanguage(editor.getModel(), "python");
//                   });

//                   monaco.languages.python = monaco.languages.python || {};
//                   monaco.languages.python.diagnostics =
//                     monaco.languages.python.diagnostics || {};
//                   monaco.languages.python.diagnostics.options = {
//                     validate: true,
//                     lint: true,
//                   };
//                   break;

//                 case "cpp":
//                   monaco.languages.register({ id: "cpp" });

//                   monaco.languages.onLanguage("cpp", () => {
//                     monaco.editor.setModelLanguage(editor.getModel(), "cpp");
//                   });

//                   monaco.languages.cpp = monaco.languages.cpp || {};
//                   monaco.languages.cpp.diagnostics =
//                     monaco.languages.cpp.diagnostics || {};
//                   monaco.languages.cpp.diagnostics.options = {
//                     validate: true,
//                     lint: true,
//                   };
//                   break;

//                 case "java":
//                   monaco.languages.register({ id: "java" });

//                   monaco.languages.onLanguage("java", () => {
//                     monaco.editor.setModelLanguage(editor.getModel(), "java");
//                   });

//                   monaco.languages.java = monaco.languages.java || {};
//                   monaco.languages.java.diagnostics =
//                     monaco.languages.java.diagnostics || {};
//                   monaco.languages.java.diagnostics.options = {
//                     validate: true,
//                     lint: true,
//                   };
//                   break;
//               }
//             }}
//             options={{
//               minimap: { enabled: false },
//               fontSize,
//               automaticLayout: true,
//               scrollBeyondLastLine: false,
//               padding: { top: 16, bottom: 16 },
//               renderWhitespace: "selection",
//               fontFamily: '"Fira Code","Cascadia Code",Consolas, monospace',
//               fontLigatures: true,
//               cursorBlinking: "smooth",
//               smoothScrolling: true,
//               contextmenu: true,
//               renderLineHighlight: "all",
//               lineHeight: 1.6,
//               letterSpacing: 0.5,
//               roundedSelection: true,
//               scrollbar: {
//                 verticalScrollbarSize: 8,
//                 horizontalScrollbarSize: 8,
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client"

// import useMounted from "@/hooks/useMounted"
// import { useCodeEditorStore } from "@/store/useCodeEditorStore"
// import { useEffect, useState } from "react"
// import { CheckCircle, Code, Copy, RotateCcw, Settings } from "lucide-react"
// import { motion } from "framer-motion"
// import { Editor } from "@monaco-editor/react"
// import { defineMonacoThemes } from "@/app/(root)/_constants"
// import LanguageSelector from "@/app/(root)/_components/LanguageSelector"
// import FontSizeSelector from "@/app/(root)/_components/fontSize"
// import ThemeSelector from "@/app/(root)/_components/ThemeSelector"
// import OutputRunButton from "./QuestionRunButton"
// import { CODE_CONFIG } from "@/app/(root)/_constants/codes"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// interface QuestionEditorPanelProps {
//   id: string // Problem ID
//   programName: string | null // Program name (e.g., "Merge Sort")
// }

// export default function QuestionEditorPanel({ id, programName }: QuestionEditorPanelProps) {
//   const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore()
//   const [isCopied, setIsCopied] = useState(false)

//   const mounted = useMounted() // to render the component

//   // Get the problem from CODE_CONFIG using the programName
//   const problem = programName ? CODE_CONFIG[programName] : null
//   const languageCode = problem?.languages.find((lang) => lang.language === language)

//   useEffect(() => {
//     // Load the default code for the selected problem and language
//     const savedCode = localStorage.getItem(`editor-code-${language}-${id}`)
//     const newCode = savedCode || languageCode?.defaultCode || ""

//     if (editor) editor.setValue(newCode)
//   }, [editor, language, id, languageCode])

//   useEffect(() => {
//     // Adjust the font size
//     const savedFontSize = localStorage.getItem("editor-font-size")
//     if (savedFontSize) setFontSize(Number.parseInt(savedFontSize))
//   }, [setFontSize])

//   const handleRefresh = () => {
//     // Reset to the default code for the selected problem and language
//     const defaultCode = languageCode?.defaultCode || ""
//     if (editor) editor.setValue(defaultCode)

//     localStorage.removeItem(`editor-code-${language}-${id}`)
//   }

//   const handleEditorChange = (value: string | undefined) => {
//     if (value) {
//       localStorage.setItem(`editor-code-${language}-${id}`, value)
//     }
//   }

//   const handleFontSizeChange = (newSize: number) => {
//     const size = Math.min(Math.max(newSize, 12), 24)
//     setFontSize(size)
//     localStorage.setItem("editor-font-size", size.toString())
//   }

//   const handleCopyCode = async () => {
//     if (editor) {
//       const code = editor.getValue()
//       await navigator.clipboard.writeText(code)
//       setIsCopied(true)
//       setTimeout(() => setIsCopied(false), 2000)
//     }
//   }

//   if (!mounted) return null

//   return (
//     <div className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between p-3 border-b border-[#30363d]">
//         <div className="flex items-center">
//           <Code className="w-5 h-5 text-[#58a6ff] mr-2" />
//           <span className="text-gray-200 font-medium">{programName || "Code Editor"}</span>
//         </div>

//         <div className="flex items-center gap-2">
//           <LanguageSelector />

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="p-2 text-gray-400 hover:text-gray-200 bg-[#0d1117] rounded-md border border-[#30363d] transition-colors">
//                 <Settings className="w-4 h-4" />
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-[#161b22] border-[#30363d] text-gray-300">
//               <div className="p-2">
//                 <FontSizeSelector fontSize={fontSize} handleFontSizeChange={handleFontSizeChange} />
//               </div>
//               <div className="p-2 border-t border-[#30363d]">
//                 <ThemeSelector />
//               </div>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <button
//             onClick={handleCopyCode}
//             className="p-2 text-gray-400 hover:text-gray-200 bg-[#0d1117] rounded-md border border-[#30363d] transition-colors"
//           >
//             {isCopied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
//           </button>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={handleRefresh}
//             className="p-2 text-gray-400 hover:text-gray-200 bg-[#0d1117] rounded-md border border-[#30363d] transition-colors"
//           >
//             <RotateCcw className="w-4 h-4" /> {/* Corrected import */}
//           </motion.button>

//           <OutputRunButton id={id} />
//         </div>
//       </div>

//       {/* Editor */}
//       <div className="w-full">
//         <Editor
//           height="460px"
//           language={languageCode?.monacoLanguage || "plaintext"}
//           onChange={handleEditorChange}
//           theme={theme}
//           beforeMount={defineMonacoThemes}
//           onMount={(editor) => setEditor(editor)}
//           options={{
//             minimap: { enabled: false },
//             fontSize,
//             automaticLayout: true,
//             scrollBeyondLastLine: false,
//             padding: { top: 16, bottom: 16 },
//             renderWhitespace: "selection",
//             fontFamily: '"Fira Code","Cascadia Code",Consolas, monospace',
//             fontLigatures: true,
//             cursorBlinking: "smooth",
//             smoothScrolling: true,
//             contextmenu: true,
//             renderLineHighlight: "all",
//             lineHeight: 1.6,
//             letterSpacing: 0.5,
//             roundedSelection: true,
//             scrollbar: {
//               verticalScrollbarSize: 8,
//               horizontalScrollbarSize: 8,
//             },
//           }}
//         />
//       </div>
//     </div>
//   )
// }
