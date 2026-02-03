export type Project = {
  id: string
  cardTitle: string
  shortDescription: string
  bullets: string[]
  stackLine: string
  tags: string[]
  seo: {
    titleTag: string
    metaDescription: string
    keywords: string[]
  }
  demoUrl: string
  repoUrl: string
  imageUrl: string
  confidential?: boolean
}

export const projects: Project[] = [
  {
    id: "incidencias-ticketing",
    cardTitle: "Plataforma de gestión de incidencias tipo “ticketing” para el DIF (Proyecto privado, sin enlace)",
    shortDescription:
      "Sistema de tickets multi-sede con roles, evidencia y trazabilidad completa de apertura→cierre.",
    bullets: [
      "Control de acceso por roles y flujo completo de atención.",
      "API REST con JWT + frontend React (Vite) consumiendo endpoints.",
      "Docker/Docker Compose para entornos reproducibles.",
    ],
    stackLine: "Laravel · React (Vite) · JWT · MySQL · Docker",
    tags: ["Laravel", "React", "JWT", "MySQL", "Docker", "Roles/Permisos", "Panel Admin",],
    seo: {
      titleTag:
        "Plataforma de gestión de incidencias tipo ticketing (Laravel + React + JWT) | Pablo Robles",
      metaDescription:
        "Sistema de tickets multi-sede con roles, evidencia, historial y métricas. API REST con JWT + React (Vite) + MySQL + Docker para despliegues reproducibles.",
      keywords: [
        "gestión de incidencias",
        "sistema de tickets",
        "ticketing",
        "help desk",
        "API REST",
        "JWT",
        "Laravel",
        "React",
        "Docker",
      ],
    },
    demoUrl: "",
    repoUrl: "",
    imageUrl: "",
  },

  {
    id: "portal-coparmex",
    cardTitle: "Portal empresarial con membresías, facturación y panel admin",
    shortDescription:
      "Plataforma empresarial con roles, empresas cliente, suscripciones y módulos de eventos/talleres desde un panel administrativo.",
    bullets: [
      "Facturación + niveles de suscripción + control de roles/permisos.",
      "Módulos de talleres/eventos con registro de empleados y administración.",
      "Noticias con imagen y publicación programable (contenido gestionable).",
    ],
    stackLine: "Laravel · React · MySQL · Panel admin · Roles/Permisos",
    tags: ["Laravel", "JWT", "React", "MySQL", "Panel Admin", "Facturación", "Roles/Permisos"],
    seo: {
      titleTag:
        "Portal empresarial con facturación y suscripciones (Laravel + MySQL) | Caso COPARMEX",
      metaDescription:
        "Sistema empresarial con roles/permisos, empresas cliente, suscripciones, facturación, talleres/eventos y noticias programadas. Backend en Laravel + MySQL con panel administrativo.",
      keywords: [
        "portal empresarial",
        "panel administrativo",
        "facturación",
        "suscripciones",
        "roles y permisos",
        "eventos",
        "talleres",
        "Laravel",
        "MySQL",
        "COPARMEX",
      ],
    },
    demoUrl: "https://coparmexmazatlan.org/",
    repoUrl: "",
    imageUrl: "",
  },

  {
    id: "psicologia-financiera-ia-pdf",
    cardTitle: "Plataforma con pagos y generación automática de PDF con IA",
    shortDescription:
      "Flujo full-stack: pago, formulario, procesamiento con IA y envío de dictámenes PDF por correo.",
    bullets: [
      "Checkout con Stripe y flujo post-pago.",
      "Procesamiento con OpenAI + generación automática de PDF (dompdf).",
      "Envío por correo transaccional y automatización de entrega.",
    ],
    stackLine: "CakePHP/PHP · Stripe · OpenAI · dompdf · Mailjet",
    tags: ["CakePHP", "Panel Admin", "Stripe", "OpenAI", "PDF", "Email", "Automatización"],
    seo: {
      titleTag:
        "Pagos + IA + PDF automático (Stripe + OpenAI + dompdf) | Caso real",
      metaDescription:
        "Implementación full-stack: pago con Stripe, procesamiento con OpenAI, PDF automático con dompdf y envío por email con Mailjet. Ideal para reportes y dictámenes.",
      keywords: [
        "pagos en línea",
        "Stripe",
        "OpenAI",
        "generación de PDF",
        "dompdf",
        "automatización",
        "email transaccional",
        "Mailjet",
        "Laravel",
      ],
    },
    demoUrl: "https://www.psicologiafinanciera.com/",
    repoUrl: "",
    imageUrl: "",
  },

  {
    id: "easywash-reservas",
    cardTitle: "Sistema de reservas para servicio a domicilio (web app)",
    shortDescription:
      "Web para agendar servicio: ubicación, paquete, tipo de vehículo, fecha, pago e idioma (ES/EN).",
    bullets: [
      "Reservas end-to-end + datos guardados.",
      "Sesiones con JWT + panel editable (contenido personalizable).",
      "interfaz responsive y UX + soporte multi-idioma.",
    ],
    stackLine: "Laravel · React · JWT · i18n · Panel admin · UX responsive",
    tags: ["Laravel", "React", "JWT", "UI", "UX", "Panel Admin", "Reservas"],
    seo: {
      titleTag:
        "Sistema de reservas online para servicio a domicilio (React + JWT) | Easywash",
      metaDescription:
        "Agendamiento end-to-end con ubicación, paquetes, tipo de vehículo, pagos, i18n y panel de administración. Web app enfocada en UX y responsive.",
      keywords: [
        "reservas online",
        "sistema de citas",
        "servicio a domicilio",
        "i18n",
        "JWT",
        "panel administrativo",
        "React",
        "UX",
      ],
    },
    demoUrl: "https://easywash.com/",
    repoUrl: "",
    imageUrl: "",
  },

  {
    id: "linkedin-clone",
    cardTitle: "Clon de LinkedIn con autenticación y mensajería",
    shortDescription:
      "Red profesional: registro/login, sesión persistente, publicaciones y mensajería con backend en Firebase.",
    bullets: [
      "Autenticación + sesión activa + manejo de estado con Redux.",
      "Persistencia de usuarios y mensajes en Firebase (tiempo real).",
      "UI consistente con Material UI y componentes reutilizables.",
    ],
    stackLine: "React · Redux · Firebase · Material UI",
    tags: ["React", "Redux", "Firebase", "Auth", "Realtime", "UI"],
    seo: {
      titleTag:
        "Clon de LinkedIn con autenticación y mensajería (React + Firebase) | Proyecto",
      metaDescription:
        "Clon tipo red profesional con autenticación, publicaciones y mensajería. React + Redux + Firebase + Material UI.",
      keywords: [
        "clon de LinkedIn",
        "React",
        "Redux",
        "Firebase",
        "autenticación",
        "mensajería",
        "publicaciones",
        "Material UI",
      ],
    },
    demoUrl: "https://linkedin-clone-f9fba.web.app/",
    repoUrl: "",
    imageUrl: "",
  },

  {
    id: "barberia-citas-pagos",
    cardTitle: "Sistema de citas para barbería con pagos y panel admin (En desarrollo, sin enlace)",
    shortDescription:
      "Plataforma web para agendar citas, consultar disponibilidad, ver servicios/precios y administrar operaciones desde un panel completo.",
    bullets: [
      "Agenda de citas con horarios disponibles + catálogo de servicios y precios.",
      "Panel admin: historial de pagos/facturas, gestión de clientes y operación diaria.",
      "Gestión de disponibilidad: horarios y vacaciones del personal (bloqueos para reservar).",
    ],
    stackLine: "Laravel · MySQL · Panel admin · Reservas/Citas",
    tags: ["Laravel", "JWT", "React", "MySQL", "Reservas", "Stripe", "Facturación", "Panel Admin"],
    seo: {
      titleTag:
        "Sistema de citas para barbería con pagos y panel admin (Laravel + MySQL) | Pablo Robles",
      metaDescription:
        "Plataforma de reservas para barbería: agenda online, disponibilidad, servicios y precios. Panel administrativo con pagos/facturas y control de horarios/vacaciones.",
      keywords: [
        "sistema de citas",
        "reservas online",
        "barbería",
        "panel administrativo",
        "pagos",
        "facturación",
        "Laravel",
        "MySQL",
      ],
    },
    demoUrl: "",
    repoUrl: "",
    imageUrl: "",
  },
]
