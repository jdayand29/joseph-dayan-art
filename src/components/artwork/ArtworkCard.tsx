import Link from 'next/link'
import { formatPrice } from '@/utils/formatPrice'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Media from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import type { Artwork, Artist } from '@/types/artwork'

interface ArtworkCardProps {
  artwork: Pick<Artwork, 'slug' | 'title' | 'images' | 'style' | 'price' | 'status'>
  artist: Pick<Artist, 'name' | 'avatar' | 'flag'>
}

export default function ArtworkCard({ artwork, artist }: ArtworkCardProps) {
  const [image] = artwork.images

  return (
    <Reveal as="div" className="mb-10 break-inside-avoid">
      <Link href={`/obra/${artwork.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-image">
          <Media
            src={image.src}
            alt={artwork.title}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {artwork.status === 'sold' && (
            <span className="absolute right-3 top-3">
              <Badge variant="light">Vendida</Badge>
            </span>
          )}

          {/* Artista y precio: solo se revelan al pasar el mouse, para que la imagen domine */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-1.5">
              <Avatar src={artist.avatar} alt={artist.name} size="sm" />
              <span className="text-xs text-white/90">{artist.name}</span>
              <span className="text-xs">{artist.flag}</span>
            </div>
            {artwork.price != null && (
              <p className="mt-1 text-sm font-semibold text-white">{formatPrice(artwork.price)}</p>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-3">
        <Link href={`/obra/${artwork.slug}`}>
          <h3 className="font-serif text-lg font-medium leading-snug">{artwork.title}</h3>
        </Link>
        <p className="mt-0.5 text-xs text-ink/40">{artwork.style}</p>
      </div>
    </Reveal>
  )
}
