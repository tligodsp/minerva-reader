import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';
import bookReducer from './bookReducer';
import userReducer from './userReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    books: bookReducer,
    users: userReducer,
  });
}
