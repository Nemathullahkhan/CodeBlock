import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <div className="relative py-32 overflow-hidden bg-zinc-950/10">
      {/* Gradient Background Similar to Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 blur-3xl"></div>
      
      {/* Animated Gradient Blobs Similar to Hero */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 20, 0], 
          y: [0, 15, 0],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 20, 0],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 lg:p-16 backdrop-blur-md overflow-hidden relative"
        >
          {/* Similar Border Gradient as in Hero */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-blue-500/20"></div>
          
          <div className="relative">
            {/* Label Tag with Hero Colors */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full inline-block mb-6 border border-emerald-500/20">
                FOR STUDENTS
              </span>
            </motion.div>

            {/* Main Heading with Gradient Matching Hero */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-primary">Learn.</span>{" "}
              <span className="text-primary">Code.</span>{" "}
              <span className="text-primary">Grow.</span>
            </motion.h2>

            {/* Subheading - Styled like the hero section */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-zinc-300 mb-10 max-w-2xl mx-auto text-md px-4"
            >
              Kickstart your coding journey with interactive lessons and hands-on projects designed specifically for students. Track your progress and master programming with interactive challenges.
            </motion.p>

            {/* CTA Buttons Matching Hero Style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-5 justify-center px-10"
            >
              <Link href="/auth/signup">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline"
                    className="px-10 h-12 rounded-full border-x-8 border-x-emerald-500/30 border-emerald-400 border text-white"
                  >
                    Start Learning
                  </Button>
                </motion.div>
              </Link>

              <Link href="/playground">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="px-10 h-12 rounded-full border-x-8 border-x-slate-500/30 border-slate-500 border text-white"
                  >
                    Try Playground
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Course Features with Hero-matching style */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-zinc-400 text-sm">Interactive Exercises</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-zinc-400 text-sm">Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-zinc-400 text-sm">Practical Projects</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}