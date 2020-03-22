import { m_SET_REQ_STATE_ITEM, g_GET_REQ_STATUS, g_GET_REQ_DATA } from '@/store/modules/req-state/types'


const doCommit = ({ commit, method, uri, status, data }) => {
  commit(`reqState/${m_SET_REQ_STATE_ITEM}`, { method, uri, status, data }, { root: true })
}

export const makeCacher = (uri = '') => ({
  cacheGet(commit) {
    return {
      setStatus(status, data) {
        doCommit({ commit, method: 'GET', uri, status, data })
      }
    }
  },
  cachePost(commit) {
    return {
      setStatus(status, data) {
        doCommit({ commit, method: 'POST', uri, status, data })
      }
    }
  },
  cachePut(commit) {
    return {
      setStatus(status, data) {
        doCommit({ commit, method: 'PUT', uri, status, data })
      }
    }
  },
  cacheDelete(commit) {
    return {
      setStatus(status, data) {
        doCommit({ commit, method: 'DELETE', uri, status, data })
      }
    }
  }
})


const makeGetter = (method, staticUri, isDataGetter = false) => (state, getters, rootState, rootGetters) => {
  const getterType = isDataGetter ? g_GET_REQ_DATA : g_GET_REQ_STATUS
  return staticUri
    ? rootGetters[`reqState/${getterType}`](method, staticUri)
    : uri => rootGetters[`reqState/${getterType}`](method, uri)
}



export const makeReqStatusGetter = {
  isGet: ({ uri = '', isData = false } = {}) => makeGetter('GET', uri), // makeGetterForMethod('GET', uri),
  isPost: ({ uri = '', isData = false } = {}) =>  makeGetter('POST', uri),
  isPut: ({ uri = '', isData = false } = {}) => makeGetter('PUT', uri),
  isDelete: ({ uri = '', isData = false } = {}) => makeGetter('DELETE', uri),
}

export const makeReqDataGetter = {
  isGet: ({ uri = '', isData = false } = {}) => makeGetter('GET', uri, true),
  isPost: ({ uri = '', isData = false } = {}) => makeGetter('POST', uri, true),
  isPut: ({ uri = '', isData = false } = {}) => makeGetter('PUT', uri, true),
  isDelete: ({ uri = '', isData = false } = {}) => makeGetter('DELETE', uri, true),
}