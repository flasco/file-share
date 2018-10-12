import { get, post } from '../utils/request';
import { serverIp } from '../config';


/**
 * 注册
 * @param {string} accountName 用户名
 * @param {string} password 密码
 * @param {string} confirmPassword 重复密码
 * @param {string} email 邮箱
 * @return {Promise<Object>}
 */
export async function register({ accountName, password, confirmPassword, email }) {
  const url = `${serverIp}/users`;
  const result = await post(url, {
    accountName,
    password,
    confirmPassword,
    email,
  });
  return result;
}

/**
 * 登录
 * @param {string} accountName 用户名
 * @param {string} password 密码
 * @return {Promise<Object>}
 */
export async function login({ accountName, password }) {
  const url = `${serverIp}/sessions`;
  const result = await post(url, {
    accountName,
    password,
  });
  return result;
}

export async function loginCheck() {
  const url = `${serverIp}/sessions/check`;
  return get(url);
}

export async function userUpdate(gender, introduce) {
  const url = `${serverIp}/users/update`;
  return post(url, {
    gender,
    introduce
  });
}
