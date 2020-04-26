import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account/account'
import session from './modules/session/session'
import reqState from './modules/req-state/req-state'
import stock from './modules/stock/stock'
import foodCategory from './modules/food-category/index'
import foodKind from './modules/food-kind/food-kind'
import packaging from './modules/packaging/packaging'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    foodCategory,
    foodKind,
    packaging,
    reqState,
    session,
    stock,
  }
})
