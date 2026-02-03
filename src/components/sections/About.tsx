"use client"

import React, { useRef, useState } from "react"
import Typed from "typed.js"
import { Section } from "@/components/layout/Section"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Cpu,
  Gamepad2,
  Code2,
  Rocket,
  Terminal,
  Briefcase,
  Gamepad2Icon,
} from "lucide-react"
import { ConstellationBackground } from "@/components/background/constellation-background"
import {
  SiReact, SiLaravel, SiMysql, SiDocker, SiStripe,
  SiOpenai, SiPhp, SiJsonwebtokens, SiTypescript,
  SiSwagger, SiGithub, SiGitlab, SiTailwindcss, SiVite
} from "react-icons/si"

// --- DATOS DEL STACK (Tu Arsenal) ---
const stackKeys = [
  "React", "Vite", "Tailwind", "Laravel", "MySQL",
  "TypeScript", "JWT", "Swagger", "OpenAI",
  "PHPUnit", "GitHub", "CI/CD"
]

// Map data tags to icons
const iconMap: Record<string, React.ElementType> = {
  "React": SiReact,
  "Laravel": SiLaravel,
  "MySQL": SiMysql,
  "Docker": SiDocker,
  "Stripe": SiStripe,
  "OpenAI": SiOpenai,
  "TypeScript": SiTypescript,
  "JWT": SiJsonwebtokens,
  "Swagger": SiSwagger,
  "Tailwind": SiTailwindcss,
  "Vite": SiVite,
  "PHPUnit": SiPhp, // Fallback to PHP icon or similar
  "GitHub": SiGithub,
  "GitLab": SiGitlab,
  "BBVA": Briefcase, // Fallback icon
  "CI/CD": Rocket, // Fallback icon
}

const colorMap: Record<string, string> = {
  "React": "#61DAFB",
  "Laravel": "#FF2D20",
  "MySQL": "#4479A1",
  "Docker": "#2496ED",
  "Stripe": "#635BFF",
  "OpenAI": "#10A37F",
  "TypeScript": "#3178C6",
  "JWT": "#D63AFF",
  "Swagger": "#85EA2D",
  "Tailwind": "#06B6D4",
  "Vite": "#646CFF",
  "PHPUnit": "#3C8CB5", // PHP color
  "GitHub": "#ffffff",
  "GitLab": "#FC6D26",
  "BBVA": "#004481",
  "CI/CD": "#10B981",
}

