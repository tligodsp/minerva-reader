export interface Author {
  id: string,
  name: string,
  photo?: string,
  about?: string,
}

export interface Review {
  id: string,
  ratingValue: number,
  content: string,
  user: User,
  book: Book
}

export interface ReviewInput {
  ratingValue: number,
  content: string,
  user: User,
  book: Book
}

export interface Genre {
  id: string,
  name: string
}

export interface Book {
  id: string,
  title: string,
  authors?: Author[],
  authorIds?: string[],
  genres?: Genre[],
  genreIds?: string[],
  cover?: string,
  ratingValue?: number,
  ratingCount?: number,
  sypnosis?: string,
  reviews?: Review[],
  downloadLink: string | undefined,
  createAt?: string,
  releaseAt?: string,
}

export interface LocalBook {
  book: Book,
  bookFilePath: string,
  bookPhotoPath?:string,
  readingProgress: number,
  readingProgressCFI?: string,
  readingTime: number,
  dateAdded: string,
  lastRead?: string,
  displayConfig?: DisplayConfig,
}

export interface User {
  id: string,
  displayName: string,
  profilePicture: string,
  recentlyRead?: Book[];
  wishlist?: Book[];
}

export interface DisplayConfig {
  theme: 'light' | 'dark',
  fontSize: 'small' | 'large' | 'medium',
}
