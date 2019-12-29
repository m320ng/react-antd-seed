import produce from 'immer';
import { message } from 'antd';

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getPostsAPI, postPostsAPI } from './board.api';

import reducerRegistry from '../../utils/reducerRegistry';
import sagaRegistry from '../../utils/sagaRegistry';

const reducerName = 'board';
const makeActionName = name => `${reducerName}/${name}`;

export const initialState = {
  postList: [],
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
  return produce(state, draft => {
    switch (action.type) {
      case GET_POSTS_REQUEST:
        draft.loading = true;
        break;
      case GET_POSTS_SUCCESS:
        draft.postList = action.payload.data;
        draft.loading = false;
        break;
      case GET_POSTS_FAILURE:
        draft.loading = false;
        let error = action.payload;
        if (error.response) {
          message.error(`${error.response.data.message} (${error.response.status})`);
        } else {
          message.error(`${error.message}`);
        }
        break;
      case POST_POSTS_REQUEST:
        draft.modalLoading = true;
        break;
      case POST_POSTS_SUCCESS:
        draft.modalLoading = false;
        draft.modalVisible = false;
        draft.postForm = {
          title: '',
          text: '',
          photo: [],
        };
        break;
      case POST_POSTS_FAILURE:
        draft.modalLoading = false;
        break;
      case HANDLE_MODAL_SHOW:
        draft.modalVisible = true;
        break;
      case HANDLE_MODAL_CANCEL:
        draft.modalLoading = false;
        draft.modalVisible = false;
        break;
      case ON_CHANGE_TITLE:
        draft.postForm.title = action.payload;
        break;
      case ON_CHANGE_TEXT:
        draft.postForm.text = action.payload;
        break;
      case ON_CHANGE_ADD_PHOTO:
        draft.postForm.photo = [action.payload];
        break;
      case ON_CHANGE_DEL_PHOTO:
        draft.postForm.photo = [];
        break;
    }
  });
}

reducerRegistry.register(reducerName, reducer);

// selector
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
export function* getPostsSaga() {
  try {
    const postList = yield call(getPostsAPI);
    yield put(getPostsSuccess(postList));
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

export function* postPostsSaga() {
  const title = yield select(selectTitle());
  const text = yield select(selectText());
  const photoList = yield select(selectPhoto());
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
