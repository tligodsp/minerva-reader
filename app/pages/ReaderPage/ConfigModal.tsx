import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import { TransitionProps } from '@material-ui/core/transitions';
import styles from './ConfigModal.module.scss';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ConfigModalProps {
  open: boolean,
  onClose: Function,
}

const ConfigModal = ({ open, onClose }: ConfigModalProps) => {
  const [useCommonChecked, setUseCommonChecked] = useState(true);
  const handleClose = () => {
    onClose();
  };

  const handleCheckChange = () => {
    setUseCommonChecked(!useCommonChecked);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
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
                  <div className={'button-secondary ' + styles['left-button']}>Dark</div>
                  <div className={'button-secondary ' + styles['right-button']}>Light</div>
                </div>
              </div>
              <div className={styles['config-group']}>
                <div className={styles['group-header']}>Font Size:</div>
                <div className={styles['button-group']}>
                  <div className={'button-secondary ' + styles['left-button']}>Small</div>
                  <div className={'button-secondary ' + styles['middle-button']}>Medium</div>
                  <div className={'button-secondary ' + styles['right-button']}>Large</div>
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
            onClick={handleClose}
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
