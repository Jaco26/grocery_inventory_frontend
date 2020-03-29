<template>
  <router-view></router-view>
</template>

<script>
// components
import StockItems from '@/components/stock/stock-items'
import StockSnapshots from '@/components/stock/stock-snapshots'

// vuex
import { mapMutations } from 'vuex'
import { m_SET_SELECTED_STOCK_ID } from '@/store/modules/stock/types'
export default {
  methods: {
    ...mapMutations('stock', {
      setSelectedStockId: m_SET_SELECTED_STOCK_ID
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log('setting stock id', to.params.stock_id)
      vm.setSelectedStockId(to.params.stock_id)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedStockId(null)
    next()
  }
}
</script>