import React, {useState, useEffect} from 'react';
import styles from './SettingsPage.module.scss';
import Divider from '@material-ui/core/Divider';
import { DisplayConfig } from '../../types';
import { setDefaultDisplay } from '../../actions/localActions';
import * as Local from '../../utils/localUtils';
import * as Service from '../../utils/serviceUtils';
import { connect } from 'react-redux';
import { UploadButton } from '../../components/common/atoms';
import { LoadingOverlay } from '../../components/common/molecules';
import { setCurrentUserAction } from '../../actions/userActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Scrollbars } from 'react-custom-scrollbars';
import * as Constants from '../../utils/constants';

const SettingsPage = (props) => {
  const { theme, commonDisplay } = props.local;
  const { currentUser, isLoggedIn } = props.user;
  const [ display, setDisplay ] = useState<DisplayConfig>(commonDisplay);
  const [ isSyncing, setIsSyncing ] = useState(false);
  const [ isSSBOpen, setIsSSBOpen ] = useState(false);
  const [ isESBOpen, setIsESBOpen ] = useState(false);
  const [ newPhoto, setNewPhoto ] = useState<any>(null);
  const [ photoToShow, setPhotoToShow ] = useState('');
  const [ isUpdatingPhoto, setIsUpdatingPhoto ] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.profilePicture) {
      setPhotoToShow(currentUser.profilePicture);
    }
    else {
      setNewPhoto(Constants.NO_PHOTO_LINK);
    }
  }, []);

  useEffect(() => {
    if (newPhoto && newPhoto.path) {
      setPhotoToShow(newPhoto.path);
    }
  }, [newPhoto]);

  const onThemeClick = (chosenTheme: string) => {
    if (chosenTheme == 'dark') {
      setDisplay({ ...display, theme: 'dark' });
    }
    else {
      setDisplay({ ...display, theme: 'light' });
    }
  }

  const onFontSizeClick = (chosenFontSize: string) => {
    if (chosenFontSize == 'small') {
      setDisplay({ ...display, fontSize: 'small' });
    }
    else if (chosenFontSize == 'large') {
      setDisplay({ ...display, fontSize: 'large' });
    }
    else {
      setDisplay({ ...display, fontSize: 'medium' });
    }
  }

  const applyConfigClick = () => {
    props.setDefaultDisplay(display);
    Local.setCommonDisplayConfig(display);
  }

  const handleSSBClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSSBOpen(false);
  }

  const handleESBClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsESBOpen(false);
  }

  const handleUploadClick = () => {
    setIsSyncing(true);
    Local.getUserData()
      .then((response: any) => {
        const { userData } = response;
        console.log(currentUser);
        const userDataBlob = new Blob([JSON.stringify(userData, null, 2)], {type : 'application/json'});
        Service.uploadFile(`UserDatas`, userDataBlob, `${currentUser.id}.json`)
          .then((response: any) => {
            Service.updateUserDataLink(currentUser.username, response)
              .then((response: any) => {
                props.setCurrentUserAction(response.user);
                console.log(response);
                setIsSyncing(false);
                setIsSSBOpen(true);
              })
          })
          .catch((error) => {
            console.log(error);
            setIsSyncing(false);
            setIsESBOpen(true);
          })
      })
      .catch((error) => {
        console.log(error);
        setIsSyncing(false);
        setIsESBOpen(true);
      })
  }

  const handleDownloadClick = () => {
    if (!currentUser.dataLink) {
      return;
    }
    setIsSyncing(true);
    Local.downloadUserData(currentUser.dataLink)
      .then((response: any) => {
        console.log(response);
        setIsSyncing(false);
        setIsSSBOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSyncing(false);
        setIsESBOpen(true);

      })
  }

  const handleChoosingImage = (e: any) => {
		console.log(e.target.files);
		if (e.target.files[0]) {
			const image = e.target.files[0];
      setNewPhoto(image);
      console.log(image);
		}
  };

  const handleUpdatingPhotoClick = () => {
    setIsUpdatingPhoto(true);
    Service.uploadFile(`UserPhotos`, newPhoto, `${currentUser.id}`, true)
          .then((response: any) => {
            Service.updateUserPhoto(currentUser.username, response)
              .then((response: any) => {
                props.setCurrentUserAction(response.user);
                console.log(response);
                setIsUpdatingPhoto(false);
                setIsSSBOpen(true);
              })
          })
          .catch((error) => {
            console.log(error);
            setIsUpdatingPhoto(false);
            setIsESBOpen(true);
          })
  }

  const showSyncSection = () => {
    if (!isLoggedIn ||!currentUser || !currentUser.username) {
      return false;
    }
    return true;
  }

  const showProfilePhotoSection = () => {
    if (!isLoggedIn ||!currentUser || !currentUser.username) {
      return false;
    }
    return true;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: '20px',
        backgroundColor: theme.backgroundColor,
        transition: 'all 0.15s'
      }}
    >
      <div
        className={styles['main-display']}
      >

        <div className={styles['scroll-view-container']}>
          <Scrollbars className={styles['scroll-view']}>

            <div
              className={styles['contents']}
              style={{
                color: theme.textColor
              }}
            >
              <div
                className={styles['config-container']}
                style={{ backgroundColor: theme.cardBGColor }}
              >
                <div className={styles['header']}>Display Settings</div>
                <Divider style={{ margin: "10px 0 0" }}/>
                <div className={styles['config-group']}>
                  <div className={styles['group-header']}>Theme:</div>
                  <div className={styles['button-group']}>
                    <div
                      className={`button${display.theme == 'dark' ? '' : '-secondary'} ` + styles['left-button']}
                      onClick={() => onThemeClick('dark')}
                    >Dark</div>
                    <div
                      className={`button${display.theme == 'light' ? '' : '-secondary'} ` + styles['right-button']}
                      onClick={() => onThemeClick('light')}
                    >Light</div>
                  </div>
                </div>
                <div className={styles['config-group']}>
                  <div className={styles['group-header']}>Font Size:</div>
                  <div className={styles['button-group']}>
                    <div
                      className={`button${display.fontSize == 'small' ? '' : '-secondary'} ` + styles['left-button']}
                      onClick={() => onFontSizeClick('small')}
                    >Small</div>
                    <div
                      className={`button${display.fontSize == 'medium' ? '' : '-secondary'} ` + styles['middle-button']}
                      onClick={() => onFontSizeClick('medium')}
                    >Medium</div>
                    <div
                      className={`button${display.fontSize == 'large' ? '' : '-secondary'} ` + styles['right-button']}
                      onClick={() => onFontSizeClick('large')}
                    >Large</div>
                  </div>
                </div>

                <Divider style={{ margin: "20px 0" }}/>
                <button
                  className="button"
                  style={{
                    height: '40px'
                  }}
                  onClick={applyConfigClick}
                >
                  Apply
                </button>
              </div>
              <div style={{ height: '30px' }}/>
              {
                showSyncSection() &&
                <div
                  className={styles['config-container']}
                  style={{ backgroundColor: theme.cardBGColor, position: 'relative' }}
                >
                  <LoadingOverlay show={isSyncing}/>
                  <div className={styles['header']}>Sync Data</div>
                  <Divider style={{ margin: "10px 0 0" }}/>
                  {/* <div
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                    }}
                  >Backup your Data</div> */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                    <button
                      className="button"
                      style={{
                        height: '40px',
                        flex: 1,
                        margin: '10px'
                      }}
                      onClick={handleUploadClick}
                    >
                      Upload Data
                    </button>
                    <button
                      className="button"
                      style={{
                        height: '40px',
                        flex: 1,
                        margin: '10px'
                      }}
                      onClick={handleDownloadClick}
                    >
                      Download Data
                    </button>
                  </div>
                </div>
              }
              <div style={{ height: '30px' }}/>
              {
                showProfilePhotoSection() &&
                <div
                  className={styles['config-container']}
                  style={{
                    backgroundColor: theme.cardBGColor,
                    position: 'relative',
                  }}
                >
                  <LoadingOverlay show={isUpdatingPhoto}/>
                  <div className={styles['header']}>Change Profile Picture</div>
                  <Divider style={{ margin: "10px 0 0" }}/>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                    <div
                      className={styles['user-avatar']}
                      style={{
                        margin: '20px',
                        border: 'solid 1px rgba(0,0,0,0.2)',
                        position: 'relative',
                      }}
                    >
                      <img
                        className={styles['user-avatar']}
                        src={photoToShow}
                      />
                      <div style={{ position: 'absolute', right: 10, top: 10 }}>
                        <UploadButton accept="image/*" onChange={handleChoosingImage}/>
                      </div>
                    </div>
                  </div>
                  <Divider style={{ margin: "20px 0" }}/>
                  <button
                    className={ newPhoto ? "button" : "button-disabled"}
                    style={{
                      height: '40px'
                    }}
                    onClick={handleUpdatingPhotoClick}
                    disabled={ newPhoto == null }
                  >
                    Upload and Change
                  </button>
                </div>
              }
            </div>
          </Scrollbars>
        </div>
      </div>
          <Snackbar open={isSSBOpen} autoHideDuration={1000} onClose={handleSSBClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSSBClose} severity="success">
              Success!
            </MuiAlert>
          </Snackbar>
          <Snackbar open={isESBOpen} autoHideDuration={1000} onClose={handleESBClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleESBClose} severity="error">
              Something went wrong!
            </MuiAlert>
          </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  local: state.local,
  user: state.users,
});

export default connect(mapStateToProps, { setDefaultDisplay, setCurrentUserAction })(SettingsPage);
