// Los mismos valores de color.ts, expresados como CSS custom properties.
// Fuente de verdad documental: los valores reales viven en src/app/globals.css
// (:root y :root[data-theme="dark"]) porque Tailwind v3 no puede generar CSS
// a partir de un objeto TS sin un paso de build adicional que no se justifica
// todavía — al subir a Tailwind v4 (cutover, Fase M) estas variables pasan a
// ser la fuente real vía `@theme`, sin cambiar ningún componente.
//
// El bloque `dark` se define para que la arquitectura ya lo contemple (pedido
// explícito del Documento Maestro) pero NO hay ThemeProvider ni toggle
// conectado todavía — ningún elemento del sitio setea `data-theme="dark"` hoy.
export const themeVarNames = {
  ink: '--color-ink',
  inkSoft: '--color-ink-soft',
  canvas: '--color-canvas',
  canvasAlt: '--color-canvas-alt',
  line: '--color-line',
  gold: '--color-gold',
  goldSoft: '--color-gold-soft',
} as const
