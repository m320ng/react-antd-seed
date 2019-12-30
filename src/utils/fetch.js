import axios from 'axios';
const CancelToken = axios.CancelToken;

export const isCancel = axios.isCancel;

const stringify = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + (p.match(/[0-9]+/) ? '[' + p + ']' : '.' + p) : p,
        v = obj[p];
      str.push(v !== null && typeof v === 'object' ? stringify(v, k) : k + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
};

// 추후 intercept 로 변경

export const fetchGet = (url, data, abort = true, timeout = 15000) => {
  const token = localStorage.getItem('token');
  console.log(process.env.REACT_APP_BASE_URL);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let cancel;

  let [baseurl, query] = url.split('?');
  const querystring = stringify(data);
  if (query) {
    query = `${query}&${querystring}`;
  } else {
    query = querystring;
  }
  if (query) url = `${baseurl}?${querystring}`;

  console.log(url);

  return new Promise((resolve, reject) => {
    if (abort) {
      if (cancel !== undefined) {
        cancel();
      }
    }

    instance
      .get(url, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const fetchPost = (url, data, abort = true, timeout = 15000) => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let cancel;

  console.log(url);

  return new Promise((resolve, reject) => {
    if (abort) {
      if (cancel !== undefined) {
        cancel();
      }
    }

    instance
      .post(url, data, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const fetchPut = (url, data, abort = true, timeout = 15000) => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let cancel;

  console.log(url);

  return new Promise((resolve, reject) => {
    if (abort) {
      if (cancel !== undefined) {
        cancel();
      }
    }

    instance
      .put(url, data, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export default fetchGet;
