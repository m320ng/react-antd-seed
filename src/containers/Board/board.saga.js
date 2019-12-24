import { takeLatest, call, put, select } from 'redux-saga/effects';
import { GET_POSTS_REQUEST, POST_POSTS_REQUEST } from './board.reducer';
import { getPostsSuccess, getPostsFailure, postPostsFailure, postPostsSuccess, getPostsAction } from './board.reducer';
import { getPostsAPI, postPostsAPI } from './board.api';

export function* getPostsSaga() {
  try {
    const postList = yield call(getPostsAPI);
    yield put(getPostsSuccess(postList));
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

// selector
const selectTitle = ({ board }) => board.postForm.title;
const selectText = ({ board }) => board.postForm.text;
const selectPhoto = ({ board }) => board.postForm.photo;

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

export default function* boardSaga() {
  yield takeLatest(GET_POSTS_REQUEST, getPostsSaga);
  yield takeLatest(POST_POSTS_REQUEST, postPostsSaga);
}
