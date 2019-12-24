import request from 'utils/request';
import axios from 'axios';

export async function postSignInAPI(payload) {
  return request.post('v1/signin', payload);
}
