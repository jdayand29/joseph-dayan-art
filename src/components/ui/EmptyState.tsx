import type { ReactNode } from 'react'
import Text from '@/components/ui/Text'

interface EmptyStateProps {
  message: string
  action?: ReactNode
}

// "No hay obras con este estilo todavía" (hoy texto suelto en ArtworkCatalog)
// — mismo patrón sirve para "no hay episodios todavía", "no hay entradas en
// el diario", etc.
export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <Text variant="muted">{message}</Text>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
