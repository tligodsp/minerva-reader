export interface Author {
  id: string,
  name: string,
  photo?: string
}

export const shakespeare: Author = {
  id: "shakespeare",
  name: "William Shakespeare"
}

export const julesVerne: Author = {
  id: "jverne",
  name: "Jules Verne"
}

export const pauloCoelho: Author = {
  id: "pCoelho",
  name: "Paulo Coelho"
}

export const agathaChristie: Author = {
  id: "aChristie",
  name: "Agatha Christie"
}

export const simonSingh: Author = {
  id: "sSingh",
  name: "Simon Singh"
}

export const conanDoyle: Author = {
  id: "cDoyle",
  name: "Sir Arthur Conan Doyle"
}

export const fitzgerald: Author = {
  id: "fitzgerald",
  name: "F. Scott Fitzgerald"
}

export const saintExupery: Author = {
  id: "exupery",
  name: "Antoine de Saint-Exupery"
}

export const salinger: Author = {
  id: "jdsalinger",
  name: "J.D. Salinger"
}

export const dBrown: Author = {
  id: "danbrown",
  name: "Dan Brown"
}

export const jDeaver: Author = {
  id: "jdeaver",
  name: "Jeffery Deaver"
}

export const hemingway: Author = {
  id: "hemingway",
  name: "Ernest Hemingway"
}

export const hgWells: Author = {
  id: "hgwells",
  name: "H.G. Wells"
}

export const iHasekura: Author = {
  id: "hasekura",
  name: "Isuna Hasekura"
}

export const jAyakura: Author = {
  id: "ayakura",
  name: "Juu Ayakura"
}

export const rNarita: Author = {
  id: "narita",
  name: "Ryohgo Narita"
}

export const sYasuda: Author = {
  id: "yasuda",
  name: "Suzuhito Yasuda"
}

export const georgeOrwell: Author = {
  id: "orwell",
  name: "George Orwell"
}

export const harperLee: Author = {
  id: "harperlee",
  name: "Harper Lee"
}

export const mockAuthors: Author[] = [
  harperLee, georgeOrwell, rNarita, hgWells, dBrown, jDeaver
]
