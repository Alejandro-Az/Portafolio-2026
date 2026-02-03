import { cn } from "@/lib/utils"
import { SectionBackground } from "@/components/layout/SectionBackground"

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string | React.ReactNode
  children: React.ReactNode
  className?: string
  background?: "none" | "muted" | "tech" | "amber" | "indigo"
  // 1. Agregamos esta nueva propiedad opcional
  customBackground?: React.ReactNode
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  background = "muted",
  customBackground // 2. La recibimos aquí
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden scroll-mt-24 border-b border-border/40", className)} // Asegúrate de quitar mx-auto de aquí si lo pusiste por error antes
    >
      {/* Fondo estándar predefinido */}
      <SectionBackground preset={background} />

      {/* 3. AQUÍ renderizamos el fondo personalizado. 
          Al estar fuera del div 'max-w-6xl', ocupará todo el ancho de la section */}
      {customBackground}

      {/* Contenedor del contenido (este sí va centrado y limitado) */}
      <div className="relative z-30 mx-auto max-w-6xl px-6 py-16">
        {title && (
          <div className="flex flex-col items-center gap-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}