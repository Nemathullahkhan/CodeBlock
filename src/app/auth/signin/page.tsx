"use client";

import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { AnimatedBeam } from "./RighSide";
import { motion } from "framer-motion";
import { Binary, LoaderCircle } from "lucide-react"; // Lucide icons for the logos
import { FaCuttlefish, FaJava, FaPython } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SignInPage = ({ searchParams }: Props) => {
  const {  status } = useSession();
  const router = useRouter();

  // Refs for the logos
  const cLogoRef = useRef<HTMLDivElement>(null);
  const cppLogoRef = useRef<HTMLDivElement>(null);
  const javaLogoRef = useRef<HTMLDivElement>(null);
  const pythonLogoRef = useRef<HTMLDivElement>(null);
  const machineLogoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Redirect if the user is already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center">
    <LoaderCircle className="w-12 h-12 text-white animate-spin" />
  </div>
  }

  return (
    <>
      <div className="grid grid-cols-2 items-center justify-center min-h-screen">
        {/* Left Side: Sign In Form */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-sans m-1 font-semibold">Sign In</h1>
          <span className="text-sm font-sans tracking-tight">
            New user? Try{" "}
            <Link href={"/auth/signup"} className="text-blue-400">
              signup
            </Link>
          </span>
          <SignInForm callbackUrl={searchParams.callbackUrl} />
          <Link href={"/auth/forgotPass"} className="text-sm text-zinc-400">
            Forgot Your Password?
          </Link>
        </div>

        {/* Right Side: Logos and Animated Beams */}
        <div className="min-h-screen items-center flex justify-center ">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-zinc-950/20 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-2">
                  <div
                    ref={containerRef}
                    className="relative w-[400px] h-[200px] flex items-center justify-center mt-28 " // Smaller and concise container
                  >
                    {/* Logos */}
                    <div
                      ref={cLogoRef}
                      className="absolute left-10 top-10 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white"
                    >
                      <FaCuttlefish size={36} /> {/* C Logo */}
                    </div>
                    <div
                      ref={cppLogoRef}
                      className="absolute right-10 top-10 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white"
                    >
                      <FaPython size={36} />
                    </div>
                    <div
                      ref={javaLogoRef}
                      className="absolute left-10 bottom-10 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white"
                    >
                      {/* Java Logo */}
                      <SiCplusplus size={36} /> {/* C++ Logo */}
                    </div>
                    <div
                      ref={pythonLogoRef}
                      className="absolute right-10 bottom-10 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white"
                    >
                      <FaJava size={36} /> {/* Python Logo */}
                    </div>
                    <div
                      ref={machineLogoRef}
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white"
                    >
                      <Binary
                        size={40}
                        className="text-green-600 font-extralight"
                      />{" "}
                      {/* Machine Language Logo */}
                    </div>

                    {/* Animated Beams */}
                    <AnimatedBeam
                      containerRef={containerRef}
                      fromRef={cLogoRef}
                      toRef={machineLogoRef}
                      duration={3}
                      curvature={20}
                      pathWidth={4} // Increased beam width
                    />
                    <AnimatedBeam
                      containerRef={containerRef}
                      fromRef={cppLogoRef}
                      toRef={machineLogoRef}
                      duration={3}
                      curvature={20}
                      pathWidth={4} // Increased beam width
                    />
                    <AnimatedBeam
                      containerRef={containerRef}
                      fromRef={javaLogoRef}
                      toRef={machineLogoRef}
                      duration={3}
                      curvature={20}
                      pathWidth={4} // Increased beam width
                    />
                    <AnimatedBeam
                      containerRef={containerRef}
                      fromRef={pythonLogoRef}
                      toRef={machineLogoRef}
                      duration={3}
                      curvature={20}
                      pathWidth={4} // Increased beam width
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;