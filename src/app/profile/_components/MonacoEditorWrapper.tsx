// // 

// "use client";

// import { useState, useEffect } from "react";
// import { Loader2 } from "lucide-react";

// interface MonacoEditorProps {
//   height: string | number;
//   language: string;
//   value: string;
//   onChange: (value: string) => void;
//   theme: string;
//   options: {
//     minimap: { enabled: boolean };
//     fontSize: number;
//     automaticLayout: boolean;
//     scrollBeyondLastLine: boolean;
//     padding: { top: number; bottom: number };
//     renderWhitespace: string;
//     fontFamily: string;
//     fontLigatures: boolean;
//     cursorBlinking: string;
//     smoothScrolling: boolean;
//     contextmenu: boolean;
//     renderLineHighlight: string;
//     lineHeight: number;
//     roundedSelection: boolean;
//     scrollbar: {
//       verticalScrollbarSize: number;
//       horizontalScrollbarSize: number;
//     };
//   };
// }

// interface MonacoEditorWrapperProps {
//   value: string;
//   onChange: (value: string) => void;
//   language?: string;
//   height?: string;
// }

// export default function MonacoEditorWrapper({
//   value,
//   onChange,
//   language = "javascript",
//   height = "300px",
// }: MonacoEditorWrapperProps) {
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [Editor, setEditor] = useState<React.ComponentType<MonacoEditorProps> | null>(null); // Use MonacoEditorProps type

//   useEffect(() => {
//     // Dynamically import Monaco Editor
//     import("@monaco-editor/react")
//       .then((mod) => {
//         setEditor(() => mod.default);
//         setIsEditorReady(true);
//       })
//       .catch((err) => console.error("Failed to load Monaco Editor", err));
//   }, []);

//   if (!isEditorReady) {
//     return (
//       <div className="flex items-center justify-center bg-gray-900 rounded-md" style={{ height }}>
//         <Loader2 className="h-8 w-8 animate-spin text-green-500" />
//       </div>
//     );
//   }

//   if (Editor) {
//     return (
//       <Editor
//         height={height}
//         language={language}
//         value={value}
//         onChange={onChange}
//         theme="vs-dark" // Modern dark theme
//         options={{
//           minimap: { enabled: false },
//           fontSize: 14,
//           automaticLayout: true,
//           scrollBeyondLastLine: false,
//           padding: { top: 16, bottom: 16 },
//           renderWhitespace: "none",
//           fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
//           fontLigatures: true,
//           cursorBlinking: "smooth",
//           smoothScrolling: true,
//           contextmenu: true,
//           renderLineHighlight: "all",
//           lineHeight: 24,
//           roundedSelection: true,
//           scrollbar: {
//             verticalScrollbarSize: 8,
//             horizontalScrollbarSize: 8,
//           },
//         }}
//       />
//     );
//   }

//   return null;
// }