import Link from 'next/link'
import type { Collection } from '@/types/artwork'

interface CollectionCardProps {
  collection: Pick<Collection, 'id' | 'name' | 'description'>
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/coleccion/${collection.id}`}
      className="rounded-3xl bg-white p-8 shadow-card hover:shadow-card-hover"
    >
      <h2 className="font-serif text-2xl font-medium">{collection.name}</h2>
      <p className="mt-2 text-sm text-ink/60">{collection.description}</p>
      <span className="mt-4 inline-block text-sm font-medium">Explorar la serie →</span>
    </Link>
  )
}
