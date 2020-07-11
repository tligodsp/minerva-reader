import { Genre } from '../types';

export const classics: Genre = {
  id: "classics",
  name: "Classics"
}

export const fiction: Genre = {
  id: "fiction",
  name: "Fiction"
}

export const romance: Genre = {
  id: "romance",
  name: "Romance"
}

export const mystery: Genre = {
  id: "mystery",
  name: "Mystery"
}
export const scifi: Genre = {
  id: "scifi",
  name: "Science Fiction"
}

export const fantasy: Genre = {
  id: "fantasy",
  name: "Fantasy"
}

export const horror: Genre = {
  id: "horror",
  name: "Horror"
}

export const philosophy: Genre = {
  id: "philosophy",
  name: "Philosophy"
}

export const plays: Genre = {
  id: "plays",
  name: "Plays"
}

export const drama: Genre = {
  id: "drama",
  name: "Drama"
}

export const childrens: Genre = {
  id: "childrens",
  name: "Childrens"
}

export const crime: Genre = {
  id: "crime",
  name: "Crime"
}

export const thriller: Genre = {
  id: "thriller",
  name: "Thriller"
}

export const literature: Genre = {
  id: "literature",
  name: "Literature"
}

export const lightNovel: Genre = {
  id: "lightnovel",
  name: "Light Novel"
}

export const politics: Genre = {
  id: "politics",
  name: "Politics"
}

export const dystopia: Genre = {
  id: "dystopia",
  name: "Dystopia"
}

// export const mockGenres: Genre[] = [
//   dystopia, politics, scifi, literature, crime, philosophy, classics, mystery, fiction, romance, lightNovel
// ]

export const mockGenres: Genre[] = [
  {
      id: "5ee63696667dda1439c29a94",
      name: "Fiction"
  },
  {
      id: "5ee636a1667dda1439c29a95",
      name: "Classics"
  },
  {
      id: "5ee636a9667dda1439c29a96",
      name: "Romance"
  },
  {
      id: "5ee636b5667dda1439c29a97",
      name: "Mystery"
  },
  {
      id: "5ee636c9667dda1439c29a98",
      name: "Science Fiction"
  },
  {
      id: "5ee636d0667dda1439c29a99",
      name: "Fantasy"
  },
  {
      id: "5ee636d9667dda1439c29a9a",
      name: "Horror"
  },
  {
      id: "5ee636e2667dda1439c29a9b",
      name: "Philosophy"
  },
  {
      id: "5ee636ea667dda1439c29a9c",
      name: "Plays"
  },
  {
      id: "5ee636f4667dda1439c29a9d",
      name: "Drama"
  },
  {
      id: "5ee636fd667dda1439c29a9e",
      name: "Childrens"
  },
  {
      id: "5ee63704667dda1439c29a9f",
      name: "Crime"
  },
  {
      id: "5ee6370c667dda1439c29aa0",
      name: "Thriller"
  },
  {
      id: "5ee63714667dda1439c29aa1",
      name: "Literature"
  },
  {
      id: "5ee6371f667dda1439c29aa2",
      name: "Light Novel"
  },
  {
      id: "5ee6372b667dda1439c29aa3",
      name: "Politics"
  },
  {
      id: "5ee63735667dda1439c29aa4",
      name: "Dystopia"
  },
  {
      id: "5f09ee9d7d93dfde66687752",
      name: "Historical"
  },
  {
      id: "5f09f7dd7d93dfde66687760",
      name: "Adventure"
  },
  {
      id: "5f09f7f67d93dfde66687761",
      name: "Young Adult"
  }
]

export const getMockLocalGenres = () => {
  return mockGenres;
}
