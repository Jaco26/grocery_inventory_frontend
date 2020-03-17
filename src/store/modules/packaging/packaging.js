import apiService from '@/util/api-service'
import { makeCacher } from '@/util/caching' 
import {
  a_FETCH_PACKAGING_KIND_LIST,
  a_FETCH_PACKAGING_STATE_LIST,
  m_SET_PACKAGING_KIND_LIST,
  m_SET_PACKAGING_STATE_LIST,
} from './types'

export default {
  namespaced: true,
  state: {
    stateList: [],
    kindList: [],
  },
  mutations: {
    [m_SET_PACKAGING_STATE_LIST](state, list) {
      state.stateList = list
    },
    [m_SET_PACKAGING_KIND_LIST](state, list) {
      state.kindList = list
    },
  },
  actions: {
    async [a_FETCH_PACKAGING_STATE_LIST]({ commit }) {
      const uri = '/categories/packaging/state'
      const cacher = makeCacher(uri).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get(uri)
        commit(m_SET_PACKAGING_STATE_LIST, res.data)
        cacher.setStatus(2)
      } catch (error) {
        console.log(error)
        cacher.setStatus(3)
      }
    },
    async [a_FETCH_PACKAGING_KIND_LIST]({ commit }) {
      const uri = '/categories/packaging/kind'
      const cacher = makeCacher(uri).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get(uri)
        commit(m_SET_PACKAGING_KIND_LIST, res.data)
        cacher.setStatus(2)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
  }
}