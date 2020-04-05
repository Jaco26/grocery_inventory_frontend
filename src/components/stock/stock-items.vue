<template>
  <j-card outlined>
    <j-card-text class="pa-0">
      <div class="d-flex align-center justify-between">
        <h3>Items</h3>
        <div>
          <button :title="addItemButtonState.title" @click="addItemButtonState.onClick">
            {{ addItemButtonState.text }}
          </button>
        </div>
      </div>
      <j-card
        v-if="showNewStockItemItemForm"
        flat
        class=""
        style="background: #fed"
      >
        <j-card-text class="px-0 pt-0 text-weight--bold">
          Add a new item
        </j-card-text>
        <j-card-text class="pa-0">
          <StockItemForm
            :foodKindOptions="foodKindOptions"
            v-bind.sync="newStockItem"
            @submit.prevent="onSubmitNewStockItem"
          />
        </j-card-text>
      </j-card>
      <ul style="list-style: none; padding: 0;">
        <li v-for="(item, i) in foodKindsInSelectedStock" :key="i" style=" margin: .5rem 0">
          <router-link class="text-underlined" :to="{ name: 'stock-item', params: {  item_id: item.id }}">
            {{item.name}}
          </router-link>
          <ul class="food-kind__item-dates-list">
            <li v-for="(x, i) in item.items" :key="i + x.expiration_date">
              <small>new: {{x.date_item_was_new}}</small> &nbsp;
              <small>exp: {{x.expiration_date}}</small>
            </li>
          </ul>
        </li>
      </ul>
    </j-card-text>
  </j-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { a_POST_STOCK_ITEM,  g_FOOD_KINDS_IN_SELECTED_STOCK } from '@/store/modules/stock/types'
import { g_GET_FOOD_KIND_BY_ID } from '@/store/modules/food-kind/types'

// Components
import StockItemForm from '@/components/stock/stock-item-form'
export default {
  props: {
    items: Array,
  },
  components: {
    StockItemForm,
  },
  data() {
    return {
      showNewStockItemItemForm: false,
      newStockItem: {
        foodKindId: '',
        // dates should be formatted as YYYY-MM-DD
        expirationDate: '',
        dateItemWasNew: '', 
      }
    }
  },
  computed: {
    ...mapGetters('stock', {
    }),
    ...mapState('foodKind', {
      foodKindOptions: s => s.list.map(k => ({ text: k.name, value: k.id }))
    }),
    ...mapGetters('foodKind', {
      getFoodKindById: g_GET_FOOD_KIND_BY_ID,
    }),
    addItemButtonState() {
      return {
        onClick: this.toggleAddItemsForm,
        text: this.showNewStockItemItemForm ? '-' : '+',
        title: this.showNewStockItemItemForm
          ? 'Clear and close form'
          : 'Open form to add an item to this stock'
      }
    }
  },
  methods: {
    ...mapActions('stock', {
      postStockItem: a_POST_STOCK_ITEM,
    }),
    resetNewStockItemState() {
      this.$set(this, 'newStockItem', {
        foodKindId: '',
        expirationDate: '',
        dateItemWasNew: '', 
      })
    },
    toggleAddItemsForm() {
      this.showNewStockItemItemForm = !this.showNewStockItemItemForm
      if (!this.showNewStockItemItemForm) {
        this.resetNewStockItemState()
      }
    },
    onSubmitNewStockItem() {
      const { foodKindId, dateItemWasNew, expirationDate } = this.newStockItem
      if (foodKindId && dateItemWasNew && expirationDate) {
        this.postStockItem({
          food_kind_id: foodKindId,
          date_item_was_new: dateItemWasNew,
          expiration_date: expirationDate,
        })
        this.resetNewStockItemState()
      } else {
        alert('Oops! make sure you have filled out all fields')
      }
    }
  }
}
</script>

<style scoped>
.food-kind__item-dates-list {
  list-style: none;
  padding: 0;
}
</style>