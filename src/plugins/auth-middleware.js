

const createAuthMiddleware = store => (to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    console.log('route requires authentication')
  }

  next()
}


export default {
  install(Vue, { store, router }) {
    const authMiddleware = createAuthMiddleware(store)

    router.beforeEach(authMiddleware)
  }
}