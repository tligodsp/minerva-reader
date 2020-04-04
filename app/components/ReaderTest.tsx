import React, { useState, useEffect } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import {
  ReaderContainer,
} from './Components'

const globalAny:any = global;

const storage = globalAny.localStorage || null;

const ReaderTest = (props: any) => {
  // const [epubUrl, setEpubUrl] = useState('https://s3.amazonaws.com/epubjs/books/alice.epub');
  // const [epubUrl, setEpubUrl] = useState('https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf');
  // const [epubUrl, setEpubUrl] = useState('https://server.jieec.cn/ebooks/test.epub');
  const [epubUrl, setEpubUrl] = useState(
    storage && storage.getItem('epub-url')
          ? storage.getItem('epub-url')
          : 'https://s3.amazonaws.com/epubjs/books/alice.epub'
  );
  const [urlInput, setUrlInput] = useState('');
  const [location, setLocation] = useState(
    storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2
  );

  const rendition = null;

  const onLocationChanged = (location: any) => {
    setLocation(location);
  }

  useEffect(() => {
    storage && storage.setItem('epub-location', location);
  }, [location]);

  const handleInputChange = (event: any) => {
    setUrlInput(event.target.value);
  }

  const handleSubmit = (event: any) => {
    // setLocation(null);
    setEpubUrl(urlInput);
    console.log(epubUrl);
    // event.preventDefault();
  }

  useEffect(() => {
    storage && storage.setItem('epub-url', epubUrl);
  }, [epubUrl]);

  // useEffect(() => {
  //   setLocation(null);
  // }, [epubUrl]);

  // const getRendition = (rendition: any) => {

  // }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit}>
            <label>
              Url:
              <input type="text" name="name" value={urlInput} onChange={handleInputChange}/>
            </label>
            <input type="submit" value="Load" />
          </form>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ position: 'absolute', top: '50px', bottom: '0', left: '0', right: '0', transition: 'all 0.6s ease' }}>
            <ReactReader
                    url={epubUrl}
                    title={epubUrl}
                    location={location}
                    locationChanged={onLocationChanged}
                    styles={{
                      ...ReactReaderStyle,
                      reader: {
                        ...ReactReaderStyle.reader,
                        position: "absolute",
                        width: "100%",
                        top: 50,
                        left: 1,
                        bottom: 20,
                        right: 1
                      }
                    }}
                    epubOptions={{
                      fontSize: "18px",
                      flow: "scrolled-continuous",
                      width: "100%",
                      layout: {
                        columnWidth: 1000
                      }
                    }}
                  />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <ReaderContainer fullscreen={false}>
  //         <ReactReader
  //           url={props.epubUrl}
  //           locationChanged={onLocationChanged}
  //           title={'Alice in wonderland'}
  //           location={location}
  //         />
  //       </ReaderContainer>
  // );
}

export default ReaderTest;
