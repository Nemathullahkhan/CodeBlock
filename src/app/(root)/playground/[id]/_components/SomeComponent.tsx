"use client";

import {
  BookOpen,
  ChevronDown,
  Code,
  Codesandbox,
  FileCode,
  GripHorizontal,
  GripVertical,
} from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionRunButton from "./QuestionRunButton";
import SubmitButton from "./SubmitButton";
import Questionaire from "./Questionaire";
import SolutionTab from "./SolutionTab";
import QuestionEditorPanel from "./QuestionEditor";
import QuestionOutputPanel from "./QuestionOutputPanel";
import Link from "next/link";
import { ProblemSidebar } from "./ProblemSidebar";
import { Button } from "@/components/ui/button";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

type SomeProps = {
  id: string;
  programName: string | null;
};

export default function SomeComponent({ id, programName }: SomeProps) {
  const [panelSizes, setPanelSizes] = useState({
    editor: 40,
    input: 60,
    output: 40,
  });
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [hasCodeRun, setHasCodeRun] = useState(false);
  const { output, error } = useCodeEditorStore();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleResizeEnd = (id: "editor" | "input" | "output", size: number) => {
    setPanelSizes((prev) => ({
      ...prev,
      [id]: size,
    }));
    localStorage.setItem(`panel-size-${id}`, size.toString());
  };

  useEffect(() => {
    const savedEditorSize = localStorage.getItem("panel-size-editor");
    const savedInputSize = localStorage.getItem("panel-size-input");
    const savedOutputSize = localStorage.getItem("panel-size-output");

    if (savedEditorSize || savedInputSize || savedOutputSize) {
      setPanelSizes({
        editor: savedEditorSize ? parseFloat(savedEditorSize) : 40,
        input: savedInputSize ? parseFloat(savedInputSize) : 60,
        output: savedOutputSize ? parseFloat(savedOutputSize) : 40,
      });
    }
  }, []);
  useEffect(() => {
    if (output || error) {
      setHasCodeRun(true);
    }
  }, [output, error]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black">
      {/* Top action bar */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800 m-3">
        {/* Left-aligned Codesandbox */}
        <div className="flex justify-start">
          <Link href="/home">
            <Codesandbox />
          </Link>
          <div className="mx-10">
            <Button onClick={toggleSidebar}  variant = "link" className="w-32 h-4 text-lg font-semibold tracking-tight font-sans">Problem List 
              <span><ChevronDown className="w-4 h-4"/></span>
            </Button>
          </div>
        </div>

        {/* Centered Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2 bg-stone-800/70 p-1 rounded-lg">
          <QuestionRunButton id={id} programName={programName} />
          <SubmitButton id={id} disabled={!hasCodeRun} />
        </div>

        {/* Spacer to balance the flex layout */}
        <div className="flex-1"></div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Conditionally render the sidebar */}
        <ProblemSidebar isVisible={isSidebarVisible} onClose={() => setSidebarVisible(false)} />

        {/* Resizable panels */}
        <div className="flex-1">
          <PanelGroup direction="horizontal" className="h-full">
            {/* Left Panel (Problem, Solution, Submissions, Test Cases) */}
            <Panel
              id="left-panel"
              defaultSize={panelSizes.editor}
              minSize={20}
              onResize={(size) => handleResizeEnd("editor", size)}
            >
              <div className="h-full bg-black rounded-xl border-2 border-zinc-900 overflow-hidden flex flex-col">
                <div className="border-b border-zinc-500">
                  <Tabs defaultValue="problem" className="w-full ">
                    <TabsList className="bg-zinc-900/40 border-b-4 flex justify-start relative gap-1">
                      <TabsTrigger
                        value="problem"
                        className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black flex items-center px-4 h-5  transition-colors border-r-2 bg-zinc-800"
                      >
                        <FileCode className="w-4 h-5 mr-2" />
                        Problem
                      </TabsTrigger>
                      <TabsTrigger
                        value="editorial"
                        className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black flex items-center px-4  h-5 rounded-md transition-colors  bg-zinc-800"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Solution
                      </TabsTrigger>
                      <TabsTrigger
                        value="submissions"
                        className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black flex items-center px-4 h-5 rounded-md transition-colors  bg-zinc-800"
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Submissions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="problem"
                      className="mt-0 flex-1 h-[calc(100vh-120px)] overflow-hidden"
                    >
                      <div
                        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 hover:scrollbar-thumb-gray-400 scrollbar-track-black scrollbar-thumb-rounded-md"
                      >
                        <Questionaire id={id} />
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="editorial"
                      className="mt-0 h-[calc(100vh-120px)] overflow-auto"
                    >
                      <div className="p-4 text-gray-300">
                        <SolutionTab id={id} />
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="submissions"
                      className="mt-0 h-[calc(100vh-120px)] overflow-auto"
                    >
                      <div className="p-4 text-gray-300">
                        <h3 className="text-xl font-bold mb-4">
                          Your Submissions
                        </h3>
                        <div className="bg-black rounded-md p-4 border border-[#30363d]">
                          <p className="text-center text-gray-400">
                            No submissions yet
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Panel>

            <ResizeHandle />

            {/* Right Panel (Editor and Output) */}
            <Panel id="right-panel" minSize={20}>
              <PanelGroup direction="vertical">
                {/* Editor Panel */}
                <Panel
                  id="editor"
                  defaultSize={panelSizes.input}
                  minSize={15}
                  onResize={(size) => handleResizeEnd("input", size)}
                >
                  <QuestionEditorPanel programName={programName} id={id} />
                </Panel>

                <ResizeHandle horizontal />

                {/* Output Panel */}
                <Panel
                  id="output"
                  defaultSize={panelSizes.output}
                  minSize={15}
                  onResize={(size) => handleResizeEnd("output", size)}
                >
                  <QuestionOutputPanel questionId={id} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
}

// Custom resize handle component
function ResizeHandle({ horizontal = false }) {
  return (
    <PanelResizeHandle
      className={`
        ${horizontal ? "h-1 my-0.5" : "w-1 mx-0.5"} 
        flex items-center justify-center 
        transition-all duration-200 ease-in-out
        hover:bg-zinc-800/50 active:bg-zinc-700/70
        group
      `}
    >
      <div
        className={`
        flex items-center justify-center
        ${horizontal ? "w-10 h-full" : "h-10 w-10 "} 
        rounded-full
        transition-all duration-200
        group-hover:bg-zinc-800 group-active:bg-zinc-300
      `}
      >
        {horizontal ? (
          <GripHorizontal className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        ) : (
          <GripVertical className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        )}
      </div>
    </PanelResizeHandle>
  );
}