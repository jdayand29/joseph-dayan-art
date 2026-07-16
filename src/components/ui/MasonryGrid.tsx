import type { ReactNode } from 'react'
import clsx from 'clsx'

const smClasses = { 1: '', 2: 'sm:columns-2' } as const
const lgClasses = { 2: 'lg:columns-2', 3: 'lg:columns-3', 4: 'lg:columns-4' } as const
const xlClasses = { 2: 'xl:columns-2', 3: 'xl:columns-3', 4: 'xl:columns-4' } as const
const gapClasses = { default: 'gap-8', loose: 'gap-12' } as const

interface MasonryGridProps {
  children: ReactNode
  columns?: { sm?: 1 | 2; lg?: 2 | 3 | 4; xl?: 2 | 3 | 4 }
  gap?: 'default' | 'loose'
  className?: string
}

// Centraliza el patrón de columnas hoy duplicado entre ArtworkCatalog y Home
// (ver ARCHITECTURE.md "Layout System"). No incluye `break-inside-avoid`
// (responsabilidad del hijo, ej. ArtworkCard) ni maneja estado vacío
// (responsabilidad del consumidor).
export default function MasonryGrid({
  children,
  columns = { sm: 2, lg: 3, xl: 4 },
  gap = 'default',
  className,
}: MasonryGridProps) {
  return (
    <div
      className={clsx(
        'columns-1',
        gapClasses[gap],
        columns.sm && smClasses[columns.sm],
        columns.lg && lgClasses[columns.lg],
        columns.xl && xlClasses[columns.xl],
        className,
      )}
    >
      {children}
    </div>
  )
}
