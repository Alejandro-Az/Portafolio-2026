import { Section } from "@/components/layout/Section"
import { experience } from "@/experience"
import { Timeline } from "@/components/timeline"
import { ConstellationBackground } from "@/components/background/constellation-background"

export function Experience() {
  return (
    <Section
      id="experience"
      title="Trayectoria Profesional"
      subtitle="Evolución constante a través de roles y retos técnicos"
      background="none"
      customBackground={<ConstellationBackground />} // Reuse existing bg
      className="border-t border-purple-500/20"
    >
      <Timeline items={experience} />
    </Section>
  )
}
