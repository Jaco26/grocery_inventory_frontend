import accessToken from './mocks/access-token'

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
    const token = localStorage.getItem('access_token') || accessToken
    const url =  process.env.NODE_ENV === 'development'
      ? `http://localhost:5000/api/v1${uri}`
      : `/api/v1${uri}`
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

/**
 * 
 * @param {string} uri
 * @returns {ApiResponse}
 */
export function doGet(uri) {
  return doFetch(uri)
}

/**
 * 
 * @param {string} uri
 * @param {*} body
 * @returns {ApiResponse}
 */
export function doPost(uri, body) {
  return doFetch(uri, { method: 'POST', body })
}

/**
 * 
 * @param {string} uri
 * @param {*} body
 * @returns {ApiResponse}
 */
export function doPut(uri, body) {
  return doFetch(uri, { method: 'PUT', body })
}

/**
 * 
 * @param {string} uri
 * @returns {ApiResponse}
 */
export function doDelete(uri) {
  return doFetch(uri, { method: 'DELETE' })
}

export default {
  get: doGet,
  post: doPost,
  put: doPut,
  delete: doDelete
}
