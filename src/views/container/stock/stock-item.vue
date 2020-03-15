<template>
  <div class="container">
    <h1>Stock Item: {{stockItem.food_kind}}</h1>
    <ul class="item-list">
      <template v-for="(item, i) in stockItem.items">
        <li class="item-list__item" :key="i">
          <div> date new: {{item.date_item_was_new}} </div>
          <div> date exp: {{item.expiration_date}} </div>

          <StockItemState :state="item.state" @submit="onSubmitNewItemState" />
          
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as stockItemTypes from '@/store/modules/stock/modules/stock-item/types'

import StockItemState from '@/components/stock/stock-item-state'
export default {
  name: 'StockItem',
  components: {
    StockItemState,
  },
  data() {
    return {
      selectedItemId: '',

    }
  },
  computed: {
    ...mapGetters('stock/stockItem', {
      stockItem: stockItemTypes.g_SELECTED_STOCK_ITEM
    })
  },
  methods: {
    isCreatingNewStateFor(item) {
      return this.selectedItemId === item.id
    },
    ...mapMutations('stock/stockItem', {
      setSelectedStockItemFoodKindId: stockItemTypes.m_SET_SELECTED_STOCK_ITEM_FOOD_KIND_ID
    }),
    onSubmitNewItemState(payload) {
      console.log(payload)
    },
  },
  beforeRouteEnter(to, from, next) {
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

<style>
.item-list {
  list-style: none;
  padding: 0;
}
.item-list__item {
  padding: .5rem;
  margin-bottom: .25rem;
  border-radius: .125rem;
}
.item-list__item:nth-of-type(odd) {
  background: beige
}
.item-list__item:nth-of-type(even) {
  background: lightblue
}
.item-list__item .divider {
  display: block;
  width: 100%;
  margin: .5rem auto;
  border-bottom: 1px solid #aaa;
}
.item-list__item .divider.invisible {
  width: 100%;
  margin: .5rem auto;
  border-bottom: 1px solid transparent;
}

</style>