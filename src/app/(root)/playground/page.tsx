// // "use client";

// // import { useEffect, useState } from "react";
// // import { 
// //   Panel, 
// //   PanelGroup, 
// //   PanelResizeHandle 
// // } from "react-resizable-panels";
// // import EditorPanel from "../_components/EditorPanel";
// // import InputPanel from "../_components/InputPanel";
// // import OutputPanel from "../_components/OutputPanel";
// // import { Codesandbox, GripHorizontal, GripVertical } from "lucide-react";
// // import Link from "next/link";
// // import { useSession } from "next-auth/react";
// // import UserBadge from "./[id]/_components/UserBadge";
// // import { Button } from "@/components/ui/button";

// // export default function Page() {
// //   const {status} = useSession();
// //   const [panelSizes, setPanelSizes] = useState({
// //     editor: 60,
// //     input: 50,
// //     output: 50,
// //   });

// //   // Save panel sizes to localStorage
// //   const handleResizeEnd = (id: "editor" | "input" | "output", size:number) => {
// //     setPanelSizes(prev => ({
// //       ...prev,
// //       [id]: size
// //     }));
// //     localStorage.setItem(`panel-size-${id}`, size.toString());
// //   };

// //   // Load saved panel sizes from localStorage
// //   useEffect(() => {
// //     const savedEditorSize = localStorage.getItem('panel-size-editor');
// //     const savedInputSize = localStorage.getItem('panel-size-input');
// //     const savedOutputSize = localStorage.getItem('panel-size-output');
    
// //     if (savedEditorSize || savedInputSize || savedOutputSize) {
// //       setPanelSizes({
// //         editor: savedEditorSize ? parseFloat(savedEditorSize) : 60,
// //         input: savedInputSize ? parseFloat(savedInputSize) : 50,
// //         output: savedOutputSize ? parseFloat(savedOutputSize) : 50,
// //       });
// //     }
// //   }, []);

// //   return (
// //     <div className="h-screen overflow-hidden p-4">
// //       <div className="max-w-[1800px] mx-auto h-full">
// //         <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800  w-full">
// //                   {/* Left-aligned Codesandbox */}
// //                   <div className="flex justify-start items-center">
// //                     <Link href="/home" className="flex items-center gap-2">
// //                       <Codesandbox className="w-6 h-6" />
// //                       <span className="text-lg">CodeBlock</span>
// //                     </Link>
// //                   </div>

// //                   <div className="flex  justify-end items-center gap-4">
// //                     {status ==="authenticated" ? (
// //                         <UserBadge/>
// //                     ):(
// //                       <>
// //                       <Link href = "/auth/signin" className="text-sm font-medium hover:text-indigo-400">
// //                       <Button variant = "default" className="h-5">
// //                       Sign In</Button></Link>
// //                       <Link href = "/auth/signup" className="text-sm font-medium hover:text-indigo-400">Sign Up</Link>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>

// //         <PanelGroup direction="horizontal" className="h-full">
// //           {/* Editor Panel */}
// //           <Panel 
// //             id="editor" 
// //             defaultSize={panelSizes.editor} 
// //             minSize={20}
// //             onResize={(size) => handleResizeEnd("editor", size)}
// //             className="overflow-auto"
// //           >
// //             <EditorPanel />
// //           </Panel>
          
// //           <ResizeHandle />
          
// //           {/* Input and Output Panels */}
// //           <Panel id="io-panels" minSize={20}>
// //             <PanelGroup direction="vertical">
// //               {/* Input Panel */}
// //               <Panel 
// //                 id="input" 
// //                 defaultSize={panelSizes.input} 
// //                 minSize={15}
// //                 onResize={(size) => handleResizeEnd("input", size)}
// //               >
// //                 <InputPanel />
// //               </Panel>
              
// //               <ResizeHandle horizontal />
              
// //               {/* Output Panel */}
// //               <Panel 
// //                 id="output" 
// //                 defaultSize={panelSizes.output}
// //                 minSize={15}
// //                 onResize={(size) => handleResizeEnd("output", size)}
// //               >
// //                 <OutputPanel />
// //               </Panel>
// //             </PanelGroup>
// //           </Panel>
// //         </PanelGroup>
// //       </div>
// //     </div>
// //   );
// // }

