  "use client";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronRight,
  Code2,
  Codesandbox,
  ExternalLink,
  Heart,
  Laptop2,
  Settings,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_CONFIG, THEMES } from "./(root)/_constants";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import FeaturesSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";

export default function LandingPage() {
  const { language, theme, setTheme } = useCodeEditorStore();
  const [fontSize, setFontSize] = useState(14);
  const [fontSizePercentage, setFontSizePercentage] = useState(50);
  const handleFontSizeChange = (percentage: string) => {
    const newPercentage = Number.parseInt(percentage);
    setFontSizePercentage(newPercentage);
    // Map percentage (0-100) to font size range (10-24)
    const newFontSize = 10 + (newPercentage / 100) * 14;
    setFontSize(Math.round(newFontSize));
  };
  const [isScrolled, setIsScrolled] = useState(false);

  const sampleCode = `// Your coding journey starts here
  #include<stdio.h>

  function greet() {
    printf("Hello, welcome to CodeBlock!");
  }

  int main() {
    greet();
    return 0;
  }`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation MenuBar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-zinc-800/50 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Codesandbox className="w-7 h-7 text-white" />
              <span className="text-xl font-sans font-semibold text-white">
                CodeBlock
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/playground"
                className="text-md font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Online IDE
              </Link>
              <Link href="/auth/signin">
                <Button className="rounded-full px-6 py-5 font-medium bg-white text-black hover:bg-zinc-200 transition-colors">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center ">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 pointer-events-none z-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold relative z-10 tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-white block mb-2"
                >
                  Code,
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-white block mb-2"
                >
                  Learn,
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-white block"
                >
                  Grow.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-lg text-zinc-400 max-w-xl leading-relaxed"
              >
                Your ultimate platform for coding excellence. Write, compile,
                and learn with our powerful online IDE. Track your progress and
                master programming with interactive challenges.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/auth/signup">
                  <Button className="px-4 py-4 h-7 rounded-md bg-white text-black transition-all duration-300 text-base font-medium border-0">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/playground">
                  <Button
                    variant="outline"
                    className="px-4 py-4 h-7 rounded-md bg-black text-white backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300 text-base font-medium"
                  >
                    Try Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-[50px] opacity-70" />

                {/* Code editor card */}
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl mt-20">
                  {/* Card header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/80">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <p className="text-xs text-zinc-400 ml-2">main.c</p>
                  </div>

                  {/* Code content */}
                  <div className="p-4">
                    <pre className="text-sm font-mono">
                      <code>
                        <span className="text-purple-400">{"#include"}</span>
                        <span className="text-zinc-300">{"<stdio.h>"}</span>
                        <br />
                        <br />
                        <span className="text-emerald-400">{"void"}</span>
                        <span className="text-blue-400">{" greet"}</span>
                        <span className="text-zinc-300">{"() {"}</span>
                        <br />
                        <span className="text-zinc-300 pl-4">{"  "}</span>
                        <span className="text-blue-400">{"printf"}</span>
                        <span className="text-zinc-300">{"("}</span>
                        <span className="text-green-400">
                          {'"Hello, welcome to CodeBlock!"'}
                        </span>
                        <span className="text-zinc-300">{");"}</span>
                        <br />
                        <span className="text-zinc-300">{"}"}</span>
                        <br />
                        <br />
                        <span className="text-emerald-400">{"int"}</span>
                        <span className="text-blue-400">{" main"}</span>
                        <span className="text-zinc-300">{"() {"}</span>
                        <br />
                        <span className="text-zinc-300 pl-4">{"  "}</span>
                        <span className="text-blue-400">{"greet"}</span>
                        <span className="text-zinc-300">{"();"}</span>
                        <br />
                        <span className="text-zinc-300 pl-4">{"  "}</span>
                        <span className="text-purple-400">{"return"}</span>
                        <span className="text-yellow-400">{" 0"}</span>
                        <span className="text-zinc-300">{";"}</span>
                        <br />
                        <span className="text-zinc-300">{"}"}</span>
                      </code>
                    </pre>
                  </div>

                  {/* Animated cursor */}
                  <div className="absolute bottom-[108px] left-[148px] w-[2px] h-[16px] bg-white/70 animate-blink"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute max-w-7xl inset-0 bg-gradient-to-r from-zinc-800/20 via-blue-500/30 to-zinc-800/20 rounded-3xl blur-3xl opacity-70" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl tracking-tight font-bold text-white  mb-4">
              Learn Programming Languages
            </h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Master popular programming languages with our structured
              curriculum
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <div className="h-px w-8 bg-zinc-700"></div>
              <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
                Supported Languages
              </span>
              <div className="h-px w-8 bg-zinc-700"></div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 px-4 ">
              {[
                {
                  name: "Python",
                  desc: "Beginner Friendly",
                  img: "/python.png",
                  color: "from-emerald-400/10 to-cyan-500/20",
                },
                {
                  name: "C++",
                  desc: "Performance Focused",
                  img: "/cpp.png",
                  color: "from-blue-400/10 to-indigo-500/20",
                },
                {
                  name: "Java",
                  desc: "Object Oriented",
                  img: "/java.png",
                  color: "from-amber-400/10 to-orange-500/20",
                },
                {
                  name: "C",
                  desc: "Fundamentally Strong",
                  img: "/c.png",
                  color: "from-zinc-400/10 to-zinc-500/20",
                },
              ].map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group relative"
                >
                  <div className="aspect-square w-full flex flex-col items-center justify-center p-1">
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full ${lang.color} opacity-0 group-hover:opacity-30 blur-md transition-all duration-500`}
                    />

                    {/* Main circular card */}
                    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center gap-3 rounded-full bg-gradient-to-br from-zinc-900 to-slate-900/10 border border-zinc-800/50 group-hover:border-zinc-700 transition-all duration-300 shadow-lg shadow-black/50">
                      {/* Icon container with subtle ring */}
                      <div className="relative mb-3 p-3 rounded-full bg-zinc-300/10 group-hover:bg-zinc-700/30 transition-colors duration-300">
                        <div
                          className={`absolute inset-0 rounded-full ${lang.color.replace(
                            "10",
                            "30"
                          )} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <img
                          src={lang.img}
                          alt={lang.name}
                          className="w-10 h-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Language name */}
                      <h3 className="text-md font-extralight  text-zinc-400 ">
                        {lang.name}
                      </h3>

                      {/* Description that appears on hover */}
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 text-xs text-zinc-300 bg-zinc-800/90 px-3 py-1 rounded-full border border-zinc-700/50 backdrop-blur-sm whitespace-nowrap"
                      >
                        {lang.desc}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Features Section */}
      <div className="py-24 relative overflow-hidden">
        {/* Subtle gradient background */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute max-w-7xl inset-0 bg-gradient-to-r from-zinc-800/20 via-emerald-500/20 to-zinc-800/20 rounded-3xl blur-3xl opacity-70" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl tracking-tight font-semibold text-white mb-4">
              Powerful Code Editor
            </h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Our state-of-the-art editor is designed to help you write better
              code faster
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  title: "Syntax Highlighting",
                  description:
                    "Visualize your code with vivid syntax highlighting that makes reading and understanding code easier.",
                  icon: <Code2 className="w-6 h-6 text-yellow-400" />,
                  gradient: "from-yellow-500/20 to-amber-500",
                },
                {
                  title: "Error Detection",
                  description:
                    "Identify issues before they become problems with real-time error checking and suggestions.",
                  icon: <Settings className="w-6 h-6 text-rose-400" />,
                  gradient: "from-rose-500/20 to-pink-500",
                },
                {
                  title: "Intelligent Autocomplete",
                  description:
                    "Write code faster with context-aware suggestions and completions as you type.",
                  icon: <Zap className="w-6 h-6 text-blue-400" />,
                  gradient: "from-blue-500/20 to-indigo-500",
                },
                {
                  title: "Terminal Integration",
                  description:
                    "Run your code and see results directly in the integrated terminal without leaving the editor.",
                  icon: <Terminal className="w-6 h-6 text-emerald-400" />,
                  gradient: "from-emerald-500/20 to-green-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex gap-6 group"
                >
                  <div
                    className={`relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-800/80 bg-zinc-900/80 backdrop-blur-sm overflow-hidden group-hover:border-zinc-700/80 transition-all duration-300`}
                  >
                    {/* Feature icon gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10">{feature.icon}</div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-medium text-zinc-100 mb-2 group-hover:text-primary 
                    transition-colors duration-300"
                    >
                      {feature.title}
                    </h3>
                    <p className="text-zinc-500 text-sm">
                      {feature.description}
                    </p>
                    <div
                      className={`absolute inset-0 -mx-4 -my-2 px-4 py-2 rounded-lg bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-video max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl blur-[30px] opacity-70"></div>

                {/* Code editor */}
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/80">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="text-xs text-zinc-500 ml-2">main.py</div>
                  </div>
                  <div className="p-6">
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
                        <span className="text-zinc-500">
                          # Print the result
                        </span>
                        <br />
                        <span className="text-orange-400">printf</span>
                        <span className="text-zinc-300">(</span>
                        <span className="text-green-400">
                          {"The average is:%d"}
                          {",result"}
                        </span>
                        <span className="text-zinc-300">)</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Customization Editor */}
      <div className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-bl from-zinc-800/20 via-blue-500/20 to-zinc-800/20 rounded-xl blur-[30px] opacity-70"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-8 order-1 lg:order-2"
              >
                <h2 className="text-4xl sm:text-6xl tracking-tight font-bold text-white mb-3">
                  Personalize Your Experience
                </h2>
                <p className="text-md text-zinc-400">
                  Make CodeBlock truly yours with extensive customization
                  options. Tailor the environment to match your workflow and
                  preferences.
                </p>

                {[
                  {
                    title: "Custom Themes",
                    description:
                      "Choose from a variety of editor themes or create your own to reduce eye strain and enhance focus.",
                    icon: <Settings className="w-6 h-6 text-purple-400" />,
                    gradient: "from-purple-500/20 to-indigo-500/20",
                  },
                  {
                    title: "Keyboard Shortcuts",
                    description:
                      "Configure keybindings to match your favorite editor, boosting your productivity instantly.",
                    icon: <Laptop2 className="w-6 h-6 text-blue-400" />,
                    gradient: "from-blue-500/20 to-cyan-500/20",
                  },
                  {
                    title: "Code Snippets",
                    description:
                      "Create and save reusable code snippets to speed up your development workflow.",
                    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
                    gradient: "from-emerald-500/20 to-green-500/20",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: -5 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-800/80 bg-zinc-900/80 backdrop-blur-sm overflow-hidden group-hover:border-zinc-700/80 transition-all duration-300">
                      {/* Feature icon gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      ></div>
                      <div className="relative z-10">{feature.icon}</div>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-medium text-zinc-100 mb-2 group-hover:text-primary 
                    transition-colors duration-300"
                      >
                        {feature.title}
                      </h3>
                      <p className="text-zinc-500 text-sm">
                        {feature.description}
                      </p>
                      <div
                        className={`absolute inset-0 -mx-4 -my-2 px-4 py-2 rounded-lg bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative  max-w-lg mx-auto">
                {/* Settings panel */}
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl mb-6">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/80">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="text-xs text-zinc-500">Settings</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-md tracking-tight font-medium text-white">
                          Theme
                        </label>
                        <div className="flex gap-3">
                          {THEMES.slice(0, 2).map((themeOption) => (
                            <div
                              key={themeOption.id}
                              onClick={() => setTheme(themeOption.id)}
                              className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${
                                theme === themeOption.id
                                  ? "ring-2 ring-white scale-110"
                                  : "border border-zinc-700"
                              }`}
                              style={{ backgroundColor: themeOption.color }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white flex justify-between">
                          <span>Font Size: {fontSize}px</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={fontSizePercentage}
                          onChange={(e) => handleFontSizeChange(e.target.value)}
                          className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${fontSizePercentage}%, rgb(39, 39, 42) ${fontSizePercentage}%, rgb(39, 39, 42) 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monaco Editor */}
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl">
                  <Editor
                    theme={theme}
                    language={LANGUAGE_CONFIG[language].monacoLanguage}
                    height="300px"
                    width={"100%"}
                    defaultValue={sampleCode}
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <FeaturesSection />

      <CTASection />

      {/* Footer */}
      <footer className="py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[60%_20%_20%] gap-12">
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Codesandbox className="w-7 h-7 text-white" />
                <span className="text-lg font-medium text-white">
                  CodeBlock
                </span>
              </div>
              <p className="text-slate-400">
                Your ultimate platform for learning to code, practicing, and
                tracking your progress with personalized programs.
              </p>
            </div>

            {/* Resources section */}
            <div>
              <h3 className="text-white font-medium mb-6">
                Learning Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-indigo-400 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Course Modules</span>
                  </a>
                </li>
                <li className="flex">
                  <Link
                    href="/playground"
                    className="text-slate-400 hover:text-indigo-400 flex  items-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Online IDE </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8  text-slate-400 flex flex-col md:flex-row justify-center items-center">
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
