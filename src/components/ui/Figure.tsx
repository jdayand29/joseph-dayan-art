import type { ReactNode } from 'react'
import clsx from 'clsx'
import Text from '@/components/ui/Text'

interface FigureProps {
  children: ReactNode
  caption?: string
  className?: string
}

// Imagen (o cualquier Media) + caption opcional discreto — pensado para
// técnica/tamaño/año como caption breve bajo una imagen de obra.
export default function Figure({ children, caption, className }: FigureProps) {
  return (
    <figure className={clsx(className)}>
      {children}
      {caption && (
        <figcaption className="mt-2">
          <Text variant="subtle">{caption}</Text>
        </figcaption>
      )}
    </figure>
  )
}
