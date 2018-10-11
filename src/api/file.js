import { get, post, postFile } from '../utils/request';
import { serverIp } from '../config';

export async function getOwnFileList(params) {
  const url = `${serverIp}/files/searchOwn`;
  const result = await get(url, params);
  return result;
}

export async function searchFile(keyword, page, pageSize) {
  const url = `${serverIp}/files/search`;

  const result = await get(url, { keyword, page, pageSize });
  console.log(result);
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
  console.log(result);
  return result;
}

export async function deleteFile(ids) {
  const params = ids.join('&fileIds=');
  const url = `${serverIp}/filelist?fileIds=${params}`;
  const result = await get(url, {
  });
  console.log(result);
  return result;
}

export async function downloadFilesByIds(ids) {
  const params = ids.join('&fileIds=');
  const url = `${serverIp}/files/download?fileIds=${params}`;

  window.open(url, '_blank');
}
