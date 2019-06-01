import axios from 'axios';


const instance = axios.create();
instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL);

instance.interceptors.request.use(config => {
  console.log('###########', config);
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    config.headers.common['Authorization'] = 'Bearer ' + user.access_token;
  }

  return config;
}, error => Promise.reject(error));
instance.interceptors.response.use(response => response, error => Promise.reject(error));

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }

export default instance;
