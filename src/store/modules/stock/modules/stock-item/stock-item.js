import apiService from '@/util/api-service'
import {
  m_SET_SELECTED_STOCK_ITEM_FOOD_KIND_ID,
  g_SELECTED_STOCK_ITEM
} from './types'

const EMPTY_ITEM_STATE = {
  id: '',
  date_created: '',
  date_updated: '',
  food_item_id: '',
  number_of_servings: 0,
  weight: 0,
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
    
  },
  getters: {
    [g_SELECTED_STOCK_ITEM](state, getters, rootState, rootGetters) {
      // a grouping of all food_kinds within a stock
      const contract = {
        food_kind: '',
        food_kind_id: '',
        items: [], // food_item[]
      }
      const selected = rootGetters['stock/SELECTED_STOCK']
        .items
        .reduce((acc, x) => {
          if (x.food_kind_id === state.foodKindId) {
            const { states, ...item } = x
            acc.push({
              ...item,
              state: states[states.length - 1] || EMPTY_ITEM_STATE
            })
          }
          return acc
        }, [])
      if (selected.length) {
        contract.food_kind = selected[0].food_kind.name,
        contract.food_kind_id = selected[0].food_kind_id
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
