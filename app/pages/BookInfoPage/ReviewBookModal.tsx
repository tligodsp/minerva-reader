import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Review, ReviewInput, User, Book } from '../../types';
import styles from './ReviewBookModal.module.scss';
import * as CONSTANTS from '../../utils/constants';
import { InteractiveRatingBar } from '../../components/common/atoms';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as Service from '../../utils/serviceUtils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "'Quicksand', sans-serif",
      marginTop: "20px",
      fontWeight: 500,
      '& .MuiInputLabel-outlined': {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 500,
      },
      '& .MuiOutlinedInput-input': {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 500,
      },
    },
  }),
);

interface ReviewBookModalProps {
  open: boolean,
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  user: User,
  book: Book,
  onSubmitted: Function,
}

const ReviewBookModal = ({ open, handleClose, user, book, onSubmitted }: ReviewBookModalProps) => {
  const classes = useStyles();
  const [rating, setRating] = useState(-1);
  const [comment, setComment] = useState('');

  const onRatingValueChange = (newRating: number) => {
    setRating(newRating);
    console.log(newRating);
  }

  const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
    console.log(event.target.value);
  }

  const onDialogEnter = () => {
    setRating(-1);
    setComment('');
    console.log("enter");
  }

  const handleSubmit = () => {
    const reviewInput: ReviewInput = { ratingValue: rating < 0 ? 0 : rating, content: comment, user, book };
    Service.createReview(reviewInput)
      .then((response) => {
        onSubmitted();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className={styles['container']}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onEnter={onDialogEnter}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div className={styles['header']}>{`Share your opinion on ${book.title}`}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className={styles['modal-content']}>
              <div className={styles['user-photo-n-rating']}>
                <div className={styles['user-photo']}>
                  <img
                    className={styles['user-photo']}
                    src={user.profilePicture ? user.profilePicture : CONSTANTS.NO_PHOTO_LINK}
                  />
                </div>
                <div className={styles['user-rating']}>
                  <div className={styles['text']}>Your rating:</div>
                  <InteractiveRatingBar
                    ratingValue={rating}
                    onValueChange={onRatingValueChange}
                  />
                </div>
              </div>
              <div className={classes.root}>
                <TextField
                  id="outlined-multiline-static"
                  label="Your review"
                  multiline
                  rows={4}
                  defaultValue=""
                  value={comment}
                  onChange={onCommentChange}
                  variant="outlined"
                  className={styles['text-field']}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom: "10x", paddingRight: "10px" }}>
          <button
            className="button-secondary"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReviewBookModal;
