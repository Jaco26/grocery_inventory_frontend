<template>
  <div class="home container">
    <div class="row">
      <div class="col">
        <h1>Home</h1>
      </div>
    </div>
    <div class="row">
      <div class="col mobile-12 tablet-6">
        <resource-display
          resourceName="Stock"
          :newResourceItemName.sync="stock"
          :items="stockList"
          :searchKeys="['name']"
          @submit="onSubmitStock"
        >
          <template v-slot:list-item="{ item }">
            <router-link :to="{ path: `/@${item.name}`, query: { stock_id: item.id }}">
              {{item.name}}
            </router-link>
            <button @click="onDeleteStock(item.id)">X</button>
          </template>
        </resource-display>
      </div>
      <div class="col mobile-12 tablet-6">
        <resource-display
          resourceName="Food Category"
          :newResourceItemName.sync="foodCategory"
          :items="foodCategoryList"
          :searchKeys="['name']"
          @submit="onSubmitFoodCategory"
        >
          <template v-slot:list-item="{ item }">
            <!-- <router-link :to="{ path: `/@${item.name}`, query: { stock_id: item.id }}">
              {{item.name}}
            </router-link> -->
            {{item.name}}
            <button @click="onDeleteFoodCategory(item.id)">X</button>
          </template>
        </resource-display>
      </div>
    </div>
  

    
    

    <section class="food-categories">
      <div class="food-categories__create-new">

      </div>
      <div class="food-categories__list">
        <div class="list-search">
          
        </div>
        <div class="list-items">

        </div>
      </div>
    </section>

    <section class="food-kinds">
      <div class="food-kinds__create-new">

      </div>
      <div class="food-kinds__list">
        
      </div>
    </section>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { a_POST_STOCK, a_DELETE_STOCK } from '@/store/modules/stock/types'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
import apiService from '@/util/api-service'

import ResourceDisplay from '@/components/home-page/resource/index'
export default {
  name: 'Home',
  components: {
    ResourceDisplay,
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
    }

  },
}
</script>
