import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default instance;
