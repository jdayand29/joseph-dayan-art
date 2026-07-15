import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TagProps {
  children: ReactNode
  className?: string
}

// Etiqueta de solo lectura (especialidades en /sobre, estilo en cartelas) —
// a diferencia de Chip, nunca es interactiva: siempre un <span>, no un <button>.
export default function Tag({ children, className }: TagProps) {
  return (
    <span className={clsx('rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent-dark', className)}>
      {children}
    </span>
  )
}
