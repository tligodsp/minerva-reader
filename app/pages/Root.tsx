import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../reducers/types';
import { routes } from '../routes';
import { NavBar } from '../components/app';
import { Switch, Route } from 'react-router-dom';

type Props = {
  store: Store;
  history: History;
};

const renderRoutes = (routes: any) => {
  return routes.map((route: any) => <Route path={route.path} component={route.component} />);
}

const Root = ({ store, history }: Props) => (
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
);

export default hot(Root);
