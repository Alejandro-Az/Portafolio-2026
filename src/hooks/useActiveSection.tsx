import { useEffect, useState } from "react"

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "")

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        // el último que entró con isIntersecting gana
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      {
        root: null,
        threshold: 0.2,
        // para que active cuando la sección esté cerca del centro
        rootMargin: "-45% 0px -45% 0px",
      }
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ids])

  return activeId
}
