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
import * as stockTypes from '@/store/modules/stock/types'
export default {
  computed: {
    ...mapGetters('stock', {
      stock: stockTypes.g_SELECTED_STOCK
    })
  },
  methods: {
    ...mapMutations('stock', {
      setSelectedStockId: stockTypes.m_SET_SELECTED_STOCK_ID
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSelectedStockId(to.query.stock_id)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedStockId(null)
    next()
  }
}
</script>