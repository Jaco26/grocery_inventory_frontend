import apiService from '@/util/api-service'
import {
  m_SET_STOCKS,
  m_SET_SELECTED_STOCK_ID,
  m_UPDATE_STOCK_LIST,
  a_DELETE_STOCK,
  a_FETCH_STOCKS,
  a_POST_STOCK,
  a_POST_STOCK_ITEM,
  g_SELECTED_STOCK,
  g_FOOD_KINDS_IN_SELECTED_STOCK,
} from './types'

import stockItem from './modules/stock-item/index'

export default {
  namespaced: true,
  modules: {
    stockItem,
  },
  state: {
    list: [],
    selectedStockId: null,
  },
  mutations: {
    [m_SET_STOCKS](state, stocks) {
      state.list = stocks
    },
    [m_UPDATE_STOCK_LIST](state, stock) {
      state.list.splice(state.list.indexOf(stock.id), 1, stock)
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
    async [a_POST_STOCK_ITEM]({ commit, state }, { food_kind_id, expiration_date, date_item_was_new }) {
      try {
        await apiService.post(`/stock/item/${state.selectedStockId}`, {
          food_kind_id,
          expiration_date,
          date_item_was_new
        })
        const stock = await apiService.get(`/stock/${state.selectedStockId}`)
        commit(m_UPDATE_STOCK_LIST, stock.data)
      } catch (error) {
        
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
    },
    [g_FOOD_KINDS_IN_SELECTED_STOCK](state, getters) {
      return getters[g_SELECTED_STOCK].items.reduce((acc, x, i, stockItems) => ({
        ...acc,
        [x.food_kind_id]: {
          ...x.food_kind,
          items: stockItems.filter(y => y.food_kind_id === x.food_kind_id).map(x => ({
            expiration_date: x.expiration_date,
            date_item_was_new: x.date_item_was_new
          }))
        }
      }), {})
    },
  }
}