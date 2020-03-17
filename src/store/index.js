import Vue from 'vue'
import Vuex from 'vuex'

import reqState from './modules/req-state/req-state'
import stock from './modules/stock/stock'
import foodCategory from './modules/food-category/index'
import foodKind from './modules/food-kind/food-kind'
import packaging from './modules/packaging/packaging'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    reqState,
    stock,
    foodCategory,
    foodKind,
    packaging,
  }
})
