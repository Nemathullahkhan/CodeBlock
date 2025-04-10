"use client";

import { useEffect, useState } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorPanel from "../_components/EditorPanel";
import InputPanel from "../_components/InputPanel";
import OutputPanel from "../_components/OutputPanel";
import { Circle, Codesandbox, GripHorizontal, GripVertical } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UserBadge from "./[id]/_components/UserBadge";
import EditorPanelSkeleton from "./_components/EditorPanelSkeleton";
import InputPanelSkeleton from "./_components/InputPanelSkeleton";
import OutputPanelSkeleton from "./_components/OutputPanelSkeleton";
import SaveProgramModal from "./_components/SaveProgramModel";

export default function Page() {
  const { status } = useSession();
  const [panelSizes, setPanelSizes] = useState({
    editor: 70,
    input: 50,
    output: 50,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Save panel sizes to localStorage
  const handleResizeEnd = (id: "editor" | "input" | "output", size: number) => {
    setPanelSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
    localStorage.setItem(`panel-size-${id}`, size.toString());
  };

  // Load saved panel sizes from localStorage
  useEffect(() => {
    const savedEditorSize = localStorage.getItem("panel-size-editor");
    const savedInputSize = localStorage.getItem("panel-size-input");
    const savedOutputSize = localStorage.getItem("panel-size-output");

    if (savedEditorSize || savedInputSize || savedOutputSize) {
      setPanelSizes({
        editor: savedEditorSize ? Number.parseFloat(savedEditorSize) : 60,
        input: savedInputSize ? Number.parseFloat(savedInputSize) : 50,
        output: savedOutputSize ? Number.parseFloat(savedOutputSize) : 50,
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
            element: ".editor-panel",
            intro: `
              <div class="text-slate-50 p-2 rounded-xl shadow-2xl border-2 border-zinc-700">
                <h3 class="font-bold text-xl px-2 mb-3">Editor Panel</h3>
                <p class="text-slate-300">This is where you write your code. Use syntax highlighting and auto-completion to make coding easier.</p>
              </div>
            `,
            position: "right",
          },
          {
            element: ".input-panel",
            intro: `
              <div class="bg-zinc-900 text-slate-50 p-6 rounded-xl shadow-2xl border-2 border-zinc-700">
                <h3 class="font-bold text-xl mb-3">Input Panel</h3>
                <p class="text-slate-300">Provide custom input for your code here. This is useful for testing different scenarios.</p>
              </div>
            `,
            position: "top",
          },
          {
            element: ".output-panel",
            intro: `
              <div class="bg-zinc-900 text-slate-50 p-6 rounded-xl shadow-2xl border-2 border-zinc-700">
                <h3 class="font-bold text-xl mb-3">Output Panel</h3>
                <p class="text-slate-300">View the results of your code execution here. Errors and logs will also appear in this panel.</p>
              </div>
            `,
            position: "top",
          },
        ],
        nextLabel: "Next →",
        prevLabel: "← Back",
        doneLabel: "Finish",
        showProgress: true,
        tooltipClass: "custom-introjs-tooltip",
        highlightClass: "custom-introjs-highlight",
        exitOnOverlayClick: false,
        keyboardNavigation: true,
      })
      .oncomplete(() => {
        console.log("Tour completed!");
      })
      .onexit(() => {
        console.log("Tour exited.");
      })
      .start();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900 p-2">
      <div className="w-full max-w-[1800px] h-[90vh] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl shadow-zinc-900/50 backdrop-blur-sm bg-zinc-950/90 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 bg-zinc-900/80 border-b border-zinc-800">
          {/* Left-aligned Logo */}
          <div className="flex justify-start items-center">
            <div className="flex justify-start items-center">
              <Link href="/home" className="flex items-center gap-2">
                <Codesandbox className="w-6 h-6" />
                <span className="text-lg">CodeBlock</span>
              </Link>
            </div>
          </div>

          {/* Right-aligned Actions */}
          <div className="flex justify-end items-center gap-4">
            <Link
              href={`/profile`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors text-xs"
            >
              <Circle className="w-5 h-5" /> Your Programs
            </Link>
            <Button
              variant="ghost"
              className="h-8 px-3 bg-zinc-800/50 hover:bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 hover:border-emerald-700 rounded-md"
              onClick={() => setIsSaveModalOpen(true)}
            >
              Save Program
            </Button>
            {status === "authenticated" ? (
              <UserBadge />
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button
                    variant="ghost"
                    className="h-8 px-3 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-md"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    variant="ghost"
                    className="h-8 px-3 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-md"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal" className="h-full">
            {/* Editor Panel */}
            <Panel
              id="editor"
              defaultSize={panelSizes.editor}
              minSize={20}
              onResize={(size) => handleResizeEnd("editor", size)}
              className="editor-panel overflow-auto"
            >
              <div className="h-full bg-zinc-900/30 p-1">
                {isLoading ? <EditorPanelSkeleton /> : <EditorPanel />}
              </div>
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
                  <div className="h-full bg-zinc-900/30 p-1">
                    {isLoading ? <InputPanelSkeleton /> : <InputPanel />}
                  </div>
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
                  <div className="h-full bg-zinc-900/30 p-1">
                    {isLoading ? <OutputPanelSkeleton /> : <OutputPanel />}
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
        {/* Save Program Modal */}
        <SaveProgramModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
        />
      </div>
    </div>
  );
}

// Custom resize handle component
function ResizeHandle({ horizontal = false }) {
  return (
    <PanelResizeHandle
      className={`
        ${horizontal ? "h-1" : "w-1"}
        flex items-center justify-center 
        bg-zinc-900
        transition-all duration-200 ease-in-out
        hover:bg-zinc-800 active:bg-zinc-700
        group
      `}
    >
      <div
        className={`
          flex items-center justify-center
          ${horizontal ? "w-8 h-full" : "h-16 w-full"} 
          transition-all duration-200
          group-hover:bg-zinc-800 group-active:bg-zinc-700
        `}
      >
        {horizontal ? (
          <GripHorizontal className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
        ) : (
          <GripVertical className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
        )}
      </div>
    </PanelResizeHandle>
  );
}
