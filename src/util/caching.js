import { m_SET_REQ_STATE, g_GET_REQ_STATE } from '@/store/modules/request-state/types'


const doCommit = ({ commit, method, uri, status }) => {
  commit(`reqState/${m_SET_REQ_STATE}`, { method, uri, status }, { root: true })
}

export const makeCacher = (uri = '') => ({
  cacheGet(commit) {
    return {
      status(status) {
        doCommit({ commit, method: 'GET', uri, status })
      }
    }
  },
  cachePost(commit) {
    return {
      status(status) {
        doCommit({ commit, method: 'POST', uri, status })
      }
    }
  },
  cachePut(commit) {
    return {
      status(status) {
        doCommit({ commit, method: 'PUT', uri, status })
      }
    }
  },
  cacheDelete(commit) {
    return {
      status(status) {
        doCommit({ commit, method: 'DELETE', uri, status })
      }
    }
  }
})

const makeGetterForMethod = method => (state, getters, rootState, rootGetters) => {
  return uri => rootGetters[`reqState/${g_GET_REQ_STATE}`](method, uri)
}

export const makeCacheGetter = {
  get: () => makeGetterForMethod('GET'),
  post: () => makeGetterForMethod('POST'),
  put: () => makeGetterForMethod('PUT'),
  delete: () => makeGetterForMethod('DELETE'),
}