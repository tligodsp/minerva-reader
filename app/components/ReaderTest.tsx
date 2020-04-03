import React from 'react';
import { ReactReader } from 'react-reader';

const ReaderTest = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactReader
        url={"https://s3.amazonaws.com/epubjs/books/alice.epub"}
        title={"Alice in wonderland"}
        location={"epubcfi(/6/2[cover]!/6)"}
        locationChanged={(epubcifi: any) => console.log(epubcifi)}
      />
    </div>
  );
}

export default ReaderTest;
