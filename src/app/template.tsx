// Fade de entrada entre rutas — Server Component, CSS puro. Reutiliza
// `animate-fade-in` (Fase F, ya usado por el overlay de Dialog/Drawer) en
// vez de Motion: template.tsx remonta en cada navegación por diseño de
// Next.js, así que una clase CSS que se dispara al montar basta — no hace
// falta LazyMotion/useReducedMotion (motion-safe: ya resuelve reduced motion
// sin JS). Se investigaron y descartaron dos alternativas antes de esta
// (ver ARCHITECTURE.md "Layout System"): la View Transitions API nativa de
// Next.js (experimental, no apta para un sitio pensado a 10-20 años) y
// Motion+LazyMotion (funciona, pero es JS/bundle/límite-cliente
// innecesarios para un fade de opacidad).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-fade-in">{children}</div>
}
