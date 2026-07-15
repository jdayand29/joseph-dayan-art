import type { ReactNode } from 'react'
import clsx from 'clsx'

interface SurfaceProps {
  children: ReactNode
  /** `elevated` usa la sombra más profunda (modales/popovers) — ver
   * src/styles/tokens/shadow.ts. */
  elevation?: 'card' | 'elevated'
  className?: string
}

// Superficie elevada base, sin padding — Card (abajo) le agrega padding.
// Reemplaza la combinación "bg-white rounded-3xl shadow-card" repetida sin
// nombre en ArtworkDetail, CollectionCard, SubscribeForm, ContactForm.
export default function Surface({ children, elevation = 'card', className }: SurfaceProps) {
  return (
    <div
      className={clsx('rounded-card bg-white', elevation === 'card' ? 'shadow-card' : 'shadow-elevated', className)}
    >
      {children}
    </div>
  )
}
