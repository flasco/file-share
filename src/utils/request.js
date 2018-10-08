import axios from 'axios';

// 设置cookie
axios.defaults.withCredentials = true;

export function get(url) {
  return axios.get(url);
}

export function post(url, params) {
  const ret = Object.keys(params).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  }).join('&');

  url = `${url}?${ret}`;
  return axios({
    method: 'post',
    url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
  });
}