// // // Custom resize handle component
// // function ResizeHandle({ horizontal = false }) {
// //   return (
// //     <PanelResizeHandle
// //       className={`
// //         ${horizontal && "h-1 my-0.5"} 
// //         flex items-center justify-center 
// //         transition-all duration-200 ease-in-out
// //         hover:bg-zinc-800/50 active:bg-zinc-700/70
// //         group
// //       `}
// //     >
// //       <div
// //         className={`
// //         flex items-center justify-center
// //         ${horizontal ? "w-5 h-full" : "h-4 w-full"} 
// //         rounded-full
// //         transition-all duration-200
// //         group-hover:bg-zinc-800 group-active:bg-zinc-700
        
// //       `}
// //       >
// //         {horizontal ? (
// //           <GripHorizontal className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
// //         ) : (
// //           <GripVertical className="w-4 h-10   text-zinc-500 group-hover:text-indigo-400 transition-colors" />
// //         )}
// //       </div>
// //     </PanelResizeHandle>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { 
//   Panel, 
//   PanelGroup, 
//   PanelResizeHandle 
// } from "react-resizable-panels";
// import EditorPanel from "../_components/EditorPanel";
// import InputPanel from "../_components/InputPanel";
// import OutputPanel from "../_components/OutputPanel";
// import { Codesandbox, GripHorizontal, GripVertical } from "lucide-react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import UserBadge from "./[id]/_components/UserBadge";
// import { Button } from "@/components/ui/button";
// import EditorPanelSkeleton from "./_components/EditorPanelSkeleton";
// import InputPanelSkeleton from "./_components/InputPanelSkeleton";
// import OutputPanelSkeleton from "./_components/OutputPanelSkeleton";
// import { Separator } from "@/components/ui/separator";

// export default function Page() {
//   const {status} = useSession();
//   const [panelSizes, setPanelSizes] = useState({
//     editor: 60,
//     input: 50,
//     output: 50,
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   // Save panel sizes to localStorage
//   const handleResizeEnd = (id: "editor" | "input" | "output", size:number) => {
//     setPanelSizes(prev => ({
//       ...prev,
//       [id]: size
//     }));
//     localStorage.setItem(`panel-size-${id}`, size.toString());
//   };

//   // Load saved panel sizes from localStorage
//   useEffect(() => {
//     const savedEditorSize = localStorage.getItem('panel-size-editor');
//     const savedInputSize = localStorage.getItem('panel-size-input');
//     const savedOutputSize = localStorage.getItem('panel-size-output');
    
//     if (savedEditorSize || savedInputSize || savedOutputSize) {
//       setPanelSizes({
//         editor: savedEditorSize ? parseFloat(savedEditorSize) : 60,
//         input: savedInputSize ? parseFloat(savedInputSize) : 50,
//         output: savedOutputSize ? parseFloat(savedOutputSize) : 50,
//       });
//     }

//     // Simulate loading delay
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div className="h-screen overflow-hidden p-4">
//       <div className="max-w-[1800px] mx-auto h-full">
//         <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800  w-full">
//           {/* Left-aligned Codesandbox */}
//           <div className="flex justify-start items-center">
//             <Link href="/home" className="flex items-center gap-2">
//               <Codesandbox className="w-6 h-6" />
//               <span className="text-lg">CodeBlock</span>
//             </Link>
//           </div>

//           <div className="flex  justify-end items-center gap-4">
//             {status ==="authenticated" ? (
//                 <UserBadge/>
//             ):(
//               <>
//               <Link href = "/auth/signin" className="text-sm font-medium hover:text-indigo-400">
//               <Button variant = "default" className="h-5">
//               Sign In</Button></Link>
//               <Link href = "/auth/signup" className="text-sm font-medium hover:text-indigo-400">Sign Up</Link>
//               </>
//             )}
//           </div>
//         </div>

//         <PanelGroup direction="horizontal" className="h-full">
//           {/* Editor Panel */}
//           <Panel 
//             id="editor" 
//             defaultSize={panelSizes.editor} 
//             minSize={20}
//             onResize={(size) => handleResizeEnd("editor", size)}
//             className="overflow-auto"
//           >
//             {isLoading ? <EditorPanelSkeleton /> : <EditorPanel />}
//           </Panel>
          
//           <ResizeHandle />
          
//           {/* Input and Output Panels */}
//           <Panel id="io-panels" minSize={20}>
//             <PanelGroup direction="vertical">
//               {/* Input Panel */}
//               <Panel 
//                 id="input" 
//                 defaultSize={panelSizes.input} 
//                 minSize={15}
//                 onResize={(size) => handleResizeEnd("input", size)}
//               >
//                 {isLoading ? <InputPanelSkeleton /> : <InputPanel />}
//               </Panel>
              
//               <ResizeHandle horizontal />
              
