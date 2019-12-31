import { fetchGet, fetchPost, fetchPut, isCancel } from 'utils/fetch';

export function apiGetUsers(data, success, fail) {
  fetchGet('/api/users', data)
    .then(res => {
      success(res.data, res);
    })
    .catch(e => {
      fail(e.response, isCancel(e), e);
    });
}

export function apiGetUser(id, success, fail) {
  fetchGet(`/api/users/${id}`, null)
    .then(res => {
      success(res.data, res);
    })
    .catch(e => {
      fail(e.response, isCancel(e), e);
    });
}

export function apiPutUser(data, success, fail) {
  fetchPut('/api/users', data)
    .then(res => {
      success(res.data, res);
    })
    .catch(e => {
      fail(e.response, isCancel(e), e);
    });
}

export function apiPostUser(id, data, success, fail) {
  fetchPost(`/api/users/${id}`, data)
    .then(res => {
      success(res.data, res);
    })
    .catch(e => {
      fail(e.response, isCancel(e), e);
    });
}
