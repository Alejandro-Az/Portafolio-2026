import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useActiveSection } from "@/hooks/useActiveSection"

const navItems = [
  { id: "top", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
]

export function Header() {
  const ids = useMemo(() => navItems.map((n) => n.id), [])
  const activeId = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-amber-400/15 bg-background/55 backdrop-blur supports-[backdrop-filter]:bg-background/35">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-semibold tracking-tight">
            AlejandroAz<span className="text-amber-300">.dev</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    "rounded-2xl px-3 py-2 text-sm transition",
                    "text-muted-foreground hover:text-foreground",
                    isActive ? "text-foreground bg-amber-400/10" : "",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              )
            })}

            <Button asChild className="ml-2 rounded-2xl">
              <a href="#contact">Hablemos</a>
            </Button>
          </nav>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-2xl">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[320px]">
                <div className="mt-6 grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-3 py-2 text-sm text-muted-foreground hover:bg-amber-400/10 hover:text-foreground transition"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button asChild className="mt-2 rounded-2xl">
                    <a href="#contact" onClick={() => setOpen(false)}>
                      Hablemos
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
