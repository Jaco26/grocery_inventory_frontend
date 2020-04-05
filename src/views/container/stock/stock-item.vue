<template>
  <div class="container">
    <div class="row">
      <div class="col mobile-12 tablet-4 food-kind__side-panel" style="align-self: start;">
        <j-card outlined>
          <j-card-text class="pa-0 d-flex align-center justify-between">
            <h2 class="my-0">{{stockItem.food_kind.name}}</h2>
            <div>
              <j-btn class="x-small link" :to="editLink">edit</j-btn>
            </div>
          </j-card-text>
          <j-card-text class="pa-0">
            Serving size: {{servingSizeText}}
          </j-card-text>
        </j-card>
      </div>
      <div class="col mobile-12 tablet-8">
        <j-card outlined>
          <j-card-text class="pa-0 d-flex align-center justify-between">
            <h4 class="ma-0">Quantity In Stock:</h4>
            <div>
              <j-btn class="x-small outlined" @click="showNewItemForm = !showNewItemForm">+ add</j-btn>
            </div>
          </j-card-text>
          <j-card-text class="px-0">
            <div>
              Quantity: {{totalQuantityText}}
            </div>
            <div>
              Servings: {{stockItemTotalServings}} 
            </div>
          </j-card-text>
          <j-card-text class="px-0">
            <h4 class="ma-0">Items:</h4>
            <template v-if="showNewItemForm">
              <form @submit.prevent="onSubmitNewItemState"></form>
            </template>
            <StockItemForm
              v-if="showNewItemForm"
              :overrideFoodKind="stockItem.food_kind.name"
              v-bind.sync="newStockItem"
              @submit.prevent="onSubmutNewStockItem"
            />
            <j-list
              :withSearch="false"
              :items="stockItem.items"
              liClass="mb-2"
              indexKey="food_kind_uniform_name"
            >
              <template v-slot:item="{ item }">
                <div class="mb-1">
                  <StockItemState  :stockItem="item" :state="item.current_state" :stockItemId="item.id" />
                </div>
              </template>
            </j-list>
          </j-card-text>
        </j-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as stockItemTypes from '@/store/modules/stock/modules/stock-item/types'

import StockItemForm from '@/components/stock/stock-item-form'
import StockItemState from '@/components/stock/stock-item-state'
export default {
  name: 'StockItem',
  components: {
    StockItemForm,
    StockItemState,
  },
  data() {
    return {
      selectedItemId: '',
      showNewItemForm: false,
      newStockItem: {

      }
    }
  },
  computed: {
    ...mapGetters('stock/stockItem', {
      stockItem: stockItemTypes.g_SELECTED_STOCK_ITEM,
      stockItemUOMName: stockItemTypes.g_SELECTED_STOCK_ITEM_UOM_NAME,
      stockItemTotalQuantity: stockItemTypes.g_SELECTED_STOCK_ITEM_TOTAL_QUANTITY,
      stockItemTotalServings: stockItemTypes.g_SELECTED_STOCK_ITEM_TOTAL_SERVINGS,
    }),
    editLink() {
      return { name: 'food-kind', params: { food_kind_id: this.stockItem.food_kind.id }}
    },
    totalQuantityText() {
      const quantity = this.stockItemTotalQuantity
      return `${quantity} ${this.stockItemUOMName}`
    },
    servingSizeText() {
      const servingSize = this.stockItem.food_kind.serving_size
      return `${servingSize} ${this.stockItemUOMName}`
    }
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
    onShowNewItemForm() {

    }
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

<style lang="scss" scoped>
</style>