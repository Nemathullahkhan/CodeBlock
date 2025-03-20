"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Codesandbox,
  Laptop2,
  LoaderCircle,
  Settings,
  ChevronRight,
  Terminal,
  Zap,
  ExternalLink,
  Heart,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_CONFIG, THEMES } from "./(root)/_constants";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import FeaturesSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const { language, theme, setTheme } = useCodeEditorStore();
  const [fontSize, setFontSize] = useState(14);
  const [fontSizePercentage, setFontSizePercentage] = useState(50);
  const [isScrolled, setIsScrolled] = useState(false);
 
  // Update font size based on percentage slider
  const handleFontSizeChange = (percentage: string) => {
    const newPercentage = Number.parseInt(percentage);
    setFontSizePercentage(newPercentage);
    // Map percentage (0-100) to font size range (10-24)
    const newFontSize = 10 + (newPercentage / 100) * 14;
    setFontSize(Math.round(newFontSize));
  };

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Sample code for editor
  const sampleCode = `// Your coding journey starts here
#include<stdio.h>

function greet() {
  printf("Hello, welcome to CodeBlock!");
}

int main() {
  greet();
  return 0;
}`;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoaderCircle className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (status === "authenticated") {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.12, 0.1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Code pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute font-mono text-xs text-emerald-500/50 whitespace-nowrap transform transition-all duration-1000 ease-out animate-float-code"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {`${Math.random().toString(36).substring(2, 7)}`}
            </div>
          ))}
        </div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-zinc-800/50 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Codesandbox className="w-8 h-8 text-white" />
              <span className="text-2xl font-sans font-semibold text-white">
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

      {/* Sun rays dimming effect based on scroll */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const sunRays = document.querySelectorAll('.sun-rays');
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            
            window.addEventListener('scroll', () => {
              const scrollPercentage = Math.min(window.scrollY / (maxScroll * 0.4), 1);
              const opacity = Math.max(0.15 - (scrollPercentage * 0.15), 0);
              
              sunRays.forEach(ray => {
                ray.style.opacity = opacity;
              });
            });
          });
        `,
        }}
      />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
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
      <div className="py-24 relative overflow-hidden">
        {/* Subtle gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div> */}
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
     
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
               <div className="absolute max-w-7xl inset-0 bg-gradient-to-r from-zinc-500/20 to-blue-500/20 rounded-3xl blur-3xl opacity-70" />
            <h2 className="text-4xl sm:text-6xl tracking-tight font-bold text-white mb-4">
              Learn Programming Languages
            </h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Master popular programming languages with our structured
              curriculum
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Python",
                desc: "Beginner Friendly",
                img: "/python.png",
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                name: "Java",
                desc: "Object Oriented",
                img: "/java.png",
                color: "from-orange-500/20 to-red-500/20",
              },
              {
                name: "C++",
                desc: "Performance Focused",
                img: "/cpp.png",
                color: "from-blue-500/20 to-indigo-500/20",
              },
              {
                name: "C",
                desc: "Fundamentally Strong",
                img: "/c.png",
                color: "from-zinc-500/20 to-zinc-400/20",
              },
            ].map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-xl bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-800/50"
              >
                {/* Card gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${lang.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>

                <div className="p-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg border border-zinc-700/50 shadow-lg">
                      <img
                        src={lang.img || "/placeholder.svg?height=40&width=40"}
                        alt={lang.name}
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                        {lang.name}
                      </h3>
                      <p className="text-sm text-zinc-400">{lang.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Animated border on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Features Section */}
      <div className="py-24 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute max-w-7xl px-10 my-10 inset-0 bg-gradient-to-r from-zinc-500/20 to-emerald-500/40 rounded-3xl blur-3xl opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  gradient: "from-yellow-500/20 to-amber-500/20",
                },
                {
                  title: "Error Detection",
                  description:
                    "Identify issues before they become problems with real-time error checking and suggestions.",
                  icon: <Settings className="w-6 h-6 text-rose-400" />,
                  gradient: "from-rose-500/20 to-pink-500/20",
                },
                {
                  title: "Intelligent Autocomplete",
                  description:
                    "Write code faster with context-aware suggestions and completions as you type.",
                  icon: <Zap className="w-6 h-6 text-blue-400" />,
                  gradient: "from-blue-500/20 to-indigo-500/20",
                },
                {
                  title: "Terminal Integration",
                  description:
                    "Run your code and see results directly in the integrated terminal without leaving the editor.",
                  icon: <Terminal className="w-6 h-6 text-emerald-400" />,
                  gradient: "from-emerald-500/20 to-green-500/20",
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
                    className={`relative w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-800/80 bg-zinc-900/80 backdrop-blur-sm overflow-hidden group-hover:border-zinc-700/80 transition-all duration-300`}
                  >
                    {/* Feature icon gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl tracking-tight font-medium text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {feature.description}
                    </p>
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

      {/* Customization Section */}
      <div className="py-24 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute max-w-7xl mr-24 inset-0 bg-gradient-to-r from-zinc-500/20 to-blue-500/10 rounded-3xl blur-3xl opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-[30px] opacity-70"></div>

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
                Make CodeBlock truly yours with extensive customization options.
                Tailor the environment to match your workflow and preferences.
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
                    <h3 className="text-2xl tracking-tight font-medium text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <FeaturesSection />

      <CTASection />

      <footer className="py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[60%_20%_20%] gap-12">
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Codesandbox className="w-8 h-8 text-white" />
                <span className="text-xl font-medium text-white">
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
