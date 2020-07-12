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

const LoginPage = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const { isLoggedIn } = props.user;

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
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs">

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              You've already logged in.
            </Typography>
            <form className={classes.form} noValidate>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onLogout}
              >
                Logout
              </Button>
            </form>
          </div>
      </Container>
    </Card>
    )
  }

  return (
    <Card className={classes.card}>
      <Container component="main" maxWidth="xs">

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
              <div style={{position: 'relative'}}>
                {/* Extra <div> is for loading */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onLogin}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
                {isLoading ? <CircularProgress size={24} className="circular-center-size-24px" /> : null}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to='/signup'>
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
  }
}));

const mapStateToProps = (state) => ({
  local: state.local,
  user: state.users,
});

export default connect(mapStateToProps, { setTokenAction, setCurrentUserAction, removeTokenAction })(LoginPage);
