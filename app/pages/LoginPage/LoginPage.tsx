import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as authAPI from '../../api/authAPI';
import * as userAPI from '../../api/userAPI';
import * as Service from '../../utils/serviceUtils';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { setTokenAction, setCurrentUserAction, removeTokenAction } from '../../actions/userActions';
import axios from 'axios';
import Theme from '../../styles/themes';
import { LoadingOverlay } from '../../components/common/molecules';
// import { currentUser } from '../../utils/mock-users';

const LoginPage = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const { isLoggedIn, currentUser } = props.user;
  const { theme } = props.local;

  const onLogin = () => {
    setIsLoading(true);
    authAPI.login(username, password)
      .then(response => {
        // setIsLoading(false);
        // setErrorMessage('');
        const tokenStr = response.data.token;
        // const decoded = jwtDecode<any>(tokenStr);
        localStorage.setItem('token', tokenStr);
        props.setTokenAction(tokenStr);
        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = 'Bearer ' + tokenStr;
          return config;
        });
        Service.getUserByUsername(username)
          .then((response: any) => {
            console.log(response);
            props.setCurrentUserAction(response.user);
            setIsLoading(false);
            setErrorMessage('');
          })
      })
      .catch(err => {
        setIsLoading(false);
        setErrorMessage('Wrong username or password. Please try again.');
        console.log(err);
      });
  }

  const onLogout = () => {
    localStorage.removeItem('token');
    props.removeTokenAction();
  }

  if (isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor,
      }}>
        <Card className={theme.name == 'light' ? classes.cardLight : classes.cardDark}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar
                className={classes.avatar}
                alt="Profile Picture"
                src={currentUser.profilePicture}
              />
              <Typography
                component="h1"
                variant="h5"
                className={classes.typography}>
                {`You're logging in as ${currentUser.username}`}
              </Typography>
              <button
                className={'button'}
                onClick={onLogout}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  fontSize: '1.1rem',
                }}
              >
                Logout
              </button>
            </div>
        </Container>
      </Card>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundColor,
    }}>
      <Card className={theme.name == 'light' ? classes.cardLight : classes.cardDark}>
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5" className={classes.typography}>
                Sign in
              </Typography>
              <form className={classes.form + ' ' + (theme.name == 'light' ? classes.rootLight : classes.rootDark)} noValidate>
                {/* TODO: Clean this up */}
                <div style={{ color: theme.errorMsgColor }}>{errorMessage}</div>
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
                      onLogin();
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
                      onLogin();
                    }
                  }}
                />
                <div style={{position: 'relative', margin: '10px 0', borderRadius: '10px'}}>
                  {/* Extra <div> is for loading */}
                  <LoadingOverlay show={isLoading}/>
                  <button
                    className={'button'}
                    onClick={onLogin}
                    style={{
                      width: '100%',
                      fontSize: '1.1rem',
                      height: '50px'
                    }}
                    disabled={isLoading}
                  >
                    Sign In
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link to='/signup' style={{ color: theme.linkColor }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                  {/* <Link href='#' onClick={() => history.push('/signup')} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
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
    width: theme.spacing(15),
    height: theme.spacing(15),
    border: "1px solid #bbb"
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
    width: 'fit-content'
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
  typography: {
    fontFamily: `'Quicksand', sans-serif`,
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

export default connect(mapStateToProps, { setTokenAction, setCurrentUserAction, removeTokenAction })(LoginPage);
