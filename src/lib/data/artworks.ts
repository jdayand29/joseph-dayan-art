// Datos reales de Joseph Dayan. Migrado 1:1 desde src/data/mockData.js (Vite) a
// TypeScript, sin agregar campos nuevos — el rediseño del modelo de datos es
// trabajo posterior, documentado en docs/MASTER-PLAN.md.

export interface Artist {
  id: string
  name: string
  username: string
  country: string
  city: string
  flag: string
  galleryId: string | null
  avatar: string
  bio: string
  followers: number
  verified: boolean
  specialties: string[]
}

export interface Artwork {
  id: string
  artistId: string
  title: string
  image: string
  medium: string
  style: string
  size: string
  year: number
  price?: number
  likes: number
  comments: number
  type: 'sale' | 'auction'
  auctionId?: string
  collectionId?: string
  sold?: boolean
  exhibitedAt?: string
}

export interface Gallery {
  id: string
  name: string
  logo: string
}

export interface Collection {
  id: string
  artistId: string
  name: string
  description: string
}

export interface Museum {
  id: string
  name: string
  image: string
}

export interface Auction {
  id: string
  artworkId: string
  startPrice: number
  currentBid: number
  currentBidder: string
  endTime: number
  bidHistory: { bidder: string; amount: number; time: number }[]
}

export const artists: Artist[] = [
  {
    id: 'a9',
    name: 'Joseph Dayan',
    username: '@josephdayanart',
    country: 'Panamá',
    city: 'Ciudad de Panamá',
    flag: '🇵🇦',
    galleryId: null,
    avatar: '/artists/joseph-dayan/perfil-joseph.jpg',
    bio: 'Pintor panameño. Explora el simbolismo, la introspección y la abstracción a través del acrílico y la espátula.',
    followers: 512,
    verified: false,
    specialties: ['Surrealismo', 'Abstracto'],
  },
]

const now = Date.now()
const hours = (h: number) => h * 60 * 60 * 1000

export const artworks: Artwork[] = [
  {
    id: 'w15',
    artistId: 'a9',
    title: 'Nebulosa Dorada',
    image: '/artists/joseph-dayan/nebulosa-dorada.jpg',
    medium: 'Acrílico sobre lienzo',
    style: 'Abstracto',
    size: '40 x 50 cm',
    year: 2025,
    price: 450,
    likes: 58,
    comments: 6,
    type: 'sale',
    collectionId: 'col1',
  },
  {
    id: 'w16',
    artistId: 'a9',
    title: 'Siluetas en Armonía',
    image: '/artists/joseph-dayan/siluetas-en-armonia.jpg',
    medium: 'Acrílico sobre lienzo',
    style: 'Contemporáneo',
    size: '100 x 140 cm',
    year: 2024,
    price: 1400,
    likes: 91,
    comments: 12,
    type: 'sale',
  },
  {
    id: 'w17',
    artistId: 'a9',
    title: 'Corazón y Razón',
    image: '/artists/joseph-dayan/corazon-y-razon.jpg',
    medium: 'Acrílico sobre lienzo',
    style: 'Surrealismo',
    size: '50 x 70 cm',
    year: 2023,
    price: 680,
    likes: 74,
    comments: 9,
    type: 'sale',
    collectionId: 'col2',
  },
  {
    id: 'w18',
    artistId: 'a9',
    title: 'Alcanzando el Horizonte',
    image: '/artists/joseph-dayan/alcanzando-el-horizonte.jpg',
    medium: 'Acrílico sobre lienzo, técnica de espátula',
    style: 'Surrealismo',
    size: '70 x 100 cm',
    year: 2025,
    likes: 103,
    comments: 14,
    type: 'auction',
    auctionId: 'auc5',
    collectionId: 'col1',
  },
  {
    id: 'w19',
    artistId: 'a9',
    title: 'El Pabellón Escondido',
    image: '/artists/joseph-dayan/el-pabellon-escondido.jpg',
    medium: 'Acrílico sobre lienzo',
    style: 'Realismo',
    size: '60 x 75 cm',
    year: 2022,
    price: 950,
    likes: 66,
    comments: 8,
    type: 'sale',
  },
  {
    id: 'w20',
    artistId: 'a9',
    title: 'Barco de Papel',
    image: '/artists/joseph-dayan/barco-de-papel.jpg',
    medium: 'Acrílico sobre lienzo',
    style: 'Minimalismo',
    size: '45 x 60 cm',
    year: 2024,
    price: 520,
    likes: 47,
    comments: 5,
    type: 'sale',
  },
  {
    id: 'w21',
    artistId: 'a9',
    title: 'El Filo del Tiempo',
    image: '/artists/joseph-dayan/el-filo-del-tiempo.jpg',
    medium: 'Acrílico y hoja de oro sobre lienzo',
    style: 'Arte Conceptual',
    size: '60 x 90 cm',
    year: 2023,
    likes: 88,
    comments: 11,
    type: 'auction',
    auctionId: 'auc6',
    collectionId: 'col2',
  },
  {
    id: 'w22',
    artistId: 'a9',
    title: 'Danza de Koi',
    image: '/artists/joseph-dayan/danza-de-koi.jpg',
    medium: 'Acrílico con espátula sobre lienzo',
    style: 'Expresionismo',
    size: '80 x 80 cm',
    year: 2024,
    price: 890,
    likes: 79,
    comments: 10,
    type: 'sale',
  },
]

