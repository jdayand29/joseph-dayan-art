import type { Metadata } from 'next'
import { getAllCollections } from '@/lib/repositories/artworkRepository'
import CollectionCard from '@/components/artwork/CollectionCard'

export const metadata: Metadata = {
  title: 'Colecciones — Joseph Dayan',
  description: 'Series y colecciones de Joseph Dayan.',
}

export default function CollectionsIndexPage() {
  const collections = getAllCollections()

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="mb-8 font-serif text-3xl font-semibold">Colecciones</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}
