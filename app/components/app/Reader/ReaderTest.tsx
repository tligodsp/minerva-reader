import React, { useState, useEffect } from 'react';
import { ReactReader, ReactReaderStyle, EpubView } from 'react-reader';
import FileReaderInput from 'react-file-reader-input';
import { Button } from 'react-bootstrap';
import process from 'process';
import {
  ReaderContainer,
} from '../../to_be_deleted/Components'

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
  const [localFile, setLocalFile] = useState(
    storage && storage.getItem('local-path')
          ? storage.getItem('local-path')
          : 'C:\\Users\\tligsp\\Downloads\\moby-dick (2).epub'
  );
  const [localName, setLocalName] = useState(null);

  const rendition = null;

  const onLocationChanged = (location: any) => {
    setLocation(location);
  }

  useEffect(() => {
    storage && storage.setItem('epub-location', location);
    console.log('eff ' + storage.getItem('epub-location'));
  }, [location]);

  const handleInputChange = (event: any) => {
    setUrlInput(event.target.value);
  }

  const handleChangeFile = (event, results) => {
    if (results.length > 0) {
      const [e, file] = results[0];
      if (file.type !== "application/epub+zip") {
        return alert("Unsupported type");
      }
      var filePath = file.path;
      setLocalFile(filePath);
      setLocalName(file.name);
      setLocation(0);
      console.log(filePath);
      window.location.reload();
    }
  }

  useEffect(() => {
    storage && storage.setItem('local-path', localFile);
    // setLocalName(localFile);
    // setLocation(null);
    // window.location.reload();
  }, [localFile]);

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
          {/* <form onSubmit={handleSubmit}>
            <label>
              Url:
              <input type="text" name="name" value={urlInput} onChange={handleInputChange}/>
            </label>
            <input type="submit" value="Load" />
          </form> */}
          <FileReaderInput as="buffer" onChange={handleChangeFile}>
            <Button>Upload local epub</Button>
          </FileReaderInput>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ position: 'absolute', top: '50px', bottom: '0', left: '150px', right: '0', transition: 'all 0.6s ease' }}>
            {/* <ReactReader
              url={localFile || epubUrl}
              title={localName || epubUrl}
              location={location}
              locationChanged={onLocationChanged}
            /> */}
            <ReactReader
              url={localFile}
              title={localName || epubUrl}
              location={location}
              locationChanged={onLocationChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderTest;
