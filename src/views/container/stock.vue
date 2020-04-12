<template>
  <router-view></router-view>
</template>

<script>
// components
import StockItems from '@/components/stock/stock-items'
import StockSnapshots from '@/components/stock/stock-snapshots'

// vuex
import { mapState, mapMutations, mapActions } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
export default {
  computed: {
    ...mapState('stock', {
      stockHasLoaded: s => stockId => s.list.find(x => x.id === stockId)
    }),
  },
  methods: {
    ...mapMutations('stock', {
      setSelectedStockId: stockTypes.m_SET_SELECTED_STOCK_ID
    }),
    ...mapActions('stock', {
      fetchSelectedStock: stockTypes.a_FETCH_SELECTED_STOCK,
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSelectedStockId(to.params.stock_id)
      if (vm.stockHasLoaded(to.params.stock_id)) {
        vm.fetchSelectedStock()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedStockId(null)
    next()
  }
}
</script>