import Vue from 'vue'
import Vuex from 'vuex'

import stock from './modules/stock/stock'
import foodCategory from './modules/food-category/index'
import foodKind from './modules/food-kind/index'
import reqState from './modules/req-state/req-state'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stock,
    foodCategory,
    foodKind,
    reqState,
  }
})
