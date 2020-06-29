import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Review, User, Book } from '../../types';
import styles from './BookInfoPage.module.scss';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ReviewBookModalProps {
  open: boolean,
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  user: User,
}

const ReviewBookModal = ({ open, handleClose, user }: ReviewBookModalProps) => {
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
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className={styles['button-secondary'] + ' ' + styles['start-review-button']}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className={styles['button'] + ' ' + styles['start-review-button']}
            onClick={handleClose}
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReviewBookModal;
