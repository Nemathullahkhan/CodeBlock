// "use client";
// import { motion } from "framer-motion";
// import { FaCuttlefish, FaPython, FaJava } from "react-icons/fa";
// import { SiCplusplus } from "react-icons/si";
// import SignUpForm from "@/app/components/SignUpForm";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { LoaderCircle } from "lucide-react";

// const languages = [
//   { icon: <FaCuttlefish />, color: "text-blue-300", delay: 0 },
//   { icon: <SiCplusplus />, color: "text-red-400", delay: 1 },
//   { icon: <FaPython />, color: "text-yellow-300", delay: 2 },
//   { icon: <FaJava />, color: "text-orange-500", delay: 3 },
// ];

// const SignUpPage = () => {
//   const { status } = useSession();
//   return (
//     <>
//       {status === "loading" ? (
//         <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center">
//           <LoaderCircle className="w-12 h-12 text-white animate-spin" />
//         </div>
//       ) : status === "authenticated" ? (
//         redirect("/home")
//       ) : (
//         <div className="grid grid-cols-[60%_40%] items-center justify-center min-h-screen bg-black text-white">
//           {/* Left Section: Sign-Up Form */}
//           <div className="flex flex-col items-center px-4 ">
//             <h1 className="text-3xl font-sans m-1 font-semibold">Sign Up</h1>
//             <span className="text-sm font-sans tracking-tight mb-2">
//               Already have an account?{" "}
//               <Link href="/auth/signin" className="text-blue-400 ">
//                 Sign in
//               </Link>
//             </span>
//             <SignUpForm />
//           </div>

//           {/* Right Section: Computing Core with Orbiting Languages */}
//           <div className="w-full min-h-screen flex justify-center items-center relative overflow-hidden bg-transparent">
//             {/* Neon Light Shadow Background */}
//             <div
//               className="absolute inset-0 bg-transparent"
//               style={{
//                 boxShadow:
//                   "0 0 20px 10px rgba(0, 255, 255, 0.5), 0 0 40px 20px rgba(255, 0, 255, 0.3)",
//               }}
//             ></div>

//             {/* Hexagonal Computing Shape (Machine Code Processor) */}
//             <div
//               className="w-32 h-32 bg-transparent border-4 border-cyan-600 absolute rotate-45 shadow-lg flex items-center justify-center"
//               style={{
//                 boxShadow: "0 0 20px 5px rgba(0, 255, 255, 0.7)",
//               }}
//             >
//               <motion.div
//                 className="w-12 h-12 bg-cyan-400 rounded-md flex items-center justify-center text-black font-bold"
//                 animate={{ rotate: [-30, 30, -30] }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 style={{
//                   boxShadow: "0 0 10px 2px rgba(0, 255, 255, 0.8)",
//                 }}
//               >
//                 CPU
//               </motion.div>
//             </div>

//             {/* Languages moving in a circular orbit */}
//             {languages.map(({ icon, delay }, index) => (
//               <motion.div
//                 key={index}
//                 className={`text-3xl border-rose-700 text-white absolute`}
//                 animate={{
//                   x: [50, -50, -50, 50, 50],
//                   y: [-50, -50, 50, 50, -50],
//                   rotate: [0, 360],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   ease: "linear",
//                   delay,
//                 }}
//                 style={{
//                   filter: "drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))",
//                 }}
//               >
//                 {icon}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SignUpPage;


"use client";
import SignUpForm from "@/app/components/SignUpForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { LampDemo } from "@/components/ui/lampdemo";



const SignUpPage = () => {
  const { status } = useSession();
  
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 text-zinc-400 animate-spin" />
      </div>
    );
  }
  
  if (status === "authenticated") {
    return redirect("/home");
  }
  
  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Left Section: Sign-Up Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Create an account</h1>
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
          
          {/* Added proper spacing and container for the form */}
          <div className="space-y-6">
            <SignUpForm />
          </div>
        </div>
      </div>
      {/* Right Section: Animated Background */}
      <div className="w-3/4">
        <LampDemo/>
      </div>

      

      
    </div>
  );
};

export default SignUpPage;