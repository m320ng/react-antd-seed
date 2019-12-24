import produce from 'immer';
import { message } from 'antd';

export const POST_SIGN_IN_REQUEST = 'signin/POST_SIGN_IN_REQUEST';
export const POST_SIGN_IN_SUCCESS = 'signin/POST_SIGN_IN_SUCCESS';
export const POST_SIGN_IN_FAILURE = 'signin/POST_SIGN_IN_FAILURE';

export const ON_CHANGE_EMAIL = 'signin/ON_CHANGE_EMAIL';
export const ON_CHANGE_PASSWORD = 'signin/ON_CHANGE_PASSWORD';

export const postSignInAction = payload => ({ type: POST_SIGN_IN_REQUEST, payload });
export const postSignInSuccess = payload => ({ type: POST_SIGN_IN_SUCCESS, payload });
export const postSignInFailure = payload => ({ type: POST_SIGN_IN_FAILURE, payload });

export const onChangeEmailAction = payload => ({ type: ON_CHANGE_EMAIL, payload });
export const onChangePasswordAction = payload => ({ type: ON_CHANGE_PASSWORD, payload });

export const initialState = {
  signInForm: {
    loading: false,
    email: '',
    password: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const signInReducer = (state = initialState, action) =>
  produce(state, draft => {
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

export default signInReducer;
