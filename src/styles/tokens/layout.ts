// Tres anchos con nombre (sección 6 del documento de Sistema de Diseño):
// `content` para texto/grids, `detail` para vistas de un solo recurso
// (obra individual — recombinable a futuro para prints/cursos/episodios),
// `page` reservado para bloques de ancho completo (hero de Home, futuras
// entradas de colección a pantalla completa).
export const container = {
  content: '72rem', // 1152px, ya usado como max-w-6xl
  detail: '64rem', // 1024px, ya usado como max-w-5xl (ej. /obra/[slug])
  page: '90rem', // 1440px
} as const

export const columns = 12

// Breakpoints por defecto de Tailwind — documentados aquí para que quede
// explícito qué significan en este sitio, no para reemplazar el mecanismo.
export const breakpoint = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const
