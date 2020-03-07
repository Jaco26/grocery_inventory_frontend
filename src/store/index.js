import Vue from 'vue'
import Vuex from 'vuex'

import stock from './modules/stock/index'
import foodCategory from './modules/food-category/index'
import foodKind from './modules/food-kind/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stock,
    foodCategory,
    foodKind,
  }
})
