import React from 'react';
import { RatingBar } from '../components/common/atoms';
import { BookInfoCard } from '../components/common/molecules';
import { Colors } from '../styles';

const HomePage = (props) => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: '#DDDDDD' }}>
      <div style={{ width: "350px", height: "fit-content", margin: "50px 0 0 50px" }}>
        {/* <RatingBar /> */}
        {/* <RatingBar
          wrapperStyle={{ backgroundColor: 'blue' }}
          starStyle={{ fontSize: "100px", color: 'white' }}
        /> */}
        {/* <RatingBar
          ratingValue={0}
        /> */}
        <BookInfoCard
          title="The Alchemist"
          authors="J.D. Salinger"
          subInfo="Classics, Mystery, Fiction"
          bookInfoContainerStyle={{ fontSize: "1rem" }}
          bookTitleStyle={{ fontSize: "1.25rem", color: Colors.PRIMARY }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: "flex-end",
              paddingRight: "16%"
            }}
          >
            <RatingBar ratingValue={3.5/5}/>
            <div style={{ fontWeight: "bold", marginLeft: "10px" }}>(234)</div>
          </div>
        </BookInfoCard>
      </div>
    </div>
  );
}

export default HomePage;
