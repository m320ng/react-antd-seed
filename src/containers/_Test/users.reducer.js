import reducerRegistry from '../../utils/reducerRegistry';
import sagaRegistry from '../../utils/sagaRegistry';

const reducerName = 'users';
const makeActionName = name => `${reducerName}/${name}`;

export const initialState = {
  detailModalInfo: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_MODAL_SHOW:
      return { ...state, detailModalInfo: action.payload };
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// selector
export const selectDetailModalShow = state => state[reducerName].detailModalInfo;

// action name
export const DETAIL_MODAL_SHOW = makeActionName('DETAIL_MODAL_SHOW');

// dispatch
export const detailModalShowAction = payload => ({ type: DETAIL_MODAL_SHOW, payload });

// saga
export function* saga() {}

sagaRegistry.register(reducerName, saga);
