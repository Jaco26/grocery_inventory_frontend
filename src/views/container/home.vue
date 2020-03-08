<template>
  <div class="home container">
    <div class="row">
      <div class="col">
        <h1>Home</h1>
      </div>
    </div>
    <div class="row">
      
      <div class="col mobile-12 tablet-6">
        <list-search-create
          resourceName="Stock"
          :newResourceItemName.sync="stock"
          :items="stockList"
          :searchKeys="['name']"
          @submit="onSubmitStock"
        >
          <template v-slot:list-item="{ item }">
            <router-link :to="{ name: 'stock', params: { stock_id: item.id }}">
              {{item.name}}
            </router-link>
            <button @click="onDeleteStock(item.id)">X</button>
          </template>
        </list-search-create>
      </div>

      <div class="col mobile-12 tablet-6">
        <list-search-create
          resourceName="Food Category"
          :newResourceItemName.sync="foodCategory"
          :items="foodCategoryList"
          :searchKeys="['name']"
          @submit="onSubmitFoodCategory"
        >
          <template v-slot:list-item="{ item }">
            <router-link :to="{ name: 'food-category', params: { food_category_id: item.id }}">
              {{item.name}}
            </router-link>
            <button @click="onDeleteFoodCategory(item.id)">X</button>
          </template>
        </list-search-create>
      </div>

      <div class="col mobile-12 tablet-6">
        <list-search-create
          resourceName="Food Kind"
          :newResourceItemName.sync="foodKind"
          :items="foodKindList"
          :searchKeys="['name']"
          @submit="onSubmitFoodKind"
        >
          <template v-slot:list-item="{ item }">
            <router-link :to="{ name: 'food-kind', params: { food_kind_id: item.id }}">
              {{item.name}}
            </router-link>
            <button @click="onDeleteFoodKind(item.id)">X</button>
          </template>
        </list-search-create>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { a_POST_STOCK, a_DELETE_STOCK } from '@/store/modules/stock/types'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
import * as foodKindTypes from '@/store/modules/food-kind/types'
import apiService from '@/util/api-service'


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
      packagingKind: ''
    }
  },
  computed: {
    ...mapState('stock', {
      stockList: s => s.list
    }),
    ...mapState('foodCategory', {
      foodCategoryList: s => s.list
    }),
    ...mapState('foodKind', {
      foodKindList: s => s.list
    })
  },
  methods: {
    confirmDelete(itemName, itemKind) {
      return confirm(`Are you sure you want to delete the "${itemName}" ${itemKind}`)
    },
    ...mapActions('stock', {
      postStock: a_POST_STOCK,
      deleteStock: a_DELETE_STOCK,
    }),
    onSubmitStock() {
      const name = this.stock.trim()
      if (name) {
        this.postStock(name)
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
    onSubmitFoodKind() {
      const name = this.foodKind.trim()
      if (name) {
        this.postFoodKind({ name })
      }
    },
    omDeleteFoodKind(id) {
      const kind = this.foodKindList.find(k => k.id === id)
      if (this.confirmDelete(kind.name, 'Food Kind')) {
        this.deleteFoodKind(id)
      }
    }

  },
}
</script>
