import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  getFeaturedArtwork,
  getArtist,
  getAllArtworks,
  getAllCollections,
} from '@/lib/repositories/artworkRepository'
import ArtworkCard from '@/components/artwork/ArtworkCard'

export const metadata: Metadata = {
  title: 'Joseph Dayan',
  description: 'Pintor panameño. Simbolismo, introspección y abstracción en acrílico y espátula.',
}

export default function Home() {
  const featured = getFeaturedArtwork()
  const artist = getArtist()
  const featuredWorks = getAllArtworks()
    .filter((artwork) => artwork.id !== featured.id)
    .slice(0, 4)
  const collections = getAllCollections()

  return (
    <div>
      {/* Hero: una sola obra */}
      <section className="relative">
        <Image
          src={featured.image}
          alt={featured.title}
          width={1600}
          height={1000}
          priority
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute bottom-6 right-6 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white">
          {featured.title} · {featured.year}
        </div>
      </section>

      {/* Statement breve */}
      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="font-serif text-2xl italic leading-relaxed sm:text-3xl">{artist.bio}</p>
      </section>

      {/* Obra destacada */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-ink/50">Obra destacada</h2>
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-4">
          {featuredWorks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} artist={artist} />
          ))}
        </div>
        <Link href="/obra" className="mt-2 inline-block text-sm font-medium underline underline-offset-2">
          Ver toda la obra →
        </Link>
      </section>

      {/* Entrada a colecciones */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/coleccion/${collection.id}`}
              className="rounded-3xl bg-white p-8 shadow-card hover:shadow-card-hover"
            >
              <h3 className="font-serif text-2xl font-medium">{collection.name}</h3>
              <p className="mt-2 text-sm text-ink/60">{collection.description}</p>
              <span className="mt-4 inline-block text-sm font-medium">Explorar la serie →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
