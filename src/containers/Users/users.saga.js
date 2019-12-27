import { takeLatest, call, put, select } from 'redux-saga/effects';
import { GET_POSTS_REQUEST, POST_POSTS_REQUEST } from './users.reducer';
import { getPostsSuccess, getPostsFailure, postPostsFailure, postPostsSuccess, getPostsAction } from './users.reducer';
import { getPostsAPI, postPostsAPI } from './users.api';

// selector
const selectPagingRequest = ({ users }) => users.pagingRequest;
const selectTitle = ({ users }) => users.postForm.title;
const selectText = ({ users }) => users.postForm.text;
const selectPhoto = ({ users }) => users.postForm.photo;

export function* getPostsSaga() {
  try {
    const pageRequest = yield select(selectPagingRequest);
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

export default function* boardSaga() {
  yield takeLatest(GET_POSTS_REQUEST, getPostsSaga);
  yield takeLatest(POST_POSTS_REQUEST, postPostsSaga);
}
