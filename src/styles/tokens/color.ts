// Paleta "lujo silencioso" del Documento Maestro (docs/MASTER-PLAN.md, sección 9):
// 90% neutros cálidos + un único acento dorado heredado de la propia obra
// ("El Filo del Tiempo", "Nebulosa Dorada"). Nunca se usa un hex fuera de aquí.
//
// Nota de transición: `ink`/`canvas` reemplazan los valores puros (#0a0a0a/
// #ffffff) que Tailwind ya tenía definidos con esos mismos nombres — mismo
// nombre de clase (`bg-canvas`, `text-ink/50`...), tono más cálido. `accent`/
// `accent-dark`/`accent-light` (botones sólidos) NO se tocan todavía: qué
// reemplaza a `accent` es una decisión de `Button` (Fase D/I), no de esta
// fase — `gold` se dosifica como condimento, nunca como fondo de botón
// grande (regla explícita del Documento Maestro), así que no puede ser un
// reemplazo 1:1 de `accent` sin decidir antes el primitivo `Button`.
export const color = {
  ink: '#141210',
  inkSoft: '#4a4540',
  canvas: '#faf8f5',
  canvasAlt: '#f1ede6',
  line: '#e4ded4',
  gold: '#a97e42',
  goldSoft: 'rgba(169, 126, 66, 0.12)',
  // Scrim de imagen (overlay de ArtworkCard) y "glass" del header (backdrop-blur).
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlaySoft: 'rgba(0, 0, 0, 0.1)',
} as const

export type ColorToken = keyof typeof color
