<template>
  <div>
    <h1>{{stock.name}}</h1>
    <pre>
      {{stock}}
    </pre>
  </div>
</template>

<script>
import { mapState, mapGetters, mapAction, mapMutations } from 'vuex'
import * as stocksTypes from '@/store/stocks/types'
export default {
  computed: {
    ...mapGetters('stocks', {
      stock: stocksTypes.g_SELECTED_STOCK
    })
  },
  methods: {
    ...mapMutations('stocks', {
      setSelectedStockId: stocksTypes.m_SET_SELECTED_STOCK_ID
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSelectedStockId(to.query.stock_id)

      if (!vm.stock.id) {
        next('/404')
      }

   
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedStockId(null)
    next()
  }
}
</script>