export interface NavItem {
  href: string
  label: string
}

// Mapa de navegación aprobado (docs/MASTER-PLAN.md, sección 15). SiteHeader
// consume esto exclusivamente — nunca debe volver a tener links hardcodeados.
export const primaryNav: ReadonlyArray<NavItem> = [
  { href: '/obra', label: 'Obra' },
  { href: '/coleccion', label: 'Colecciones' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/diario', label: 'Diario' },
  { href: '/contacto', label: 'Contacto' },
]

export const primaryCta: NavItem = { href: '/adquirir', label: 'Adquirir' }
