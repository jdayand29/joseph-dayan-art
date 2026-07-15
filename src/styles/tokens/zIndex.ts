// Reemplaza los números sueltos que hoy existen (z-40 en SiteHeader,
// z-[200] en ArtworkLightbox) por una escala nombrada y ordenada.
export const zIndex = {
  header: 40,
  dropdown: 50,
  overlay: 100,
  modal: 200,
  toast: 300,
} as const
