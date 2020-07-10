import React, { useState, useEffect } from 'react';
import { ReactReader, ReactReaderStyle  } from 'react-reader';
import { LocalBook } from '../../../../types';
import { Sizing } from '../../../../styles';

const globalAny:any = global;

const storage = globalAny.localStorage || null;

interface ReaderProps {
  localBook: LocalBook,
  fullScreen?: boolean,
}

const Reader = ({ localBook, fullScreen }: ReaderProps) => {
  const [location, setLocation] = useState(
    storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 0
  );
  const [rendition, setRendition] = useState(null);

  const onLocationChanged = (location: any) => {
    setLocation(location);
  }

  useEffect(() => {
    storage && storage.setItem('epub-location', location);
    console.log('eff ' + storage.getItem('epub-location'));
  }, [location]);

  const getRendition = rend => {
    setRendition(rend);
    // rend.themes.fontSize("140%");
    // rend.themes.register("light", { "body": { "color": "purple"}});
    // rend.themes.register("dark", { "body": { "color": "purple"}});
    // // rend.themes.select("light");
    // rend.themes.register({ "background": "#000" });
    // rend.themes.default({
    //   body: {
    //     'font-size': '32px',
    //     color: 'purple'
    //   },
    //   p: {
    //     "margin": '10px'
    //   }
    // });
    // rend.themes.default({ "body": { "background-color": "red !important"}});
    rend.themes.register("dark", { "body": { "background-color": "#666", color: "white !important"}});
    rend.themes.select("dark");
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1 }}>
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: fullScreen ? '0' : `${Sizing.NAVBAR_WIDTH}px`,
            right: '0',
            transition: 'all 0.6s ease'
          }}>
            <ReactReader
              url={localBook.bookFilePath}
              title={localBook.book.title}
              location={location}
              locationChanged={onLocationChanged}
              getRendition={getRendition}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reader;
