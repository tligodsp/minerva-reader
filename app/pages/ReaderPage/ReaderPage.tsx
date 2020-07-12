import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Reader } from '../../components/common/organisms';
import { LocalBook, DisplayConfig } from '../../types';
import * as Local from '../../utils/localUtils';
import ConfigModal from './ConfigModal';
import $ from 'jquery';
import { connect } from 'react-redux';
import transitions from '@material-ui/core/styles/transitions';

const ReaderPage = (props) => {
  let { id } = useParams();
  const [localBook, setLocalBook] = useState<LocalBook>();
  const [fullScreen, setFullScreen] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const { commonDisplay } = props.local;
  const [ display, setDisplay ] = useState<DisplayConfig>(commonDisplay);
  const [ theme, setTheme ] = useState(props.local.theme);

  useEffect(() => {
    if (id) {
      Local.getLocalBookById(id)
          .then((response: any) => {
            setLocalBook(response.localBook);
            if (response.localBook.useCommonDisplay == null
              || response.localBook.useCommonDisplay
              || response.localBook.displayConfig == null) {
              setDisplay(commonDisplay);
              // setTheme({ ...Local.getThemeByName(commonDisplay.theme) });
            }
            else {
              setDisplay(response.localBook.displayConfig);
              // setTheme({ ...Local.getThemeByName(display.theme) });
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
    else {
      // TODO: Redirect
    }
  }, []);

  useEffect(() => {
    setTheme({ ...Local.getThemeByName(display.theme) });
    // console.log(Local.getThemeByName(display.theme));
    // console.log(display);
  }, [display])

  const onConfigClick = () => {
    // console.log('click');
    setConfigModalOpen(!configModalOpen);
  }

  const onScreenSizeClick = () => {
    const navbarElem = $("#hideNavBar");
    if (fullScreen) {
      navbarElem.fadeOut(100);
    }
    else {
      navbarElem.fadeIn(100);
    }
    setFullScreen(!fullScreen);
    // window.location.reload(false);
  }

  const handleApplyDisplayConfig = (newDisplayConfig: DisplayConfig) => {
    // setDisplay(newDisplayConfig);
    if (id) {
      Local.getLocalBookById(id)
            .then((response: any) => {
              setLocalBook(response.localBook);
              if (response.localBook.useCommonDisplay == null
                || response.localBook.useCommonDisplay
                || response.localBook.displayConfig == null) {
                setDisplay(commonDisplay);
                // setTheme({ ...Local.getThemeByName(commonDisplay.theme) });
              }
              else {
                setDisplay(response.localBook.displayConfig);
                // setTheme({ ...Local.getThemeByName(display.theme) });
              }
            })
            .catch(err => {
              console.log(err);
            })
    }
  }

  return (
    <div>
      <div
        id="hideNavBar"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          // width: '500px',
          backgroundColor: theme.readerBackgroundColor,
          display: 'none',
          transition: 'all 0.3s'
        }}
      />
      {
        localBook &&
        <Reader
          localBook={localBook}
          theme={theme}
          fontSize={display.fontSize}
          fullScreen={fullScreen}
          showConfigButton
          onConfigClick={onConfigClick}
          showScreenSizeButton
          onScreenSizeClick={onScreenSizeClick}
        />
      }
      {
        localBook &&
        <ConfigModal
          open={configModalOpen}
          localBook={localBook}
          onApply={handleApplyDisplayConfig}
          onClose={() => setConfigModalOpen(false)}
        />
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  local: state.local,
});

export default connect(mapStateToProps)(ReaderPage);
