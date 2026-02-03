import { Section } from "@/components/layout/Section"
import { HexagonHiveBackground } from "@/components/background/hexagon-hive-background"
import { SkillsGallery } from "@/components/skills-gallery"

export function Skills() {
  return (
    <Section
      id="skills"
      title="Habilidades & Stack"
      subtitle="Mi arsenal tecnológico completo"
      background="none"
      customBackground={<HexagonHiveBackground />}
    >
      <SkillsGallery />
    </Section>
  )
}