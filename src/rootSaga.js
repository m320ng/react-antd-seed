import { all } from 'redux-saga/effects';

import boardSaga from './containers/Board/board.saga';
import signInSaga from './containers/SignIn/signin.saga';
import usersSaga from './containers/Users/users.saga';

function* rootSaga() {
  yield all([boardSaga(), signInSaga(), usersSaga()]);
}

export default rootSaga;
