<template>
  <div class="row">
    <div class="col mobile-12 tablet-4">
      <j-card outlined>
        <j-card-text class="pa-0">
          <h2 class="my-0">{{stock.name}}</h2>
        </j-card-text>
        <j-card-text class="pa-0">
          ... more
        </j-card-text>
      </j-card>
    </div>
    <div class="col mobile-12 tablet-8">
      <j-card outlined>
        <j-card-text class="pa-0">
          <h4 class="my-2">Stock Items:</h4>
          <j-list
            :striped="false"
            :items="stockFoodKinds"
            searchPlaceholder="Search stock items"
            liClass="mb-2"
            indexKey="uniform_name"
            :searchKeys="['name']"
          >
            <template v-slot:item="{ item }">
              <j-btn class="outlined fullwidth text-left" :to="{ name: 'stock-item', params: { item_id: item.id }}">
                <span class="text--underlined">{{item.name}}</span> 
                <ul style="list-style:none;padding:0;">
                  <li v-for="(x, i) in item.items" :key="i">
                    <small>new: {{x.date_item_was_new}}</small> &nbsp;
                    <small>exp: {{x.expiration_date}}</small>
                  </li>
                </ul>
              </j-btn>
            </template>
          </j-list>
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
      stock: stockTypes.g_SELECTED_STOCK,
      foodKindsInSelectedStock: stockTypes.g_FOOD_KINDS_IN_SELECTED_STOCK,
    }),
    stockFoodKinds() {
      return Object.values(this.foodKindsInSelectedStock)
    },
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

<style scoped>
.hi::before {
  content: " HIH IHI";
  width: 400px;
}
</style>