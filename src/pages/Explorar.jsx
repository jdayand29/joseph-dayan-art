import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { artists, galleries, getArtistsByGallery } from '../data/mockData'
import { useAppState } from '../store/AppState'
import ArtworkCard from '../components/ArtworkCard'

export default function Explorar() {
  const [searchParams] = useSearchParams()
  const { artworks } = useAppState()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState('Todos')
  const [tab, setTab] = useState('artistas') // artistas | galerias

  const locations = useMemo(() => {
    const combos = [...artists, ...galleries].map((x) => `${x.city}, ${x.country}`)
    return ['Todos', ...new Set(combos)]
  }, [])

  const filteredArtists = useMemo(() => {
    return artists.filter((a) => {
      const matchesQuery =
        !query ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.country.toLowerCase().includes(query.toLowerCase()) ||
        a.city.toLowerCase().includes(query.toLowerCase())
      const matchesLocation = location === 'Todos' || `${a.city}, ${a.country}` === location
      return matchesQuery && matchesLocation
    })
  }, [query, location])

  const filteredGalleries = useMemo(() => {
    return galleries.filter((g) => {
      const matchesQuery =
        !query ||
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.country.toLowerCase().includes(query.toLowerCase()) ||
        g.city.toLowerCase().includes(query.toLowerCase())
      const matchesLocation = location === 'Todos' || `${g.city}, ${g.country}` === location
      return matchesQuery && matchesLocation
    })
  }, [query, location])

  const filteredArtworks = useMemo(() => {
    if (tab === 'artistas') {
      const artistIds = new Set(filteredArtists.map((a) => a.id))
      return artworks.filter((w) => artistIds.has(w.artistId))
    }
    const galleryArtistIds = new Set(filteredGalleries.flatMap((g) => getArtistsByGallery(g.id).map((a) => a.id)))
    return artworks.filter((w) => galleryArtistIds.has(w.artistId))
  }, [artworks, filteredArtists, filteredGalleries, tab])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-serif text-3xl font-semibold mb-2">Explorar arte del mundo</h1>
      <p className="text-ink/60 mb-6">Elige una ciudad para ver qué artistas y galerías hay ahí, o busca por nombre.</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artista, galería, ciudad o país..."
          className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm outline-none focus:border-ink/40"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm outline-none focus:border-ink/40"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {location !== 'Todos' && (
        <p className="mb-6 rounded-xl bg-ink/5 px-4 py-2 text-sm text-ink/70">
          Recomendado en <strong>{location}</strong>: {filteredArtists.length} artista
          {filteredArtists.length !== 1 ? 's' : ''} y {filteredGalleries.length} galería
          {filteredGalleries.length !== 1 ? 's' : ''}.
        </p>
      )}

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab('artistas')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'artistas' ? 'bg-ink text-canvas' : 'border border-ink/15 text-ink/70'
          }`}
        >
          Artistas
        </button>
        <button
          onClick={() => setTab('galerias')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === 'galerias' ? 'bg-ink text-canvas' : 'border border-ink/15 text-ink/70'
          }`}
        >
          Galerías
        </button>
      </div>

      {tab === 'artistas' ? (
        <div className="mb-8 flex flex-wrap gap-4">
          {filteredArtists.map((artist) => (
            <Link
              key={artist.id}
              to={`/perfil/${artist.id}`}
              className="flex items-center gap-3 rounded-full border border-ink/10 bg-white px-3 py-2 shadow-sm hover:shadow-md"
            >
              <img src={artist.avatar} alt={artist.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-sm font-semibold leading-tight">{artist.name}</p>
                <p className="text-xs text-ink/50">
                  {artist.flag} {artist.city}, {artist.country}
                </p>
              </div>
            </Link>
          ))}
          {filteredArtists.length === 0 && (
            <p className="text-ink/50">No se encontraron artistas con esos filtros.</p>
          )}
        </div>
      ) : (
        <div className="mb-8 flex flex-wrap gap-4">
          {filteredGalleries.map((gallery) => (
            <Link
              key={gallery.id}
              to={`/galeria/${gallery.id}`}
              className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-3 py-2 shadow-sm hover:shadow-md"
            >
              <img src={gallery.logo} alt={gallery.name} className="h-10 w-10 rounded-xl object-cover" />
              <div className="text-left">
                <p className="text-sm font-semibold leading-tight">{gallery.name}</p>
                <p className="text-xs text-ink/50">
                  {gallery.flag} {gallery.city}, {gallery.country}
                </p>
              </div>
            </Link>
          ))}
          {filteredGalleries.length === 0 && (
            <p className="text-ink/50">No se encontraron galerías con esos filtros.</p>
          )}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  )
}
