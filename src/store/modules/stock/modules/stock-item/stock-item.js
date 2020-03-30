import apiService from '@/util/api-service'
import { makeCacher, makeReqStatusGetter } from '@/util/caching'
import {
  a_POST_STOCK_ITEM_STATE,
  m_SET_SELECTED_STOCK_ITEM_FOOD_KIND_ID,
  g_SELECTED_STOCK_ITEM,
  g_SELECTED_STOCK_ITEM_UOM_NAME,
  g_SELECTED_STOCK_ITEM_TOTAL_QUANTITY,
  g_SELECTED_STOCK_ITEM_TOTAL_SERVINGS,
  g_STATUS_OF_POST_STOCK_ITEM_STATE,
} from './types'
import { a_FETCH_SELECTED_STOCK } from '@/store/modules/stock/types'

/**
 * @typedef StockItemState
 * @property {string} food_item_id
 * @property {string} packaging_kind_id
 * @property {string} packaging_state_id
 * @property {number} number_of_servings
 * @property {number} weight 
 */

const EMPTY_ITEM_STATE = {
  id: '',
  date_created: '',
  date_updated: '',
  food_item_id: '',
  quantity: 0,
  packaging_kind: {
    id: '',
    name: '',
  },
  packaging_state: {
    id: '',
    name: ''
  },
}


export default {
  namespaced: true,
  state: {
    foodKindId: '',
  },
  mutations: {
    [m_SET_SELECTED_STOCK_ITEM_FOOD_KIND_ID](state, id) {
      state.foodKindId = id
    }
  },
  actions: {
    /**
     * 
     * @param {*} param0 
     * @param {StockItemState} stockItemState 
     */
    async [a_POST_STOCK_ITEM_STATE]({ dispatch, commit }, stockItemState) {
      const uri = '/food_item_state/'
      const cacher = makeCacher(uri).cachePost(commit)
      try {
        cacher.setStatus(1)
        await apiService.post(uri, stockItemState)
        cacher.setStatus(2)
        dispatch(`stock/${a_FETCH_SELECTED_STOCK}`, null, { root: true })
      } catch (error) {
        cacher.setStatus(3)
      }
    }
  },
  getters: {
    [g_SELECTED_STOCK_ITEM](state, getters, rootState, rootGetters) {
      // a grouping of all items of the same `food_kind` within a `stock`
      const contract = {
        food_kind: {},
        food_kind_id: '',
        items: [], // food_item[]
      }
      const selected = rootGetters['stock/SELECTED_STOCK']
        .items
        .reduce((acc, x) => {
          if (x.food_kind_id === state.foodKindId) {
            const { current_state, ...item } = x
            acc.push({ ...item, current_state: current_state || EMPTY_ITEM_STATE })
          }
          return acc
        }, [])
      if (selected.length) {
        contract.items = selected
        contract.food_kind = selected[0].food_kind,
        contract.food_kind_id = selected[0].food_kind_id
      }
      return contract
    },
    [g_SELECTED_STOCK_ITEM_UOM_NAME](state, getters) {
      let rv = ''
      const selected = getters[g_SELECTED_STOCK_ITEM]
      if (selected.food_kind_id) {
        rv = selected.food_kind.unit_of_measurement.name
        rv = rv === 'Self' ? selected.food_kind.name : rv
      }
      return rv
    },
    [g_SELECTED_STOCK_ITEM_TOTAL_QUANTITY](state, getters) {
      let rv = 0
      const selected = getters[g_SELECTED_STOCK_ITEM]
      if (selected.food_kind_id) {
        rv = selected.items.reduce((acc, x) => (acc + x.current_state.quantity), 0)
      }
      return rv
    },
    [g_SELECTED_STOCK_ITEM_TOTAL_SERVINGS](state, getters) {
      let rv = 0
      const selected = getters[g_SELECTED_STOCK_ITEM]
      if (selected.food_kind_id) {
        rv = getters[g_SELECTED_STOCK_ITEM_TOTAL_QUANTITY] / selected.food_kind.serving_size
      }
      return rv
    },
    [g_STATUS_OF_POST_STOCK_ITEM_STATE]: makeReqStatusGetter.isPost({ uri: '/food_item_state/' })
  }
}

/*
FOOD_ITEM:
id
date_created
date_updated
stock_id
food_kind_id
date_item_was_new
expiration_date
states
*/
