import { Card, CardContent } from "@/components/ui/card";
import { Code2, Globe2, Terminal, Laptop2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Code2 className="w-8 h-8 text-emerald-400 drop-shadow-neon" />,
    title: "Modern IDE",
    description:
      "Feature-rich code editor with syntax highlighting and intelligent code completion.",
  },
  {
    icon: <Globe2 className="w-8 h-8 text-blue-400 drop-shadow-neon" />,
    title: "Multiple Languages",
    description:
      "Support for popular programming languages including Python, Java, C++, and more.",
  },
  {
    icon: <Terminal className="w-8 h-8 text-purple-400 drop-shadow-neon" />,
    title: "Real-time Compilation",
    description:
      "Instant code compilation and execution with detailed error reporting.",
  },
  {
    icon: <Laptop2 className="w-8 h-8 text-pink-400 drop-shadow-neon" />,
    title: "Interactive Learning",
    description:
      "Practice with coding challenges and track your progress as you learn.",
  },
];

export default function FeaturesSection() {
  return (
    <div className="relative py-24 bg-zinc-950/10 text-white">
      {/* Subtle Neon Glow Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-950/10 via-rose-950/10 to-indigo-950/40 blur-3xl"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-black blur-3xl opacity-20"></div> */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-zinc-300 inline-block">
            Why Choose CodeBlock?
          </h1>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900 border border-zinc-800/60 shadow-lg shadow-emerald-500/10 hover:border-emerald-500/50 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  {/* Icon with Neon Effect */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-zinc-800/60 backdrop-blur-md mb-4">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-zinc-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
