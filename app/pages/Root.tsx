import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../reducers/types';
import { routes } from '../routes';
import { NavBar } from '../components/app';
import { Switch, Route } from 'react-router-dom';
// import { currentUser } from '../utils/mock-users';
import { setCurrentUserAction, setTokenAction, removeTokenAction } from '../actions/userActions';
import { setDefaultDisplay } from '../actions/localActions';
import * as Local from '../utils/localUtils';
import * as Service from '../utils/serviceUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as authAPI from '../api/authAPI';

type Props = {
  store: Store;
  history: History;
};

axios.defaults.baseURL = `http://libu20.herokuapp.com/api/v1`;
// axios.defaults.baseURL = `http://localhost:8585/api/v1`;

const renderRoutes = (routes: any) => {
  return routes.map((route: any) => <Route path={route.path} component={route.component} />);
}

const Root = ({ store, history }: Props) => {
  useEffect(() => {
    store.dispatch(setCurrentUserAction(Local.getGuessUser()));
    // console.log('alo alo');
    Local.getCommonDisplayConfig()
      .then((response: any) => {
        store.dispatch(setDefaultDisplay(response.displayStyle));
      });
    checkTokenLoggedIn();
  }, []);

  const saveLoginInfo = (tokenStr: string) => {
    if (tokenStr) {
      localStorage.setItem('token', tokenStr);
      store.dispatch(setTokenAction(tokenStr));
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = 'Bearer ' + tokenStr;
        return config;
      });
    } else {
      localStorage.removeItem('token');
      store.dispatch(removeTokenAction());
    }
  }

  const removeToken = () => {
    localStorage.removeItem('token');
    store.dispatch(removeTokenAction());
  }

  const checkTokenLoggedIn = () => {
    const tokenStr = localStorage.getItem('token');
    console.log(tokenStr);
    if (tokenStr) {
      authAPI.checkToken(tokenStr)
        .then(response => {
          if (response.data && response.data.isValid === true) {
            saveLoginInfo(tokenStr);
            // store.dispatch(setTokenAction(tokenStr));
            const decoded = jwtDecode<any>(tokenStr);
            Service.getUserByUsername(decoded.username)
              .then((response: any) => {
                store.dispatch(setCurrentUserAction(response.user));
              })
          } else {
            removeToken();
          }
        })
        .catch(err => {
          removeToken();
        })
      saveLoginInfo(tokenStr);
      // store.dispatch(setTokenAction(tokenStr));
    } else {
      removeToken();
    }
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <NavBar routes={routes}/>
          <Switch>
            { renderRoutes(routes) }
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  )
};

export default hot(Root);
