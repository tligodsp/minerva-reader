import React, {useState, useEffect} from 'react';
import styles from './SettingsPage.module.scss';
import Divider from '@material-ui/core/Divider';
import { DisplayConfig } from '../../types';
import { setDefaultDisplay } from '../../actions/localActions';
import * as Local from '../../utils/localUtils';
import { connect } from 'react-redux';

const SettingsPage = (props) => {
  const { theme, commonDisplay } = props.local;
  const [ display, setDisplay ] = useState<DisplayConfig>(commonDisplay);

  useEffect(() => {

  }, []);

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

  const handleSyncClick = () => {
    Local.getUnsyncedBooks()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: theme.backgroundColor
      }}
    >
      <div
        className={styles['contents']}
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
        <div style={{ height: '40px' }}/>
        <div
          className={styles['config-container']}
          style={{ backgroundColor: theme.cardBGColor }}
        >
          <div className={styles['header']}>Sync Data</div>
          <Divider style={{ margin: "10px 0 0" }}/>
          <div
            style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.1rem',
              fontWeight: 500,
            }}
          >Backup your Data</div>
          <button
            className="button"
            style={{
              height: '40px'
            }}
            onClick={handleSyncClick}
          >
            Sync
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  local: state.local,
});

export default connect(mapStateToProps, { setDefaultDisplay })(SettingsPage);
