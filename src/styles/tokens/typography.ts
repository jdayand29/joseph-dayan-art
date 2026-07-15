// Documento Maestro, secciones 10-11: Fraunces (display) + Inter (UI/cuerpo) +
// una mono editorial nueva reservada exclusivamente para metadatos técnicos
// (cartelas: técnica/medidas/año/edición). La mono se carga en src/lib/fonts.ts
// (Fase B en adelante) — aquí solo se documenta el nombre de familia esperado.
export const fontFamily = {
  serif: 'var(--font-serif, Fraunces), "Playfair Display", Georgia, serif',
  sans: 'var(--font-sans, Inter), system-ui, sans-serif',
  mono: 'var(--font-mono, "IBM Plex Mono"), ui-monospace, monospace',
} as const

// Escala tipográfica: cada paso trae su tamaño mobile→desktop. `display`/`h1`
// son Fraunces; `label`/`mono` llevan tracking amplio (letterSpacing.mono).
export const fontSize = {
  display: { mobile: '2.5rem', desktop: '5rem' },
  h1: { mobile: '2rem', desktop: '3.25rem' },
  h2: { mobile: '1.5rem', desktop: '2.25rem' },
  h3: { mobile: '1.25rem', desktop: '1.75rem' },
  h4: { mobile: '1.125rem', desktop: '1.375rem' },
  body: { mobile: '1rem', desktop: '1.0625rem' },
  label: { mobile: '0.6875rem', desktop: '0.75rem' },
} as const

export const letterSpacing = {
  tight: '-0.02em', // wordmark, headings grandes
  normal: '0',
  wide: '0.025em', // labels cortos, uppercase
  mono: '0.08em', // cartelas técnicas
} as const

export const lineHeight = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
} as const
