import React, { useState, useEffect } from 'react';
import { LibraryPageTemplate } from '../../components/common/template';
import { LocalBook } from '../../types';
import { BookList, BookListSection } from '../../components/common/organisms';
import * as Local from '../../utils/localUtils';
import styles from './LocalLibraryPage.module.scss';
import { Colors } from '../../styles';

const TAB = {
	RECENTLY_READ: 'Recently Read',
	RECENTLY_ADDED: 'Recently Added',
	WANT_TO_READ: 'Want To Read',
	ALL: 'All Downloaded',
}

const TAB_LIST = [
	TAB.RECENTLY_READ,
	TAB.RECENTLY_ADDED,
	TAB.WANT_TO_READ,
	TAB.ALL
];

const LocalLibrary = () => {
  const [chosenTab, setChosenTab] = useState(TAB.RECENTLY_READ);
  const [books, setBooks] = useState<LocalBook[]>([]);

  useEffect(() => {
    if (chosenTab == TAB.RECENTLY_READ) {
      Local.getRecentlyReadBooks()
          .then((response: any) => {
            setBooks(response.books)
            console.log(response);
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.RECENTLY_ADDED) {
      Local.getRecentlyAddedBooks()
          .then((response: any) => {
            setBooks(response.books)
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.WANT_TO_READ) {
      Local.getWantToReadBooks()
          .then((response: any) => {
            setBooks(response.books)
          })
          .catch(err => {
            console.log(err)
          })
    }
    else {
      Local.getAllDownloadedBooks()
          .then((response: any) => {
            setBooks(response.books)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }, [chosenTab])

	return (
		<LibraryPageTemplate>
      <div className={styles['container']}>
        <div className={styles['tabs']}>
          {
            TAB_LIST.map((tab, index) => (
              <div
                key={`tab-${index}`}
                className={tab == chosenTab ? styles['tab-active'] : styles['tab-inactive']}
                onClick={() => setChosenTab(tab)}
              >
                {tab}
              </div>
            ))
          }
        </div>
        <div>
          <BookList
            books={books}
            isLocalBooks
            wrapperStyle={{
              justifyContent: 'flex-start',
              borderRadius: "10px",
              padding: "0px"
            }}
            bookContainerStyle={{ width: "12%", margin: "1%", fontSize: "0.85rem" }}
            bookProps={{
              wrapperStyle: { borderRadius: "10px", padding: "14px" },
              bookTitleStyle: { fontSize: "0.85rem" },
              bookAuthorsStyle: { fontSize: "0.8rem" },
              bookCoverStyle: { borderRadius: "10px" }
            }}
            isVerticalBookCard
            useProgressForChildren={chosenTab == TAB.RECENTLY_READ}
            hideSubInfo
            showSimpleRating
          />
        </div>
      </div>
    </LibraryPageTemplate>
	);
}

export default LocalLibrary;
