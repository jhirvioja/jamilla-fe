/**
 * Cookie operations snatched from: https://stackoverflow.com/a/2144404
 * @param {*} name Name of the cookie to be removed
 * @param {*} path Path of the cookie to be removed
 * @param {*} domain Domain of the cookie to be removed
 */
export function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie =
      name + '=' + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }
}

export function getCookie(name) {
  return document.cookie.split(';').some((c) => {
    return c.trim().startsWith(name + '=')
  })
}
