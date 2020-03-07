
async function doFetch(uri, { method = 'GET', body = null } = {}) {
  try {
    const token = localStorage.getItem('access_token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM0NjI0MzcsIm5iZiI6MTU4MzQ2MjQzNywianRpIjoiM2MxNzIxODMtY2M0Mi00ZWY3LTk2Y2YtZmJhNDM4NDJiZGVlIiwiaWRlbnRpdHkiOiJkMTQ4MDA4My1lOTdiLTRlNzYtOGE4Ni0yOTVkZWM0ZWE1MDMiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.uXz7wdPUcWddn8cVtH5CuzMAy6ZQX9_fWkSNiEk6yvI'
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
