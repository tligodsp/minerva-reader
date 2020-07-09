import React, { useState, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { LocalBook } from '../../../../types';

const globalAny:any = global;

const storage = globalAny.localStorage || null;

interface ReaderProps {
  localBook: LocalBook
}

const Reader = ({ localBook }: ReaderProps) => {
  const [location, setLocation] = useState(
    storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2
  );

  const onLocationChanged = (location: any) => {
    setLocation(location);
  }

  useEffect(() => {
    storage && storage.setItem('epub-location', location);
    console.log('eff ' + storage.getItem('epub-location'));
  }, [location]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1 }}>
          <div style={{ position: 'absolute', top: '50px', bottom: '0', left: '150px', right: '0', transition: 'all 0.6s ease' }}>
            {/* <ReactReader
              url={localFile || epubUrl}
              title={localName || epubUrl}
              location={location}
              locationChanged={onLocationChanged}
            /> */}
            <ReactReader
              url={localBook.bookFilePath}
              title={localBook.book.title}
              location={location}
              locationChanged={onLocationChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reader;
