import { Author } from '../types';

export const shakespeare: Author = {
  id: "shakespeare",
  name: "William Shakespeare",
  photo: `https://images.gr-assets.com/authors/1586700347p8/947.jpg`,
  about: `William Shakespeare (baptised 26 April 1564) was an English poet and playwright, widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist. He is often called England's national poet and the "Bard of Avon" (or simply "The Bard"). His surviving works consist of 38 plays, 154 sonnets, two long narrative poems, and several other poems. His plays have been translated into every major living language, and are performed more often than those of any other playwright.`,
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

export const getMockLocalAuthors = () => {
  return mockAuthors;
}
