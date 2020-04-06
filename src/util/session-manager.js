export default function makeSessionManager() {

  let _token = ''

  return {
    setToken(val) {
      _token = val
    },
    getToken() {
      return _token
    },
  }
}