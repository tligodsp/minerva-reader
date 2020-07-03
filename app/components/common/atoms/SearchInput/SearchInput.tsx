import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      boxShadow: 'none',
      borderRadius: '16px'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

const SearchInput = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const [ searchInput, setSearchInput ] = useState('');

  console.log(location);

  const handleSearchClick = () => {
    if (location.pathname.includes('/search')) {
      history.go(0);
      history.replace({ pathname: '/search', state: { passedSearchTerm: searchInput } });
    }
    else {
      history.push({ pathname: '/search', state: { passedSearchTerm: searchInput } });
    }
  }

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
    // props.onChangeSearchInput(e.target.value);
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Books"
        inputProps={{ 'aria-label': 'search books' }}
        value={searchInput}
        onChange={onChangeInput}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;
