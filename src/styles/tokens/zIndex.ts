// Reemplaza los números sueltos que hoy existen (z-40 en SiteHeader,
// z-[200] en ArtworkLightbox) por una escala nombrada y ordenada.
//
// `dropdown` va por encima de `overlay`/`modal`: un Select/Popover/Tooltip
// abierto dentro de un Dialog debe pintarse sobre el overlay oscuro del
// Dialog, no debajo — verificado con un Select anidado en un Dialog, que
// quedaba visualmente atrapado (y con los clics interceptados) por el
// overlay cuando `dropdown` < `overlay`. `toast` se mantiene como el techo
// absoluto: una notificación global puede aparecer con cualquier otro
// overlay abierto y debe seguir siendo visible por encima de todos.
export const zIndex = {
  header: 40,
  overlay: 100,
  modal: 200,
  dropdown: 300,
  toast: 400,
} as const
