// Documento Maestro, sección 12: transiciones de 400-600ms, easing tipo
// easeOutExpo para reveals. Consumido por src/styles/motion/* (Fase F) y por
// las transiciones CSS/Tailwind que ya existen (duration-300, etc.).
export const duration = {
  fast: 150, // micro-interacciones (hover de botón)
  base: 300, // transiciones tipo hover-scale de imagen
  slow: 550, // reveals, transición de página
} as const

export const easing = {
  standard: [0.4, 0, 0.2, 1] as const, // ease nativo, hover/tap
  reveal: [0.22, 1, 0.36, 1] as const, // easeOutExpo-like, scroll reveals y reveals de página
} as const

// Presets de spring para Motion (type: 'spring'). Consumidor real hoy es
// opcional (interactions.ts); el consumidor completo es Fase I (hover de
// ArtworkCard) — se definen ahora para que el catálogo de tokens exista
// completo desde el principio (un cambio de token no debe requerir tocar
// ningún componente).
export const spring = {
  snappy: { type: 'spring', stiffness: 500, damping: 30 } as const, // hover/tap, responsivo
  smooth: { type: 'spring', stiffness: 300, damping: 30 } as const, // reveals/paneles, más suave
} as const

export const delay = {
  none: 0,
  staggerStep: 60, // ms entre hijos de un grid en cascada
} as const