//               {/* Output Panel */}
//               <Panel 
//                 id="output" 
//                 defaultSize={panelSizes.output}
//                 minSize={15}
//                 onResize={(size) => handleResizeEnd("output", size)}
//               >
//                 {isLoading ? <OutputPanelSkeleton /> : <OutputPanel />}
//               </Panel>
//             </PanelGroup>
//           </Panel>
//         </PanelGroup>
//       </div>
//     </div>
//   );
// }

// // Custom resize handle component
// function ResizeHandle({ horizontal = false }) {
//   return (
//     <PanelResizeHandle
//       className={`
//         ${horizontal && "h-1 my-0.5"} 
//         flex items-center justify-center 
//         transition-all duration-200 ease-in-out
//         hover:bg-zinc-800/50 active:bg-zinc-700/70
//         group
//       `}
//     >
//       {/* <div
//         className={`
//         flex items-center justify-center
//         ${horizontal ? "w-5 h-full" : "h-4 w-full"} 
//         rounded-full
//         transition-all duration-200
//         group-hover:bg-zinc-800 group-active:bg-zinc-700
        
//       `}
//       >
//         {horizontal ? (
//           <GripHorizontal className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
//         ) : (
//           <GripVertical className="w-4 h-10   text-zinc-500 group-hover:text-indigo-400 transition-colors" />
//         )}
//       </div> */}

// <Separator
//       orientation={horizontal ? "horizontal" : "vertical"} // Set orientation based on the `horizontal` prop
//       className={`
//         flex items-center justify-center 
//         transition-all duration-200 ease-in-out
//         hover:bg-zinc-800/50 active:bg-zinc-700/70
//         group
//         ${horizontal ? "h-1 my-0.5" : "w-2 mx-0.5"} 
//       `}
//     >
//       <div
//         className={`
//           flex items-center justify-center
//           ${horizontal ? "w-8 h-full" : "h-16 w-full"} 
//           rounded-full
//           transition-all duration-200
//           group-hover:bg-zinc-800 group-active:bg-zinc-700
//         `}
//       >
//         {horizontal ? (
//           <GripHorizontal className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
//         ) : (
//           <GripVertical className="w-4 h-10 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
//         )}
//       </div>
//     </Separator>

