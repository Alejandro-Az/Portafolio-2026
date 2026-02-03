import { useId } from "react"

type Preset = "none" | "muted" | "tech" | "amber" | "indigo"

const PRESETS: Record<
  Preset,
  {
    grid: boolean
    noise: boolean
    gridOpacity: number
    noiseOpacity: number
    primaryGlow?: string
    secondaryGlow?: string
    primarySize?: number
    secondarySize?: number
  }
> = {
  none: {
    grid: false,
    noise: false,
    gridOpacity: 0,
    noiseOpacity: 0,
  },
  muted: {
    grid: true,
    noise: true,
    gridOpacity: 0.14,
    noiseOpacity: 0.05,
    primaryGlow: "rgba(245,158,11,0.10)",
    secondaryGlow: "rgba(99,102,241,0.08)",
    primarySize: 520,
    secondarySize: 520,
  },
  tech: {
    grid: true,
    noise: true,
    gridOpacity: 0.22,
    noiseOpacity: 0.08,
    primaryGlow: "rgba(245,158,11,0.18)",
    secondaryGlow: "rgba(99,102,241,0.14)",
    primarySize: 560,
    secondarySize: 560,
  },
  amber: {
    grid: true,
    noise: true,
    gridOpacity: 0.20,
    noiseOpacity: 0.08,
    primaryGlow: "rgba(245,158,11,0.22)",
    secondaryGlow: "rgba(245,158,11,0.10)",
    primarySize: 620,
    secondarySize: 520,
  },
  indigo: {
    grid: true,
    noise: true,
    gridOpacity: 0.18,
    noiseOpacity: 0.08,
    primaryGlow: "rgba(99,102,241,0.20)",
    secondaryGlow: "rgba(245,158,11,0.10)",
    primarySize: 620,
    secondarySize: 520,
  },
}

export function SectionBackground({ preset = "muted" }: { preset?: Preset }) {
  const uid = useId().replace(/:/g, "")
  const filterId = `noise-${uid}`

  const cfg = PRESETS[preset]

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      {cfg.grid ? (
        <div
          className="[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
          style={{ opacity: cfg.gridOpacity }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
      ) : null}

      {/* Glows */}
      {cfg.primaryGlow ? (
        <div
          className="absolute -top-48 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            width: cfg.primarySize ?? 560,
            height: cfg.primarySize ?? 560,
            backgroundImage: `radial-gradient(circle, ${cfg.primaryGlow}, transparent 60%)`,
          }}
        />
      ) : null}

      {cfg.secondaryGlow ? (
        <div
          className="absolute bottom-[-260px] right-[-140px] rounded-full blur-3xl"
          style={{
            width: cfg.secondarySize ?? 560,
            height: cfg.secondarySize ?? 560,
            backgroundImage: `radial-gradient(circle, ${cfg.secondaryGlow}, transparent 60%)`,
          }}
        />
      ) : null}

      {/* Noise (ID único por sección para evitar colisiones) */}
      {cfg.noise ? (
        <svg
          className="absolute inset-0 h-full w-full mix-blend-overlay"
          style={{ opacity: cfg.noiseOpacity }}
        >
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      ) : null}
    </div>
  )
}
