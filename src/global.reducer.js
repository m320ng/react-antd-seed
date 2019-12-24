import produce from 'immer';
import jwtDecode from 'jwt-decode';

import { POST_SIGN_IN_SUCCESS } from './containers/SignIn/signin.reducer';

const token = localStorage.getItem('token');
const userState = token ? { user: jwtDecode(token) } : {};
export const initialState = {
  ...userState,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_SIGN_IN_SUCCESS:
        const newToken = action.payload.data.token;
        localStorage.setItem('token', newToken);
        draft.user = jwtDecode(newToken);
        return draft;
      default:
        return draft;
    }
  });

export default appReducer;
