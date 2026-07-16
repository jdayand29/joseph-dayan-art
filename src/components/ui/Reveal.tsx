'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { motionVariants, type MotionVariantName } from '@/styles/motion/variants'
import { transitions } from '@/styles/motion/transitions'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Context interno (no exportado) — Stagger lo provee para que los Reveal
// hijos hereden su animación del contenedor en cascada, en vez de
// auto-dispararse cada uno por separado (ver components/ui/Stagger.tsx).
export const StaggerContext = createContext(false)

const tagMap = {
  div: m.div,
  li: m.li,
  article: m.article,
} as const

interface RevealProps {
  children: ReactNode
  variant?: MotionVariantName
  as?: keyof typeof tagMap
  className?: string
}

export function Reveal({ children, variant = 'slideUp', as = 'div', className }: RevealProps) {
  const isNestedInStagger = useContext(StaggerContext)
  const reducedMotion = useReducedMotion()
  const Tag = tagMap[as]

  // Siempre se renderiza el mismo árbol (LazyMotion + Tag) — solo cambian
  // las props de animación según reducedMotion/isNestedInStagger. Motion
  // aplica estilos de forma imperativa (fuera del diffing de React); alternar
  // entre un <Tag> animado y un elemento plano en renders distintos deja un
  // `opacity`/`transform` inline colgado que React nunca limpia (probado
  // empíricamente: bajo reduced motion el contenido quedaba invisible para
  // siempre). Mantener el mismo componente y solo variar props es lo que
  // Motion espera y maneja correctamente.
  const triggerProps = reducedMotion
    ? { initial: false as const, animate: 'visible' }
    : isNestedInStagger
      ? {}
      : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }

  return (
    <LazyMotion features={domAnimation} strict>
      <Tag className={className} variants={motionVariants[variant]} transition={transitions.reveal} {...triggerProps}>
        {children}
      </Tag>
    </LazyMotion>
  )
}
