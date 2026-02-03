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
        // Ajuste responsive: Menos estrellas en móvil para evitar saturación
        const isMobile = window.innerWidth < 768
        const starCount = isMobile ? 35 : 85
        const connectionDistance = isMobile ? 120 : 180
        const mouseDistance = 250

        // --- RESIZE LOGIC CON OBSERVER (Fix "aplastamiento") ---
        // Usamos ResizeObserver para que el canvas siempre tenga el tamaño REAL del contenedor
        // y no se estire con CSS.
        const resize = () => {
            const parent = canvas.parentElement
            if (parent) {
                const { width, height } = parent.getBoundingClientRect()
                // Multiplicamos por pixelRatio para nitidez, si fuera necesario, 
                // pero mantenerlo 1:1 simplifica cálculos de mouse.
                canvas.width = width
                canvas.height = height
            }
        }

        class Star {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                // Posición inicial aleatoria dentro de las dimensiones actuales
                this.x = Math.random() * (canvas?.width || window.innerWidth)
                this.y = Math.random() * (canvas?.height || window.innerHeight)
                this.vx = (Math.random() - 0.5) * 0.3 // Velocidad relajada
                this.vy = (Math.random() - 0.5) * 0.3
                this.size = Math.random() * 2 + 1.5 // Estrellas un poco más grandes
                // Variación de color entre cyan y blanco
                this.color = Math.random() > 0.7 ? "rgba(0, 217, 255, 0.9)" : "rgba(255, 255, 255, 0.8)"
            }

            update() {
                if (!canvas) return
                this.x += this.vx
                this.y += this.vy

                // Rebotar en bordes (usando dimensiones dinámicas)
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1
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
            // Coordenadas relativas al canvas (importante si el canvas no empieza en 0,0)
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

        // Inicialización
        init()
        animate()

        // Observer para cambios de tamaño verdaderos
        const resizeObserver = new ResizeObserver(() => {
            resize()
            // Opcional: reiniciar estrellas si cambia mucho el tamaño
            // init() 
        })

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement)
        }

        // Mouse listeners globales al window para mejor tracking, 
        // o al canvas si solo queremos efecto hover local.
        // Aquí usamos window para garantizar flujos suaves.
        // PERO para coordenadas correctas relativas, mejor usar listener en el canvas 
        // o transformar e.client con getBoundingClientRect (como hacemos en handleMouseMove).
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            cancelAnimationFrame(animationFrameId)
            resizeObserver.disconnect()
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
