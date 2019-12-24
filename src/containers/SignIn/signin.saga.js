import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { postSignInAPI } from './signin.api';

import { POST_SIGN_IN_REQUEST, postSignInSuccess, postSignInFailure } from './signin.reducer';

// selector
const selectEmail = ({ signin }) => signin.signInForm.email;
const selectPassword = ({ signin }) => signin.signInForm.password;

export function* postSignInSaga() {
  console.log('postSignInSaga');
  const email = yield select(selectEmail);
  const password = yield select(selectPassword);

  try {
    const user = yield call(postSignInAPI, { email, password });
    yield put(postSignInSuccess(user));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(postSignInFailure(error));
  }
}

export default function* signInSaga() {
  yield takeLatest(POST_SIGN_IN_REQUEST, postSignInSaga);
}
