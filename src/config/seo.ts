// Valores de SEO por defecto, reutilizables desde cualquier generateMetadata.
// El helper que los aplica automáticamente (buildMetadata()) es trabajo de la
// Fase K (SEO) del Sistema de Diseño — este archivo solo centraliza los
// valores, sin cambiar todavía cómo cada ruta arma su metadata.
import { siteName, siteDescription } from './site'

export const defaultTitle = siteName
export const titleTemplate = `%s — ${siteName}`
export const defaultDescription = siteDescription
export const defaultOgType = 'website' as const
export const twitterCardType = 'summary_large_image' as const
