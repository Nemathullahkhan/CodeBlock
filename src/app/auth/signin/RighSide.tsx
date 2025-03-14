// "use client"

// import type React from "react"

// import { useEffect, useRef } from "react"
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils"

// interface AnimatedGradientBackgroundProps {
//   className?: string
//   children?: React.ReactNode
//   intensity?: "subtle" | "medium" | "strong"
// }

// interface Beam {
//   x: number
//   y: number
//   width: number
//   length: number
//   angle: number
//   speed: number
//   opacity: number
//   hue: number
//   pulse: number
//   pulseSpeed: number
// }

// function createBeam(width: number, height: number): Beam {
//   const angle = -35 + Math.random() * 10
//   return {
//     x: Math.random() * width * 1.5 - width * 0.25,
//     y: Math.random() * height * 1.5 - height * 0.25,
//     width: 30 + Math.random() * 60,
//     length: height * 2.5,
//     angle: angle,
//     speed: 0.6 + Math.random() * 1.2,
//     opacity: 0.12 + Math.random() * 0.16,
//     hue: 190 + Math.random() * 70,
//     pulse: Math.random() * Math.PI * 2,
//     pulseSpeed: 0.02 + Math.random() * 0.03,
//   }
// }

// export default function BeamsBackground({ className, intensity = "strong" }: AnimatedGradientBackgroundProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const beamsRef = useRef<Beam[]>([])
//   const animationFrameRef = useRef<number>(0)
//   const MINIMUM_BEAMS = 20

//   const opacityMap = {
//     subtle: 0.7,
//     medium: 0.85,
//     strong: 1,
//   }

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const updateCanvasSize = () => {
//       const dpr = window.devicePixelRatio || 1
//       canvas.width = window.innerWidth * dpr
//       canvas.height = window.innerHeight * dpr
//       canvas.style.width = `${window.innerWidth}px`
//       canvas.style.height = `${window.innerHeight}px`
//       ctx.scale(dpr, dpr)

//       const totalBeams = MINIMUM_BEAMS * 1.5
//       beamsRef.current = Array.from({ length: totalBeams }, () => createBeam(canvas.width, canvas.height))
//     }

//     updateCanvasSize()
//     window.addEventListener("resize", updateCanvasSize)

//     function resetBeam(beam: Beam, index: number, totalBeams: number) {
//       if (!canvas) return beam

//       const column = index % 3
//       const spacing = canvas.width / 3

//       beam.y = canvas.height + 100
//       beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
//       beam.width = 100 + Math.random() * 100
//       beam.speed = 0.5 + Math.random() * 0.4
//       beam.hue = 190 + (index * 70) / totalBeams
//       beam.opacity = 0.2 + Math.random() * 0.1
//       return beam
//     }

//     function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
//       ctx.save()
//       ctx.translate(beam.x, beam.y)
//       ctx.rotate((beam.angle * Math.PI) / 180)

//       // Calculate pulsing opacity
//       const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity]

//       const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

//       // Enhanced gradient with multiple color stops
//       gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`)
//       gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
//       gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
//       gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
//       gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
//       gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`)

//       ctx.fillStyle = gradient
//       ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
//       ctx.restore()
//     }

//     function animate() {
//       if (!canvas || !ctx) return

//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       ctx.filter = "blur(35px)"

//       const totalBeams = beamsRef.current.length
//       beamsRef.current.forEach((beam, index) => {
//         beam.y -= beam.speed
//         beam.pulse += beam.pulseSpeed

//         // Reset beam when it goes off screen
//         if (beam.y + beam.length < -100) {
//           resetBeam(beam, index, totalBeams)
//         }

//         drawBeam(ctx, beam)
//       })

//       animationFrameRef.current = requestAnimationFrame(animate)
//     }

//     animate()

//     return () => {
//       window.removeEventListener("resize", updateCanvasSize)
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current)
//       }
//     }
//   }, [intensity])

//   return (
//     <div className={cn("relative min-h-screen w-full overflow-hidden bg-neutral-950", className)}>
//       <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: "blur(15px)" }} />

//       <motion.div
//         className="absolute inset-0 bg-neutral-950/5"
//         animate={{
//           opacity: [0.05, 0.15, 0.05],
//         }}
//         transition={{
//           duration: 10,
//           ease: "easeInOut",
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//         style={{
//           backdropFilter: "blur(50px)",
//         }}
//       />

//       <div className="relative z-10 flex h-screen w-full items-center justify-center">
//         <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
//           <motion.h1
//             className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Upskill Yourself 
//             <br />
//              Today
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-2xl lg:text-3xl text-white/70 tracking-tighter"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Start your journey today
//           </motion.p>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { motion } from "framer-motion"
import { type RefObject, useEffect, useId, useState } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        const controlY = startY - curvature
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
        setPathD(d)
      }
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (const entry of entries) {
        updatePath()
      }
    })

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Call the updatePath initially to set the initial path
    updatePath()

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0"></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}

