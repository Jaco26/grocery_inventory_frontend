function setItem(namespace, obj) {
  localStorage.setItem(namespace, JSON.stringify(obj))
}

function getItem(namespace) {
  const item = localStorage.getItem(namespace)
  return item ? JSON.parse(item) : null
}

function generateCacheKey(...parts) {
  return parts.join('_')
}

export default {
  setItem,
  getItem,
  generateCacheKey
}