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
        <j-card-text class="pa-0 d-flex justify-between">
          <h4 class="my-2">Stock Items:</h4>
          <j-btn
            class="x-small outlined"
            style="align-self: center"
            @click="showNewItemForm = !showNewItemForm"
          >
            {{showNewItemForm ? 'cancel' : '+ add'}}
          </j-btn>
        </j-card-text>
        <j-card-text v-if="showNewItemForm" style="background-color: #8a8">
          <StockItemForm
            :foodKindOptions="foodKindOptions"
            v-bind.sync="newStockItem"
            @submit.prevent="onSubmitNewStockItem"
          />
        </j-card-text>
        <j-card-text class="px-0">
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

import StockItemForm from '@/components/stock/stock-item-form'

// vuex
import { mapState, mapGetters, mapAction, mapMutations, mapActions } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
import * as foodKindTypes from '@/store/modules/food-kind/types'
export default {
  components: {
    StockItems,
    StockSnapshots,
    StockItemForm,
  },
  data() {
    return {
      showNewItemForm: false,
      newStockItem: {
        foodKindId: '',
        dateItemWasNew: '',
        expirationDate: '',
      }
    }
  },
  computed: {
    ...mapGetters('stock', {
      stock: stockTypes.g_SELECTED_STOCK,
      foodKindsInSelectedStock: stockTypes.g_FOOD_KINDS_IN_SELECTED_STOCK,
    }),
    ...mapState('foodKind', {
      foodKindOptions: s => s.list.map(x => ({ text: x.name, value: x.id }))
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
    }),
    ...mapActions('stock', {
      postStockItem: stockTypes.a_POST_STOCK_ITEM,
    }),
    onSubmitNewStockItem() {
      const { foodKindId, dateItemWasNew, expirationDate } = this.newStockItem
      if (foodKindId && dateItemWasNew && expirationDate) {
        this.postStockItem({
          food_kind_id: foodKindId,
          date_item_was_new: dateItemWasNew,
          expiration_date: expirationDate,
        })
        this.$set(this, 'newStockItem', {
          foodKindId: '',
          dateItemWasNew: '',
          expirationDate: ''
        })
        this.showNewItemForm = false
      } else {
        alert('Oops! Make sure you have filled out all fields')
      }
    }
  },

}
</script>

<style scoped>
.hi::before {
  content: " HIH IHI";
  width: 400px;
}
</style>