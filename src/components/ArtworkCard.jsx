import { Link } from 'react-router-dom'
import { getArtist } from '../data/mockData'
import { useAppState } from '../store/AppState'
import CountdownTimer from './CountdownTimer'

export default function ArtworkCard({ artwork }) {
  const { liked, toggleLike, auctions, cart, addToCart, removeFromCart } = useAppState()
  const artist = getArtist(artwork.artistId)
  const isLiked = liked.has(artwork.id)
  const inCart = cart.has(artwork.id)
  const auction = artwork.type === 'auction' ? auctions.find((a) => a.id === artwork.auctionId) : null

  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/obra/${artwork.id}`} className="block">
        <div className="relative">
          <img src={artwork.image} alt={artwork.title} className="w-full object-cover" loading="lazy" />
          {artwork.type === 'auction' && auction && (
            <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
              Subasta · <CountdownTimer endTime={auction.endTime} />
            </span>
          )}
          {artwork.sold && (
            <span className="absolute right-2 top-2 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-canvas">
              Vendida
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/perfil/${artist.id}`} className="flex items-center gap-2 mb-2">
          <img src={artist.avatar} alt={artist.name} className="h-6 w-6 rounded-full object-cover" />
          <span className="text-xs font-medium text-ink/80">{artist.name}</span>
          <span className="text-xs">{artist.flag}</span>
        </Link>

        <Link to={`/obra/${artwork.id}`}>
          <h3 className="font-serif text-base font-semibold leading-snug">{artwork.title}</h3>
        </Link>
        <p className="text-xs text-ink/50">
          {artwork.style} · {artwork.medium}
        </p>
        <p className="text-xs text-ink/40">{artwork.size}</p>

        <div className="mt-2 flex items-center justify-between">
          {artwork.type === 'sale' ? (
            <span className="text-sm font-semibold">${artwork.price.toLocaleString()}</span>
          ) : (
            <span className="text-sm font-semibold">
              Puja: ${auction?.currentBid.toLocaleString()}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault()
              toggleLike(artwork.id)
            }}
            className="flex items-center gap-1 text-sm"
            aria-label="Me gusta"
          >
            <span className={isLiked ? 'text-red-600' : 'text-ink/40'}>{isLiked ? '♥' : '♡'}</span>
            <span className="text-xs text-ink/50">{artwork.likes + (isLiked ? 1 : 0)}</span>
          </button>
        </div>

        {artwork.type === 'sale' && !artwork.sold && (
          <button
            onClick={(e) => {
              e.preventDefault()
              inCart ? removeFromCart(artwork.id) : addToCart(artwork.id)
            }}
            className={`mt-2 text-xs font-medium underline-offset-2 hover:underline ${
              inCart ? 'text-ink' : 'text-ink/40'
            }`}
          >
            {inCart ? 'En el carrito ✓ · quitar' : '+ Agregar al carrito'}
          </button>
        )}
      </div>
    </div>
  )
}
