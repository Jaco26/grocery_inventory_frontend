
const EMPTY_SESSION = { access_token : '', refresh_token: '' }


const createAuthMiddleware = store => (to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.getters['session/GET_IS_LOGGED_IN']()) {
      return next()
    }
    return next({ name: 'login' })
  }
  return next()
}


function loadAuthStorage(store) {
  const saved = JSON.parse(localStorage.getItem('auth')) || EMPTY_SESSION
  store.commit('session/SET_SESSION', saved) 
}

function syncAuthStorage(store) {
  store.subscribe(({ type, payload }) => {
    switch (type) {
      case 'session/SET_SESSION':
        localStorage.setItem('auth', JSON.stringify(payload))
        break
      case 'session/SET_SESSION_LOGGED_OUT':
        localStorage.setItem('auth', JSON.stringify(EMPTY_SESSION))
        location.reload()
        break
    }
  })
}

export default {
  install(Vue, { store, router }) {

    loadAuthStorage(store)
    syncAuthStorage(store, router) // this must be invoked after loadAuthStorage

    const authMiddleware = createAuthMiddleware(store)

    router.beforeEach(authMiddleware)
  }
}