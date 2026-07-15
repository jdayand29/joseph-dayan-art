// `card`/`card-hover` ya existían (tailwind.config.js) — se documentan aquí
// como fuente de verdad. `elevated` es nuevo: modales/popovers necesitan más
// profundidad que una card en el flujo normal de la página.
export const shadow = {
  card: '0 2px 24px -8px rgba(0, 0, 0, 0.10)',
  cardHover: '0 8px 32px -8px rgba(0, 0, 0, 0.16)',
  elevated: '0 16px 48px -12px rgba(0, 0, 0, 0.24)',
} as const
