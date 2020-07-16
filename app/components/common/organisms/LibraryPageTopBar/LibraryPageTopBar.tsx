import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SearchInput } from '../../atoms';
import defaultStyles from './LibraryPageTopBar.css';
import { connect } from 'react-redux';
import { Theme } from '../../../../styles';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
    iconButtonLight: {
      fontSize: "2rem",
      color: Theme.light.readerTextColor,
    },
    iconButtonDark: {
      fontSize: "2rem",
      color: Theme.dark.readerTextColor,
    },
  }),
);

const LibraryPageTopBar = (props) => {
  const classes = useStyles();
  const { theme } = props.local;
  const { isLoggedIn, currentUser } = props.user;

  const showDrawerButton = () => {
    if (!isLoggedIn ||!currentUser || !currentUser.username) {
      return false;
    }
    return true;
  }

  return (
    <div className={defaultStyles['search-bar-container']}>
      { props.leftElement }
      <SearchInput
        // onChangeSearchInput={props.onChangeSearchInput}
      />
      {
        showDrawerButton() &&
        <div className={defaultStyles['menu-button-container']}>
          <IconButton
            className={ theme.name == 'light' ? classes.iconButtonLight : classes.iconButtonDark }
            onClick={props.onDrawerClick}
          >
            <MenuIcon />
          </IconButton>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  local: state.local,
  user: state.users
});

export default connect(mapStateToProps)(LibraryPageTopBar);
