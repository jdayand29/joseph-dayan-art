import type { ReactNode } from 'react'
import clsx from 'clsx'

interface HeadingProps {
  children: ReactNode
  /** Nivel semántico (qué elemento HTML) — independiente del tamaño visual,
   * para que una jerarquía de accesibilidad correcta no fuerce un tamaño de
   * fuente incorrecto (usar `size` para eso). */
  level?: 1 | 2 | 3 | 4
  /** Tamaño visual — por defecto igual al `level`, pero puede desacoplarse
   * (ej. un <h2> visualmente pequeño en una jerarquía de página larga). */
  size?: 1 | 2 | 3 | 4
  className?: string
}

const sizeClass = {
  1: 'font-serif text-3xl sm:text-4xl font-semibold',
  2: 'font-serif text-2xl font-medium',
  3: 'font-serif text-lg font-medium',
  4: 'font-serif text-base font-medium',
} as const

export default function Heading({ children, level = 1, size, className }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  return <Tag className={clsx(sizeClass[size ?? level], className)}>{children}</Tag>
}
