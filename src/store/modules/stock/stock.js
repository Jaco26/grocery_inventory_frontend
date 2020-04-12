import apiService from '@/util/api-service'
import { makeCacher, makeReqStatusGetter } from '@/util/caching'
import {
  m_SET_STOCKS,
  m_SET_SELECTED_STOCK_ID,
  m_UPDATE_STOCK_LIST,
  a_DELETE_STOCK,
  a_FETCH_STOCKS,
  a_FETCH_SELECTED_STOCK,
  a_POST_STOCK,
  a_POST_STOCK_ITEM,
  g_SELECTED_STOCK,
  g_FOOD_KINDS_IN_SELECTED_STOCK,
  g_STATUS_OF_POST_STOCK,
} from './types'
import stockItem from './modules/stock-item/stock-item'

const stockCacher = makeCacher('/stock/')

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
      const cacher = stockCacher.cacheGet(commit)
      try {
        cacher.setStatus(1)
        const res = await apiService.get('/stock/')
        commit(m_SET_STOCKS, res.data)
        cacher.setStatus(2)
      } catch (error) {
        cacher.setStatus(3)
        console.log(error)
      }
    },
    async [a_FETCH_SELECTED_STOCK]({ dispatch, state, commit }) {
      const cacher = makeCacher(`/stock/${state.selectedStockId}`).cacheGet(commit)
      try {
        cacher.setStatus(1)
        const stock = await apiService.get(`/stock/${state.selectedStockId}`)
        cacher.setStatus(2)
        commit(m_UPDATE_STOCK_LIST, stock.data)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_POST_STOCK]({ dispatch, commit }, name) {
      const cacher = stockCacher.cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post('/stock/', { name })
        cacher.setStatus(2)
        await dispatch(a_FETCH_STOCKS)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_POST_STOCK_ITEM]({ commit, dispatch, state }, { food_kind_id, expiration_date, date_item_was_new }) {
      const uri = `/stock/item/${state.selectedStockId}`
      const cacher = makeCacher(uri).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(uri, {
          food_kind_id,
          expiration_date,
          date_item_was_new
        })
        cacher.setStatus(2)
        await dispatch(a_FETCH_SELECTED_STOCK)
      } catch (error) {
        cacher.setStatus(3)
      }
    },
    async [a_DELETE_STOCK]({ dispatch, commit }, stockId) {
      const uri = `/stock/${stockId}`
      const cacher = makeCacher(uri).cacheDelete(commit)
      try {
        cacher.setStatus(1)
        await apiService.delete(uri)
        cacher.setStatus(2)
        await dispatch(a_FETCH_STOCKS)
      } catch (error) {
        cacher.setStatus(3)
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
          items: stockItems.reduce((accum, item) => {
            if (item.food_kind_id === x.food_kind_id) {
              accum.push({
                expiration_date: item.expiration_date,
                date_item_was_new: item.date_item_was_new
              })
            }
            return accum
          }, []).sort((a, b) => a.expiration_date > b.expiration_date ? 1 : -1)
        }
      }), {})
    },
    [g_STATUS_OF_POST_STOCK]: makeReqStatusGetter.isPost({ uri: '/stock/' })
  }
}