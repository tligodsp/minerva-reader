import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

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

const SearchInput = () => {
  const classes = useStyles();
  let history = useHistory();
  const [ searchInput, setSearchInput ] = useState('');

  const handleSearchClick = () => {
    history.push({ pathname: '/search', state: { passedSearchTerm: searchInput } });
  }

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
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
