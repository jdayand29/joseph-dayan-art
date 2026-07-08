import { useMemo, useState } from 'react'
import { useAppState } from '../store/AppState'
import { artStyles } from '../data/styles'
import ArtworkCard from '../components/ArtworkCard'

export default function Feed() {
  const { artworks } = useAppState()
  const [activeStyle, setActiveStyle] = useState('Todos')

  const styleOptions = useMemo(() => ['Todos', ...artStyles], [])

  const filtered = useMemo(() => {
    if (activeStyle === 'Todos') return artworks
    return artworks.filter((w) => w.style === activeStyle)
  }, [artworks, activeStyle])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-5">
        <h1 className="font-serif text-3xl font-semibold">Descubre arte del mundo</h1>
        <p className="text-ink/60">
          Obras de artistas de México, Japón, Nigeria, Italia, Francia y más — publicadas hoy.
        </p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {styleOptions.map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeStyle === style
                ? 'border-ink bg-ink text-canvas'
                : 'border-ink/15 text-ink/70 hover:border-ink/40'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/50">No hay obras de este estilo todavía.</p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  )
}
