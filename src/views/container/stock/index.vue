<template>
  <div class="row">
    <div class="col">
      <j-card flat>
        <j-card-title class="py-0">
          <h1>{{stock.name}}</h1>
        </j-card-title>
        <j-card-text>
          <div>Date Created: <strong>{{dateCreated}}</strong></div>
          <div>Date Updated: <strong>{{dateUpdated}}</strong></div>
          <div class="row">
            <div class="col">
              <StockItems :items="stock.items" />
            </div>
          </div>
        </j-card-text>
      </j-card>
    </div>
  </div>
</template>


<script>
// components
import StockItems from '@/components/stock/stock-items'
import StockSnapshots from '@/components/stock/stock-snapshots'

// vuex
import { mapState, mapGetters, mapAction, mapMutations } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
export default {
  components: {
    StockItems,
    StockSnapshots
  },
  computed: {
    ...mapGetters('stock', {
      stock: stockTypes.g_SELECTED_STOCK
    }),
    dateCreated() {
      return new Date(this.stock.date_created).toDateString()
    },
    dateUpdated() {
      return this.stock.date_updated
      ? new Date(this.stock.date_updated).toDateString()
      : 'N/A'
    }
  },
  methods: {
    ...mapMutations('stock', {
      setSelectedStockId: stockTypes.m_SET_SELECTED_STOCK_ID
    })
  },

}
</script>