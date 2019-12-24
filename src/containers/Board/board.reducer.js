import produce from 'immer';
import { message } from 'antd';

export const GET_POSTS_REQUEST = 'board/GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'board/GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'board/GET_POSTS_FAILURE';

export const POST_POSTS_REQUEST = 'board/POST_POSTS_REQUEST';
export const POST_POSTS_SUCCESS = 'board/POST_POSTS_SUCCESS';
export const POST_POSTS_FAILURE = 'board/POST_POSTS_FAILURE';

export const HANDLE_MODAL_SHOW = 'board/HANDLE_MODAL_SHOW';
export const HANDLE_MODAL_CANCEL = 'board/HANDLE_MODAL_CANCEL';

export const ON_CHANGE_TITLE = 'board/ON_CHANGE_TITLE';
export const ON_CHANGE_TEXT = 'board/ON_CHANGE_TEXT';
export const ON_CHANGE_ADD_PHOTO = 'board/ON_CHANGE_ADD_PHOTO';
export const ON_CHANGE_DEL_PHOTO = 'board/ON_CHANGE_DEL_PHOTO';

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

/* eslint-disable default-case, no-param-reassign */
const boardReducer = (state = initialState, action) =>
  produce(state, draft => {
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

export default boardReducer;
