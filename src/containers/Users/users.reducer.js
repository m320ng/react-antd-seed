import reducerRegistry from '../../utils/reducerRegistry';
import sagaRegistry from '../../utils/sagaRegistry';

const reducerName = 'users';
const makeActionName = name => `${reducerName}/${name}`;

export const initialState = {
  writeFormShow: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WRITE_FORM_SHOW:
      return { ...state, writeFormShow: action.payload };
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// selector
export const selectWriteFormShow = state => state[reducerName].writeFormShow;

// action name
export const WRITE_FORM_SHOW = makeActionName('WRITE_FORM_SHOW');

// dispatch
export const writeFormShowAction = payload => ({ type: WRITE_FORM_SHOW, payload });

// saga
export function* saga() {}

sagaRegistry.register(reducerName, saga);
