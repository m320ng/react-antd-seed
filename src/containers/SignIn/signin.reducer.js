import produce from 'immer';
import { message } from 'antd';

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { postSignInAPI } from './signin.api';

import reducerRegistry from '../../utils/reducerRegistry';
import sagaRegistry from '../../utils/sagaRegistry';

const reducerName = 'signin';
const makeActionName = name => `${reducerName}/${name}`;

export const initialState = {
  signInForm: {
    loading: false,
    email: '',
    password: '',
  },
};

export default function reducer(state = initialState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case POST_SIGN_IN_REQUEST:
        draft.signInForm.loading = true;
        break;
      case POST_SIGN_IN_SUCCESS:
        draft.signInForm.loading = false;
        break;
      case POST_SIGN_IN_FAILURE:
        draft.signInForm.loading = false;
        let error = action.payload;
        if (error.response) {
          message.error(`${error.response.data.message} (${error.response.status})`);
        } else {
          message.error(`${error.message}`);
        }
        break;
      case ON_CHANGE_EMAIL:
        draft.signInForm.email = action.payload;
        break;
      case ON_CHANGE_PASSWORD:
        draft.signInForm.password = action.payload;
        break;
    }
  });
}

reducerRegistry.register(reducerName, reducer);

// selector
export const selectEmail = state => state[reducerName].signInForm.email;
export const selectPassword = state => state[reducerName].signInForm.password;

// action
export const POST_SIGN_IN_REQUEST = makeActionName('POST_SIGN_IN_REQUEST');
export const POST_SIGN_IN_SUCCESS = makeActionName('POST_SIGN_IN_SUCCESS');
export const POST_SIGN_IN_FAILURE = makeActionName('POST_SIGN_IN_FAILURE');

export const ON_CHANGE_EMAIL = makeActionName('ON_CHANGE_EMAIL');
export const ON_CHANGE_PASSWORD = makeActionName('ON_CHANGE_PASSWORD');

// dispatch
export const postSignInAction = payload => ({ type: POST_SIGN_IN_REQUEST, payload });
export const postSignInSuccess = payload => ({ type: POST_SIGN_IN_SUCCESS, payload });
export const postSignInFailure = payload => ({ type: POST_SIGN_IN_FAILURE, payload });

export const onChangeEmailAction = payload => ({ type: ON_CHANGE_EMAIL, payload });
export const onChangePasswordAction = payload => ({ type: ON_CHANGE_PASSWORD, payload });

// saga
export function* postSignInSaga() {
  console.log('postSignInSaga');
  const email = yield select(selectEmail);
  const password = yield select(selectPassword);

  try {
    const user = yield call(postSignInAPI, { account: email, password: password });
    yield put(postSignInSuccess(user));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(postSignInFailure(error));
  }
}

export function* saga() {
  yield takeLatest(POST_SIGN_IN_REQUEST, postSignInSaga);
}

sagaRegistry.register(reducerName, saga);
