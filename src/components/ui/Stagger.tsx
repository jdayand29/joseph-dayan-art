'use client'

import type { ReactNode } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { staggerContainer } from '@/styles/motion/stagger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { StaggerContext } from '@/components/ui/Reveal'

const tagMap = {
  div: m.div,
  ul: m.ul,
} as const

interface StaggerProps {
  children: ReactNode
  step?: number
  as?: keyof typeof tagMap
  className?: string
}

// Contenedor que dispara UNA vez al entrar en viewport; los Reveal hijos
// heredan el trigger vía StaggerContext (propagación de variants de Motion),
// no se auto-disparan cada uno por separado.
export function Stagger({ children, step, as = 'div', className }: StaggerProps) {
  const reducedMotion = useReducedMotion()
  const Tag = tagMap[as]

  // Mismo árbol siempre (ver Reveal.tsx) — solo cambian las props de
  // animación según reducedMotion.
  const triggerProps = reducedMotion
    ? { initial: false as const, animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }

  return (
    <LazyMotion features={domAnimation} strict>
      <Tag className={className} variants={staggerContainer(step)} {...triggerProps}>
        <StaggerContext.Provider value={true}>{children}</StaggerContext.Provider>
      </Tag>
    </LazyMotion>
  )
}
