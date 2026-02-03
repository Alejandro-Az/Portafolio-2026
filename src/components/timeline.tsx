"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Briefcase } from "lucide-react"
import { type ExperienceItem } from "@/experience"
import { cn } from "@/lib/utils"

interface TimelineProps {
    items: ExperienceItem[]
}

export function Timeline({ items }: TimelineProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % items.length)
    }

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 relative z-20">

            {/* --- AREA SUPERIOR: TARJETA ACTIVA --- */}
            <div className="min-h-[350px] flex items-center justify-center mb-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-2xl"
                    >
                        {/* Glassmorphism Card: Ultra transparente (bg-zinc-900/5) */}
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/5 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/5">

                            {/* Glow decorativo interno */}
                            <div className="absolute top-0 right-0 p-12 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{items[activeIndex].role}</h3>
                                        <div className="flex items-center gap-2 text-purple-400 font-medium">
                                            <Briefcase size={16} />
                                            <span>{items[activeIndex].company}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                        <Calendar size={14} />
                                        <span>{items[activeIndex].period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {items[activeIndex].bullets.map((point, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-gray-400 leading-relaxed"
                                        >
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- AREA INFERIOR: LINEA DE TIEMPO INTERACTIVA --- */}
            <div className="relative flex items-center justify-between mt-8 min-h-[100px]">
                {/* Línea base con efecto RADIOACTIVO */}
                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-purple-900/40 -translate-y-1/2 overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        // Efecto brillante intenso
                        style={{ boxShadow: "0 0 20px #22d3ee, 0 0 10px #a855f7" }}
                    />
                </div>

                <div className="absolute top-1/2 left-0 w-full flex justify-between px-12 sm:px-24 -translate-y-1/2">
                    {items.map((_, index) => {
                        const isActive = index === activeIndex
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "relative group flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 z-10",
                                    isActive ? "scale-125" : "hover:scale-110"
                                )}
                            >
                                {/* Efecto de Partículas para el nodo activo */}
                                {isActive && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute left-1/2 top-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1.5, 0],
                                                    x: (Math.random() - 0.5) * 50,
                                                    y: (Math.random() - 0.5) * 50,
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    delay: i * 0.1,
                                                    ease: "easeOut"
                                                }}
                                            />
                                        ))}
                                        {/* Anillo de pulso extra - CORREGIDO (sin parpadeo) */}
                                        {/* Anillo de pulso extra - CORREGIDO (sin parpadeo) */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full border border-cyan-400"
                                            animate={{
                                                scale: [1, 3, 1],
                                                opacity: [0.8, 0, 0.8]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Halo del nodo */}
                                <div className={cn(
                                    "absolute inset-0 rounded-full blur-[4px] transition-all duration-300",
                                    isActive ? "bg-cyan-500 w-full h-full opacity-100" : "bg-purple-500/50 w-full h-full group-hover:bg-cyan-400 group-hover:opacity-80"
                                )} />

                                {/* Centro del nodo */}
                                <div className={cn(
                                    "relative w-3 h-3 rounded-full transition-colors duration-300 border border-black/50 overflow-hidden",
                                    isActive ? "bg-white shadow-[0_0_20px_rgba(34,211,238,1)]" : "bg-zinc-800 group-hover:bg-cyan-100"
                                )} />

                                {/* Tooltip con año - RADIOACTIVO */}
                                <span className={cn(
                                    "absolute top-12 text-sm font-bold font-mono transition-all duration-300 whitespace-nowrap",
                                    isActive
                                        ? "text-cyan-300 opacity-100 -translate-y-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                        : "text-gray-500 opacity-60 group-hover:opacity-100 group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] translate-y-1"
                                )}>
                                    {items[index].period.split('–')[0].trim()}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Controles laterales - FLECHAS ESTILIZADAS */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 p-4 rounded-full border border-purple-500/30 bg-black/20 text-purple-400 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-900/20 transition-all duration-300 hover:scale-110 active:scale-95 group shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                    <ChevronLeft size={32} className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 p-4 rounded-full border border-purple-500/30 bg-black/20 text-purple-400 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-900/20 transition-all duration-300 hover:scale-110 active:scale-95 group shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                    <ChevronRight size={32} className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </button>
            </div>

        </div>
    )
}