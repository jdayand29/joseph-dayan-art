import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArtist, getGallery } from '../data/mockData'
import { useAppState } from '../store/AppState'
import BuyModal from '../components/BuyModal'
import BidPanel from '../components/BidPanel'

export default function ArtworkDetail() {
  const { id } = useParams()
  const { artworks, auctions, buyArtwork, liked, toggleLike, cart, addToCart, removeFromCart } = useAppState()
  const [showBuy, setShowBuy] = useState(false)

  const artwork = artworks.find((w) => w.id === id)
  if (!artwork) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink/60">Obra no encontrada.</div>
  }

  const artist = getArtist(artwork.artistId)
  const auction = artwork.type === 'auction' ? auctions.find((a) => a.id === artwork.auctionId) : null
  const isLiked = liked.has(artwork.id)
  const inCart = cart.has(artwork.id)
  const gallery = artist.galleryId ? getGallery(artist.galleryId) : null

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <img src={artwork.image} alt={artwork.title} className="w-full rounded-2xl object-cover" />

        <div>
          <Link to={`/perfil/${artist.id}`} className="mb-4 flex items-center gap-3">
            <img src={artist.avatar} alt={artist.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold">{artist.name}</p>
              <p className="text-xs text-ink/50">
                {artist.flag} {artist.city}, {artist.country}
              </p>
            </div>
          </Link>

          {gallery && (
            <Link
              to={`/galeria/${gallery.id}`}
              className="mb-3 flex w-fit items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-ink/40"
            >
              <img src={gallery.logo} alt={gallery.name} className="h-5 w-5 rounded-full object-cover" />
              Vendida a través de {gallery.name}
            </Link>
          )}

          <span className="mb-2 block w-fit rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/70">
            {artwork.style}
          </span>
          <h1 className="font-serif text-3xl font-semibold mb-4">{artwork.title}</h1>

          <dl className="mb-5 grid grid-cols-2 gap-y-2 rounded-2xl border border-ink/10 bg-white p-4 text-sm">
            <dt className="text-ink/50">Técnica</dt>
            <dd className="text-right font-medium">{artwork.medium}</dd>
            <dt className="text-ink/50">Tamaño</dt>
            <dd className="text-right font-medium">{artwork.size}</dd>
            <dt className="text-ink/50">Año</dt>
            <dd className="text-right font-medium">{artwork.year}</dd>
            <dt className="text-ink/50">Estilo</dt>
            <dd className="text-right font-medium">{artwork.style}</dd>
          </dl>

          <button
            onClick={() => toggleLike(artwork.id)}
            className="mb-6 flex items-center gap-2 text-sm text-ink/60"
          >
            <span className={isLiked ? 'text-red-600' : ''}>{isLiked ? '♥' : '♡'}</span>
            {artwork.likes + (isLiked ? 1 : 0)} me gusta · {artwork.comments} comentarios
          </button>

          {artwork.type === 'sale' ? (
            <div className="rounded-2xl border border-ink/10 bg-white p-5">
              <p className="text-sm text-ink/60">Precio</p>
              <p className="mb-4 font-serif text-3xl font-semibold">${artwork.price.toLocaleString()}</p>
              {artwork.sold ? (
                <p className="rounded-full bg-ink/5 px-4 py-2 text-center text-sm text-ink/60">
                  Esta obra ya fue vendida
                </p>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowBuy(true)}
                    className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-canvas"
                  >
                    Comprar ahora
                  </button>
                  <button
                    onClick={() => (inCart ? removeFromCart(artwork.id) : addToCart(artwork.id))}
                    className={`w-full rounded-full border py-2.5 text-sm font-semibold ${
                      inCart ? 'border-ink/20 bg-ink/5 text-ink' : 'border-ink/20 text-ink hover:bg-ink/5'
                    }`}
                  >
                    {inCart ? 'En el carrito ✓ (quitar)' : 'Agregar al carrito'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            auction && <BidPanel auction={auction} />
          )}
        </div>
      </div>

      {showBuy && (
        <BuyModal artwork={artwork} onClose={() => setShowBuy(false)} onConfirm={() => buyArtwork(artwork.id)} />
      )}
    </div>
  )
}
