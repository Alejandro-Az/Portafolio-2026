export type Project = {
  title: string
  description: string
  tags: string[]
  href?: string
  repo?: string
}

export const projects: Project[] = [
  {
    title: "Proyecto 1 (Full Stack)",
    description:
      "Descripción corta orientada a impacto: qué problema resolviste, stack y resultado medible.",
    tags: ["React", "Laravel", "MySQL", "API"],
    href: "#",
    repo: "#",
  },
  {
    title: "Proyecto 2 (Frontend)",
    description:
      "UI/UX premium con componentes reutilizables y animaciones suaves.",
    tags: ["Vite", "Tailwind", "shadcn/ui", "Framer Motion"],
    href: "#",
    repo: "#",
  },
  {
    title: "Proyecto 3 (Full Stack)",
    description:
      "Desarrollo para psicologia financiera de Billy",
    tags: ["Git", "Stripe", "Brevo", "CakePHP 3"],
    href: "#",
    repo: "#",
  },
]
