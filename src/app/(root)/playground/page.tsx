"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";

import ThemeSelector from "../_components/ThemeSelector";
import RunButton from "../_components/RunButton";
import { useEffect } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";

export default function Page() {
    const {
        language,
        theme,
        fontSize,
        editor,
        setEditor,
        runCode,
        output,
        error,
        userInput,
        setUserInput,
    } = useCodeEditorStore();

    useEffect(() => {
        const savedCode = localStorage.getItem(`editor-code-${language}`);
        const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
        if (editor) editor.setValue(newCode);
    }, [editor]);

    return (
        <div className="h-screen p-4 bg-gray-900 text-white">
            {/* Header & Input Field Row */}
            <div className="grid grid-cols-2 items-center gap-4 mb-4">
                <div className="flex justify-between">
                    <ThemeSelector />
                    <RunButton />
                </div>
                <div>
                    <label className="text-gray-300 text-sm block">User Input:</label>
                    <textarea
                        className="w-full p-2 text-white bg-gray-800 rounded-lg border border-gray-600"
                        rows={2}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter input for the program..."
                    />
                </div>
            </div>

            {/* Editor & Output Section */}
            <div className="grid grid-cols-2 gap-4 h-[80%]">
                <Editor
                    height="100%"
                    language={LANGUAGE_CONFIG[language].monacoLanguage}
                    theme={theme}
                    beforeMount={defineMonacoThemes}
                    onMount={(editor) => setEditor(editor)}
                    options={{
                        minimap: { enabled: false },
                        fontSize,
                        automaticLayout: true,
                        cursorBlinking: "smooth",
                    }}
                    className="border border-gray-700 rounded-lg"
                />
                <div className="h-full bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-auto">
                    <label className="text-gray-300 text-sm block">Output:</label>
                    <div className="w-full h-full p-2 text-white bg-gray-900 rounded-lg">
                        {error ? <span className="text-red-400">{error}</span> : output}
                    </div>
                </div>
            </div>
        </div>
    );
}


// "use client"

// import { useState, useEffect } from "react"
// import { Moon, Sun, Play } from "lucide-react"
// import { motion } from "framer-motion"
// import { Editor } from "@monaco-editor/react"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// const themes = ["vs-dark", "light"]
// const languages = ["javascript", "python", "typescript"]

// export default function CodeEditor() {
//   const [theme, setTheme] = useState("vs-dark")
//   const [language, setLanguage] = useState("javascript")
//   const [code, setCode] = useState("")
//   const [userInput, setUserInput] = useState("")
//   const [output, setOutput] = useState("")
//   const [isRunning, setIsRunning] = useState(false)

//   useEffect(() => {
//     const savedCode = localStorage.getItem(`editor-code-${language}`)
//     setCode(savedCode || "// Start coding here")
//   }, [language])

//   const handleRunCode = async () => {
//     setIsRunning(true)
//     // Simulating code execution
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     setOutput("Code executed successfully!")
//     setIsRunning(false)
//   }

//   return (
//     <div className="min-h-screen p-4 bg-background text-foreground">
//       <div className="mb-4 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <Select value={language} onValueChange={setLanguage}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               {languages.map((lang) => (
//                 <SelectItem key={lang} value={lang}>
//                   {lang.charAt(0).toUpperCase() + lang.slice(1)}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "vs-dark" : "light")}>
//             {theme === "light" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
//           </Button>
//         </div>
//         <Button onClick={handleRunCode} disabled={isRunning}>
//           {isRunning ? (
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             >
//               <Play className="mr-2 h-4 w-4" />
//             </motion.div>
//           ) : (
//             <Play className="mr-2 h-4 w-4" />
//           )}
//           {isRunning ? "Running..." : "Run Code"}
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
//         <div className="border rounded-lg overflow-hidden">
//           <Editor
//             height="100%"
//             language={language}
//             theme={theme}
//             value={code}
//             onChange={(value) => setCode(value || "")}
//             options={{
//               minimap: { enabled: false },
//               fontSize: 14,
//               automaticLayout: true,
//             }}
//           />
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="userInput" className="block text-sm font-medium mb-1">
//               User Input:
//             </label>
//             <Textarea
//               id="userInput"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="Enter input for the program..."
//               className="w-full h-24"
//             />
//           </div>
//           <div>
//             <label htmlFor="output" className="block text-sm font-medium mb-1">
//               Output:
//             </label>
//             <div id="output" className="w-full h-[calc(100%-8rem)] p-2 bg-muted rounded-lg overflow-auto">
//               {output}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

