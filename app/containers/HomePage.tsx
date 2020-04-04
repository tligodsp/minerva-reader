import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import ReaderTest from '../components/ReaderTest';
// import ReaderTest from '../components/ReaderTest2';

export default function HomePage() {
  const [epubUrl, setEpubUrl] = useState('https://s3.amazonaws.com/epubjs/books/alice.epub');
  const [urlInput, setUrlInput] = useState('');

  const handleInputChange = (event: any) => {
    setUrlInput(event.target.value);
  }

  const handleSubmit = (event: any) => {
    setEpubUrl(urlInput);
    console.log(epubUrl);
    event.preventDefault();
  }

  useEffect(() => {
    console.log('aaa ' + epubUrl);
    setEpubUrl(epubUrl);
  }, [epubUrl]);

  // return (
  //   <div style={{ width: '100%', height: '100%' }}>
  //     <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <form onSubmit={handleSubmit}>
  //           <label>
  //             Url:
  //             <input type="text" name="name" value={urlInput} onChange={handleInputChange}/>
  //           </label>
  //           <input type="submit" value="Load" />
  //         </form>
  //       </div>
  //       <div style={{ flex: 1 }}>
  //         <ReaderTest epubUrl={epubUrl}/>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <ReaderTest />
  );
}
