import { fetchGet, fetchPost, isCancel } from '../../utils/fetch';

export function apiGetUsers(data, success, fail) {
  fetchGet('api/users', data)
    .then(res => {
      success(res.data, res);
    })
    .catch(e => {
      fail(e, isCancel(e));
    });
}

export function apiGetUser(id, success, fail) {
  fetchGet(`api/users/${id}`, null)
    .then(res => {
      success(res.data, res);
    })
    .catch(e => {
      fail(e, isCancel(e));
    });
}

export function apiPostUser(payload) {
  const formData = new FormData();
  formData.set('title', payload.title);
  formData.set('text', payload.text);
  payload.photo && formData.set('photo', payload.photo);

  //return request.put('/api/users', formData);
  return;
}
