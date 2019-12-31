import { fetchPost } from 'utils/fetch';

export async function postSignInAPI(payload) {
  return fetchPost('api/users/signin', payload);
}
