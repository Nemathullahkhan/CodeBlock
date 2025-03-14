"use client";

import { Button } from "@/components/ui/button";
import {
  Code2,
  Codesandbox,
  Laptop2,
  LoaderCircle,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_CONFIG, THEMES } from "./(root)/_constants";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState } from "react";
import FeaturesSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const {status} = useSession();
  const { language, theme, setTheme } = useCodeEditorStore();
  const [fontSize, setFontSize] = useState(14);
  const [fontSizePercentage, setFontSizePercentage] = useState(50);

  // Update font size based on percentage slider
  const handleFontSizeChange = (percentage:string) => {
    const newPercentage = parseInt(percentage);
    setFontSizePercentage(newPercentage);
    // Map percentage (0-100) to font size range (10-24)
    const newFontSize = 10 + (newPercentage / 100) * 14;
    setFontSize(Math.round(newFontSize));
  };
;

  return (
    <>
    { status === "loading" ? (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center">
        <LoaderCircle className="w-12 h-12 text-white animate-spin" />
      </div>
    ): status === "authenticated" ? (
      redirect("/home")
    ):(
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Codesandbox className="w-8 h-8 text-zinc-300" />
              <span className="text-2xl font-sans  font-semibold bg-gradient-to-b from-white to-zinc-300/90 bg-clip-text text-transparent">
                CodeBlock
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/playground"
                className="text-md font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Online IDE
              </Link>
              <Link href="/auth/signin">
                <Button className="rounded-full px-4 font-medium bg-zinc-200 text-emerald-950 tracking-tighter h-5 border-x-8 border-x-emerald-500/30 border-emerald-400/30 border ">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
              >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                <span className="text-primary">Code,</span>{" "}
                <span className="text-primary">Learn,</span>{" "}
                <span className="text-primary">Grow.</span>
              </h1>
              <p className="text-md px-4 text-zinc-300 max-w-xl">
                Your ultimate platform for coding excellence. Write, compile,
                and learn with our powerful online IDE. Track your progress and
                master programming with interactive challenges.
              </p>
              <div className="flex gap-4 px-10">
                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    className="px-10 h-7  rounded-full border-x-8 border-x-emerald-500/30 border-emerald-400 border"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/playground">
                  <Button
                    variant="outline"
                    className="px-3 h-7 rounded-full border-x-8 border-x-slate-500/30 border-slate-500 border"
                  >
                    Try Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
                    <p className="text-xs text-zinc-400">Program</p>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm font-mono">
                      <code className="text-emerald-400">
                        {`// Your coding journey starts here
  #include<stdio.h>
    function greet() {
      printf("Hi, How are you?");
    }
      int main(){
        greet();
        }
        `}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

        
      {/* Editor Features Section (New) */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-zinc-300 inline-block">
              Powerful Code Editor
            </h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Our state-of-the-art editor is designed to help you write better
              code faster
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {[
                {
                  title: "Syntax Highlighting",
                  description:
                    "Visualize your code with vivid syntax highlighting that makes reading and understanding code easier.",
                  icon: <Code2 className="w-5 h-5 text-zinc-500" />,
                },
                {
                  title: "Error Detection",
                  description:
                    "Identify issues before they become problems with real-time error checking and suggestions.",
                  icon: <Settings className="w-5 h-5  text-zinc-500" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="bg-zinc-800/50 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative w-full aspect-video max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
                    <div className="text-xs text-zinc-500 ml-2">main.py</div>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm font-mono">
                      <code>
                        <span className="text-purple-400">def</span>{" "}
                        <span className="text-blue-400">calculate_average</span>
                        <span className="text-zinc-300">(numbers):</span>
                        <br />
                        <span className="text-zinc-500 pl-4">
                          Calculate the average of a list of numbers.
                        </span>
                        <br />
                        <span className="text-zinc-300 pl-4">total = </span>
                        <span className="text-orange-400">sum</span>
                        <span className="text-zinc-300">(numbers)</span>
                        <br />
                        <span className="text-zinc-300 pl-4">count = </span>
                        <span className="text-orange-400">len</span>
                        <span className="text-zinc-300">(numbers)</span>
                        <br />
                        <span className="text-zinc-300 pl-4"></span>
                        <span className="text-purple-400">return</span>
                        <span className="text-zinc-300"> total / count</span>
                        <br />
                        <br />
                        <span className="text-zinc-500"># Example usage</span>
                        <br />
                        <span className="text-emerald-400">data</span>
                        <span className="text-zinc-300"> = [</span>
                        <span className="text-yellow-400">
                          12, 33, 45, 67, 89
                        </span>
                        <span className="text-zinc-300">]</span>
                        <br />
                        <span className="text-emerald-400">result</span>
                        <span className="text-zinc-300">
                          {" "}
                          = calculate_average(data)
                        </span>
                        <br />
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Customization Section (New) */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
                    <div className="text-xs text-zinc-500">Settings</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                          Theme
                        </label>
                        <div className="flex gap-2">
                          {THEMES.slice(0, 2).map((themeOption) => (
                            <div
                              key={themeOption.id}
                              onClick={() => setTheme(themeOption.id)}
                              className={`w-8 h-8 rounded-full cursor-pointer ${
                                theme === themeOption.id
                                  ? "border-2 border-emerald-500"
                                  : "border border-zinc-700"
                              }`}
                              style={{ backgroundColor: themeOption.color }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                          Font Size: {fontSize}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={fontSizePercentage}
                          onChange={(e) => handleFontSizeChange(e.target.value)}
                          className="w-full h-2 bg-zinc-800 rounded-full appearance-none"
                          style={{
                            backgroundImage: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${fontSizePercentage}%, rgb(39, 39, 42) ${fontSizePercentage}%, rgb(39, 39, 42) 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monaco Editor */}
                <Editor
                  className="mt-5"
                  theme={theme}
                  language={LANGUAGE_CONFIG[language].monacoLanguage}
                  height="200px"
                  defaultValue={`#include<stdio.h>\nint main(){\n  printf("Try changing the theme\\n");\n  return 0;\n}`}
                  options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    renderWhitespace: "selection",
                    fontFamily:
                      '"Fira Code","Cascadia Code",Consolas, monospace',
                    fontLigatures: true,
                    fontSize: fontSize,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    contextmenu: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    roundedSelection: true,
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                    },
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 order-1 lg:order-2"
            >
              <h2 className="text-5xl font-bold text-zinc-300">
                Personalize Your Experience
              </h2>
              <p className="text-lg text-zinc-400">
                Make CodeBlock truly yours with extensive customization options.
                Tailor the environment to match your workflow and preferences.
              </p>

              {[
                {
                  title: "Custom Themes",
                  description:
                    "Choose from a variety of editor themes or create your own to reduce eye strain and enhance focus.",
                  icon: <Settings className="w-5 h-5 text-zinc-500" />,
                },
                {
                  title: "Keyboard Shortcuts",
                  description:
                    "Configure keybindings to match your favorite editor, boosting your productivity instantly.",
                  icon: <Laptop2 className="w-5 h-5 text-zinc-500" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="bg-zinc-800/50 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <FeaturesSection />

      <CTASection />

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Codesandbox className="w-6 h-6 text-emerald-500" />
                <span className="text-lg font-medium text-white">
                  CodeBlock
                </span>
              </div>
              <p className="text-zinc-400">
                Your ultimate platform for coding excellence.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Tutorials", "Changelog"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            

          <div className="border-t border-zinc-800/50 mt-12 pt-8 text-center text-zinc-500">
            <p>© {new Date().getFullYear()} CodeBlock. All rights reserved.</p>
          </div>
          </div>
        </div>
      </footer>
    </div>
    )}
  
    </>
  );
}
