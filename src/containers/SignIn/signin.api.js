import request from 'utils/request';

export async function postSignInAPI(payload) {
  return request.post('api/users/signin', payload);
}
