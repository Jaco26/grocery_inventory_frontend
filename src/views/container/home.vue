<template>
  <div class="home">
    
    <j-dialog v-model="showDeleteFoodKindError">
      <j-card>
        <j-card-text>
          {{deleteFoodKindErrorMsg}}
        </j-card-text>
        <j-card-actions class="text-right">
          <button v-focus class="btn outlined mx-2" @click="onCancelForceDeleteFoodKind">Cancel</button>
          <button class="btn danger" @click="onDeleteFoodKind(forceDeleteFoodKindId, true)">Confirm</button>
        </j-card-actions>
      </j-card>
    </j-dialog>

    <div class="row">
      <div class="col mobile-12 tablet-6 desktop-4">
        <j-card outlined>
          <j-card-title class="pa-0">Stock List</j-card-title>
          <j-card-text class="pa-0">
            <form @submit.prevent="onSubmitStock">
            <div class="d-flex">
              <JInput label="Create new stock" v-model.trim="stock" />
              <button :disabled="!stock" style="align-self: end" class="btn small outlined ml-2">Submit</button>
            </div>
          </form>
          <j-alert v-model="showSubmitStockError">
            There was an error while creating the stock. Please try again and make 
            sure to use a unique name.
          </j-alert>
          <j-list
            searchLabel="Search stocks"
            :items="stockList"
            indexKey="name"
            :searchKeys="['name']">
            <template v-slot:item="{ item }">
              <router-link style="color: inherit" :to="{ name: 'stock', params: { stock_id: item.id }}">
                {{item.name}}
              </router-link>
              <button @click="onDeleteStock(item.id)">X</button>
            </template>
          </j-list>
          </j-card-text>
        </j-card>
      </div>

      <div class="col mobile-12 tablet-6 desktop-4">
        <j-card outlined>
          <j-card-title class="pa-0">Food Kinds</j-card-title>
          <j-card-text class="pa-0">
            <form @submit.prevent="onSubmitFoodKind">
              <div class="d-flex">
                <JInput label="Create new food kind" v-model.trim="foodKind" />
                <button :disabled="!foodKind" style="align-self: end" class="btn small outlined ml-2">Submit</button>
              </div>
            </form>
            <j-alert v-model="showSubmitFoodKindError">
              There was an error while creating the food kind. Please try again and make 
              sure to use a unique name.
            </j-alert>
            <j-list
              searchLabel="Search food kinds"
              :items="foodKindList"
              indexKey="name"
              :searchKeys="['name']"
            >
              <template v-slot:item="{ item }">
                <router-link style="color: inherit" :to="{ name: 'food-kind', params: { food_kind_id: item.id }}">
                  {{item.name}}
                </router-link>
                <button @click="onDeleteFoodKind(item.id)">X</button>
              </template>
            </j-list>
          </j-card-text>
        </j-card>
        <!-- <h2 class="ma-0"></h2> -->
      </div>

    </div>
  </div>
</template>

<script>
// vuex
import { mapState, mapGetters, mapActions } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
import * as foodKindTypes from '@/store/modules/food-kind/types'
// Componnts
import ListSearchCreate from '@/components/list-search-create'
export default {
  name: 'Home',
  components: {
    ListSearchCreate,
  },
  data() {
    return {
      stock: '',
      foodCategory: '',
      foodKind: '',
      packagingKind: '',
      showSubmitStockError: false,
      showSubmitFoodKindError: false,

      showDeleteFoodKindError: false,
      forceDeleteFoodKindId: '',
      deleteFoodKindErrorMsg: ''
    }
  },
  watch: {
    statusOfPostStock(val) {
      this.showSubmitStockError = val === 'ERROR'
    },
    statusOfPostFoodKind(val) {
      this.showSubmitFoodKindError = val === 'ERROR'
    }
  },
  computed: {
    ...mapGetters('stock', {
      statusOfPostStock: stockTypes.g_STATUS_OF_POST_STOCK,
    }),
    ...mapGetters('foodKind', {
      statusOfPostFoodKind: foodKindTypes.g_STATUS_OF_POST_FOOD_KIND,
      getDataFromDeleteFoodKind: foodKindTypes.g_DATA_FROM_DELETE_FOOD_KIND,
    }),
    ...mapState('stock', {
      stockList: s => s.list
    }),
    ...mapState('foodCategory', {
      foodCategoryList: s => s.list
    }),
    ...mapState('foodKind', {
      foodKindList: s => s.list
    }),
  },
  methods: {
    confirmDelete(itemName, itemKind) {
      return confirm(`Are you sure you want to delete the "${itemName}" ${itemKind}`)
    },
    ...mapActions('stock', {
      postStock: stockTypes.a_POST_STOCK,
      deleteStock: stockTypes.a_DELETE_STOCK,
    }),
    async onSubmitStock() {
      const name = this.stock.trim()
      if (name) {
        await this.postStock(name)
        if (this.statusOfPostStock !== 'ERROR') {
          this.stock = ''
        }
      }
    },
    onDeleteStock(stockId) {
      const stock = this.stockList.find(s => s.id === stockId)
      if (this.confirmDelete(stock.name, 'stock')) {
        this.deleteStock(stockId)
      }
    },
    ...mapActions('foodCategory', {
      postFoodCategory: foodCategoryTypes.a_POST_FOOD_CATEGORY,
      deleteFoodCategory: foodCategoryTypes.a_DELETE_FOOD_CATEGORY,
    }),
    onSubmitFoodCategory() {
      const name = this.foodCategory.trim()
      if (name) {
        this.postFoodCategory(name)
        this.foodCategory = ''
      }
    },
    onDeleteFoodCategory(id) {
      const category = this.foodCategoryList.find(c => c.id === id)
      if (this.confirmDelete(category.name, 'Food Category')) {
        this.deleteFoodCategory(id)
      }
    },
    ...mapActions('foodKind', {
      postFoodKind: foodKindTypes.a_POST_FOOD_KIND,
      deleteFoodKind: foodKindTypes.a_DELETE_FOOD_KIND,
    }),
    async onSubmitFoodKind() {
      const name = this.foodKind.trim()
      if (name) {
        await this.postFoodKind({ name })
        if (this.statusOfPostFoodKind !== 'ERROR') {
          this.foodKind = ''
        }
      }
    },
    async onDeleteFoodKind(id, force = false) {
      const kind = this.foodKindList.find(k => k.id === id)
      this.onCancelForceDeleteFoodKind()
      if (force) {
        await this.deleteFoodKind({ id, force })
      } else if (this.confirmDelete(kind.name, 'Food Kind')) {
        await this.deleteFoodKind({ id })
      }
      const errorMsg = this.getDataFromDeleteFoodKind(`/categories/food/kind/${id}`)
      if (errorMsg) {
        this.showDeleteFoodKindError = true
        this.deleteFoodKindErrorMsg = errorMsg
        this.forceDeleteFoodKindId = id
      }
    },
    onCancelForceDeleteFoodKind() {
      this.$store.commit('reqState/SET_REQ_STATE_ITEM', {
        method: 'DELETE',
        uri: `/categories/food/kind/${this.forceDeleteFoodKindId}`,
        data: null,
      })
      this.showDeleteFoodKindError = false
      this.deleteFoodKindErrorMsg = ''
      this.forceDeleteFoodKindId = ''
    }
  },
}
</script>
