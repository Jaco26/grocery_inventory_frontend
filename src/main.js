import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/jacob.css'
import './assets/components.css'
import './assets/scss/_index.scss'

import JInput from '@/components/generic/j-input'
import JSelect from '@/components/generic/j-select'
import JAlert from '@/components/generic/j-alert'
import JCard from '@/components/generic/j-card/index'
import JDataList from '@/components/generic/j-data-list/j-data-list.js'

Vue.use(JCard)
Vue.use(JDataList)

Vue.component('JInput', JInput)
Vue.component('JSelect', JSelect)
Vue.component('JAlert', JAlert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
