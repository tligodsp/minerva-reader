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

export const thangL: User = {
  id: 'user01',
  displayName: 'Champa Prince',
  profilePicture: 'https://avatars1.githubusercontent.com/u/36944931?s=400&u=7f900b684b7997d76a911ec2bdb24f81f3f9eaca&v=4',
  recentlyRead: [ MockBooks.mockBooks[5], MockBooks.mockBooks[8], MockBooks.mockBooks[2], MockBooks.mockBooks[9] ],
  wishlist: [ MockBooks.mockBooks[2], MockBooks.mockBooks[3], MockBooks.mockBooks[7], MockBooks.mockBooks[6] ],
}

export const thangNg: User = {
  id: 'user02',
  displayName: 'Boy vip',
  profilePicture: 'https://avatars1.githubusercontent.com/u/37970784?s=400&u=979da49288883558230a65bca63a41834c263583&v=4',
  recentlyRead: [ MockBooks.mockBooks[5], MockBooks.mockBooks[8], MockBooks.mockBooks[2], MockBooks.mockBooks[9] ],
  wishlist: [ MockBooks.mockBooks[2], MockBooks.mockBooks[3], MockBooks.mockBooks[7], MockBooks.mockBooks[6] ],
}

export const mockUsers: User[] = [ currentUser, thangL, thangNg ];
