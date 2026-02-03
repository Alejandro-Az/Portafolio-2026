import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { GoldFlowBackground } from "@/components/background/gold-flow-background"
import { ChevronDown } from "lucide-react"

export function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <Section id="cta" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b-0" customBackground={<GoldFlowBackground />}>

      <div ref={ref} className="relative z-30 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">

        {/* Animated Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 flex flex-col items-center">
          <span className="inline-block overflow-hidden pt-2 pb-2 -my-2 px-2">
            <motion.span
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              ¿Listo para construir
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden relative pt-2 pb-4 -my-2 px-2">
            <motion.span
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent pb-1 pr-1"
            >
              algo premium?
            </motion.span>

            {/* Shiny line under premium */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="h-1 bg-amber-500 absolute bottom-2 left-0 right-0 mx-auto rounded-full"
            />
          </span>
        </h2>

        {/* Subtext with smooth fade */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed"
        >
          Webs y apps con <span className="text-white font-medium">performance</span>, <span className="text-white font-medium">diseño</span> y buena <span className="text-white font-medium">ingeniería</span>.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-amber-500/50"
        >
          <ChevronDown className="animate-bounce w-8 h-8" />
        </motion.div>

      </div>
    </Section>
  )
}
