import apiService from '@/util/api-service'
import {
  a_DELETE_STOCK,
  a_FETCH_STOCKS,
  a_POST_STOCK,
  m_SET_STOCKS,
  m_SET_SELECTED_STOCK_ID,
  g_SELECTED_STOCK,
} from './types'

export default {
  namespaced: true,
  state: {
    list: [],
    selectedStockId: null,
  },
  mutations: {
    [m_SET_STOCKS](state, stocks) {
      state.list = stocks
    },
    [m_SET_SELECTED_STOCK_ID](state, stockId) {
      state.selectedStockId = stockId
    }
  },
  actions: {
    async [a_FETCH_STOCKS]({ commit }) {
      try {
        const res = await apiService.get('/stock/')
        commit(m_SET_STOCKS, res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_POST_STOCK]({ dispatch }, name) {
      try {
        await apiService.post('/stock/', { name })
        await dispatch(a_FETCH_STOCKS)
      } catch (error) {
        console.log(error)
      }
    },
    async [a_DELETE_STOCK]({ dispatch }, stockId) {
      try {
        await apiService.delete(`/stock/${stockId}`)
        await dispatch(a_FETCH_STOCKS)
      } catch (error) {
        console.log(error)
      }
    } 
  },
  getters: {
    [g_SELECTED_STOCK](state) {
      const contract = { id: '' , date_created: '', date_updated: '', items: [], name: '', uniform_name: '', user_id: '' }
      const selected = state.list.find(s => s.id === state.selectedStockId)
      if (selected) {
        return selected
      }
      return contract
    }
  }
}