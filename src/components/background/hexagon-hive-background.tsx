"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface HexagonHiveBackgroundProps {
    theme?: "cyan" | "gold"
}

export function HexagonHiveBackground({ theme = "cyan" }: HexagonHiveBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let hexagons: Hexagon[] = []

        // Configuración
        const hexRadius = 25 // Tamaño del hexágono
        const hexGap = 2 // Espacio entre hexágonos
        // 30 grados para hexágonos "pointy topped"
        const angle = Math.PI / 3

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        class Hexagon {
            x: number
            y: number
            alpha: number
            targetAlpha: number
            highlighted: boolean

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.alpha = 0.05 // Opacidad base muy baja
                this.targetAlpha = 0.05
                this.highlighted = false
            }

            draw() {
                if (!ctx) return

                ctx.beginPath()
                for (let i = 0; i < 6; i++) {
                    const theta = angle * i
                    // Coordenadas de los vértices (pointy topped)
                    const hx = this.x + hexRadius * Math.sin(theta)
                    const hy = this.y + hexRadius * Math.cos(theta)
                    if (i === 0) ctx.moveTo(hx, hy)
                    else ctx.lineTo(hx, hy)
                }
                ctx.closePath()

                if (theme === "gold") {
                    // TEMA DORADO (Cyber-Gold)
                    ctx.strokeStyle = `rgba(197, 160, 89, ${this.alpha * 0.4})` // Borde dorado (#C5A059)
                    ctx.fillStyle = `rgba(249, 228, 183, ${this.alpha})` // Relleno dorado claro (#f9e4b7)
                } else {
                    // TEMA CYAN (Skills)
                    ctx.strokeStyle = `rgba(30, 168, 150, ${this.alpha * 0.3})` // Borde sutil cian/verde
                    ctx.fillStyle = `rgba(0, 217, 255, ${this.alpha})` // Relleno cian
                }

                ctx.lineWidth = 1
                ctx.stroke()
                ctx.fill()
            }

            update(mouseX: number, mouseY: number) {
                // Distancia al mouse
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                // Si el mouse está cerca (< 150px), iluminar
                if (dist < 150) {
                    this.targetAlpha = 0.4 - (dist / 150) * 0.35 // Más brillante en el centro
                } else {
                    // Destello aleatorio ocasional
                    if (Math.random() > 0.9995 && this.alpha < 0.1) {
                        this.targetAlpha = 0.3
                        setTimeout(() => { this.targetAlpha = 0.05 }, 500)
                    } else if (dist >= 150 && this.targetAlpha !== 0.3) {
                        this.targetAlpha = 0.05 // Vuelta a reposo
                    }
                }

                // Interpolación suave (lerp)
                this.alpha += (this.targetAlpha - this.alpha) * 0.1
            }
        }

        const init = () => {
            resize()
            hexagons = []

            // Calcular filas y columnas
            // Ancho de un hexágono (de lado a lado) = radius * sqrt(3)
            // Altura = radius * 2
            // Distancia horizontal entre centros = radius * sqrt(3)
            // Distancia vertical entre filas = radius * 3/2

            const r = hexRadius + hexGap
            const width = r * Math.sqrt(3)
            const xDist = width
            const yDist = r * 1.5

            const cols = Math.ceil(canvas.width / xDist) + 2
            const rows = Math.ceil(canvas.height / yDist) + 2

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let x = col * xDist
                    let y = row * yDist

                    // Desplazar filas impares
                    if (row % 2 !== 0) {
                        x += xDist / 2
                    }

                    hexagons.push(new Hexagon(x, y))
                }
            }
        }

        // Mouse tracking
        let mouseX = -1000
        let mouseY = -1000

        const handleMouseMove = (e: MouseEvent) => {
            // Obtenemos coordenadas relativas al canvas por si hay scroll o posición
            const rect = canvas.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
        }

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            hexagons.forEach(hex => {
                hex.update(mouseX, mouseY)
                hex.draw()
            })

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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />
            {/* Vignette muy sutil para enfocar el centro */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_90%)] opacity-60 pointer-events-none" />
        </div>
    )
}
