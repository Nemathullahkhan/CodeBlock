"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, BookOpen, ChevronRight, Play  } from "lucide-react"

const features = [
  {
    id: "ide",
    icon: <Code2 className="w-7 h-7" />,
    title: "Advanced Code Editor",
    description: "Multi-language support with real-time syntax highlighting, error detection, and intelligent code completion.",
    color: "from-emerald-400 to-zinc-500",
    bgColor: "from-emerald-500/10 to-zinc-600/10",
    highlights: [
      "Multiple programming language support",
      "Real-time error detection",
      "Intelligent code completion",
      "Custom themes and font settings"
    ],
    demo: {
      type: "editor",
      content: "def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)"
    }
  },
  {
    id: "learning",
    icon: <BookOpen className="w-7 h-7" />,
    title: "Interactive Learning",
    description: "Comprehensive curriculum with hands-on practice, visual explanations, and instant feedback.",
    color: "from-zinc-400 to-emerald-500",
    bgColor: "from-zinc-500/10 to-emerald-500/10",
    highlights: [
      "Structured learning paths",
      "Visual algorithm explanations",
      "Practice problems",
      "Progress tracking"
    ],
    demo: {
      type: "curriculum",
      content: "Module: Graph Algorithms\nTopic: Shortest Path\nConcept: Floyd-Warshall\nDifficulty: Medium"
    }
  },
  {
    id: "testing",
    icon: <Play className="w-7 h-7" />,
    title: "Test Case Verification",
    description: "Validate your solutions against multiple test cases with detailed performance metrics and analysis.",
    color: "from-emerald-400 to-zinc-500",
    bgColor: "from-emerald-500/10 to-zinc-600/10",
    highlights: [
      "Multiple test case validation",
      "Performance metrics",
      "Memory usage analysis",
      "Time complexity evaluation"
    ],
    demo: {
      type: "testcase",
      content: "Test Case #1: Input = [64, 34, 25, 12, 22, 11, 90]\nExpected: [11, 12, 22, 25, 34, 64, 90]\nOutput: [11, 12, 22, 25, 34, 64, 90]\nStatus: ✓ Passed"
    }
  }
]

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  const currentFeature = features.find((f) => f.id === activeFeature) || features[0]

  return (
    <div className="relative py-24 overflow-hidden bg-black">
      {/* Dynamic background effects */}
      <div className="absolute max-w-7xl inset-0 bg-gradient-to-r from-zinc-500/20 to-blue-500/20 rounded-3xl blur-3xl opacity-70" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 20, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.12, 0.1],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="h-px w-8 bg-zinc-700"></div>
              <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Platform Features</span>
              <div className="h-px w-8 bg-zinc-700"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">Complete Environment to get you started</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-zinc-400 mt-4 max-w-2xl mx-auto"
          >
            A comprehensive platform combining powerful development tools with interactive learning experiences
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Feature Cards */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div
                  className={`relative p-6 border ${activeFeature === feature.id
                    ? "border-zinc-700/50 bg-zinc-900/80 backdrop-blur-xl"
                    : "border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/50"
                  } rounded-xl backdrop-blur-sm transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.bgColor}`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        {feature.title}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 ${activeFeature === feature.id ? "rotate-90" : ""}`}
                        />
                      </h3>
                      <p className="text-zinc-400 text-sm">{feature.description}</p>
                      
                      {activeFeature === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2"
                        >
                          {feature.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`} />
                              {highlight}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {activeFeature === feature.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Feature Demo */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl">
                  {/* Demo Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/80">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentFeature.color}`}></div>
                        <span className="text-xs text-zinc-400">{currentFeature.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Demo Content */}
                  <div className="p-6 font-mono text-sm">
                    <pre className="text-zinc-300 whitespace-pre-wrap">
                      {currentFeature.demo.content}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

