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
      <j-card v-if="showNewStockItemItemForm" outlined>
        <j-card-title class="pa-0">
          Add a new stock item
        </j-card-title>
        <j-card-text class="pa-0">
          <form @submit.prevent="onSubmitNewStockItem">
            <JSelect
              label="What kind of food item is this?"
              :options="foodKindList"
              v-model="newStockItem.foodKindId"
            />
            <JInput
              label="What date was this item new?"
              type="date"
              v-model="newStockItem.dateItemWasNew"
            />
            <JInput
              label="What date will this item expire?"
              type="date"
              v-model="newStockItem.expirationDate"
            />
            <button type="submit">Submit</button>
          </form>
        </j-card-text>
      </j-card>
      <ul style="list-style: none; padding: 0;">
        <li v-for="(item, i) in items" :key="i" style=" margin: .5rem 0">
          <div style="text-decoration: underline">{{item.food_kind.name}}</div>
          <div>Date Was New: <strong>{{item.date_item_was_new}}</strong></div>
          <div>Date Expires: <strong>{{item.expiration_date}}</strong></div>
        </li>
      </ul>
    </j-card-text>
  </j-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { a_POST_STOCK_ITEM } from '@/store/modules/stock/types'
export default {
  props: {
    items: Array,
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
    ...mapState('foodKind', {
      foodKindList: s => s.list.map(k => ({ text: k.name, value: k.id }))
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
      } else {
        alert('Oops! make sure you have filled out all fields')
      }
    }
  }
}
</script>

