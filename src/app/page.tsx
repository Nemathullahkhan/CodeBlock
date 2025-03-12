"use client";

import { Button } from "@/components/ui/button";
import { Codesandbox } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-800 pb-16">
        <div className="w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div className="space-y-4 mx-40">
              {/* Header section */}

              <div className="flex justify-between mb-4">
                <div className="flex gap-2 items-center ">
                  <Codesandbox className="w-8 h-8" />
                  <span className="text-xl font-sans font-medium">
                    CodeBlock
                  </span>
                </div>
                <Button className="font-extralight bg-transparent/90 hover:text-black rounded-full px-6 h-8 text-primary">
                  Signin
                </Button>
              </div>

              {/* Hero section */}
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mt-10">
                  Code, Learn, Grow
                </h1>
                <p className="mt-4 text-sm text-zinc-400 ">
                  Your ultimate learning platform for your coding journey. 
                  Maintain track of your progress
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 text-center"
              >
                <Link href={"/auth/signup"}>
                  <Button className="bg-gradient-to-tl from-zinc-950/90 to-zinc-700/80 px-8 py-5 text-sm rounded-full border-2 border-zinc-300/10 h-8  font-semibold text-white hover:scale-105 transition-all hover:bg-zinc-700/30">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
