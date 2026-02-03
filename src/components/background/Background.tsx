export function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Glows controlados */}
      <div className="absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(245,158,11,0.22),transparent_60%)]" />
      <div className="absolute bottom-[-260px] right-[-140px] h-[560px] w-[560px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_60%)]" />

      {/* Noise con SVG (sin assets externos) */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}
