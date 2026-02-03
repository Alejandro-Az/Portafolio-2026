import { Suspense, lazy } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Hero } from "@/components/sections/Hero"
import { MotionConfig } from "framer-motion"
import { Header } from "@/components/layout/Header"
import { Loader2 } from "lucide-react"

// --- Lazy Load Sections (Código dividido) ---
const About = lazy(() => import("@/components/sections/About").then(m => ({ default: m.About })))
const Skills = lazy(() => import("@/components/sections/Skills").then(m => ({ default: m.Skills })))
const Experience = lazy(() => import("@/components/sections/Experience").then(m => ({ default: m.Experience })))
const Projects = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })))
const Cta = lazy(() => import("@/components/sections/Cta").then(m => ({ default: m.Cta })))
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })))

// Componente de carga minimalista
const SectionLoader = () => (
  <div className="flex items-center justify-center w-full py-20">
    <Loader2 className="animate-spin text-amber-500" size={30} />
  </div>
)

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MotionConfig reducedMotion="user">
        <div className="relative z-10">
          <Header />

          <main>
            <Hero />

            <Suspense fallback={<SectionLoader />}>
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Cta />
              <Contact />
            </Suspense>

          </main>

          <footer className="mx-auto max-w-6xl px-6 py-10 text-xs text-muted-foreground border-t border-white/10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span>
                © Pablo Alejandro Robles Azuara {new Date().getFullYear()} ·{" "}
                <span className="text-foreground/70">Full Stack Laravel + React</span>
              </span>

              <div className="flex items-center gap-3">
                <span className="opacity-70">Hecho con React, Vite y shadcn/ui</span>
                <span className="opacity-40">·</span>

                {/* Cambia estos href por los tuyos */}
                <a
                  href="https://github.com/Alejandro-Az"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <span className="opacity-40">·</span>
                <a
                  href="https://www.linkedin.com/in/pablo-azuara-53b295163/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <span className="opacity-40">·</span>
                <a
                  href="#contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contacto
                </a>
              </div>
            </div>
          </footer>


        </div>
      </MotionConfig>
    </ThemeProvider>
  )
}
