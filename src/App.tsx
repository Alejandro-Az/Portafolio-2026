import { ThemeProvider } from "@/components/theme-provider"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-svh bg-background text-foreground">
        <Hero />
        <Projects />
      </div>
    </ThemeProvider>
  )
}
