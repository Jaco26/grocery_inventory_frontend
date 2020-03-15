import { m_SET_REQ_STATE_ITEM, g_GET_REQ_STATUS } from '@/store/modules/req-state/types'


const doCommit = ({ commit, method, uri, status }) => {
  commit(`reqState/${m_SET_REQ_STATE_ITEM}`, { method, uri, status }, { root: true })
}

export const makeCacher = (uri = '') => ({
  cacheGet(commit) {
    return {
      setStatus(status) {
        doCommit({ commit, method: 'GET', uri, status })
      }
    }
  },
  cachePost(commit) {
    return {
      setStatus(status) {
        doCommit({ commit, method: 'POST', uri, status })
      }
    }
  },
  cachePut(commit) {
    return {
      setStatus(status) {
        doCommit({ commit, method: 'PUT', uri, status })
      }
    }
  },
  cacheDelete(commit) {
    return {
      setStatus(status) {
        doCommit({ commit, method: 'DELETE', uri, status })
      }
    }
  }
})


export const makeGetterForMethod = (method, staticUri) => (state, getters, rootState, rootGetters) => {
  return staticUri
    ? rootGetters[`reqState/${g_GET_REQ_STATUS}`](method, staticUri)
    : uri => rootGetters[`reqState/${g_GET_REQ_STATUS}`](method, uri)
}

export const makeCacheGetter = {
  isGet: (staticUri) => makeGetterForMethod('GET', staticUri),
  isPost: (staticUri) => makeGetterForMethod('POST', staticUri),
  isPut: (staticUri) => makeGetterForMethod('PUT', staticUri),
  isDelete: (staticUri) => makeGetterForMethod('DELETE', staticUri),
}