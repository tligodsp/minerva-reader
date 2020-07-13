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
import styles from './ReportReviewModal.module.scss';
import * as CONSTANTS from '../../utils/constants';
import { InteractiveRatingBar } from '../../components/common/atoms';
import { LoadingOverlay } from '../../components/common/molecules';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as Service from '../../utils/serviceUtils';
import { colors } from '@material-ui/core';
import CTheme from '../../styles/themes';
import $ from 'jquery';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootLight: {
      fontFamily: "'Quicksand', sans-serif",
      marginTop: "20px",
      fontWeight: 500,
      '& .MuiInputLabel-outlined': {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 500,
        color: CTheme.light.textColor,
      },
      '& .MuiOutlinedInput-input': {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 500,
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: CTheme.light.textFieldActiveColor
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: CTheme.light.textFieldActiveColor
      },
    },
    rootDark: {
      fontFamily: "'Quicksand', sans-serif",
      marginTop: "20px",
      fontWeight: 500,
      '& .MuiInputLabel-outlined': {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 500,
        color: CTheme.dark.textColor,
      },
      '& .MuiOutlinedInput-input': {
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 500,
        color: CTheme.dark.textColor
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: CTheme.dark.textFieldActiveColor
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: CTheme.dark.textFieldActiveColor
      },
    },
  }),
);

interface ReportReviewModalProps {
  open: boolean,
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  review: Review
  onSubmitted: Function,
  theme: any,
}

const ReportReviewModal = ({ open, handleClose, review, onSubmitted, theme }: ReportReviewModalProps) => {
  const classes = useStyles();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  }

  const onDialogEnter = () => {
    setReason('');
    const dialogContainerElem = $('#dialog-report div[role="dialog"]');
    dialogContainerElem.css({
      'background-color': theme.cardBGColor,
      'color': theme.textColor,
      'position': 'relative',
    });
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    Service.reportReview(reason, review.id)
      .then((response: any) => {
        setIsSubmitting(false);
        onSubmitted();
      })
      .catch((error) => {
        console.log(error);
      })
    // const reviewInput: ReviewInput = { ratingValue: rating < 0 ? 0 : rating, content: comment, bookId: book.id };
    // if (reviewToEdit) {
    //   Service.updateReview(reviewToEdit.id, reviewInput)
    //     .then((response) => {
    //       setIsSubmitting(false);
    //       onSubmitted();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }
    // else {
    //   Service.createReview(reviewInput)
    //     .then((response) => {
    //       setIsSubmitting(false);
    //       onSubmitted();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }
  }

  return (
    <div
      className={styles['container']}
    >
      <Dialog
        id="dialog-report"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onEnter={onDialogEnter}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        // style={{ position: 'relative' }}
      >
        <LoadingOverlay show={isSubmitting} />
        <DialogTitle id="alert-dialog-slide-title">
          <div
            className={styles['header']}
            style={{ fontWeight: 600 }}
          >{`Report ${review.username}'s review`}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className={styles['modal-content']}>
              <div className={theme.name == 'light' ? classes.rootLight : classes.rootDark}>
                <TextField
                  id="outlined-multiline-static"
                  label="Your reason to report"
                  multiline
                  rows={4}
                  defaultValue=""
                  value={reason}
                  onChange={onReasonChange}
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

export default ReportReviewModal;
