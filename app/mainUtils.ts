export const addBookGenresToGenreList = (genreList: any[], book) => {
  if (!book || !book.genres) {
    return genreList;
  }
  let result = [ ...genreList ];
  for (let genre of book.genres) {
    const exist = genreList.findIndex(g => g.id === genre.id);
    if (exist == -1) {
      result = [ ...result, genre ];
    }
  }
  return result;
}

export const addBookAuthorsToAuthorList = (authorList: any[], book) => {
  if (!book || !book.authors) {
    return authorList;
  }
  let result = [ ...authorList ];
  for (let author of book.authors) {
    const exist = authorList.findIndex(a => a.id === author.id);
    if (exist == -1) {
      result = [ ...result, author ];
    }
  }
  return result;
}
