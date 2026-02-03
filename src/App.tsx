import { ThemeProvider } from "@/components/theme-provider"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { MotionConfig } from "framer-motion"
import { Header } from "@/components/layout/Header"

import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { Cta } from "@/components/sections/Cta"


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MotionConfig reducedMotion="user">
        <div className="relative z-10">
          <Header />

          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Cta />
            <Contact />

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
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <span className="opacity-40">·</span>
                <a
                  href="https://www.linkedin.com/in/pablo-azuara-53b295163/"
                  target="_blank"
                  rel="noreferrer"
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
