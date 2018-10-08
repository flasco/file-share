import axios from 'axios';

// 设置cookie
axios.defaults.withCredentials = true;

export async function get(url) {
  const { data } = await axios.get(url);
  return data;
}

export async function post(url, params) {
  const ret = Object.keys(params).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
  }).join('&');

  url = `${url}?${ret}`;
  const { data } = await axios({
    method: 'post',
    url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
  });
  return data;
}
