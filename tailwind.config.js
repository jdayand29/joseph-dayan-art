/** @type {import('tailwindcss').Config} */
//
// Espejo manual de src/styles/tokens/*.ts — Tailwind carga este archivo con
// require() directo de Node (independiente de Vite/Next), así que no puede
// importar los .ts de tokens sin un loader adicional. Cualquier cambio de
// valor debe hacerse en AMBOS lugares hasta el cutover a Tailwind v4 (donde
// las variables CSS de globals.css pasan a ser la única fuente, vía @theme,
// y este archivo desaparece).

// Timings del catálogo CSS de animate-* (Fase F) — espejo de
// tokens/motion.ts `duration.base`/`duration.fast` + `easing.standard`,
// definidos una sola vez para no repetir el mismo literal en cada entrada.
const motionBase = '300ms cubic-bezier(0.4, 0, 0.2, 1)'
const motionFast = '150ms cubic-bezier(0.4, 0, 0.2, 1)'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Antes #0a0a0a/#ffffff puros — ahora los neutros cálidos del
        // Documento Maestro (sección 9). Mismo nombre de clase, tono nuevo.
        ink: '#141210',
        'ink-soft': '#4a4540',
        canvas: '#faf8f5',
        'canvas-alt': '#f1ede6',
        line: '#e4ded4',
        // Nuevo, todavía sin uso: se dosifica en la Fase D/I (Button decide
        // qué reemplaza a `accent` para botones sólidos — gold nunca es un
        // fondo de botón grande, ver src/styles/tokens/color.ts).
        gold: {
          DEFAULT: '#a97e42',
          soft: 'rgba(169, 126, 66, 0.12)',
        },
        // `accent` se mantiene sin tocar: lo consumen todos los componentes
        // actuales para botones sólidos; su reemplazo es una decisión del
        // primitivo Button (Fase D/I), no de esta fase de tokens.
        accent: {
          DEFAULT: '#0a0a0a',
          dark: '#000000',
          light: '#f2f2f2',
        },
      },
      fontFamily: {
        // Mismo patrón de fallback-dentro-de-var() ya establecido (ver nota
        // original): funciona igual en Vite (variable indefinida → usa el
        // fallback) y en Next (next/font define la variable).
        serif: ['var(--font-serif, Fraunces)', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['var(--font-sans, Inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono, "IBM Plex Mono")', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '1.1' }],
        'display-lg': ['5rem', { lineHeight: '1.05' }],
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      letterSpacing: {
        tight: '-0.02em',
        wide: '0.025em',
        mono: '0.08em',
      },
      spacing: {
        '28-editorial': '7rem',
        '36-editorial': '9rem',
        '48-editorial': '12rem',
      },
      maxWidth: {
        page: '90rem', // 1440px — bloques de ancho completo (hero, futuras franjas de colección)
      },
      borderRadius: {
        card: '1.5rem',
        // Faltaban en este espejo aunque ya existían documentados en
        // src/styles/tokens/radius.ts — Skeleton/Textarea usaban el valor
        // equivalente sin la clase nombrada (auditoría Fase D).
        image: '0.75rem',
        field: '1rem', // radio real ya usado por los textarea del sitio (rounded-2xl)
      },
      boxShadow: {
        card: '0 2px 24px -8px rgba(0, 0, 0, 0.10)',
        'card-hover': '0 8px 32px -8px rgba(0, 0, 0, 0.16)',
        elevated: '0 16px 48px -12px rgba(0, 0, 0, 0.24)',
        // Mismo valor exacto que el shadow-sm nativo de Tailwind que Button
        // usaba sin tokenizar (auditoría Fase D) — cero cambio visual.
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      zIndex: {
        // dropdown > modal: un Select/Popover/Tooltip anidado dentro de un
        // Dialog debe pintarse sobre su overlay (ver src/styles/tokens/zIndex.ts).
        header: '40',
        overlay: '100',
        modal: '200',
        dropdown: '300',
        toast: '400',
      },
      transitionDuration: {
        550: '550ms',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
        // Espejo de src/styles/tokens/motion.ts `easing.standard` — usado por
        // el catálogo CSS de animate-* de Fase F (Dialog/Drawer/Popover/
        // Tooltip/Accordion).
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Catálogo CSS de Fase F — entrada/salida de los 5 primitivos de
      // overlay (ver ARCHITECTURE.md "Motion Rules"). Duraciones tomadas de
      // tokens/motion.ts: duration.base=300ms (Dialog/Drawer/Accordion),
      // duration.fast=150ms (Popover/Tooltip, interacciones más ligeras).
      //
      // Accordion usa height + var(--radix-accordion-content-height), NO
      // grid-template-rows: se probó empíricamente que un `transition`
      // (a diferencia de `animation`) sobre el nodo de Content no funciona
      // aquí — Radix fuerza `transitionDuration:0s`/`animationName:none`
      // inline en cada toggle (useLayoutEffect de @radix-ui/react-collapsible)
      // para medir el alto real sin interferencia y exponerlo como esa CSS
      // variable; esto mata cualquier `transition` propio en el mismo nodo,
      // pero SÍ restaura `animationName` a tiempo para que un keyframe
      // (`animation`, no `transition`) referenciando esa variable sí anime
      // correctamente — es el patrón oficial documentado por Radix.
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'popover-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'popover-out': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(4px)' },
        },
        'tooltip-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'tooltip-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.96)' },
        },
        // Referencia la CSS variable que Radix mide y expone él mismo.
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-in': `fade-in ${motionBase}`,
        'fade-out': `fade-out ${motionBase}`,
        'scale-in': `scale-in ${motionBase}`,
        'scale-out': `scale-out ${motionBase}`,
        'slide-in-from-left': `slide-in-from-left ${motionBase}`,
        'slide-in-from-right': `slide-in-from-right ${motionBase}`,
        'slide-out-to-left': `slide-out-to-left ${motionBase}`,
        'slide-out-to-right': `slide-out-to-right ${motionBase}`,
        'popover-in': `popover-in ${motionFast}`,
        'popover-out': `popover-out ${motionFast}`,
        'tooltip-in': `tooltip-in ${motionFast}`,
        'tooltip-out': `tooltip-out ${motionFast}`,
        'accordion-down': `accordion-down ${motionBase}`,
        'accordion-up': `accordion-up ${motionBase}`,
      },
    },
  },
  plugins: [],
}
