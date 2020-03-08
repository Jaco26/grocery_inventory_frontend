<template>
  <div class="container">
    <h1>Stock Item</h1>
    <pre>
      {{stockItem}}
    </pre>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as stockItemTypes from '@/store/modules/stock/modules/stock-item/types'
export default {
  computed: {
    ...mapGetters('stock/stockItem', {
      stockItem: stockItemTypes.g_SELECTED_STOCK_ITEM
    })
  },
  methods: {
    ...mapMutations('stock/stockItem', {
      setSelectedStockItemFoodKindId: stockItemTypes.m_SET_SELECTED_STOCK_ITEM_FOOD_KIND_ID
    }),
  },
  beforeRouteEnter(to, from, next) {
    console.log(to)
    next(vm => {
      vm.setSelectedStockItemFoodKindId(to.params.item_id)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedStockItemFoodKindId(null)
    next()
  }
}
</script>