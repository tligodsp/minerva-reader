import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { Button } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

interface IUploadButtonProps {
	accept?: string | undefined,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	children?: React.ReactNode | undefined,
	inputId?: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  }),
);

const UploadButton = (props: IUploadButtonProps) => {
  const classes = useStyles();
	return (
		<div>
			<input
				accept={props.accept ? props.accept : "*"}
				style={{ display: 'none' }}
				id={`file-input-${props.inputId ? props.inputId : 0}`}
				multiple
				type="file"
				onChange={props.onChange}
			/>
			<label htmlFor={`file-input-${props.inputId ? props.inputId : 0}`}>
				<IconButton
					component="span"
					className={classes.iconButton}
				>
					<PhotoCameraIcon />
				</IconButton>
			</label>
		</div>
	);
}

export default UploadButton;
