"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Terminal } from "lucide-react"
import { skills } from "@/skills"
import {
    SiKotlin, SiAndroidstudio, SiFirebase, SiMaterialdesign,
    SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiVite, SiRedux, SiAxios, SiJquery, SiBootstrap, SiMui, SiFontawesome,
    SiLaravel, SiPhp, SiNodedotjs, SiExpress, SiPython, SiCakephp, SiWordpress,
    SiMysql, SiMongodb, SiPhpmyadmin,
    SiDocker, SiGit, SiPostman,
    SiStripe, SiJsonwebtokens, SiJira, SiSlack, SiFramer
} from "react-icons/si"
import { FaFilePdf, FaEnvelopeOpenText, FaPaperPlane, FaPenToSquare, FaVideo } from "react-icons/fa6"
import { Code, Smartphone, Server, Cloud, Palette, Database as DbIcon, Users, Workflow, MessageSquareText, BrainCircuit, CalendarCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// --- ITEM COLOR MAP (For specific override colors) ---
const itemColorMap: Record<string, string> = {
    "Comunicación Técnica-Cliente": "#3B82F6", // Blue
    "Resolución Analítica": "#F59E0B", // Amber
    "Scrum / Ágil": "#10B981", // Emerald
    "Autogestión": "#8B5CF6", // Violet
    "Adaptabilidad": "#EC4899", // Pink
}

// --- ICON MAP (Reused from Skills.tsx) ---
const iconMap: Record<string, React.ElementType> = {
    // Soft Skills
    "Comunicación Técnica-Cliente": MessageSquareText,
    "Resolución Analítica": BrainCircuit,
    "Scrum / Ágil": Users,
    "Autogestión": CalendarCheck,
    "Adaptabilidad": Zap,

    // Tech Skills
    "Kotlin": SiKotlin, "Android Studio": SiAndroidstudio, "Firebase": SiFirebase, "Material Design": SiMaterialdesign,
    "React": SiReact, "TypeScript": SiTypescript, "JavaScript": SiJavascript, "HTML5": SiHtml5, "CSS3": SiCss3, "Tailwind CSS": SiTailwindcss, "Vite": SiVite, "Redux": SiRedux, "Axios": SiAxios, "jQuery": SiJquery, "Bootstrap": SiBootstrap, "Material UI": SiMui, "shadcn/ui": Palette, "FontAwesome": SiFontawesome,
    "Laravel": SiLaravel, "PHP": SiPhp, "Node.js": SiNodedotjs, "Express.js": SiExpress, "Python": SiPython, "C#": Code, "CakePHP": SiCakephp, "WordPress": SiWordpress,
    "MySQL": SiMysql, "SQL Server": DbIcon, "MongoDB": SiMongodb, "PL/SQL": DbIcon, "PhpMyAdmin": SiPhpmyadmin, "Workbench": DbIcon,
    "Docker": SiDocker, "Git": SiGit, "Postman": SiPostman, "AWS": Cloud,
    "Stripe": SiStripe, "JWT": SiJsonwebtokens, "PHPUnit": SiPhp, "Dompdf": FaFilePdf, "Brevo": FaEnvelopeOpenText, "Mailjet": FaPaperPlane,
    "Scrum": FaVideo, "Sprint Planning": Workflow, "User Stories": FaPenToSquare, "Jira": SiJira, "Slack": SiSlack,
    "Framer Motion": SiFramer, "dbdiagram.io": DbIcon, "draw.io": Palette,
}

const styleMap = [
    { color: "#06B6D4", icon: Users },      // Soft Skills (Cyan) - Nuevo
    { color: "#10B981", icon: Smartphone }, // Mobile
    { color: "#00D9FF", icon: Code },       // Frontend
    { color: "#8B5CF6", icon: Server },     // Backend
    { color: "#D4AF37", icon: DbIcon },     // Database
    { color: "#EC4899", icon: Cloud },      // DevOps
    { color: "#F59E0B", icon: Workflow },   // Integrations
    { color: "#6366F1", icon: Users },      // Methodologies
    { color: "#00FF88", icon: Palette },    // Design
]

export function SkillsGallery() {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % skills.length)
    }

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + skills.length) % skills.length)
    }

    // --- RENDER LOGIC ---
    return (
        <div className="w-full max-w-6xl mx-auto px-4 relative min-h-[500px] flex items-center justify-center">

            {/* Controls */}
            {/* Controls */}
            <button
                onClick={handlePrev}
                className="absolute z-50 p-4 rounded-full bg-black/20 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 max-md:bottom-0 max-md:left-12 max-md:top-auto md:top-1/2 md:-translate-y-1/2 md:left-10"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={handleNext}
                className="absolute z-50 p-4 rounded-full bg-black/20 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 max-md:bottom-0 max-md:right-12 max-md:top-auto md:top-1/2 md:-translate-y-1/2 md:right-10"
            >
                <ChevronRight size={32} />
            </button>

            {/* Gallery Container - Persistent Cards for Transitions */}
            <div className="relative w-full h-[500px] flex justify-center items-center perspective-[1000px] overflow-visible">
                <AnimatePresence initial={false}>
                    {skills.map((group, index) => {
                        // Calculate offset relative to active index (handling wrap-around for infinite feel)
                        let offset = (index - activeIndex)
                        const length = skills.length

                        // Adjust offset for wrapping
                        if (offset > length / 2) offset -= length
                        if (offset < -length / 2) offset += length

                        // Determine Visual State
                        const isCenter = offset === 0
                        const isVisible = Math.abs(offset) <= 1 // Show Center + 1 Left + 1 Right

                        // Skip rendering non-visible to save resources (but maintain key persistence for visible range)
                        if (!isVisible) return null

                        const theme = styleMap[index % styleMap.length] || styleMap[0]
                        const HeaderIcon = theme.icon

                        // Position Logic
                        const xOffset = `${offset * 85}%`
                        const rotateY = offset * -15 // Reducido de -25 a -15 para menos peso 3D
                        const scale = isCenter ? 1 : 0.85 // Menos diferencia de escala
                        const opacity = isCenter ? 1 : 0.6 // Más visible los vecinos
                        const zIndex = isCenter ? 30 : 10

                        return (
                            <motion.div
                                key={group.title}
                                className={cn(
                                    "absolute top-0 flex flex-col overflow-hidden rounded-[24px] bg-zinc-900/5 backdrop-blur-xl border transition-all duration-200", // Reducido de 500ms a 200ms
                                    isCenter
                                        ? "cursor-default"
                                        : "cursor-pointer grayscale-[0.5] blur-[0.5px]" // Blur reducido
                                )}
                                animate={{
                                    x: xOffset,
                                    scale: scale,
                                    opacity: opacity,
                                    rotateY: rotateY,
                                    zIndex: zIndex,
                                }}
                                transition={{
                                    duration: 0.3, // Reducido de 0.5s a 0.3s - MUCHO más ágil
                                    ease: [0.32, 0.72, 0, 1] // Curva más rápida y energética
                                }}
                                style={{
                                    width: '380px',
                                    height: '500px',
                                    left: 'calc(50% - 190px)',
                                    borderColor: isCenter ? theme.color : 'rgba(255,255,255,0.05)',
                                    boxShadow: isCenter ? `0 0 30px ${theme.color}30, inset 0 0 20px ${theme.color}10` : 'none',
                                }}
                                onClick={() => {
                                    if (offset === 1) handleNext()
                                    if (offset === -1) handlePrev()
                                }}
                            >
                                {/* Inner Content */}
                                <div className="flex flex-col h-full p-6 relative">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                        <div
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner transition-all duration-300" // Eliminada la animación de rotate
                                            style={{
                                                color: theme.color,
                                                boxShadow: isCenter ? `0 0 15px ${theme.color}20` : 'none'
                                            }}
                                        >
                                            <HeaderIcon size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white" style={{ textShadow: isCenter ? `0 0 10px ${theme.color}80` : 'none' }}>
                                            {group.title}
                                        </h3>
                                    </div>

                                    {/* Grid de Iconos */}
                                    <div className="grid grid-cols-3 gap-y-8 gap-x-2 overflow-y-auto content-start flex-grow [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] pb-4 pt-4 px-2">
                                        {group.items.map((techName) => {
                                            const TechIcon = iconMap[techName] || Terminal
                                            const itemColor = itemColorMap[techName] || theme.color // Use specific color if exists

                                            return (
                                                <div
                                                    key={techName}
                                                    className="flex flex-col items-center gap-2 group/icon transform transition-transform duration-200 hover:scale-110" // Reducido de 300ms a 200ms
                                                    style={{ '--theme-color': itemColor } as React.CSSProperties}
                                                >
                                                    <TechIcon
                                                        size={32}
                                                        className={cn(
                                                            "transition-all duration-300", // Reducido de 700ms a 300ms - 2x más rápido
                                                            isCenter
                                                                ? "text-[var(--theme-color)] drop-shadow-[0_0_8px_var(--theme-color)]"
                                                                : "text-gray-400"
                                                        )}
                                                    />
                                                    <span className={cn(
                                                        "text-[11px] font-medium text-center leading-tight transition-colors duration-300", // Reducido de 700ms a 300ms
                                                        isCenter ? "text-white" : "text-gray-500"
                                                    )}>
                                                        {techName}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Overlay Decorativo Neon Plus */}
                                    {isCenter && (
                                        <>
                                            <div
                                                className="absolute top-0 right-0 w-40 h-40 bg-[var(--theme-color)]/20 rounded-full blur-[50px] pointer-events-none -translate-y-1/2 translate-x-1/2"
                                                style={{ '--theme-color': theme.color } as React.CSSProperties}
                                            />
                                            <div className="absolute inset-0 rounded-[24px] border border-[var(--theme-color)]/30 pointer-events-none" style={{ '--theme-color': theme.color } as React.CSSProperties} />
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

        </div>
    )
}