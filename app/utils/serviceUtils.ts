import { mockBooks } from './mock-books';
import { mockReviews } from './mock-reviews';
import { mockGenres } from './mock-genres';
import { mockAuthors } from './mock-authors';
import { Book, Review, ReviewInput, User, Genre, Author } from '../types/index';
import * as userAPI from '../api/userAPI';
import * as genreAPI from '../api/genreAPI';
import * as bookAPI from '../api/bookAPI';
import * as authorAPI from '../api/authorAPI';
import * as reviewAPI from '../api/reviewAPI';
import { storage } from '../firebase/firebase';

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const isElemInList = (elem: any, list: any[] | undefined) => {
  console.log(elem);
  console.log(list);
  if (!list) {
    return false;
  }
  return list.findIndex(e => e === elem) != -1;
}

export const uploadFile = (folder: string, file: any, name: string, autoExtension = false) => {
  const fileName = name.replace(/\s+/g, '');
  let fileExtension = '';
  if (autoExtension) {
    fileExtension = '.' + file.name.split('.').pop();
  }
	return new Promise((resolve, reject) => {
		const uploadTask = storage.ref(`${folder}/${fileName}${fileExtension}`).put(file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				console.log(error);
				reject(error);
			},
			() => {
				storage
					.ref(folder)
					.child(`${fileName}${fileExtension}`)
					.getDownloadURL()
					.then(url => {
						// console.log(url);
						resolve(url);
          })
          .catch(error => {
            reject(error);
          })
      }
    );
	});
}

// export const getBookByFilters = (searchTerm: string, authorIds: string[], genreIds: string[]) => {
//   /** API REPLACE */
//   // remove duplicates
//   // filteredBooks = filteredBooks.filter((book, index) => filteredBooks.indexOf(book) === index);
//   return new Promise((resolve, reject) => {
//     bookAPI.getBooks(searchTerm)
//       .then((response) => {
//         let filteredBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
//         for (let authorId of authorIds) {
//           // console.log(authorId);
//           filteredBooks = [ ...filteredBooks.filter(book => isElemInList(authorId, book.authorIds)) ];
//           // console.log(filteredBooks);
//         }
//         for (let genreId of genreIds) {
//           filteredBooks = [ ...filteredBooks.filter(book => isElemInList(genreId, book.genreIds)) ];
//         }
//         // if (searchTerm && searchTerm.length > 0) {
//         //   filteredBooks = [ ...filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm)) ];
//         // }
//         resolve({ books: filteredBooks });
//       })
//       .catch((error) => {
//         reject({ error, books: [] });
//       })
//     // resolve({ books: filteredBooks });
//   });
// }

