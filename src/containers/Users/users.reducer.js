import produce from 'immer';
import { message } from 'antd';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getPostsAPI, postPostsAPI } from './users.api';
import reducerRegistry from '../../utils/reducerRegistry';
import sagaRegistry from '../../utils/sagaRegistry';

const reducerName = 'users';
const makeActionName = name => `${reducerName}/${name}`;

export const initialState = {
  pagingList: {
    page: 1,
    pagas: 1,
    list: [],
  },
  modalVisible: false,
  modalLoading: false,
  loading: false,
  page: 1,
  total: 1,
  postForm: {
    title: '',
    text: '',
    photo: [],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      console.log('reducer-GET_POSTS_REQUEST');
      //draft.pagingRequest = action.payload;
      //window.scrollTo(0, 0);
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      const { status, data } = action.payload;
      return { ...state, loading: false, pagingList: data };
    case GET_POSTS_FAILURE:
      let error = action.payload;
      if (error.response) {
        message.error(`${error.response.data.message} (${error.response.status})`);
      } else {
        message.error(`${error.message}`);
      }
      return { ...state, loading: false };
    case POST_POSTS_REQUEST:
      return { ...state, modalLoading: true };
    case POST_POSTS_SUCCESS:
      return {
        ...state,
        modalLoading: false,
        modalVisible: false,
        postForm: {
          title: '',
          text: '',
          photo: [],
        },
      };
    case POST_POSTS_FAILURE:
      return { ...state, modalLoading: false };
    case HANDLE_MODAL_SHOW:
      console.log('modalVisible', state.modalVisible);
      return { ...state, modalVisible: true };
    case HANDLE_MODAL_CANCEL:
      return { ...state, modalLoading: false, modalVisible: false };
    case ON_CHANGE_TITLE:
      return {
        ...state,
        modalVisible: true,
        postForm: {
          ...state.postForm,
          title: action.payload,
        },
      };
    case ON_CHANGE_TEXT:
      return {
        ...state,
        modalVisible: true,
        postForm: {
          ...state.postForm,
          text: action.payload,
        },
      };
    case ON_CHANGE_ADD_PHOTO:
      return {
        ...state,
        modalVisible: true,
        postForm: {
          ...state.postForm,
          photo: [action.payload],
        },
      };
    case ON_CHANGE_DEL_PHOTO:
      return {
        ...state,
        modalVisible: true,
        postForm: {
          ...state.postForm,
          photo: [],
        },
      };
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, reducer);

// selector
export const selectPagingRequest = state => state[reducerName].pagingRequest;
export const selectTitle = state => state[reducerName].postForm.title;
export const selectText = state => state[reducerName].postForm.text;
export const selectPhoto = state => state[reducerName].postForm.photo;

// action
export const GET_POSTS_REQUEST = makeActionName('GET_POSTS_REQUEST');
export const GET_POSTS_SUCCESS = makeActionName('GET_POSTS_SUCCESS');
export const GET_POSTS_FAILURE = makeActionName('GET_POSTS_FAILURE');

export const POST_POSTS_REQUEST = makeActionName('POST_POSTS_REQUEST');
export const POST_POSTS_SUCCESS = makeActionName('POST_POSTS_SUCCESS');
export const POST_POSTS_FAILURE = makeActionName('POST_POSTS_FAILURE');

export const HANDLE_MODAL_SHOW = makeActionName('HANDLE_MODAL_SHOW');
export const HANDLE_MODAL_CANCEL = makeActionName('HANDLE_MODAL_CANCEL');

export const ON_CHANGE_TITLE = makeActionName('ON_CHANGE_TITLE');
export const ON_CHANGE_TEXT = makeActionName('ON_CHANGE_TEXT');
export const ON_CHANGE_ADD_PHOTO = makeActionName('ON_CHANGE_ADD_PHOTO');
export const ON_CHANGE_DEL_PHOTO = makeActionName('ON_CHANGE_DEL_PHOTO');

// dispatch
export const getPostsAction = payload => ({ type: GET_POSTS_REQUEST, payload });
export const getPostsSuccess = payload => ({ type: GET_POSTS_SUCCESS, payload });
export const getPostsFailure = payload => ({ type: GET_POSTS_FAILURE, payload });

export const postPostsAction = payload => ({ type: POST_POSTS_REQUEST, payload });
export const postPostsSuccess = payload => ({ type: POST_POSTS_SUCCESS, payload });
export const postPostsFailure = payload => ({ type: POST_POSTS_FAILURE, payload });

export const handleModalShowAction = payload => ({ type: HANDLE_MODAL_SHOW, payload });
export const handleModalCancelAction = payload => ({ type: HANDLE_MODAL_CANCEL, payload });

export const onChangeTitleAction = payload => ({ type: ON_CHANGE_TITLE, payload });
export const onChangeTextAction = payload => ({ type: ON_CHANGE_TEXT, payload });
export const onChangeAddPhotoAction = payload => ({ type: ON_CHANGE_ADD_PHOTO, payload });
export const onChangeDelPhotoAction = payload => ({ type: ON_CHANGE_DEL_PHOTO, payload });

// saga
export function* getPostsSaga(action) {
  console.log('saga-GET_POSTS_REQUEST');
  //console.log('payload', action.payload);
  try {
    //const pageRequest = yield select(selectPagingRequest);
    const pageRequest = action.payload;
    const data = yield call(getPostsAPI, pageRequest);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

export function* postPostsSaga() {
  const title = yield select(selectTitle);
  const text = yield select(selectText);
  const photoList = yield select(selectPhoto);
  const photo = photoList[0];

  try {
    yield call(postPostsAPI, { title, text, photo });
    yield put(postPostsSuccess());
    yield put(getPostsAction());
  } catch (error) {
    yield put(postPostsFailure(error));
  }
}

export function* saga() {
  yield takeLatest(GET_POSTS_REQUEST, getPostsSaga);
  yield takeLatest(POST_POSTS_REQUEST, postPostsSaga);
}

sagaRegistry.register(reducerName, saga);
