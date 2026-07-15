import { Fraunces, Inter } from 'next/font/google'

// Mismos pesos/estilos que el @import de Google Fonts en src/index.css (Vite),
// ahora vía next/font para eliminar el FOUT y auto-hospedar los archivos.
export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})
