import type { ReactNode, CSSProperties } from 'react'
import clsx from 'clsx'

interface AspectRatioProps {
  children: ReactNode
  /** ej. 1 (cuadrado), 4 / 3, 16 / 9 */
  ratio?: number
  className?: string
}

// Contenedor de proporción fija vía CSS aspect-ratio nativo — evita layout
// shift cuando la imagen real no es cuadrada (next/image con width/height
// fijos hoy asume que sí lo es).
export default function AspectRatio({ children, ratio = 1, className }: AspectRatioProps) {
  return (
    <div className={clsx('relative w-full overflow-hidden', className)} style={{ aspectRatio: ratio } as CSSProperties}>
      {children}
    </div>
  )
}
