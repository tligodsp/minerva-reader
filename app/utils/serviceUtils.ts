import { mockBooks } from './mock-books';
import { mockReviews } from './mock-reviews';
import { mockGenres } from './mock-genres';
import { mockAuthors } from './mock-authors';
import { Book, Review, ReviewInput, User, Genre, Author } from '../types/index';
import * as userAPI from '../api/userAPI';
import * as genreAPI from '../api/genreAPI';

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

const isElemInList = (elem: any, list: any[] | undefined) => {
  if (!list) {
    return false;
  }
  return list.findIndex(e => e === elem) != -1;
}

export const getBookById = (id: string) => {
  /** API REPLACE */
  const book: Book | undefined = mockBooks.find(book => book.id === id);
  return new Promise((resolve, reject) => {
    book ? resolve({ book }) : reject("Err");
  });
}

export const getBookByFilters = (searchTerm: string, authorIds: string[], genreIds: string[]) => {
  /** API REPLACE */
  const books = mockBooks;
  let filteredBooks = mockBooks;
  for (let authorId of authorIds) {
    console.log(authorId);
    filteredBooks = [ ...filteredBooks.filter(book => isElemInList(authorId, book.authorIds)) ];
    console.log(filteredBooks);
  }
  for (let genreId of genreIds) {
    filteredBooks = [ ...filteredBooks.filter(book => isElemInList(genreId, book.genreIds)) ];
  }
  if (searchTerm && searchTerm.length > 0) {
    filteredBooks = [ ...filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm)) ];
  }
  // remove duplicates
  // filteredBooks = filteredBooks.filter((book, index) => filteredBooks.indexOf(book) === index);
  return new Promise((resolve, reject) => {
    resolve({ books: filteredBooks });
  });
}

export const getSimilarBooks = (bookId: string) => {
  /** API REPLACE */
  const books = mockBooks.slice(0, 8);
  return new Promise((resolve, reject) => {
    resolve({ books: books });
  });
}

export const getAuthorBooks = (authorId: string) => {
  const books = mockBooks;
  let authorBooks = [ ...books.filter(book => isElemInList(authorId, book.authorIds)) ];
  return new Promise((resolve, reject) => {
    resolve({ books: authorBooks });
  });
}

export const getReviewsByBookId = (bookId: string) => {
  /** API REPLACE */
  const reviews : Review[] = mockReviews.filter(review => review.book.id === bookId);
  return new Promise((resolve, reject) => {
    resolve({ reviews });
  });
}

export const createReview = (reviewInput: ReviewInput) => {
  const review: Review = { id: ID(), ...reviewInput };
  return new Promise((resolve, reject) => {
    mockReviews.push(review);
    resolve({ review });
  });
}

// export const getGenres = () => {
//   const genres = mockGenres;
//   return new Promise((resolve, reject) => {
//     resolve({ genres });
//   });
// }

export const getAuthors = () => {
  const authors = mockAuthors;
  return new Promise((resolve, reject) => {
    resolve({ authors });
  });
}

export const saveUserAndToken = (user, token) => {
  localStorage.setItem('user', user);
  localStorage.setItem('token', token);
}

export const getUserByUsername = (username: string) => {
  return new Promise((resolve, reject) => {
    userAPI.getUserByUsername(username)
      .then((response: any) => {
        // console.log(response);
        const convertedUser = convertUserModel(response.data.user);
        resolve({ user: convertedUser });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const getGenres = () => {
  return new Promise((resolve, reject) => {
    genreAPI.getAllGenres()
      .then((response: any) => {
        const convertedGenres = response.data.categories.map(genreRes => convertGenreModel(genreRes));
        resolve({ genres: convertedGenres });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const addFavoriteGenres = (genreIds: string[]) => {
  return new Promise((resolve, reject) => {
    const promiseList = genreIds.map(genreId => userAPI.addFavoriteGenre(genreId));
    Promise.all(promiseList)
      .then((responses: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

const convertUserModel = (userRes) => {
  const { id, username, fullName, favoriteIds, favoriteCategoryIds,
      favoriteBooks, favoriteCategories} = userRes;
  const user: User = {
    id: userRes.id,
    username: username,
    fullName: fullName,
    profilePicture: `https://avatars2.githubusercontent.com/u/43437080?s=460&u=beb1f0fce8a61b11c99160291b4544a1e077314f&v=4`,
    wishlist: favoriteBooks ? favoriteBooks.map(bookRes => convertBookModel(bookRes)) : [],
    wishlistIds: favoriteIds,
    favoriteGenres: favoriteCategories ? favoriteCategories.map(genreRes => convertGenreModel(genreRes)) : [],
    favoriteGenreIds: favoriteCategoryIds,
  }
  return user;
}

const convertBookModel = (bookRes) => {
  const { id, createAt, releaseAt, title, categoryIds, authorIds, image,
      description, link, categories, authors, rating } = bookRes;
  const book = {
    id: id,
    title: title,
    authors: authors ? authors.map(authorRes => convertAuthorModel(authorRes)) : [],
    authorIds: authorIds,
    genres: categories ? categories.map(genreRes => convertGenreModel(genreRes)) : [],
    genreIds: categoryIds,
    cover: image,
    ratingValue: rating,
    sypnosis: description,
    downloadLink: link,
    createAt: createAt,
    releaseAt: releaseAt,
  }
  return book;
}

const convertAuthorModel = (authorRes) => {
  const { id, name, about, PhotoURL } = authorRes;
  const author: Author = {
    id: id,
    name: name,
    about: about,
    photo: PhotoURL,
  }
  return author;
}

const convertGenreModel = (genreRes) => {
  const { id, name } = genreRes;
  const genre: Genre = {
    id: id,
    name: name,
  }
  return genre;
}

const convertReviewModel = (reviewRes) => {
  const { id, updateAt, comment, bookId, username, rating,
      upvotes, reports, upvoteCount, reportCount } = reviewRes;
  const review: Review = {
    id: id,
    ratingValue: rating,
    content: comment,
    username: username,
    bookId: bookId,
    upvoteCount: upvoteCount,
    reportCount: reportCount,
    reportUsers: reports ? reports.map(report => report.username) : [],
    upvoteUsers: upvotes
  }
  return review;
}
