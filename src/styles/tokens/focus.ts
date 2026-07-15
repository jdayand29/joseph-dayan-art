// Anillo de foco único para todo el sitio. Hoy NO existe ningún estado de
// foco visible en ningún componente (los inputs solo cambian border-color,
// los botones no tienen ring) — se corrige de una vez en los primitivos
// (Fase D), no parcheado componente por componente.
//
// Clase de Tailwind lista para usar vía clsx en cualquier primitivo interactivo:
export const focusRingClassName =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
