import apiService from '@/util/api-service'
import {
  m_SET_SELECTED_STOCK_ITEM_FOOD_KIND_ID,
  g_SELECTED_STOCK_ITEM
} from './types'

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
  getters: {
    [g_SELECTED_STOCK_ITEM](state, getters, rootState, rootGetters) {
      // a grouping of all food_kinds within a stock
      const contract = {
        food_kind: '',
        items: [], // food_item[]
      }
      const selected = rootGetters['stock/SELECTED_STOCK']
        .items
        .filter(x => x.food_kind_id === state.foodKindId)
      if (selected.length) {
        contract.food_kind = selected[0].food_kind.name,
        contract.items = selected
      }
      return contract
    }
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
