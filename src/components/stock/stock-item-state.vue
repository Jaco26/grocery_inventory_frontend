<template>
  <div>

    <template v-if="isEditing">
      <div class="row">
        <div class="col">
          <div>
            <strong>Current State</strong>
            <button class="ml-4" @click="isEditing = false">&times; Cancel</button>
            <div> Date: {{state.date_created}} </div>
            <div> Quantity: {{state.quantity}} </div>
            <div> Packaging Kind: {{state.packaging_kind.name}} </div>
            <div> Packaging State: {{state.packaging_state.name}} </div>
          </div>
        </div>
        <div class="col">
          <h4 class="ma-0">New State</h4>
          <form @submit.prevent="onSubmitStockItemState">
            <JInput label="Quantity" type="number" v-model.number="quantity" />
            <JSelect label="Packaging Kind" :options="packagingKindOptions" v-model="packagingKindId" />
            <JSelect label="Packaging State" :options="packagingStateOptions" v-model="packagingStateId" />
            <button type="submit">Submit New State</button>
          </form>
        </div>
      </div>
      
    </template>

    <template v-else>
      <div class="row">
        <div class="col">
          <div>
            <strong>Current State</strong> <button class="ml-4" @click="isEditing = true">&#9998; Update</button>
          </div>
          
          <template v-if="state.id">
            <div> Date: {{state.date_created}} </div>
            <div> Quantity: {{state.quantity}} </div>
            <div> Packaging Kind: {{state.packaging_kind.name}} </div>
            <div> Packaging State: {{state.packaging_state.name}} </div>
          </template>

          <template v-else>
            No record yet for this item
          </template>
          
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import * as stockItemTypes from '@/store/modules/stock/modules/stock-item/types'
export default {
  props: {
    stockItem: Object,
    state: Object,
    stockItemId: String,
  },
  data() {
    return {
      isEditing: false,
      quantity: 0,
      packagingKindId: '',
      packagingStateId: '',
    }
  },
  methods: {
    initFormFields() {
      this.quantity = this.state.quantity
      this.packagingKindId = this.state.packaging_kind.id || this.defaultPackagingKindId
      this.packagingStateId = this.state.packaging_state.id || this.defaultPackagingStateId
    },
    async onSubmitStockItemState() {
      await this.postStockItemState(this.newStatePayload)
      if (this.statusOfPostStockItemState !== 'ERROR') {
        this.isEditing = false
      }
    },
    ...mapActions('stock/stockItem', {
      postStockItemState: stockItemTypes.a_POST_STOCK_ITEM_STATE,
    })
  },
  watch: {
    isEditing(newVal) {
      this.initFormFields()
    },
  },
  computed: {
    newStatePayload() {
      return {
        stock_item_id: this.stockItemId,
        packaging_kind_id: this.packagingKindId,
        packaging_state_id: this.packagingStateId,
        quantity: this.quantity
      }
    },
    ...mapState('packaging', {
      packagingKindOptions: s => s.kindList.map(x => ({ value: x.id, text: x.name })),
      defaultPackagingKindId: s => (s.kindList.find(x => /n\/a/i.test(x.name)) || {}).id,
      packagingStateOptions:  s => s.stateList.map(x => ({ value: x.id, text: x.name })),
      defaultPackagingStateId: s => (s.stateList.find(x => /n\/a/i.test(x.name)) || {}).id 
    }),
    ...mapGetters('stock/stockItem', {
      statusOfPostStockItemState: stockItemTypes.g_STATUS_OF_POST_STOCK_ITEM_STATE,
    }),
  }
}
</script>