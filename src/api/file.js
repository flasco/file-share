import { get, post, postFile, del } from '../utils/request';
import { serverIp } from '../config';

export async function getOwnFileList(params) {
  const url = `${serverIp}/files/searchOwn`;
  const result = await get(url, params);
  return result;
}

export async function searchFile(keyword, page, pageSize) {
  const url = `${serverIp}/files/search`;

  const result = await get(url, { keyword, page, pageSize });
  return result;
}

export async function getFilePreview(fieldId) {
  const url = `${serverIp}/files/${fieldId}/preview`;

  const result = await get(url);
  return result;
}

export async function getFileUserInfo(fieldId) {
  const url = `${serverIp}/files/${fieldId}/userInfo`;

  const result = await get(url);
  return result;
}

export async function getFileInfo(fieldId) {
  const url = `${serverIp}/files/${fieldId}`;

  const result = await get(url);
  return result;
}

export async function uploadFile(formData) {
  const url = `${serverIp}/files`;
  const result = await postFile(url, formData);
  return result;
}

export async function editFile(fileId, params) {
  const url = `${serverIp}/files/update/${fileId}`;
  const result = await post(url, params);
  return result;
}

export async function deleteFileByIds(ids) {
  const params = ids.join('&fileIds=');
  const url = `${serverIp}/files/delete?fileIds=${params}`;
  const result = await del(url);
  return result;
}

export async function downloadFilesByIds(ids) {
  const params = ids.join('&fileIds=');
  const url = `${serverIp}/files/download?fileIds=${params}`;

  window.open(url, '_blank');
}
