import type { Metadata } from 'next'
import { getAllArtworks, getArtist, getArtworkStyles } from '@/lib/repositories/artworkRepository'
import ArtworkCatalog from '@/components/artwork/ArtworkCatalog'

export const metadata: Metadata = {
  title: 'Obra — Joseph Dayan',
  description: 'Catálogo completo de la obra de Joseph Dayan: pintura en acrílico y espátula.',
}

export default function ObraPage() {
  const artworks = getAllArtworks()
  const artist = getArtist()
  const styles = getArtworkStyles()

  return <ArtworkCatalog artworks={artworks} artist={artist} styles={styles} />
}
