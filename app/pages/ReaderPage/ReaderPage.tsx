import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Reader } from '../../components/common/organisms';
import { LocalBook } from '../../types';
import * as Local from '../../utils/localUtils';
import ConfigModal from './ConfigModal';
import $ from 'jquery';
import { connect } from 'react-redux';

const ReaderPage = (props) => {
  let { id } = useParams();
  const [localBook, setLocalBook] = useState<LocalBook>();
  const [fullScreen, setFullScreen] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const { theme } = props.local;

  useEffect(() => {
    if (id) {
      Local.getLocalBookById(id)
          .then((response: any) => {
            setLocalBook(response.localBook);
          })
          .catch(err => {
            console.log(err);
          })
    }
    else {
      // TODO: Redirect
    }
  }, []);

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
          background: theme.readerBackgroundColor,
          display: 'none'
        }}
      />
      {
        localBook &&
        <Reader
          localBook={localBook}
          theme={theme}
          fullScreen={fullScreen}
          showConfigButton
          onConfigClick={onConfigClick}
          showScreenSizeButton
          onScreenSizeClick={onScreenSizeClick}
        />
      }
      <ConfigModal open={configModalOpen} onClose={() => setConfigModalOpen(false)} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  local: state.local,
});

export default connect(mapStateToProps)(ReaderPage);
