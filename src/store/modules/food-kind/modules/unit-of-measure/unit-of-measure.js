import apiService from '@/util/api-service'
import { makeCacher } from '@/util/caching'
import {
  a_FETCH_UNIT_OF_MEASURE_LIST,
  m_SET_UNIT_OF_MEASURE_LIST,
} from './types'

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    [m_SET_UNIT_OF_MEASURE_LIST](state, list) {
      state.list = list
    },
  },
  actions: {
    async [a_FETCH_UNIT_OF_MEASURE_LIST]({ commit }) {
      const uri = '/unit_of_measure/'
      const cacher = makeCacher(uri).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get(uri)
        commit(m_SET_UNIT_OF_MEASURE_LIST, res.data)
        cacher.setStatus(2)
      } catch (error) {
        cacher.setStatus(3)
      }
    }
  }
}