export function About() {
  const el = useRef(null)
  const typed = useRef<Typed | null>(null)

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: [
        "Pablo Alejandro Robles Azuara",
        "Desarrollador Full Stack",
        "Calidad de Código",
        "Tu mejor elección"
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    })

    return () => {
      typed.current?.destroy()
    }
  }, [])

  return (
    <Section
      id="about"
      title="Sobre mí"
      subtitle={
        <span className="text-xl md:text-2xl font-medium text-gray-300">
          Soy <span ref={el} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold" />
        </span>
      }
      className="relative overflow-hidden"
      background="none"
      customBackground={<ConstellationBackground />}
    >
      {/* FIX APLICADO AQUÍ: 
          Agregué 'relative z-30' para forzar que este contenido esté 
          ENCIMA de las capas oscuras del fondo.
      */}
      <div className="relative z-30 grid grid-cols-1 md:grid-cols-12 gap-6 mt-12 w-full max-w-5xl mx-auto">

        {/* --- TARJETA 0: PERFIL PROFESIONAL (Full Width) --- */}
        <div className="md:col-span-12">
          <GradientCard theme="gold">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
              <div className="p-3 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20 flex-shrink-0">
                <Briefcase className="w-8 h-8 text-[#C5A059]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Perfil Profesional</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  <strong className="text-white">Desarrollador Full Stack</strong> especializado en{" "}
                  <strong className="text-white">Laravel</strong> y <strong className="text-white">React</strong> en México. Construyo{" "}
                  <strong className="text-white">APIs REST</strong> seguras con <strong className="text-white">JWT</strong> y manejo bases de
                  datos <strong className="text-white">MySQL</strong>. He desarrollado portales empresariales con{" "}
                  <strong className="text-white">facturación</strong> y <strong className="text-white">panel administrativo</strong>,
                  sistemas de <strong className="text-white">reservas, niveles de suscripción</strong> y automatización de flujos con{" "}
                  <strong className="text-white">pagos integrados</strong>, generación de <strong className="text-white">PDF + OPENAI</strong> y{" "}
                  servicios de <strong className="text-white">correo</strong>.{" "}
                  <span className="text-gray-500">
                    Enfoque en performance, mantenibilidad y escalabilidad.
                  </span>
                </p>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* --- TARJETA 1: FILOSOFÍA (Ocupa 7 columnas) --- */}
        <div className="md:col-span-7 h-full">
          <GradientCard className="h-full min-h-[280px]" theme="cyan">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Mindset & Arquitectura</h3>
                </div>

                <p className="text-gray-400 leading-relaxed mb-4 text-lg">
                  No solo escribo código; diseño soluciones orientadas a producto. Desarrollo aplicaciones web robustas integrando{" "}
                  <strong className="text-cyan-300">Laravel</strong> en el backend{" "}
                  (<strong className="text-cyan-300">API REST</strong> + <strong className="text-cyan-300">JWT</strong> +{" "}
                  <strong className="text-cyan-300">MySQL</strong>) y <strong className="text-cyan-300">React (Vite)</strong> en el
                  frontend, priorizando performance y mantenibilidad a largo plazo.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Apuesto por arquitecturas limpias y despliegues exitosos.
                  Mi enfoque incluye documentación técnica con{" "}
                  <strong className="text-cyan-300">Swagger</strong> y, estabilidad mediante{" "}
                  <strong className="text-cyan-300">pruebas unitarias</strong> y <strong className="text-cyan-300">feature tests</strong>{" "}
                  con <strong className="text-cyan-300">PHPUnit</strong>.
                </p>
              </div>

              {/* Stats decorativos */}
              <div className="flex gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Gamepad2Icon className="w-4 h-4" />
                  <span>Gaming: 50%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Rocket className="w-4 h-4" />
                  <span>Coding: 50%</span>
                </div>
              </div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </GradientCard>
        </div>

        {/* --- TARJETA 2: STACK (Ocupa 5 columnas) --- */}
        <div className="md:col-span-5 h-full flex flex-col gap-6">
          <GradientCard className="h-full border-purple-500/20" theme="purple">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Terminal className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Tech Arsenal</h3>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-center py-4">
                {stackKeys.map((key) => {
                  const Icon = iconMap[key] || Terminal
                  const color = colorMap[key] || "#ffffff"
                  return (
                    <div key={key} className="group/icon relative flex flex-col items-center justify-center p-2">
                      {/* Glow Reflection on Hover - Trigger on CARD hover (group-hover) and Mobile (max-md) */}
                      <div className="absolute inset-0 bg-[var(--icon-color)] blur-xl opacity-0 group-hover:opacity-20 max-md:opacity-20 transition-opacity duration-300 rounded-full" style={{ '--icon-color': color } as React.CSSProperties} />

                      <Icon
                        size={32}
                        className="relative z-10 text-zinc-500 transition-all duration-300 group-hover:text-white max-md:text-white group-hover/icon:scale-110 group-hover:drop-shadow-[0_0_10px_var(--icon-color)] max-md:drop-shadow-[0_0_10px_var(--icon-color)]"
                        style={{ '--icon-color': color } as React.CSSProperties}
                      />

                      {/* Label on Hover */}
                      <span className="mt-2 text-[10px] uppercase tracking-wider text-gray-500 group-hover/icon:text-white transition-colors opacity-0 group-hover/icon:opacity-100 absolute -bottom-4 whitespace-nowrap">
                        {key}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-2">Nivel de experiencia actual:</p>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Learning</span>
                  <span>Mastering</span>
                </div>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* --- TARJETA 3: BONUS / PERSONALIDAD --- */}
        <div className="md:col-span-12">
          <GradientCard className="flex items-center justify-between p-4 py-3 bg-[#0a0a0a]/50" theme="yellow">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300 text-sm">
                Side Quest actual: Obtener habilidades de desarrollo de videojuegos en GDevelop.
              </span>
            </div>
            <Code2 className="w-5 h-5 text-gray-600" />
          </GradientCard>
        </div>

      </div>
    </Section>
  )
}

// --- COMPONENTE AUXILIAR ---
interface GradientCardProps {
  children: React.ReactNode
  className?: string
  theme?: "cyan" | "purple" | "yellow" | "gold" // Nuevos temas para el efecto neon
}

function GradientCard({ children, className, theme = "cyan" }: GradientCardProps) {
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