"use client"

import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { THEMES } from "../_constants"
import { Palette, CircleOff, Cloud, Github, Laptop, Moon, Sun } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ThemeSelector() {
  const { theme, setTheme } = useCodeEditorStore()
  const currentTheme = THEMES.find((t) => t.id === theme)

  // Theme icons mapping with consistent styling
  const THEME_ICONS: Record<string, React.ReactNode> = {
    "vs-dark": <Moon className="size-4" />,
    "vs-light": <Sun className="size-4" />,
    "github-dark": <Github className="size-4" />,
    monokai: <Laptop className="size-4" />,
    "solarized-dark": <Cloud className="size-4" />,
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="relative group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800/50 transition-all duration-300">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3"
        >
          <Palette className="size-4 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300" />

          <SelectValue asChild>
            <span className="text-zinc-300 font-medium tracking-wide">
              {currentTheme?.label}
            </span>
          </SelectValue>

          <motion.div
            className="relative size-5"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="absolute inset-0 rounded-full blur-sm opacity-50 transition-colors duration-300"
              style={{ background: currentTheme?.color }}
            />
            <div
              className="relative size-full rounded-full border border-zinc-700/50 transition-colors duration-300"
              style={{ background: currentTheme?.color }}
            />
          </motion.div>
        </motion.div>
      </SelectTrigger>

      <SelectContent className="w-72 border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl rounded-xl shadow-2xl">
        <SelectGroup className="p-2">
          <SelectLabel className="px-2 py-1.5 text-xs font-medium text-zinc-400 select-none">
            Select Theme
          </SelectLabel>

          {THEMES.map((t) => (
            <SelectItem
              key={t.id}
              value={t.id}
              className={cn(
                "relative group flex items-center gap-3 rounded-lg px-2 py-2.5 text-zinc-300",
                "hover:bg-zinc-800/50 focus:bg-zinc-800/50 transition-colors duration-200",
                "data-[state=checked]:bg-zinc-800"
              )}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 relative z-10"
              >
                {/* Theme Icon */}
                <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
                  {THEME_ICONS[t.id] || <CircleOff className="size-4" />}
                </span>

                {/* Theme Label */}
                <span className="font-medium tracking-wide">{t.label}</span>

                {/* Color indicator */}
                <motion.div
                  className="relative size-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="absolute inset-0 rounded-full blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ background: t.color }}
                  />
                  <div
                    className="relative size-full rounded-full border border-zinc-700/50 transition-transform duration-300"
                    style={{ background: t.color }}
                  />
                </motion.div>
              </motion.div>

              {/* Active state indicator */}
              {theme === t.id && (
                <motion.div
                  layoutId="active-theme"
                  className="absolute inset-0 rounded-lg border border-zinc-700/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
