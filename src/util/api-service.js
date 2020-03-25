
/**
 * @typedef ApiResponse
 * @property {*} data
 * @property {string} pub_msg
 * @property {string} pvt_msg
 */


export class ApiError extends Error { 
  constructor(response, ...args) {
    super(...args)
    this.name = 'ApiError'
    /** @type {ApiResponse} */
    this.response = response
  }
}


async function doFetch(uri, { method = 'GET', body = null } = {}) {
  try {
    const token = localStorage.getItem('access_token') || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODUwOTk1NTYsIm5iZiI6MTU4NTA5OTU1NiwianRpIjoiMWNlOWZiZDQtOGY0OC00OGVjLTlhNWMtMmQyZTkyOWFlODFlIiwiaWRlbnRpdHkiOiJmZWI3YmY1NS00YmI5LTRmNGQtOTAzOC02OGZiYWY2M2U1NjEiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.FdWWtJcllK0kGxaNIuxYgdDT5VtcvgZEE1JaAaAUGsk"
    const url = `http://localhost:5000/api/v1${uri}`
    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    if (['POST', 'PUT'].includes(method)) {
      options.body = JSON.stringify(body)
    }
    const res = await fetch(url, options)
    if (res.status >= 400) {
      const json = await res.json()
      throw new ApiError(json)
    }
    const json = await res.json()
    return json
  } catch (error) {
    throw error
  }
}

export function doGet(uri) {
  return doFetch(uri)
}

export function doPost(uri, body) {
  return doFetch(uri, { method: 'POST', body })
}

export function doPut(uri, body) {
  return doFetch(uri, { method: 'PUT', body })
}

export function doDelete(uri) {
  return doFetch(uri, { method: 'DELETE' })
}

export default { get: doGet, post: doPost, put: doPut, delete: doDelete }
