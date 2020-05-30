export interface Author {
  id: string,
  name: string,
  photo?: string
}

export interface Review {
  id: string,
  ratingValue: number,
  userId: string,
  content: string
}

export interface Genre {
  id: string,
  name: string
}

export interface Book {
  id: string,
  title: string,
  authors?: Author[],
  genres?: Genre[],
  cover?: string,
  ratingValue?: number,
  ratingCount?: number,
  sypnosis?: string,
  reviews?: Review[]
}

export interface User {
  id: string,
  displayName: string,
  profilePicture: string,
  recentlyRead?: Book[];
  wishlist?: Book[];
}
