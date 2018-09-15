
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
