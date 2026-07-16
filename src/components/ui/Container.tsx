import type { ReactNode } from 'react'
import clsx from 'clsx'

const widthClass = {
  content: 'max-w-6xl',
  detail: 'max-w-5xl',
  page: 'max-w-page',
} as const

interface ContainerProps {
  children: ReactNode
  /** `content` (1152px, texto/grids) es el default; `detail` (1024px) es para
   * vistas de un solo recurso (ej. /obra/[slug]); `page` (1440px) es para
   * bloques de ancho completo (hero, futuras franjas de colección) — ver
   * src/styles/tokens/layout.ts. */
  width?: 'content' | 'detail' | 'page'
  className?: string
  as?: 'div' | 'main' | 'section'
}

export default function Container({ children, width = 'content', className, as: As = 'div' }: ContainerProps) {
  return <As className={clsx('mx-auto px-6', widthClass[width], className)}>{children}</As>
}
