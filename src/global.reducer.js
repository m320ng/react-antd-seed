import produce from 'immer';
import jwtDecode from 'jwt-decode';

import { POST_SIGN_IN_SUCCESS } from './containers/SignIn/signin.reducer';
import reducerRegistry from './utils/reducerRegistry';

const reducerName = 'global';

const token = localStorage.getItem('token');
const userState = token ? { user: jwtDecode(token) } : {};
export const initialState = {
  ...userState,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case POST_SIGN_IN_SUCCESS:
      const newToken = action.payload.data.token;
      localStorage.setItem('token', newToken);
      return { ...state, user: jwtDecode(newToken) };
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);
