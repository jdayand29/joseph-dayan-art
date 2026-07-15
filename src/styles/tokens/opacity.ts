// Alias semánticos sobre los modificadores nativos de Tailwind (`text-ink/50`
// etc.) — no es un mecanismo nuevo, es nombrar lo que ya se usa disperso para
// que dos componentes no elijan ink/40 y ink/45 para "lo mismo". Se consumen
// como comentario/guía de qué clase usar, no como una utilidad nueva.
export const textOpacity = {
  muted: 50, // text-ink/50 — texto secundario (fechas, ubicaciones)
  subtle: 40, // text-ink/40 — metadatos discretos (estilo bajo un título)
  faint: 30, // text-ink/30 — el más bajo, casi decorativo
} as const
