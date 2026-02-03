"use client"

import { Section } from "@/components/layout/Section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/data/projects"
import { HexagonHiveBackground } from "@/components/background/hexagon-hive-background"
import {
  Terminal, Lock, Check, ExternalLink, LayoutDashboard, Receipt,
  Users, CalendarClock, Zap, Languages, Palette, Mail, Shield, Smartphone
} from "lucide-react"
import {
  SiReact, SiLaravel, SiMysql, SiDocker, SiStripe,
  SiOpenai, SiPhp, SiFirebase, SiRedux, SiMui,
  SiTailwindcss, SiJsonwebtokens, SiCakephp, SiAdobeacrobatreader
} from "react-icons/si"

// --- ICON MAPPING ---
const iconMap: Record<string, React.ElementType> = {
  // Tech
  "React": SiReact,
  "Laravel": SiLaravel,
  "MySQL": SiMysql,
  "Docker": SiDocker,
  "Stripe": SiStripe,
  "OpenAI": SiOpenai,
  "PHP": SiPhp,
  "CakePHP": SiCakephp,
  "Firebase": SiFirebase,
  "Redux": SiRedux,
  "MaterialUI": SiMui,
  "Tailwind": SiTailwindcss,
  "JWT": SiJsonwebtokens,
  "i18n": Languages,

  // Concepts / Features
  "Panel Admin": LayoutDashboard,
  "Facturación": Receipt,
  "Roles/Permisos": Users,
  "Reservas": CalendarClock,
  "Automatización": Zap,
  "Realtime": Zap,
  "UX": Smartphone,
  "UI": Palette,
  "Email": Mail,
  "Auth": Shield,
  "Pagos": Receipt,
  "PDF": SiAdobeacrobatreader,
  "UX responsive": Smartphone
}

const colorMap: Record<string, string> = {
  // Tech
  "React": "#61DAFB",
  "Laravel": "#FF2D20",
  "MySQL": "#4479A1",
  "Docker": "#2496ED",
  "Stripe": "#635BFF",
  "OpenAI": "#10A37F",
  "PHP": "#777BB4",
  "CakePHP": "#D33C43",
  "Firebase": "#FFCA28",
  "Redux": "#764ABC",
  "MaterialUI": "#007FFF",
  "Tailwind": "#06B6D4",
  "JWT": "#D63AFF",
  "i18n": "#26A69A",
  "PDF": "#EC1C24",

  // Concepts
  "Panel Admin": "#F59E0B", // Amber
  "Facturación": "#10B981", // Emerald
  "Roles/Permisos": "#EC4899", // Pink
  "Reservas": "#8B5CF6", // Violet
  "Automatización": "#EAB308", // Yellow
  "Realtime": "#F97316", // Orange
  "UX": "#EC4899", // Pink (UX related)
  "UI": "#C084FC", // Purple (UI related)
  "Email": "#F43F5E", // Rose
  "Auth": "#3B82F6", // Blue
  "Pagos": "#10B981", // Emerald
  // "PDF": "#ffffff" -> Removed duplicate
  "UX responsive": "#EC4899"
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Proyectos Destacados"
      subtitle="Soluciones escalables con arquitectura moderna y diseño premium"
      background="none"
      customBackground={<HexagonHiveBackground theme="gold" />}
      className="border-t border-[#C5A059]/20"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, index) => (
          <div key={p.id} className="group relative h-full">

            {/* --- CYBER-PRISM CARD --- */}
            <Card className="relative h-full overflow-hidden rounded-[20px] bg-zinc-900/60 backdrop-blur-md border border-white/5 transition-all duration-500 group-hover:border-[#C5A059]/50 group-hover:bg-zinc-900/80 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] flex flex-col">

              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20mix-blend-overlay" />

              {/* SCANLINE EFFECT */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent -top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none z-30 shadow-[0_0_10px_#C5A059]" />

              <div className="relative z-20 flex flex-col h-full p-8 flex-grow">

                {/* Header: Number & Confidential Badge */}
                <div className="flex justify-between items-start mb-6 align-top">
                  {/* ID Number with Cyber Font */}
                  <span className="text-5xl font-mono font-bold text-white/5 group-hover:text-[#C5A059]/20 transition-colors duration-500 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${p.confidential
                    ? 'bg-red-500/10 border-red-500/30 text-red-500'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                    }`}>
                    {p.confidential ? <span className="flex items-center gap-1"><Lock size={10} /> NDA</span> : "Public"}
                  </div>
                </div>

                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors duration-300 leading-tight">
                    {p.cardTitle}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 flex-grow flex flex-col">
                  <p className="text-zinc-400 mb-6 text-sm leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-300">
                    {p.shortDescription}
                  </p>

                  {/* Tech Bullets with Custom Icon */}
                  <ul className="space-y-2 mb-8">
                    {p.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        <Check className="mt-0.5 w-4 h-4 text-[#C5A059] flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* --- NEON ICONS ROW --- */}
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-4 items-center pr-16">
                      {p.tags.map(tag => {
                        const Icon = iconMap[tag] || Terminal
                        const color = colorMap[tag] || "#ffffff"
                        return (
                          <div key={tag} className="group/icon relative flex items-center justify-center">
                            {/* Glow Reflection - Lights up on CARD hover AND always on Mobile */}
                            <div className="absolute inset-0 bg-[var(--icon-color)] blur-md opacity-0 md:group-hover:opacity-40 max-md:opacity-40 transition-opacity duration-300" style={{ '--icon-color': color } as React.CSSProperties} />

                            {/* Icon - Lights up on CARD hover AND always on Mobile */}
                            <Icon
                              size={22}
                              className="relative z-10 text-zinc-600 transition-all duration-300 md:group-hover:text-white md:group-hover:drop-shadow-[0_0_8px_var(--icon-color)] max-md:text-white max-md:drop-shadow-[0_0_5px_var(--icon-color)]"
                              style={{ '--icon-color': color } as React.CSSProperties}
                            />

                            {/* Tooltip - Keeps existing specific hover behavior */}
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] text-white opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                              {tag}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>

                {/* --- HOVER REVEAL BUTTON --- */}
                {!p.confidential && (
                  <div className="absolute bottom-6 right-6 transition-all duration-500 delay-100 opacity-100 translate-x-0 md:translate-x-10 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                    <a
                      href={p.demoUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-full bg-[#C5A059] text-black shadow-[0_0_20px_#C5A059] hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={20} strokeWidth={2.5} />
                    </a>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  )
}