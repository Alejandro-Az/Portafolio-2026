"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let stars: Star[] = []

        // Configuración
        const starCount = 85 // Más estrellas
        const connectionDistance = 180 // Más alcance de conexión
        const mouseDistance = 250 // Más alcance del mouse

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        class Star {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.vx = (Math.random() - 0.5) * 0.3 // Velocidad relajada
                this.vy = (Math.random() - 0.5) * 0.3
                this.size = Math.random() * 2 + 1.5 // Estrellas un poco más grandes
                // Variación de color entre cyan y blanco
                this.color = Math.random() > 0.7 ? "rgba(0, 217, 255, 0.9)" : "rgba(255, 255, 255, 0.8)"
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Rebotar en bordes
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.shadowBlur = 8
                ctx.shadowColor = this.color
                ctx.fill()
                ctx.shadowBlur = 0 // Reset shadow
            }
        }

        const init = () => {
            resize()
            stars = []
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star())
            }
        }

        let mouseX = -1000
        let mouseY = -1000

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
        }

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Actualizar y dibujar estrellas
            stars.forEach(star => {
                star.update()
                star.draw()
            })

            // Dibujar conexiones
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x
                    const dy = stars[i].y - stars[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        const opacity = 1 - dist / connectionDistance
                        ctx.beginPath()
                        ctx.moveTo(stars[i].x, stars[i].y)
                        ctx.lineTo(stars[j].x, stars[j].y)
                        // Color cian muy brillante, alta opacidad
                        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.4})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }

                // Conexión con mouse
                const dx = stars[i].x - mouseX
                const dy = stars[i].y - mouseY
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < mouseDistance) {
                    const opacity = 1 - dist / mouseDistance
                    ctx.beginPath()
                    ctx.moveTo(stars[i].x, stars[i].y)
                    ctx.lineTo(mouseX, mouseY)
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.6})` // Púrpura intenso al mouse
                    ctx.lineWidth = 1.5
                    ctx.stroke()
                }
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        window.addEventListener("resize", init)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", init)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black/20">
            <motion.canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />
            {/* Fondo muy transparente para que se vea el background general si lo hay, o negro sutil */}
        </div>
    )
}
