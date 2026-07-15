// Configuración global del sitio. Ningún link de navegación ni valor de SEO
// por defecto debería volver a vivir hardcodeado dentro de un componente —
// eso es exactamente lo que este archivo (+ navigation.ts, seo.ts) resuelve.
import { getArtist } from '@/lib/repositories/artworkRepository'

const artist = getArtist()

export const siteName = 'Joseph Dayan'

// Se reutiliza la bio ya real del artista en vez de escribir una descripción
// de sitio distinta y potencialmente inconsistente.
export const siteDescription = artist.bio

// Mismo placeholder que ya usaba src/app/layout.tsx — se centraliza aquí.
// Reemplazar cuando exista un dominio propio (docs/MASTER-PLAN.md, sección 21).
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://joseph-dayan-art.vercel.app'

// Joseph no ha provisto todavía un correo de contacto público — el sitio
// ofrece /contacto (formulario) mientras tanto. No se inventa un email.
export const siteEmail: string | null = null

// Reexporta Artist.socials (Fase C) en vez de duplicar redes aquí: hoy vacío
// porque `username` (@josephdayanart) existe pero no se ha confirmado a qué
// plataforma/URL corresponde.
export const socialLinks = artist.socials

export const copyrightHolder = artist.name
// Año de lanzamiento de este sitio (no el año en que Joseph empezó a pintar).
export const copyrightSinceYear = 2026

// Enlaces externos conocidos y verificados en esta sesión (no inventados):
// ColectArts es el marketplace multi-artista hermano (docs/MASTER-PLAN.md,
// sección 23); su alias de producción confirmado es colectarts.vercel.app.
export const externalLinks = {
  colectarts: 'https://colectarts.vercel.app',
} as const
