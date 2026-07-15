import { artworks } from '@/data/artworks'
import ArtworkCard from '@/components/artwork/ArtworkCard'

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold italic">Joseph Dayan</h1>
      <p className="mt-4 text-sm text-ink/50">Verificación Fase 4 — ArtworkCard migrado:</p>
      <div className="mt-6 columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </main>
  )
}