export const galleries: Gallery[] = []

export const collections: Collection[] = [
  {
    id: 'col1',
    artistId: 'a9',
    name: 'Serie Cósmica',
    description:
      'Remolinos de color inspirados en el cosmos: el instante exacto en que la luz vence a la oscuridad.',
  },
  {
    id: 'col2',
    artistId: 'a9',
    name: 'Dualidades',
    description: 'El conflicto entre la razón y la emoción, el tiempo que pasa y las decisiones que definen.',
  },
]

export const museums: Museum[] = []

export const auctions: Auction[] = [
  {
    id: 'auc5',
    artworkId: 'w18',
    startPrice: 900,
    currentBid: 1250,
    currentBidder: 'arte_coleccionista',
    endTime: now + hours(18),
    bidHistory: [
      { bidder: 'panama_arte', amount: 900, time: now - hours(26) },
      { bidder: 'arte_coleccionista', amount: 1100, time: now - hours(10) },
      { bidder: 'arte_coleccionista', amount: 1250, time: now - hours(3) },
    ],
  },
  {
    id: 'auc6',
    artworkId: 'w21',
    startPrice: 700,
    currentBid: 980,
    currentBidder: 'galeria_pty',
    endTime: now + hours(6),
    bidHistory: [
      { bidder: 'coleccion_privada', amount: 700, time: now - hours(15) },
      { bidder: 'galeria_pty', amount: 980, time: now - hours(4) },
    ],
  },
]

export function getArtist(id: string): Artist | undefined {
  return artists.find((a) => a.id === id)
}

export function getArtwork(id: string): Artwork | undefined {
  return artworks.find((w) => w.id === id)
}

export function getAuction(id: string): Auction | undefined {
  return auctions.find((au) => au.id === id)
}

export function getArtworksByArtist(artistId: string): Artwork[] {
  return artworks.filter((w) => w.artistId === artistId)
}

export function getGallery(id: string): Gallery | undefined {
  return galleries.find((g) => g.id === id)
}

export function getArtistsByGallery(galleryId: string): Artist[] {
  return artists.filter((a) => a.galleryId === galleryId)
}

export function getMuseum(id: string): Museum | undefined {
  return museums.find((m) => m.id === id)
}

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id)
}

export function getCollectionsByArtist(artistId: string): Collection[] {
  return collections.filter((c) => c.artistId === artistId)
}
