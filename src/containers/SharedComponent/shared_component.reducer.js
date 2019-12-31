import produce from 'immer';
import { message } from 'antd';

import reducerRegistry from 'utils/reducerRegistry';

const reducerName = 'shared_component';
const makeActionName = name => `${reducerName}/${name}`;

export const initialState = {
  confirm: false,
  title: '메세지',
  content: '',
  handleOk: () => {},
  handleCancel: () => {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...action.payload };
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// selector
export const selectConfirm = state => state[reducerName].confirm;
export const selectTitle = state => state[reducerName].title;
export const selectContent = state => state[reducerName].content;
export const selectHandleOk = state => state[reducerName].handleOk;
export const selectHandleCancel = state => state[reducerName].handleCancel;

// action
export const SHOW_MODAL = makeActionName('SHOW_MODAL');

// dispatch
export const showModalAction = payload => ({ type: SHOW_MODAL, payload });
