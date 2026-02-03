import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroPathBackground } from "@/components/sections/HeroPathBackground"

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Fondo animado (paths) */}
      <HeroPathBackground />

      {/* blobs encima del fondo */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-70">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(245,158,11,0.25),transparent_60%)]" />
        <div className="absolute bottom-[-240px] right-[-120px] h-[520px] w-[520px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_60%)]" />
      </div>

      {/* contenido arriba de todo */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-wider text-muted-foreground"
        >
          Full Stack Developer · Laravel + React · APIs REST · MySQL · TypeScript
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-6xl"
        >
          Construyo aplicaciones y webs{" "}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            escalables, seguras
          </span>{" "}
          y bien estructuradas.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          Diseño interfaces limpias, desarrollo sitios seguros y despliego con buenas prácticas. Dejo tu producto listo para crecer a lo grande: performance, mantenibilidad y calidad desde el día 1.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="https://pabloalejandroazuara.infinityfreeapp.com/mis-proyectos-2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-2xl">Ver proyectos</Button>
          </a>
          <a href="/cv.pdf" download="CV_Pablo_Alejandro_Robles.pdf">
            <Button variant="outline" className="rounded-2xl">
              Descargar CV
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