//     </PanelResizeHandle>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from "react-resizable-panels";
import EditorPanel from "../_components/EditorPanel";
import InputPanel from "../_components/InputPanel";
import OutputPanel from "../_components/OutputPanel";
import { Codesandbox, GripHorizontal, GripVertical } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserBadge from "./[id]/_components/UserBadge";
import { Button } from "@/components/ui/button";
import EditorPanelSkeleton from "./_components/EditorPanelSkeleton";
import InputPanelSkeleton from "./_components/InputPanelSkeleton";
import OutputPanelSkeleton from "./_components/OutputPanelSkeleton";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const {status} = useSession();
  const [panelSizes, setPanelSizes] = useState({
    editor: 60,
    input: 50,
    output: 50,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Save panel sizes to localStorage
  const handleResizeEnd = (id: "editor" | "input" | "output", size:number) => {
    setPanelSizes(prev => ({
      ...prev,
      [id]: size
    }));
    localStorage.setItem(`panel-size-${id}`, size.toString());
  };

  // Load saved panel sizes from localStorage
  useEffect(() => {
    const savedEditorSize = localStorage.getItem('panel-size-editor');
    const savedInputSize = localStorage.getItem('panel-size-input');
    const savedOutputSize = localStorage.getItem('panel-size-output');
    
    if (savedEditorSize || savedInputSize || savedOutputSize) {
      setPanelSizes({
        editor: savedEditorSize ? parseFloat(savedEditorSize) : 60,
        input: savedInputSize ? parseFloat(savedInputSize) : 50,
        output: savedOutputSize ? parseFloat(savedOutputSize) : 50,
      });
    }

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      startTour(); // Start the tour after loading
    }, 2000);
  }, []);

  // Start the intro.js tour
  const startTour = () => {
    introJs()
      .setOptions({
        steps: [
          {
            element: '.editor-panel',
            intro: `
              <div class="text-slate-50 p-2 rounded-xl shadow-2xl border-2 border-zinc-700">
                <h3 class="font-bold text-xl px-2 mb-3">Editor Panel</h3>
                <p class="text-slate-300">This is where you write your code. Use syntax highlighting and auto-completion to make coding easier.</p>
              </div>
            `,
            position: 'right',
          },
          {
            element: '.input-panel',
            intro: `
              <div class="bg-zinc-900 text-slate-50 p-6 rounded-xl shadow-2xl border-2 border-zinc-700">
                <h3 class="font-bold text-xl mb-3">Input Panel</h3>
                <p class="text-slate-300">Provide custom input for your code here. This is useful for testing different scenarios.</p>
              </div>
            `,
            position: 'top',
          },
          {
            element: '.output-panel',
            intro: `
              <div class="bg-zinc-900 text-slate-50 p-6 rounded-xl shadow-2xl border-2 border-zinc-700">
                <h3 class="font-bold text-xl mb-3">Output Panel</h3>
                <p class="text-slate-300">View the results of your code execution here. Errors and logs will also appear in this panel.</p>
              </div>
            `,
            position: 'top',
          },
        ],
        nextLabel: 'Next →',
        prevLabel: '← Back',
        doneLabel: 'Finish',
        showProgress: true,
        tooltipClass: 'custom-introjs-tooltip', // Add a custom class for further styling
        highlightClass: 'custom-introjs-highlight', // Add a custom class for further styling
        exitOnOverlayClick: false, // Prevent accidental exits
        keyboardNavigation: true, // Allow keyboard navigation
      })
      .oncomplete(() => {
        console.log('Tour completed!');
      })
      .onexit(() => {
        console.log('Tour exited.');
      })
      .start();
  };

  return (
    <div className="h-screen overflow-hidden p-4">
      <div className="max-w-[1800px] mx-auto h-full">
        <div className="flex items-center justify-between px-10 py-2 border-b-4 border-zinc-800  w-full">
          {/* Left-aligned Codesandbox */}
          <div className="flex justify-start items-center">
            <Link href="/home" className="flex items-center gap-2">
              <Codesandbox className="w-6 h-6" />
              <span className="text-lg">CodeBlock</span>
            </Link>
          </div>

          <div className="flex  justify-end items-center gap-4">
            {status ==="authenticated" ? (
                <UserBadge/>
            ):(
              <>
              <Link href = "/auth/signin" className="text-sm font-medium hover:text-indigo-400">
              <Button variant = "default" className="h-5">
              Sign In</Button></Link>
              <Link href = "/auth/signup" className="text-sm font-medium hover:text-indigo-400">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        <PanelGroup direction="horizontal" className="h-full">
          {/* Editor Panel */}
          <Panel 
            id="editor" 
            defaultSize={panelSizes.editor} 
            minSize={20}
            onResize={(size) => handleResizeEnd("editor", size)}
            className="editor-panel overflow-auto"
          >
            {isLoading ? <EditorPanelSkeleton /> : <EditorPanel />}
          </Panel>
          
          <ResizeHandle />
          
          {/* Input and Output Panels */}
          <Panel id="io-panels" minSize={20}>
            <PanelGroup direction="vertical">
              {/* Input Panel */}
              <Panel 
                id="input" 
                defaultSize={panelSizes.input} 
                minSize={15}
                onResize={(size) => handleResizeEnd("input", size)}
                className="input-panel"
              >
                {isLoading ? <InputPanelSkeleton /> : <InputPanel />}
              </Panel>
              
              <ResizeHandle horizontal />
              
              {/* Output Panel */}
              <Panel 
                id="output" 
                defaultSize={panelSizes.output}
                minSize={15}
                onResize={(size) => handleResizeEnd("output", size)}
                className="output-panel"
              >
                {isLoading ? <OutputPanelSkeleton /> : <OutputPanel />}
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>

        {/* Button to start the tour */}
        <Button onClick={startTour} className="mt-4">
          Start Tutorial
        </Button>
      </div>
    </div>
  );
}

// Custom resize handle component
function ResizeHandle({ horizontal = false }) {
  return (
    <PanelResizeHandle
      className={`
        ${horizontal && "h-1 my-0.5"} 
        flex items-center justify-center 
        transition-all duration-200 ease-in-out
        hover:bg-zinc-800/50 active:bg-zinc-700/70
        group
      `}
    >
      <Separator
        orientation={horizontal ? "horizontal" : "vertical"}
        className={`
          flex items-center justify-center 
          transition-all duration-200 ease-in-out
          hover:bg-zinc-800/50 active:bg-zinc-700/70
          group
          ${horizontal ? "h-1 my-0.5" : "w-2 mx-0.5"} 
        `}
      >
        <div
          className={`
            flex items-center justify-center
            ${horizontal ? "w-8 h-full" : "h-16 w-full"} 
            rounded-full
            transition-all duration-200
            group-hover:bg-zinc-800 group-active:bg-zinc-700
          `}
        >
          {horizontal ? (
            <GripHorizontal className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          ) : (
            <GripVertical className="w-4 h-10 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          )}
        </div>
      </Separator>
    </PanelResizeHandle>
  );
}