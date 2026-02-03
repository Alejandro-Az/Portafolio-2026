export type ExperienceItem = {
  role: string
  company: string
  period: string
  logo?: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: "Desarrollador Full Stack / Soporte Técnico (Servicio Social)",
    company: "Sistema Estatal DIF",
    period: "Sep 2022 – Mar 2023",
    bullets: [
      "Desarrollé un sistema interno de reportes e incidencias multi-sede: ciclo completo registro → asignación → seguimiento → cierre.",
      "Backend en Laravel exponiendo API REST con JWT + control por roles; frontend en React (Vite) + Tailwind.",
      "Posibilidad de adjuntar evidencia y timestamps de apertura/cierre para auditoría y métricas operativas; trabajo coordinado con Jira y Slack.",
    ],
  },
  {
    role: "Desarrollador Full Stack",
    company: "Servicio Quality Automotive",
    period: "Mar 2023 – Oct 2023",
    bullets: [
      "Construí y mantuve una landing corporativa responsive para servicios automotrices con secciones y contacto.",
      "Apliqué buenas prácticas de seguridad y resolví bugs/depuración.",
      "Mejoré performance y experiencia móvil: optimización de carga, estructura del sitio y comportamiento de UI.",
    ],
  },
  {
    role: "Desarrollador Full Stack",
    company: "TICA Solutions",
    period: "Jul 2024 – Actualidad",
    bullets: [
      "Desarrollo end-to-end en proyectos web: análisis, implementación, pruebas, documentación y despliegue.",
      "En plataforma empresarial (COPARMEX): módulos admin (roles/usuarios, empresas cliente, suscripciones) + eventos/talleres y contenido programable.",
      "APIs REST seguras (JWT) con validaciones; documentación Swagger/OpenAPI + pruebas funcionales con PHPUnit; trabajo Scrum con Git/Github, Jira y Slack.",
    ],
  },
]
