"use client"

import Link from "next/link"
import { LoadingButton } from "@/components/ui/loading-button"
import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <div className="relative py-24 overflow-hidden bg-black">
      {/* Gradient Background Similar to Hero */}
      <div className="absolute mx-16 max-w-7xl inset-0 bg-gradient-to-b from-zinc-800/20 via-blue-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-60" />
      
      {/* Animated Gradient Blobs Similar to Hero */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-zinc-800/20 via-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0], 
          y: [0, 15, 0],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 max-w-7xl bg-gradient-to-r from-zinc-800/20 via-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -20, 0], 
          y: [0, 20, 0],
          opacity: [0.1, 0.12, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-zinc-950/40 backdrop-blur-md border border-zinc-800/80 rounded-xl p-8 lg:p-10 overflow-hidden relative"
        >
          

          <div className="relative">
            {/* Label Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="px-3 py-1 bg-zinc-800/80 text-zinc-400 text-xs font-medium rounded-full inline-block mb-4 border border-zinc-700/50">
                FOR STUDENTS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            >
              <span>Learn. Code. Grow.</span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-zinc-400 mb-6 max-w-2xl text-sm"
            >
              Kickstart your coding journey with interactive lessons and hands-on projects designed specifically for
              students.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <Link href="/auth/signup">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <LoadingButton className="px-6 h-10 rounded-md bg-white hover:bg-zinc-200 text-black border-0">
                    Start Learning
                  </LoadingButton>
                </motion.div>
              </Link>

              <Link href="/playground">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <LoadingButton
                    className="px-6 h-10 rounded-md border border-zinc-700 bg-transparent hover:bg-zinc-800/50 text-white"
                  >
                    Try Playground
                  </LoadingButton>
                </motion.div>
              </Link>
            </motion.div>

            {/* Course Features */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <span className="text-zinc-500 text-xs">Interactive Exercises</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-zinc-500 text-xs">Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                <span className="text-zinc-500 text-xs">Practical Projects</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

