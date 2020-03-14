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

const createRequestState = (status = 0) => ({ status: statusMap[status] })

export default {
  namespaced: 'true',
  state: {
    requestStates: {}
  },
  mutations: {
    [m_SET_REQ_STATE](state, { method = 'GET', uri = '', status = 0 }) {
      state.requestStates[`${method}_${uri}`] = statusMap[status]
    }
  },
  getters: {
    [g_GET_REQ_STATE](state) {
      return (method, uri) => state.requestStates[`${method}_${uri}`]
    }
  }
}