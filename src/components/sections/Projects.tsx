import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/data/projects"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl italic serif">
            Selected Work
          </h2>
          <p className="mt-2 text-slate-400 max-w-md">
            Selección de trabajos enfocados en producto, performance y mantenibilidad.
          </p>
        </div>
      </div>

      {/* Separador tipo "Circuit Line" sutil */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent my-8">
        <div className="absolute left-10 -top-[2px] h-[5px] w-[5px] rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
        <Card 
        key={p.title} 
        className="
            group relative overflow-hidden rounded-2xl 
            border border-[#C5A059]/20 
            /* Cambiamos a bg-black con baja opacidad */
            bg-black/40 
            /* El filtro que hace la magia del vidrio */
            backdrop-blur-xl 
            /* Sutil reflejo en la parte superior */
            before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
            transition-all duration-300 
            hover:border-[#C5A059]/50 
            hover:shadow-[0_0_30px_rgba(197,160,89,0.1)]
        "
        >
            {/* Efecto de luz interna (Glow discreto) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.1),transparent_70%)]" />

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-medium text-[#C5A059] group-hover:text-[#D4AF37] transition-colors">
                {p.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {p.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge 
                    key={t} 
                    variant="outline" 
                    className="rounded-full border-[#C5A059]/30 bg-black/40 text-[10px] uppercase tracking-wider text-[#C5A059] hover:bg-[#C5A059]/10"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>

            {/* Borde dorado fino inferior que se anima al hover */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-full" />
          </Card>
        ))}
      </div>
    </section>
  )
}