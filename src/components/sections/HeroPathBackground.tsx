import { motion, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.22
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring" as const, duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    }
  },
}

type Props = { loop?: boolean }

export function HeroPathBackground({ loop = false }: Props) {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-100"
    >
      <motion.svg
        className="h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
      >
        <defs>
          {/* Colores HARD-CODED para que SIEMPRE se vea (sin depender del theme) */}
          <linearGradient id="techGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#6366f1" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow suave para vibe tech */}
          <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          fill="none"
          stroke="url(#techGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#heroGlow)"
          opacity="0.95"
        >
          {/* Paths principales */}
          <motion.path
            d="M60 120H320L360 80H540"
            variants={draw}
            custom={0}
            transition={loop ? { repeat: Infinity, repeatDelay: 0.8 } : undefined}
          />
          <motion.path
            d="M140 520V360H300L340 320H520"
            variants={draw}
            custom={1}
            transition={loop ? { repeat: Infinity, repeatDelay: 0.9 } : undefined}
          />
          <motion.path
            d="M760 120H980L1040 180V260"
            variants={draw}
            custom={2}
            transition={loop ? { repeat: Infinity, repeatDelay: 1.0 } : undefined}
          />
          <motion.path
            d="M620 560V420H820L900 340H1140"
            variants={draw}
            custom={3}
            transition={loop ? { repeat: Infinity, repeatDelay: 1.1 } : undefined}
          />
          <motion.path
            d="M420 210H600L660 270H820"
            variants={draw}
            custom={4}
            transition={loop ? { repeat: Infinity, repeatDelay: 1.2 } : undefined}
          />
          <motion.path
            d="M260 260V210H210"
            variants={draw}
            custom={5}
            transition={loop ? { repeat: Infinity, repeatDelay: 1.3 } : undefined}
          />

          {/* Nodos (círculos) */}
          <motion.circle cx="540" cy="80" r="10" variants={draw} custom={6} />
          <motion.circle cx="1040" cy="180" r="10" variants={draw} custom={7} />
          <motion.circle cx="340" cy="320" r="10" variants={draw} custom={8} />
          <motion.circle cx="900" cy="340" r="10" variants={draw} custom={9} />
        </g>
      </motion.svg>
    </div>
  )
}
