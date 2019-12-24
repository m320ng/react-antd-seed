import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';

import globalReducer from './global.reducer';
import board from './containers/Board/board.reducer';
import signin from './containers/SignIn/signin.reducer';

export default function rootReducer() {
  const rootReducer = combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    board,
    signin,
  });

  return rootReducer;
}