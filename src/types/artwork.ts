export interface Artist {
  id: string
  name: string
  username: string
  country: string
  city: string
  flag: string
  avatar: string
  bio: string
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
  collectionId?: string
  sold?: boolean
}

export interface Collection {
  id: string
  artistId: string
  name: string
  description: string
}
