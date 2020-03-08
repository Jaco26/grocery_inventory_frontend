import apiService from '@/util/api-service'
import {
  m_SET_FOOD_KIND_LIST,
  m_SET_SELECTED_FOOD_KIND_ID,
  a_FETCH_FOOD_KIND_LIST,
  a_POST_FOOD_KIND,
  a_UPDATE_FOOD_KIND,
  a_DELETE_FOOD_KIND,
  g_SELECTED_FOOD_KIND
} from './types'

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
      try {
        const res = await apiService.get('/categories/food/kind')
        commit(m_SET_FOOD_KIND_LIST, res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_POST_FOOD_KIND]({ dispatch }, { name, nutrition_info, notes }) {
      try {
        await apiService.post('/categories/food/kind', { name, nutrition_info, notes })
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_UPDATE_FOOD_KIND]({ dispatch }, { id, name, nutrition_info, notes }) {
      try {
        await apiService.put(`/categories/food/kind/${id}`, { name, nutrition_info, notes })
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_DELETE_FOOD_KIND]({ dispatch }, id) {
      try {
        await apiService.delete(`/categories/food/kind/${id}`)
        await dispatch(a_FETCH_FOOD_KIND_LIST)
      } catch (error) {
        console.log(error)
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
    }

  }
}