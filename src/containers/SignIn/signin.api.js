import request from 'utils/request';

export async function postSignInAPI(payload) {
  return request.post('v1/signin', payload);
}
