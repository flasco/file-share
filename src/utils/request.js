import axios from 'axios';
import { formatParams } from 'utils';

// 设置cookie
axios.defaults.withCredentials = true;

export async function get(url, params) {
  if (params != null && Object.keys(params).length > 0) {
    const ret = formatParams(params);
    url = `${url}?${ret}`;
  }
  const { data } = await axios.get(url);
  return data;
}

export async function post(url, params) {
  const ret = formatParams(params);

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

export async function postFile(url, formData) {
  const { data } = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
}

export async function del(url) {
  const { data } = await axios.delete(url);
  return data;
}
