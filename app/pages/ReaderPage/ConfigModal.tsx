import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import { TransitionProps } from '@material-ui/core/transitions';
import { LocalBook, DisplayConfig } from '../../types';
import styles from './ConfigModal.module.scss';
import * as Local from '../../utils/localUtils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ConfigModalProps {
  open: boolean,
  localBook: LocalBook,
  onApply: Function,
  onClose: Function,
}

const ConfigModal = ({ open, localBook, onApply, onClose }: ConfigModalProps) => {
  const [ useCommonChecked, setUseCommonChecked ] = useState(true);
  const [ display, setDisplay ] = useState<any>(Local.getDefaultDisplayConfig());

  useEffect(() => {
  }, []);

  const handleClose = () => {
    onClose();
  };

  const onEnter = () => {
    if (localBook.useCommonDisplay == null || localBook.useCommonDisplay || localBook.displayConfig == null) {
      setUseCommonChecked(true);
    }
    else {
      setUseCommonChecked(false);
    }
    if (localBook.displayConfig) {
      setDisplay(localBook.displayConfig);
    }
    else {
      setDisplay(Local.getDefaultDisplayConfig());
    }
  }

  const handleCheckChange = () => {
    setUseCommonChecked(!useCommonChecked);
  }

  const handleApplyConfig = () => {
    Local.updateBookDisplayConfig(localBook.book.id, display, useCommonChecked);
    onApply(display);
    onClose();
  }

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

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onEnter={onEnter}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div className={styles['header']}>{`Customize Display`}</div>
        </DialogTitle>
        <DialogContent dividers>
          <div className={styles['dialog-contents']}>
            <div className={styles['switch-container']}>
              <Switch
                checked={useCommonChecked}
                onChange={handleCheckChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <div>Use Common Display Config?</div>
            </div>
            <div className={styles['custom-config-container']}>
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
              {
                useCommonChecked &&
                <div
                  id="block-contents"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
              }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="button-secondary"
            onClick={handleClose}
            style={{
              borderWidth: 0,
              marginLeft: 0
            }}
          >
            Cancel
          </button>
          <button
            className="button-secondary"
            onClick={handleApplyConfig}
            style={{
              borderWidth: 0,
            }}
          >
            Apply
          </button>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Apply
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfigModal;
