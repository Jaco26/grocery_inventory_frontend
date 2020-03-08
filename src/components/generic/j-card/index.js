import JCard from './j-card'
import JCardTitle from './j-card-title'
import JCardText from './j-card-text'
import JCardActions from './j-card-actions'

export default {
  install(Vue) {

    Vue.component('JCard', JCard)
    Vue.component('JCardTitle', JCardTitle)
    Vue.component('JCardText', JCardText)
    Vue.component('JCardActions', JCardActions)

  }
}