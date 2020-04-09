import React from 'react';
import { RatingBar } from '../components/common/atoms';

const HomePage = (props) => {
  return (
    <div style={{ width: "500px", height: "fit-content", border: "2px solid red", marginLeft: "50px" }}>
      {/* <RatingBar /> */}
      {/* <RatingBar
        wrapperStyle={{ backgroundColor: 'blue' }}
        starStyle={{ fontSize: "100px", color: 'white' }}
      /> */}
      <RatingBar
        ratingValue={0}
      />
    </div>
  );
}

export default HomePage;
