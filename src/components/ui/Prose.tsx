import type { ReactNode } from 'react'
import clsx from 'clsx'

interface ProseProps {
  children: ReactNode
  className?: string
}

// max-w-prose (65ch) controla el largo de línea — texto curatorial de
// colección, futuras entradas de Diario (Documento Maestro, sección 11).
export default function Prose({ children, className }: ProseProps) {
  return <div className={clsx('max-w-prose text-base leading-relaxed text-ink/80', className)}>{children}</div>
}
