// Presets de whileHover/whileTap — a diferencia de variants.ts (estados con
// nombre hidden/visible), son configs directas de propiedades a animar al
// interactuar. Sin consumidor real todavía: reemplazan con nombre el
// `group-hover:scale-[1.02]` hoy inline en ArtworkCard — se aplican recién
// en Fase I.
export const motionInteractions = {
  hoverLift: { scale: 1.02 },
  tapScale: { scale: 0.98 },
} as const
