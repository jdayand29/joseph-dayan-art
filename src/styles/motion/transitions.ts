import type { Transition } from 'motion/react'
import { duration, easing, spring } from '@/styles/tokens/motion'

// Objetos Transition con nombre (timing: type/duration/ease/delay) — separado
// de variants.ts porque un variant define QUÉ cambia (opacity/y/scale) y una
// transition define CÓMO se anima ese cambio (tween vs spring, duración).
export const transitions = {
  base: {
    type: 'tween',
    duration: duration.base / 1000,
    ease: easing.standard,
  },
  reveal: {
    type: 'tween',
    duration: duration.slow / 1000,
    ease: easing.reveal,
  },
  snappy: spring.snappy,
  // Placeholder — sin consumidor en esta fase. Fase G cablea app/template.tsx
  // con este preset (fade cruzado entre rutas).
  pageTransition: {
    type: 'tween',
    duration: duration.base / 1000,
    ease: easing.standard,
  },
  // Consumido por ArtworkLightbox (Fase I.2) junto a un layoutId compartido
  // entre el thumbnail y la imagen a pantalla completa — único consumidor de
  // domMax del proyecto (layout/layoutId no está soportado por domAnimation,
  // usado por Reveal/Stagger).
  lightboxTransition: spring.smooth,
} as const satisfies Record<string, Transition>
