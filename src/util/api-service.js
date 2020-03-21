
async function doFetch(uri, { method = 'GET', body = null } = {}) {
  try {
    const token = localStorage.getItem('access_token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODQ4MjIxMDQsIm5iZiI6MTU4NDgyMjEwNCwianRpIjoiNmU3M2Y0ZjQtNTBmNC00NDMyLTkxYzYtZWZmMDY5OGQxNDFkIiwiaWRlbnRpdHkiOiJhNzU1ZDllZi0xMzUwLTQ0ODAtYmMxZC1lMmY1NDAwM2IzOTUiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.2eM78Vk_mvn1BBS8PZjSa6ftY67_GuAlX5lh92t-NL0'
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
      const error = new Error(res.statusText)
      error.response = res
      throw error
    }
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
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
