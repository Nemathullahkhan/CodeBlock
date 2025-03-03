"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { LANGUAGE_CONFIG } from "../_constants";
import Image from "next/image";
import useMounted from "@/hooks/useMounted";
import { Check, Code2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LanguageSelector() {
  const mounted = useMounted();
  const { language, setLanguage } = useCodeEditorStore();
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  if (!mounted) return null;

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="relative group flex items-center gap-2 w-32 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800/50 transition-all duration-300">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2">
          <motion.div
            className="relative size-5 rounded-md bg-zinc-800/50 p-1 ring-1 ring-zinc-700/50 group-hover:ring-zinc-600/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {currentLanguageObj.logoPath ? (
              <Image
                src={currentLanguageObj.logoPath || "/placeholder.svg"}
                alt={`${currentLanguageObj.label} logo`}
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            ) : (
              <Code2 className="w-full h-full text-zinc-400" />
            )}
          </motion.div>

          <SelectValue asChild>
            <span className="text-zinc-300 text-sm font-medium tracking-wide min-w-[60px] text-left group-hover:text-zinc-100 transition-colors duration-300">
              {currentLanguageObj.label}
            </span>
          </SelectValue>
        </motion.div>
      </SelectTrigger>

      <SelectContent className="w-48 border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl rounded-lg shadow-lg">
        <SelectGroup className="p-2">
          <SelectLabel className="px-2 py-1 text-xs font-medium text-zinc-400 select-none">
            Select Language
          </SelectLabel>

          {/* Scrollable Language List */}
          <div className="max-h-[240px] overflow-y-auto overflow-x-hidden pr-2 -mr-2 overscroll-contain">
            <AnimatePresence>
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => (
                <SelectItem
                  key={lang.id}
                  value={lang.id}
                  className={cn(
                    "relative group flex items-center gap-2 rounded-md px-2 py-2 text-zinc-300",
                    "hover:bg-zinc-800/50 focus:bg-zinc-800/50 transition-colors duration-200",
                    "data-[state=checked]:bg-zinc-800"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="flex items-center gap-2 w-full relative z-10"
                  >
                    {/* Language Icon */}
                    <motion.div
                      className={cn(
                        "relative size-6 rounded-md p-1 transition-all duration-300",
                        "bg-zinc-800/50 ring-1 ring-zinc-700/50",
                        "group-hover:ring-zinc-600/50",
                        language === lang.id && "ring-2 ring-zinc-600 bg-zinc-700/50"
                      )}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {lang.logoPath ? (
                        <Image
                          src={lang.logoPath || "/placeholder.svg"}
                          alt={`${lang.label} logo`}
                          width={20}
                          height={20}
                          className="w-full h-full object-contain relative z-10"
                        />
                      ) : (
                        <Code2 className="w-full h-full text-zinc-400" />
                      )}
                    </motion.div>

                    {/* Language Name */}
                    <span className="flex-1 text-sm font-medium tracking-wide">{lang.label}</span>

                    {/* Selected Indicator */}
                    <AnimatePresence>
                      {language === lang.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check className="size-3 text-zinc-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Active state indicator */}
                  {language === lang.id && (
                    <motion.div
                      layoutId="active-language"
                      className="absolute inset-0 rounded-md border border-zinc-700/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </SelectItem>
              ))}
            </AnimatePresence>
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
