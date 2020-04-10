import React from 'react';
import { RatingBar } from '../components/common/atoms';
import { BookInfoCard } from '../components/common/molecules';
import { BookList } from '../components/common/organisms';
import { Colors } from '../styles';
import { mockBooks, Book } from '../utils/mock-books';
import { Author } from '../utils/mock-authors';
import { Genre } from '../utils/mock-genres';

const HomePage = (props) => {
  // return (
  //   <div style={{ width: "100%", height: "100%", backgroundColor: '#DDDDDD' }}>
  //     <div style={{ width: "400px", height: "fit-content", margin: "50px 0 0 50px" }}>
  //       {/* <RatingBar /> */}
  //       {/* <RatingBar
  //         wrapperStyle={{ backgroundColor: 'blue' }}
  //         starStyle={{ fontSize: "100px", color: 'white' }}
  //       /> */}
  //       {/* <RatingBar
  //         ratingValue={0}
  //       /> */}
  //       <BookInfoCard
  //         title="The Catcher in the Rye"
  //         authors="by J.D. Salinger"
  //         subInfo="Classics, Fiction, Young Adult, Literature"
  //         cover="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1398034300l/5107.jpg"
  //         bookInfoContainerStyle={{ fontSize: "1rem" }}
  //         bookTitleStyle={{ fontSize: "1.25rem", color: Colors.PRIMARY }}
  //       >
  //         <div
  //           style={{
  //             flex: 1,
  //             display: 'flex',
  //             flexDirection: 'row',
  //             alignItems: "flex-end",
  //             paddingRight: "16%"
  //           }}
  //         >
  //           <RatingBar ratingValue={3.5/5}/>
  //           <div style={{ fontWeight: "bold", marginLeft: "10px" }}>(234)</div>
  //         </div>
  //       </BookInfoCard>
  //     </div>
  //   </div>
  // );

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: '#DDDDDD' }}>
      <BookList
        books={mockBooks}
      />
    </div>
  );
}

export default HomePage;
