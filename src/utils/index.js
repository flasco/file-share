
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


export function getUrlQuery(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0, j = vars.length; i < j; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) { return pair[1]; }
  }
  return '';
}

export function getSearchDate(time) {
  const date = typeof time === 'object' ? time : new Date(time);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function formatDate(time) {
  try {
    const date = typeof time === 'object' ? time : new Date(time);
    if (date.toString() === 'Invalid Date') return '-';
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } catch (e) {
    return '';
  }
}
