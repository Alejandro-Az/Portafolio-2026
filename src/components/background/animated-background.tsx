"use client"

import { motion, useTime, useTransform } from "framer-motion"

export function AnimatedBackground() {
  const time = useTime()
  
  // Rotación continua basada en el tiempo
  const rotate = useTransform(
    time,
    [0, 4000], // cada 4 segundos
    [0, 360],  // 360 grados
    { clamp: false }
  )

  // Ajusté los colores a tu paleta (Cyan, Purple, Blue) con baja opacidad
  const tinyBoxStyle = {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 217, 255, 0.1)", // Cyan muy suave
    borderRadius: 5,
    rotate: useTransform(() => rotate.get() * 2), // 2x velocidad
  }

  const smallBoxStyle = {
    width: 80,
    height: 80,
    backgroundColor: "rgba(139, 92, 246, 0.08)", // Purple muy suave
    borderRadius: 5,
    rotate: useTransform(() => rotate.get() * 1.5), // 1.5x velocidad
  }

  const boxStyle = {
    width: 100,
    height: 100,
    backgroundColor: "rgba(0, 102, 255, 0.05)", // Electric Blue muy suave
    borderRadius: 5,
    rotate, // 1x velocidad
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Capa 1: Blur fuerte (Fondo lejano) */}
      <div className="absolute inset-0 flex items-center justify-center blur-[4px] opacity-50">
        <div className="flex flex-wrap items-center justify-center gap-20 w-[600px]">
          {/* Generamos varios elementos para llenar el fondo */}
          {[...Array(12)].map((_, i) => (
            <motion.div key={`tiny-${i}`} style={tinyBoxStyle} />
          ))}
        </div>
      </div>

      {/* Capa 2: Blur medio */}
      <div className="absolute inset-0 flex items-center justify-center blur-[2px] opacity-60">
        <div className="flex flex-wrap items-center justify-center gap-12 w-[400px]">
          {[...Array(6)].map((_, i) => (
            <motion.div key={`small-${i}`} style={smallBoxStyle} />
          ))}
        </div>
      </div>

      {/* Capa 3: Sin blur (Más cercano) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-70">
        <div className="flex flex-wrap items-center justify-center gap-10">
           <motion.div style={boxStyle} />
           <motion.div style={boxStyle} />
        </div>
      </div>
    </div>
  )
}