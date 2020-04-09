import Vue from 'vue'
import App from './App.vue'

// companion routing and state management libs
import router from './router'
import store from './store'

// css
import './assets/jacob.css'
import './assets/components.css'
import './assets/scss/_index.scss'

// components
import JDialog from '@/components/generic/j-dialog'
import JInput from '@/components/generic/j-input'
import JBtn from '@/components/generic/j-btn'
import JSelect from '@/components/generic/j-select'
import JList from '@/components/generic/j-list'
import JAlert from '@/components/generic/j-alert'
import JCard from '@/components/generic/j-card/index'
import JPagination from '@/components/generic/j-pagination'
import JToolbar from '@/components/generic/j-toolbar'

// plugins
import authMiddleware from '@/plugins/auth-middleware'

Vue.use(authMiddleware, { store, router })

Vue.use(JCard)

Vue.component('JDialog', JDialog)
Vue.component('JInput', JInput)
Vue.component('JBtn', JBtn)
Vue.component('JSelect', JSelect)
Vue.component('JList', JList)
Vue.component('JAlert', JAlert)
Vue.component('JPagination', JPagination)
Vue.component('JToolbar', JToolbar)

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
