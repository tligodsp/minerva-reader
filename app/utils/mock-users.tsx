import * as MockBooks from './mock-books';

export interface User {
  id: string,
  displayName: string,
  profilePicture: string,
  recentlyRead?: MockBooks.Book[];
  wishlist?: MockBooks.Book[];
}

export const currentUser: User = {
  id: 'user00',
  displayName: 'Thinh Nguyen',
  profilePicture: 'https://avatars2.githubusercontent.com/u/43437080?s=460&u=beb1f0fce8a61b11c99160291b4544a1e077314f&v=4',
  recentlyRead: [ MockBooks.mockBooks[5], MockBooks.mockBooks[8], MockBooks.mockBooks[2], MockBooks.mockBooks[9] ],
  wishlist: [ MockBooks.mockBooks[2], MockBooks.mockBooks[3], MockBooks.mockBooks[7], MockBooks.mockBooks[6] ],
}
