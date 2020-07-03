import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SearchInput } from '../../atoms';
import defaultStyles from './LibraryPageTopBar.css';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
  }),
);

const LibraryPageTopBar = (props) => {
  const classes = useStyles();
  return (
    <div className={defaultStyles['search-bar-container']}>
      <SearchInput
        // onChangeSearchInput={props.onChangeSearchInput}
      />
      <div className={defaultStyles['menu-button-container']}>
        <IconButton className={classes.iconButton} onClick={props.onDrawerClick}>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default LibraryPageTopBar;
