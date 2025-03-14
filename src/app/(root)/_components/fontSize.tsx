"use client";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Type } from "lucide-react";

interface FontSizeSelectorProps {
  fontSize: number;
  handleFontSizeChange: (value: number) => void;
}

export default function FontSizeSelector({ fontSize, handleFontSizeChange }: FontSizeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center gap-3 p-2.5 bg-black bg-opacity-70 rounded-lg shadow-md backdrop-blur-md"
    >
      {/* Font Size Icon with Hover Effect */}
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
        <Type className="size-4 text-zinc-400 transition-colors hover:text-zinc-300" />
      </motion.div>

      {/* Slider & Value Display */}
      <div className="flex items-center gap-2">
        {/* ShadCN Slider (Reduced Width) */}
        <Slider
          min={12}
          max={24}
          value={[fontSize]}
          onValueChange={(val) => handleFontSizeChange(val[0])}
          className="w-20 h-5  transition-all"
        />

        {/* Compact Font Size Display */}
        <motion.span
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-xs font-medium text-zinc-300 text-center tracking-tight bg-gray-800 bg-opacity-50 px-2 py-1 rounded-md shadow-md backdrop-blur-md"
        >
          {fontSize}
        </motion.span>
      </div>
    </motion.div>
  );
}
