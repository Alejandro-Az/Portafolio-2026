"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
    children: React.ReactNode
    className?: string
    theme?: "cyan" | "purple" | "yellow" | "gold"
}

export function GradientCard({ children, className, theme = "cyan" }: GradientCardProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    // Mapeo de estilos según el tema
    const themeStyles = {
        cyan: "hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-cyan-500/20 max-md:border-cyan-500/50 max-md:bg-cyan-500/10 max-md:shadow-cyan-500/20",
        purple: "hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-purple-500/20 max-md:border-purple-500/50 max-md:bg-purple-500/10 max-md:shadow-purple-500/20",
        yellow: "hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:shadow-yellow-500/20 max-md:border-yellow-500/50 max-md:bg-yellow-500/10 max-md:shadow-yellow-500/20",
        gold: "hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10 hover:shadow-[#C5A059]/20 max-md:border-[#C5A059]/50 max-md:bg-[#C5A059]/10 max-md:shadow-[#C5A059]/20"
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn(
                // Base glassmorphism: Muy transparente (bg-zinc-900/5) + Blur fuerte
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/5 backdrop-blur-xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
                themeStyles[theme], // Aplicar estilos neon dinámicos
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`
                }}
            />
            {children}
        </div>
    )
}
