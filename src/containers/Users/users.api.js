import request from 'utils/request';

export function getPostsAPI(pageRequest) {
  return request.get(`/api/users?page=${pageRequest.page}&limit=${pageRequest.limit}`);
}

export function postPostsAPI(payload) {
  const formData = new FormData();
  formData.set('title', payload.title);
  formData.set('text', payload.text);
  payload.photo && formData.set('photo', payload.photo);

  return request.put('/api/users', formData);
}
