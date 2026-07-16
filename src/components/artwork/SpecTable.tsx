import type { Artwork } from '@/types/artwork'

interface SpecTableProps {
  artwork: Pick<Artwork, 'medium' | 'size' | 'year' | 'style'>
}

export default function SpecTable({ artwork }: SpecTableProps) {
  return (
    <dl className="mb-5 grid grid-cols-2 gap-y-2 rounded-field bg-white p-5 text-sm shadow-card">
      <dt className="text-ink/50">Técnica</dt>
      <dd className="text-right font-medium">{artwork.medium}</dd>
      <dt className="text-ink/50">Tamaño</dt>
      <dd className="text-right font-medium">{artwork.size}</dd>
      <dt className="text-ink/50">Año</dt>
      <dd className="text-right font-medium">{artwork.year}</dd>
      <dt className="text-ink/50">Estilo</dt>
      <dd className="text-right font-medium">{artwork.style}</dd>
    </dl>
  )
}
