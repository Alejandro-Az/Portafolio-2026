"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function StarryBackground() {
  const stars = useMemo(() => {
    const starArray: Star[] = []
    const starCount = 150

    for (let i = 0; i < starCount; i++) {
      starArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    return starArray
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, #D4AF37 0%, #C5A059 50%, transparent 100%)`,
            boxShadow: `0 0 ${star.size * 2}px rgba(212, 175, 55, ${star.opacity})`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Algunas estrellas más grandes que brillan más */}
      {[...Array(20)].map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 1.5 + 2.5
        const duration = Math.random() * 4 + 3

        return (
          <motion.div
            key={`big-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, #F4E4C1 0%, #D4AF37 40%, #C5A059 70%, transparent 100%)`,
              boxShadow: `
                0 0 ${size * 3}px rgba(244, 228, 193, 0.6),
                0 0 ${size * 5}px rgba(212, 175, 55, 0.4),
                0 0 ${size * 8}px rgba(197, 160, 89, 0.2)
              `,
            }}
            animate={{
              opacity: [0.8, 0.3, 0.8],
              scale: [1, 0.6, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        )
      })}

      {/* Efecto de nebulosa sutil dorada */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(197, 160, 89, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Partículas de polvo estelar */}
      {[...Array(30)].map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 0.8 + 0.3

        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-[#C5A059]/20"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              filter: "blur(0.5px)",
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}