import { all } from 'redux-saga/effects';

import boardSaga from './containers/Board/board.saga';
import signInSaga from './containers/SignIn/signin.saga';

function* rootSaga() {
  yield all([boardSaga(), signInSaga()]);
}

export default rootSaga;
