import apiService from '@/util/api-service'
import {
  m_SET_FOOD_CATEGORY_LIST,
  a_FETCH_FOOD_CATEGORY_LIST,
  a_POST_FOOD_CATEGORY,
  a_UPDATE_FOOD_CATEGORY,
  a_DELETE_FOOD_CATEGORY,
} from './types'


export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    [m_SET_FOOD_CATEGORY_LIST](state, foodCateogryList) {
      state.list = foodCateogryList
    }
  },
  actions: {
    async [a_FETCH_FOOD_CATEGORY_LIST]({ commit }) {
      try {
        const res = await apiService.get('/categories/food/category')
        commit(m_SET_FOOD_CATEGORY_LIST, res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_POST_FOOD_CATEGORY]({ dispatch }, name) {
      try {
        await apiService.post('/categories/food/category', { name })
        await dispatch(a_FETCH_FOOD_CATEGORY_LIST)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_UPDATE_FOOD_CATEGORY]({ dispatch }, { id, name }) {
      try {
        await apiService.put(`/categories/food/category/${id}`, { name })
        await dispatch(a_FETCH_FOOD_CATEGORY_LIST)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_DELETE_FOOD_CATEGORY]({ dispatch }, id) {
      try {
        await apiService.delete(`/categories/food/category/${id}`)
        await dispatch(a_FETCH_FOOD_CATEGORY_LIST)
      } catch (error) {
        console.log(error)
      }
    },
  }
}