export const getBookByFilters = (searchTerm: string) => {
  /** API REPLACE */
  // remove duplicates
  // filteredBooks = filteredBooks.filter((book, index) => filteredBooks.indexOf(book) === index);
  return new Promise((resolve, reject) => {
    bookAPI.getBooks(searchTerm)
      .then((response) => {
        let books = response.data.books.map(bookRes => convertBookModel(bookRes));
        // for (let authorId of authorIds) {
        //   // console.log(authorId);
        //   filteredBooks = [ ...filteredBooks.filter(book => isElemInList(authorId, book.authorIds)) ];
        //   // console.log(filteredBooks);
        // }
        // for (let genreId of genreIds) {
        //   filteredBooks = [ ...filteredBooks.filter(book => isElemInList(genreId, book.genreIds)) ];
        // }
        // if (searchTerm && searchTerm.length > 0) {
        //   filteredBooks = [ ...filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm)) ];
        // }
        resolve({ books });
      })
      .catch((error) => {
        reject({ error, books: [] });
      })
    // resolve({ books: filteredBooks });
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

export const updateUserDataLink = (username: string, link: string) => {
  return new Promise((resolve, reject) => {
    userAPI.updateUserDataLink(username, link)
      .then((response: any) => {
        // console.log(response);
        const user = convertUserModel(response.data.users);
        resolve({ user });
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const updateUserPhoto = (username: string, photoLink: string) => {
  return new Promise((resolve, reject) => {
    userAPI.updateUserPhoto(username, photoLink)
      .then((response: any) => {
        const user = convertUserModel(response.data.users);
        resolve({ user });
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getGenres = () => {
  return new Promise((resolve, reject) => {
    genreAPI.getAllGenres()
      .then((response: any) => {
        const convertedGenres = response.data.categories.map(genreRes => convertGenreModel(genreRes));
        resolve({ genres: convertedGenres });
      })
      .catch((error) => {
        reject({error, genres: []});
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

export const addBookToWishlist = (bookId: string) => {
  return new Promise((resolve, reject) => {
    userAPI.addBookToWishlist(bookId)
      .then((response: any) => {
        resolve({ result: 'SUCCESS', user: convertUserModel(response.data.user) });
      })
      .catch((error) => {
        console.log(error);
        reject({ result: 'ERROR' });
      })
  });
}

export const removeBookFromWishlist = (bookId: string) => {
  return new Promise((resolve, reject) => {
    userAPI.removeBookFromWishlist(bookId)
      .then((response: any) => {
        resolve({ result: 'SUCCESS', user: convertUserModel(response.data.user) });
      })
      .catch((error) => {
        console.log(error);
        reject({ result: 'ERROR' });
      })
  });
}

export const getBooks = (limit = 1000, query = '') => {
  return new Promise((resolve, reject) => {
    bookAPI.getBooks(query, limit)
      .then((response: any) => {
        const convertedBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getBookById = (id: string) => {
  return new Promise((resolve, reject) => {
    bookAPI.getBookById(id)
      .then((response: any) => {
        const convertedBook = convertBookModel(response.data.book);
        resolve({ book: convertedBook });
      })
      .catch((error) => {
        reject({error, book: []});
      })
  });
}

export const getSimilarBooks = (id: string, limit = 1000) => {
  console.log('get similar');
  return new Promise((resolve, reject) => {
    bookAPI.getSimilarBooks(id, limit)
      .then((response: any) => {
        console.log('similar res');
        console.log(response);
        const convertedBooks = response.data.book.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getHighRatedBooks = (limit = 1000) => {
  return new Promise((resolve, reject) => {
    bookAPI.getHighRatedBooks(limit)
      .then((response: any) => {
        const convertedBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getNewBooks = (limit = 1000) => {
  return new Promise((resolve, reject) => {
    bookAPI.getNewBooks(limit)
      .then((response: any) => {
        const convertedBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getPopularBooks = (limit = 1000) => {
  return new Promise((resolve, reject) => {
    bookAPI.getPopularBooks(limit)
      .then((response: any) => {
        const convertedBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getRecommendBooks = (favoriteGenreIds: string[], limit = 1000) => {
  return new Promise((resolve, reject) => {
    bookAPI.getRecommendBooks(favoriteGenreIds, limit)
      .then((response: any) => {
        const convertedBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getAuthors = () => {
  return new Promise((resolve, reject) => {
    authorAPI.getAuthors()
      .then((response: any) => {
        const convertedAuthors = response.data.authors.map(authorRes => convertAuthorModel(authorRes));
        resolve({ authors: convertedAuthors });
      })
      .catch((error) => {
        reject({error, authors: []});
      })
  });
}

export const getAuthorById = (id: string) => {
  return new Promise((resolve, reject) => {
    authorAPI.getAuthorById(id)
      .then((response: any) => {
        const convertedAuthor = convertAuthorModel(response.data.author);
        resolve({ author: convertedAuthor });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const getAuthorBooks = (authorId: string) => {
  return new Promise((resolve, reject) => {
    authorAPI.getBooksByAuthorId(authorId)
      .then((response: any) => {
        console.log('bba');
        console.log(response);
        const convertedBooks = response.data.books.map(bookRes => convertBookModel(bookRes));
        resolve({ books: convertedBooks });
      })
      .catch((error) => {
        reject({error, books: []});
      })
  });
}

export const getReviewsByBookId = (bookId: string) => {
  return new Promise((resolve, reject) => {
    reviewAPI.getReviewByBookId(bookId)
      .then((response: any) => {
        const convertedReview = response.data.review.reviews.map(reviewRes => convertReviewModel(reviewRes));
        resolve({ reviews: convertedReview });
      })
      .catch((error) => {
        reject({ error: error, reviews: [] });
      })
  });
}

export const createReview = (reviewInput: ReviewInput) => {
  return new Promise((resolve, reject) => {
    reviewAPI.createReview(reviewInput)
      .then((response: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const updateReview = (id: string, reviewInput: ReviewInput) => {
  return new Promise((resolve, reject) => {
    reviewAPI.updateReview(id, reviewInput)
      .then((response: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const deleteReview = (id: string) => {
  return new Promise((resolve, reject) => {
    reviewAPI.deleteReview(id)
      .then((response: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const reportReview = (reason: string, reviewId: string) => {
  return new Promise((resolve, reject) => {
    reviewAPI.reportReview(reason, reviewId)
      .then((response: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const upvoteReview = (id: string) => {
  return new Promise((resolve, reject) => {
    reviewAPI.upvoteReview(id)
      .then((response: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export const unvoteReview = (id: string) => {
  return new Promise((resolve, reject) => {
    reviewAPI.unvoteReview(id)
      .then((response: any) => {
        resolve({ result: 'SUCCESS' });
      })
      .catch((error) => {
        reject(error);
      })
  });
}

const convertUserModel = (userRes) => {
  const { id, username, fullName, favoriteIds, favoriteCategoryIds,
      favoriteBooks, favoriteCategories, profileAvatar, dataLink} = userRes;
  const user: User = {
    id: userRes.id,
    username: username,
    fullName: fullName,
    profilePicture: profileAvatar ? profileAvatar : `https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png`,
    wishlist: favoriteBooks ? favoriteBooks.map(bookRes => convertBookModel(bookRes)) : [],
    wishlistIds: favoriteIds,
    favoriteGenres: favoriteCategories ? favoriteCategories.map(genreRes => convertGenreModel(genreRes)) : [],
    favoriteGenreIds: favoriteCategoryIds,
    dataLink: dataLink,
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
      upvotes, reports, upvoteCount, reportCount, user } = reviewRes;
  const review: Review = {
    id: id,
    ratingValue: rating,
    content: comment,
    username: username,
    bookId: bookId,
    user: convertUserModel(user),
    upvoteCount: upvoteCount,
    reportCount: reportCount,
    reportUsers: reports ? reports.map(report => report.username) : [],
    upvoteUsers: upvotes
  }
  return review;
}
