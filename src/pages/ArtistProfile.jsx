import { Link, useParams } from 'react-router-dom'
import { getArtist, getGallery } from '../data/mockData'
import { useAppState } from '../store/AppState'
import ArtworkCard from '../components/ArtworkCard'

export default function ArtistProfile() {
  const { id } = useParams()
  const { following, toggleFollow, artworks } = useAppState()
  const artist = getArtist(id)

  if (!artist) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink/60">Artista no encontrado.</div>
  }

  const works = artworks.filter((w) => w.artistId === id)
  const isFollowing = following.has(id)
  const gallery = artist.galleryId ? getGallery(artist.galleryId) : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <img src={artist.avatar} alt={artist.name} className="h-24 w-24 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="font-serif text-2xl font-semibold">{artist.name}</h1>
            {artist.verified && <span className="text-blue-500" title="Artista verificado">✓</span>}
          </div>
          <p className="text-sm text-ink/50">{artist.username}</p>
          <p className="text-sm text-ink/50 mb-2">
            {artist.flag} {artist.city}, {artist.country}
          </p>
          <p className="text-sm text-ink/70 max-w-md mb-3">{artist.bio}</p>

          {gallery && (
            <Link
              to={`/galeria/${gallery.id}`}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-ink/40"
            >
              <img src={gallery.logo} alt={gallery.name} className="h-5 w-5 rounded-full object-cover" />
              Representado por {gallery.name} → ver galería
            </Link>
          )}

          {artist.specialties?.length > 0 && (
            <div className="mb-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {artist.specialties.map((s) => (
                <span key={s} className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/70">
                  {s}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-ink/50">
            <strong className="text-ink">{(artist.followers + (isFollowing ? 1 : 0)).toLocaleString()}</strong>{' '}
            seguidores · <strong className="text-ink">{works.length}</strong> obras publicadas
          </p>
        </div>
        <button
          onClick={() => toggleFollow(artist.id)}
          className={`rounded-full px-6 py-2 text-sm font-semibold ${
            isFollowing ? 'border border-ink/20 text-ink' : 'bg-ink text-canvas'
          }`}
        >
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </button>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {works.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  )
}
