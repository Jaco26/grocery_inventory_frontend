import store from '@/store/index'

/**
 * @typedef ApiResponse
 * @property {*} data
 * @property {string} pub_msg
 * @property {string} pvt_msg
 * 
 */


export class ApiError extends Error { 
  constructor(data, status, ...args) {
    super(...args)
    this.name = 'ApiError'
    /** @type {ApiResponse} */
    this.data = data
    this.status = status
  }
}


export async function doFetch(uri, { method = 'GET', body = null, headers = {} } = {}) {
  try {
    // const token = localStorage.getItem('access_token') || accessToken
    const url =  process.env.NODE_ENV === 'development'
      ? `http://localhost:5000/api/v1${uri}`
      : `/api/v1${uri}`
    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.state.session.access_token}`,
        ...headers,
      }
    }
    if (['POST', 'PUT'].includes(method)) {
      options.body = JSON.stringify(body)
    }
    const res = await fetch(url, options)
    if (res.status >= 400) {
      const json = await res.json()
      throw new ApiError(json, res.status)
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
 * @returns {Promise<ApiResponse>}
 */
export function doGet(uri, headers) {
  return doFetch(uri, { headers })
}

/**
 * 
 * @param {string} uri
 * @param {*} body
 * @returns {Promise<ApiResponse>}
 */
export function doPost(uri, body, headers) {
  return doFetch(uri, { method: 'POST', body, headers })
}

/**
 * 
 * @param {string} uri
 * @param {*} body
 * @returns {Promise<ApiResponse>}
 */
export function doPut(uri, body, headers) {
  return doFetch(uri, { method: 'PUT', body, headers })
}

/**
 * 
 * @param {string} uri
 * @returns {Promise<ApiResponse>}
 */
export function doDelete(uri, headers) {
  return doFetch(uri, { method: 'DELETE', headers })
}

export default {
  get: doGet,
  post: doPost,
  put: doPut,
  delete: doDelete,
}
