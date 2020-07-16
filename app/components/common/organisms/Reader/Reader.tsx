import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactReader, ReactReaderStyle  } from 'react-reader';
import { LocalBook } from '../../../../types';
import { Sizing } from '../../../../styles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import defaultStyles from './Reader.module.scss';
import { dark, light } from './readerThemes';
import $ from 'jquery';
import Theme from '../../../../styles/themes';
import * as Local from '../../../../utils/localUtils';

const globalAny:any = global;

const storage = globalAny.localStorage || null;

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem",
    },
    iconButtonLight: {
      fontSize: "2rem",
      color: Theme.light.readerTextColor,
    },
    iconButtonDark: {
      fontSize: "2rem",
      color: Theme.dark.readerTextColor,
    },
  }),
);

const TOC_WIDTH = 256;

interface ReaderProps {
  localBook: LocalBook,
  theme: any,
  fontSize: 'small' | 'medium' | 'large',
  fullScreen?: boolean,
  showConfigButton?:boolean,
  onConfigClick?: Function,
  showScreenSizeButton?:boolean,
  onScreenSizeClick?: Function,
}

const Reader = ({ localBook, theme, fontSize, fullScreen, showConfigButton, onConfigClick, showScreenSizeButton, onScreenSizeClick }: ReaderProps) => {
  const [location, setLocation] = useState(localBook.readingProgressCFI ? localBook.readingProgressCFI : 0);
  const [rendition, setRendition] = useState<any>();
  const [contentsLeftOffset, setContentsLeftOffset] = useState(0);
  const [contentsElem, setContentsElem] = useState<any>();
  const classes = useStyles();

  const onLocationChanged = (location: any) => {
    setLocation(location);
    Local.updateBookProgress(localBook.book.id, location);
  }

  // useEffect(() => {
  //   const chaptersToggleButtonElem = $('#reader button[style*="width: 32px"]');
  //   chaptersToggleButtonElem.attr("id", "chapters-toggle");
  //   chaptersToggleButtonElem.css("display", "none");
  //   const readContentsElem = chaptersToggleButtonElem.parent();
  //   console.log(readContentsElem);
  //   readContentsElem.css("background", theme.readerBackgroundColor);
  // }, []);

  useEffect(() => {
    const chaptersElem = $('#reader [style*="width: 256px"]');
    // console.log(chaptersElem.html());
    // chaptersElem.attr("id", "1000");
    // chaptersElem.css({"background-color": "red", "z-index": "1000"});
    chaptersElem.css({
      "background-color": theme.readerBackgroundColor,
      "color": theme.readerTextColor,
    });
    const chaptersToggleButtonElem = $('#reader button[style*="width: 32px"]');
    chaptersToggleButtonElem.attr("id", "chapters-toggle");
    chaptersToggleButtonElem.css("display", "none");
    const readContentsElem = chaptersToggleButtonElem.parent();
    // console.log(readContentsElem);
    readContentsElem.css("background", theme.readerBackgroundColor);
    if (rendition) {
      // console.log('rendition');
      // console.log(fontSize);
      rendition.themes.select(theme.name);
      if (fontSize == 'small') {
        rendition.themes.fontSize("80%");
      }
      else if (fontSize == 'large') {
        rendition.themes.fontSize("120%");
      }
      else {
        rendition.themes.fontSize("100%");
      }
    }
  }, [theme]);

  // useEffect(() => {
  //   _setFullScreen(fullScreen);
  // }, [fullScreen]);

  // useEffect(() => {
  //   storage && storage.setItem('epub-location', location);
  //   console.log('eff ' + storage.getItem('epub-location'));
  // }, [location]);

  const getRendition = rend => {
    setRendition(rend);
    // rend.themes.fontSize("140%");
    rend.themes.register("dark", dark);
    rend.themes.register("light", light);
    rend.themes.select(theme.name);
    if (fontSize == 'small') {
      rend.themes.fontSize("80%");
    }
    else if (fontSize == 'large') {
      rend.themes.fontSize("120%");
    }
    else {
      rend.themes.fontSize("100%");
    }
  }

  const onToggleTOC = () => {
    const chaptersElem = $('#reader [style*="width: 256px"]');
    // console.log(chaptersElem.html());
    // chaptersElem.attr("id", "1000");
    // chaptersElem.css({"background-color": "red", "z-index": "1000"});
    chaptersElem.css({
      "background-color": theme.readerBackgroundColor,
      "color": theme.readerTextColor,
    });
    if (contentsLeftOffset == 0) {
      setContentsLeftOffset(TOC_WIDTH);
    }
    else {
      setContentsLeftOffset(0);
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1 }}>
          <div
            id="reader"
            style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: fullScreen ? `${Sizing.NAVBAR_WIDTH / 2}px` : `${Sizing.NAVBAR_WIDTH}px`,
              right: fullScreen ? `${Sizing.NAVBAR_WIDTH / 2}px` : '0',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              className={defaultStyles['buttons-container']}
              style={{
                // left: `${20 + contentsLeftOffset}px`
                right: '50px',
                // color: `${theme.readerTextColor} !important`
              }}
            >
              <label htmlFor="chapters-toggle">
                <IconButton
                  component="span"
                  className={
                    (theme.name == 'light' ? classes.iconButtonLight : classes.iconButtonDark)
                    + " " + defaultStyles['icon-button']
                  }
                  onClick={onToggleTOC}
                >
                  <ViewListIcon />
                </IconButton>
              </label>
              {
                (showConfigButton && onConfigClick) &&
                <IconButton
                  className={
                    (theme.name == 'light' ? classes.iconButtonLight : classes.iconButtonDark)
                    + " " + defaultStyles['icon-button']
                  }
                  onClick={() => onConfigClick()}
                >
                  <SettingsIcon />
                </IconButton>
              }
              {
                (showScreenSizeButton && onScreenSizeClick) &&
                <IconButton
                  className={
                    (theme.name == 'light' ? classes.iconButtonLight : classes.iconButtonDark)
                    + " " + defaultStyles['icon-button']
                  }
                  onClick={() => onScreenSizeClick()}
                >
                  {
                    fullScreen ?
                    <FullscreenIcon />
                    : <FullscreenExitIcon />
                  }
                </IconButton>
              }
            </div>
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
