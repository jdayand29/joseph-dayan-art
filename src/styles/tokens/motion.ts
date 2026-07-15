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
