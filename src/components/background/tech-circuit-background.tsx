"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function TechCircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    // Tus colores de marca
    const colors = ["#00D9FF", "#8B5CF6", "#D4AF37", "#0066FF"]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      x: number
      y: number
      speed: number
      color: string
      size: number
      length: number
      
      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.speed = Math.random() * 2 + 0.5 // Velocidad
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.size = Math.random() * 2 + 1
        // Hacemos los rayos un poco más largos para que se vean bien en horizontal
        this.length = Math.random() * 150 + 80 
      }

      update() {
        // CAMBIO 1: Movemos en X en lugar de Y
        this.x += this.speed

        // CAMBIO 2: Si sale por la derecha (width), vuelve a entrar por la izquierda
        if (this.x > canvas!.width + this.length) {
          this.x = -this.length
          this.y = Math.random() * canvas!.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        
        // CAMBIO 3: El gradiente ahora es horizontal
        // Desde la cabeza (x) hacia la cola (x - length)
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y)
        gradient.addColorStop(0, this.color) // Cabeza brillante
        gradient.addColorStop(1, "transparent") // Cola desvanecida
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = this.size
        ctx.lineCap = "round"
        
        // Dibujamos la línea horizontal
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - this.length, this.y)
        ctx.stroke()
      }
    }

    const init = () => {
      resize()
      // Ajustamos la densidad: menos partículas porque ocupan más espacio visual horizontal
      const particleCount = Math.floor(window.innerHeight / 10) 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()
    window.addEventListener("resize", () => {
      particles = [] // Reiniciar partículas al cambiar tamaño
      init()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Estático */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
        }}
      />
      
      {/* Vignette para oscurecer bordes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />

      {/* Canvas Animado */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  )
}