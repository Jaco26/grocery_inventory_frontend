import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/jacob.css'
import './assets/components.css'

import JInput from '@/components/generic/j-input'
import JSelect from '@/components/generic/j-select'


Vue.component('j-input', JInput)
Vue.component('j-select', JSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
