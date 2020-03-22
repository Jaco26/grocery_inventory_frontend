import {
  m_SET_REQ_STATE_ITEM,
  g_GET_REQ_STATUS,
  g_GET_REQ_DATA,
} from './types'

const statusMap = {
  0: 'IDLE',
  1: 'WAITING',
  2: 'COMPLETE',
  3: 'ERROR',
}

const DEFAULT_REQ_STATE = {
  status: '',
  data: null,
}

const createReqState = (status = 0, data = null) => ({ status: statusMap[status], data })
const cacheKey = (method, uri) => `${method}_${uri}`

export default {
  namespaced: 'true',
  state: {
    items: {}
  },
  mutations: {
    [m_SET_REQ_STATE_ITEM](state, { method = 'GET', uri = '', status = 0, data }) {
      state.items = {
        ...state.items,
        [cacheKey(method, uri)]: createReqState(status, data) }
    }
  },
  getters: {
    [g_GET_REQ_STATUS](state) {
      return (method, uri) => (state.items[cacheKey(method, uri)] || DEFAULT_REQ_STATE).status
    },
    [g_GET_REQ_DATA](state) {
      return (method, uri) => (state.items[cacheKey(method, uri)] || DEFAULT_REQ_STATE).data
    }
  }
}