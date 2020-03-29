


export const makeDebouncer = () => {
  let handle

  return {
    debounce(delay, callback) {
      if (handle) clearTimeout(handle)
      handle = setTimeout(callback, delay)
    }
  }
}