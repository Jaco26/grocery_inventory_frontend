import Vue from 'vue'
import Vuex from 'vuex'

import stock from './modules/stock/index'
import foodCategory from './modules/food-category/index'
import foodKind from './modules/food-kind/index'
import reqState from './modules/request-state/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stock,
    foodCategory,
    foodKind,
    reqState,
  }
})
