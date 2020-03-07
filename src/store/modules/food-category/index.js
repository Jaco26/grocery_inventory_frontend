import apiService from '@/util/api-service'
import {
  m_SET_FOOD_CATEGORY_LIST,
  m_SET_SELECTED_FOOD_CATEGORY_ID,
  a_FETCH_FOOD_CATEGORY_LIST,
  a_POST_FOOD_CATEGORY,
  a_UPDATE_FOOD_CATEGORY,
  a_DELETE_FOOD_CATEGORY,
  g_SELECTED_FOOD_CATEGORY,
} from './types'


export default {
  namespaced: true,
  state: {
    list: [],
    selectedFoodCategoryId: null
  },
  mutations: {
    [m_SET_FOOD_CATEGORY_LIST](state, foodCateogryList) {
      state.list = foodCateogryList
    },
    [m_SET_SELECTED_FOOD_CATEGORY_ID](state, id) {
      state.selectedFoodCategoryId = id
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
  },
  getters: {
    [g_SELECTED_FOOD_CATEGORY](state) {
      const contract = { id: '', name: '', uniform_name: '' }
      const selected = state.list.find(c => c.id === state.selectedFoodCategoryId)
      if (selected) {
        return selected
      }
      return contract
    }
  }
}