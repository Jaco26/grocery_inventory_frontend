import {
  m_SET_REQ_STATE,
  g_GET_REQ_STATE,
} from './types'

const statusMap = {
  0: 'IDLE',
  1: 'WAITING',
  2: 'COMPLETE',
  3: 'ERROR',
}

const createReqState = (status = 0) => ({ status: statusMap[status] })
const cacheKey = (method, uri) => `${method.toUpperCase()}_${uri}`

export default {
  namespaced: 'true',
  state: {
    items: {}
  },
  mutations: {
    [m_SET_REQ_STATE](state, { method = 'GET', uri = '', status = 0 }) {
      state.items = Object.assign({}, { [cacheKey(method, uri)]: statusMap[status] })
    }
  },
  getters: {
    [g_GET_REQ_STATE](state) {
      return (method, uri) => state.items[cacheKey(method, uri)]
    }
  }
}