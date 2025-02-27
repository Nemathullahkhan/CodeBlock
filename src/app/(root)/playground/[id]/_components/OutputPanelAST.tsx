"use client"

import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useState } from "react";

export default function OutputPanelAST() {
    const { output, error, isRunning } = useCodeEditorStore();
    const [isCopied, setIsCopied] = useState(false);

    const hasContent = error || output;

    const handleCopy = async () => {
        // logic to copy the output
        if (!hasContent) return;
        await navigator.clipboard.writeText(error || output);
        setIsCopied(true);

        setTimeout(() => setIsCopied(false), 2000);
    }

    return (
        <div className="relative bg-black rounded-xl p-4 ring-2 ring-zinc-900">
            {/* Header  */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="">
                        <Terminal className="w-4 h-4 text-zinc-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-300">Output</span>
                </div>


                {/* copy button */}

                {hasContent && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
              rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all border-red-400">
                        {isCopied ? (
                            <>
                                <CheckCircle className="w-3.5 h-3.5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />Copy
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Output area */}
            <div className="relative">
                <div className="relative bg-black   rounded-xl p-4 h-[250px] overflow-auto scrollbar-thin
                scrollbar-thumb-gray-700 scrollbar-track-black text-sm">
                    {isRunning ? (
                        <div className="">Running</div>
                    ) : error ? (
                        <div className="flex items-start gap-3 text-red-400">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                            <div className="space-y-1">
                                <div className="font-medium">Execution Error</div>
                                <pre className="whitespace-pre-wrap text-red-400/80">
                                    {error
                                        .split("\n") // Split error into lines
                                        .filter((line, index) =>
                                            !(index === 0 && line.match(/\/piston\/jobs\/.*file\d+\.code:\d+/)) // Remove first line if it looks like a file path
                                        )
                                        .join("\n")} {/* Join back the filtered lines */}
                                </pre>
                            </div>
                        </div>
                    ) : output ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400 mb-3">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Execution Successful</span>
                            </div>
                            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl  ring-1 ring-gray-700/50 mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <p className="text-center text-xs tracking-tight">Run your code to see the output here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}