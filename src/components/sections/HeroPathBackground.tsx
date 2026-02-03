import { motion, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.35
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 5.5, bounce: 0 },
        opacity: { delay, duration: 1 },
      },
    }
  },
}

const cometVariants: Variants = {
  hidden: { pathOffset: 0, opacity: 0 },
  visible: {
    pathOffset: [0, 1],
    opacity: [0, 1, 1, 0],
    transition: {
      pathOffset: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 },
      opacity: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 },
    },
  },
}

export function HeroPathBackground() {
  const reduce = useReducedMotion()

  const paths = [
    "M-50 200 H250 L350 300 H600", 
    "M1450 150 H1100 L1000 250 H750",
    "M-50 500 H150 L250 400 H500 L600 500 H850",
    "M1450 450 H1200 L1100 350 H900",
    "M1450 700 H1050 L900 550 H700",
    "M-50 750 H300 L450 600", 
    "M400 -50 V150 L550 300",
    "M1000 850 V650 L850 500",
    "M-50 50 L150 50 L250 150 H450",
    "M1450 780 H1150 L1050 680 H800",
    "M600 850 V700 L750 550",
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.svg
        className="h-full w-full"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
      >
        <defs>
          <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="25%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>

          <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g fill="none" stroke="url(#techGradient)" strokeWidth="1.2" strokeLinecap="round" filter="url(#heroGlow)">
          {paths.map((d, i) => (
            <motion.path key={`path-${i}`} d={d} variants={draw} custom={i} />
          ))}

          {paths.map((d, i) => (
            <motion.path
              key={`comet-${i}`}
              d={d}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="40, 1000"
              variants={cometVariants}
              style={{ opacity: 0 }}
            />
          ))}

          {/* --- NODOS --- */}
          <motion.circle cx="600" cy="300" r="2" fill="#f59e0b" variants={draw} custom={8} />
          <motion.circle cx="750" cy="250" r="2" fill="#6366f1" variants={draw} custom={9} />
          <motion.circle cx="850" cy="500" r="2" fill="#f59e0b" variants={draw} custom={10} />
          <motion.circle cx="700" cy="550" r="2" fill="#6366f1" variants={draw} custom={11} />
          <motion.circle cx="450" cy="150" r="2" fill="#f59e0b" variants={draw} custom={15} />
        </g>
      </motion.svg>
    </div>
  )
}