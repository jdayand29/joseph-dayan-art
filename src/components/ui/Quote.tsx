import type { ReactNode } from 'react'
import clsx from 'clsx'

interface QuoteProps {
  children: ReactNode
  className?: string
}

// Cita/statement grande (hoy usado para el bio en el hero de Home; también
// para futuros testimonios de prensa).
export default function Quote({ children, className }: QuoteProps) {
  return (
    <blockquote className={clsx('font-serif text-2xl italic leading-relaxed sm:text-3xl', className)}>
      {children}
    </blockquote>
  )
}
