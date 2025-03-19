"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, Play } from "lucide-react";
import { useState } from "react";

export default function RunButton() {
  const { runCode, isRunning } = useCodeEditorStore();
  const [open, setOpen] = useState(false);

  const handleRun = async () => {
    setOpen(true); // Open dialog when execution starts
    await runCode();
    setOpen(false); // Close dialog when execution finishes
  };

 

  return (
    <>
          <Button
        onClick={handleRun}
        disabled={isRunning}
        variant={"outline"}
        className="text-zinc-300 hover:bg-zinc-900 rounded-full border-y-0 border-x-4  border-zinc-500 w-32 h-5  hover:text-white hover:scale-105 transition-all    "
      >
        {isRunning  ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Play className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Run Code</span>
          </>
        )}
      </Button>


      {/* Dialog for Execution Animation */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black text-white border-2 border-zinc-600/20 shadow-xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-lg font-medium text-gray-300">Executing...</span>
            <div className="flex gap-2">
              <motion.div
                className="w-2.5 h-2.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-white rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
