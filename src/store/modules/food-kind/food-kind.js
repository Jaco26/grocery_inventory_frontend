import apiService from '@/util/api-service'
import { makeCacher, makeCacheGetter } from '@/util/caching'
import {
  m_SET_FOOD_KIND_LIST,
  m_SET_SELECTED_FOOD_KIND_ID,
  a_FETCH_FOOD_KIND_LIST,
  a_POST_FOOD_KIND,
  a_UPDATE_FOOD_KIND,
  a_DELETE_FOOD_KIND,
  g_SELECTED_FOOD_KIND,
  g_GET_FOOD_KIND_BY_ID,
  g_STATUS_OF_POST_FOOD_KIND,
} from './types'

const URI_categoriesFoodKind = '/categories/food/kind'

export default {
  namespaced: true,
  state: {
    list: [],
    selectedFoodKindId: null,
  },
  mutations: {
    [m_SET_FOOD_KIND_LIST](state, foodKindList) {
      state.list = foodKindList
    },
    [m_SET_SELECTED_FOOD_KIND_ID](state, id) {
      state.selectedFoodKindId = id
    }
  },
  actions: {
    async [a_FETCH_FOOD_KIND_LIST]({ commit }) {
      const cacher = makeCacher(URI_categoriesFoodKind).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get(URI_categoriesFoodKind)
        cacher.setStatus(2)
        commit(m_SET_FOOD_KIND_LIST, res.data)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_POST_FOOD_KIND]({ dispatch, commit }, { name, nutrition_info, notes }) {
      const cacher = makeCacher(URI_categoriesFoodKind).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(URI_categoriesFoodKind, { name, nutrition_info, notes })
        cacher.setStatus(2)
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_UPDATE_FOOD_KIND]({ dispatch, commit }, { id, name, nutrition_info, notes }) {
      const uri = `${URI_categoriesFoodKind}/${id}`
      const cacher = makeCacher(uri).cachePut(commit)
      try {
        cacher.setStatus(1)
        await apiService.put(uri, { name, nutrition_info, notes })
        cacher.setStatus(2)
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_DELETE_FOOD_KIND]({ dispatch, commit }, id) {
      const uri = `${URI_categoriesFoodKind}/${id}`
      const cacher = makeCacher(uri).cacheDelete(commit)
      try {
        cacher.setStatus(1)
        await apiService.delete(uri)
        cacher.setStatus(2)
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        cacher.setStatus(3)
      }
    }
  },
  getters: {
    [g_SELECTED_FOOD_KIND](state) {
      const contract = { id: '', name: '', uniform_name: '', nutrition_info: {}, categories: [] }
      const selected = state.list.find(c => c.id === state.selectedFoodKindId)
      if (selected) {
        return selected
      }
      return contract
    },
    [g_GET_FOOD_KIND_BY_ID](state) {
      return id => state.list.find(x => x.id === id)
    },
    [g_STATUS_OF_POST_FOOD_KIND]: makeCacheGetter.isPost(URI_categoriesFoodKind)
  }
}