/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        canvas: '#ffffff',
        accent: {
          DEFAULT: '#0a0a0a',
          dark: '#000000',
          light: '#f2f2f2',
        },
      },
      fontFamily: {
        // El fallback vive DENTRO de var(...) a propósito: en Next, --font-serif/--font-sans
        // están definidas por next/font (src/lib/fonts.ts); en Vite (donde esas variables no
        // existen) el fallback dentro de var() se usa automáticamente, cargando la misma
        // Fraunces/Inter vía el @import de src/index.css. Sin el fallback dentro del var(),
        // una variable indefinida invalida toda la propiedad font-family en Vite.
        serif: ['var(--font-serif, Fraunces)', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['var(--font-sans, Inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 24px -8px rgba(0, 0, 0, 0.10)',
        'card-hover': '0 8px 32px -8px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
}

