import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as authAPI from '../../api/authAPI';
import { connect } from 'react-redux';
import { setTokenAction, setCurrentUserAction, removeTokenAction } from '../../actions/userActions';
import * as Service from '../../utils/serviceUtils';
import { LoadingOverlay } from '../../components/common/molecules';
import Chips from 'react-chips';
import { FilterCard } from '../../components/common/molecules';
import styles from './SignUpPage.module.scss';
import { Genre } from '../../types';
import $ from 'jquery';
import Theme from '../../styles/themes';

const CustomChip = (props: any) => {
  console.log(styles);
	return (
    <div
      className={'custom-chip-container'}
      style={{ backgroundColor: props.chipColor }}
    >
			{props.children}
			<div
				className={'chip-x-icon'}
				onClick={() => props.onRemove(props.index)}
			>&times;</div>
		</div>
	);
}

const SignUpPage = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [allGenres, setAllGenres] = useState([]);
  const [ genresFilter, setGenresFilter ] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const { theme } = props.local;

  useEffect(() => {
    setIsFormLoading(true);
    Service.getGenres()
      .then((response: any) => {
        setAllGenres(response.genres);
        setIsFormLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFormLoading(false);
      });
    const chipFieldElem = $('div[data-radium="true"]');
    chipFieldElem.css({'padding': '16px 12px', 'margin-top': '16px'});
    const chipFieldInputElem = chipFieldElem.find("input");
    chipFieldInputElem.css({ 'margin': 0, padding: 0, 'font-size': '1rem' });
  }, []);

  useEffect(() => {
    console.log(allGenres);
  }, [allGenres]);

  const onSignUp = () => {
    if (password != passwordConfirm) {
      setErrorMessage(`Passwords don't match`);
      return;
    }
    if (genresFilter.length < 1) {
      setErrorMessage(`Please let us know some of your favorite book genres`);
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    const favoriteGenreIds = genresFilter.map(genre => genre.id);
    authAPI.signUp(username, password, favoriteGenreIds)
      .then(response => {
        setIsLoading(false);
        setErrorMessage('');
        console.log(response);
        history.push('/login');

      })
      .catch(err => {
        setIsLoading(false);
        setErrorMessage('Something went wrong');
        console.log(err);
      });
  }

  const onSelectedGenresChange = (genres: Genre[]) => {
    setGenresFilter([...genres]);
		// console.log(genresFilter);
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundColor,
    }}>
      <Card className={classes.card}>
        <LoadingOverlay show={isFormLoading}/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className={classes.typography}>
                Sign Up
              </Typography>
              <form className={classes.form} noValidate>
                {/* TODO: Clean this up */}
                <div style={{ color: 'red' }}>{errorMessage}</div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={event => {setUsername(event.target.value)}}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      onSignUp();
                    }
                  }}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={event => {setPassword(event.target.value)}}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      onSignUp();
                    }
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="passwordConfirm"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={event => {setPasswordConfirm(event.target.value)}}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      onSignUp();
                    }
                  }}
                />
                <Chips
                  id='chipfield'
                  placeholder={`Some of your favorite book genres*`}
                  value={genresFilter}
                  onChange={onSelectedGenresChange}
                  suggestions={allGenres}
                  renderChip={(genre: Genre) => (<CustomChip chipColor={'#7670FF'}>{genre.name}</CustomChip>)}
                  renderSuggestion={(genre: Genre, p: any) => (
                    <div className={'suggestion'} key={genre.id}>{genre.name}</div>
                  )}
                  suggestionsFilter={(opt: any, val: any) => (
                    opt.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
                    && (!genresFilter ||
                      genresFilter?.findIndex(genre => genre.name == opt.name) === -1)
                  )}
                  getSuggestionValue={(genre: Genre) => genre.name}
                  fromSuggestionsOnly={true}
                  uniqueChips={true}
                  style={{
                    padding: '16px 12px'
                  }}
                />
                <div style={{position: 'relative', margin: '20px 0 10px', borderRadius: '10px'}}>
                  {/* Extra <div> is for loading */}
                  <LoadingOverlay show={isLoading}/>
                  <button
                    className={'button'}
                    onClick={onSignUp}
                    style={{
                      width: '100%',
                      fontSize: '1.1rem',
                      height: '50px'
                    }}
                    disabled={isLoading}
                  >
                    Sign Up
                  </button>
                  {/* <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onLogin}
                    disabled={isLoading}
                  >
                    Sign In
                  </Button> */}
                </div>
              </form>
            </div>
        </Container>
      </Card>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  typography: {
    fontFamily: `'Quicksand', sans-serif`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    margin: 'auto',
    width: 'fit-content',
    position: 'relative',
    borderRadius: '10px'
  },
  cardLight: {
    margin: 'auto',
    width: 'fit-content',
    backgroundColor: Theme.light.cardBGColor,
    color: Theme.light.textColor,
    borderRadius: '10px'
  },
  cardDark: {
    margin: 'auto',
    width: 'fit-content',
    backgroundColor: Theme.dark.cardBGColor,
    color: Theme.dark.textColor,
    borderRadius: '10px'
  },
  rootLight: {
    fontFamily: "'Quicksand', sans-serif",
    marginTop: "20px",
    fontWeight: 500,
    '& .MuiInputLabel-outlined': {
      fontFamily: "'Quicksand', sans-serif",
      fontWeight: 500,
      color: Theme.light.textColor,
    },
    '& .MuiOutlinedInput-input': {
      fontFamily: "'Quicksand', sans-serif",
      fontWeight: 500,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: Theme.light.textFieldActiveColor
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: Theme.light.textFieldActiveColor
    },
  },
  rootDark: {
    fontFamily: "'Quicksand', sans-serif",
    marginTop: "20px",
    fontWeight: 500,
    '& .MuiInputLabel-outlined': {
      fontFamily: "'Quicksand', sans-serif",
      fontWeight: 500,
      color: Theme.dark.textColor,
    },
    '& .MuiOutlinedInput-input': {
      fontFamily: "'Quicksand', sans-serif",
      fontWeight: 500,
      color: Theme.dark.textColor
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: Theme.dark.textFieldActiveColor
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: Theme.dark.textFieldActiveColor
    },
  },
}));

const mapStateToProps = (state) => ({
  local: state.local,
  user: state.users,
});

export default connect(mapStateToProps, { setTokenAction, setCurrentUserAction, removeTokenAction })(SignUpPage);
