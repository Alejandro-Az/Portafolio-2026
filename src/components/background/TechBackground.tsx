import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type TechBackgroundProps = {
  className?: string
  animated?: boolean
}

export function TechBackground({ className, animated = true }: TechBackgroundProps) {
  const reduce = useReducedMotion()

  const shouldAnimate = animated && !reduce

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#10233F] via-[#0B1426] to-[#070A12]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(56,189,248,0.20),transparent_55%),radial-gradient(circle_at_82%_20%,rgba(168,85,247,0.16),transparent_60%),radial-gradient(circle_at_50%_90%,rgba(197,160,89,0.14),transparent_60%)]" />

      <div
        className="
          absolute inset-0 opacity-[0.16]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_76%)]
        "
      />

      <motion.div
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
        animate={
          shouldAnimate
            ? { x: [0, 60, 12], y: [0, 26, 0], scale: [1, 1.08, 1] }
            : undefined
        }
        transition={
          shouldAnimate
            ? { duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : undefined
        }
      />

      <motion.div
        className="absolute top-24 -right-28 h-96 w-96 rounded-full bg-violet-500/16 blur-3xl"
        animate={
          shouldAnimate
            ? { x: [0, -70, -16], y: [0, 34, 0], scale: [1, 1.06, 1] }
            : undefined
        }
        transition={
          shouldAnimate
            ? { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : undefined
        }
      />

      <motion.div
        className="absolute bottom-[-140px] left-1/3 h-[520px] w-[520px] rounded-full bg-[#C5A059]/14 blur-3xl"
        animate={shouldAnimate ? { y: [0, -40, 0], scale: [1, 1.05, 1] } : undefined}
        transition={
          shouldAnimate
            ? { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : undefined
        }
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}
