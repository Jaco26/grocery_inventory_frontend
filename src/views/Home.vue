<template>
  <div class="home container">
    <h1>Home</h1>

    <!-- <section class="stocks">
      <div class="stocks__create-new">
        <form @submit.prevent="onSubmit">
          <div class="row align-center">
            <div class="col">
              <JInput label="New Stock" v-model="newStockName" />
            </div>
            <div class="col d-flex align-center">
              <button class="btn btn-primary" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <div class="stocks__list">
        <h3>Stocks:</h3>
        <ul style="list-style: none">
          <li v-for="stock in stocks" :key="stock.id">
            <router-link :to="{ path: `/@${stock.name}`, query: { stock_id: stock.id }}">
              {{stock.name}}
            </router-link>
            <button @click="onDelete(stock.id)">X</button>
          </li>
        </ul>
      </div>
    </section> -->

    <resource-display
      resourceName="Stock"
      :newResourceItemName.sync="newStockName"
      :items="stocks"
      :searchKeys="['name']"
      @submit="onSubmit"
    >
      <template v-slot:list-item="{ item }">
        <router-link :to="{ path: `/@${item.name}`, query: { stock_id: item.id }}">
          {{item.name}}
        </router-link>
        <button @click="onDelete(item.id)">X</button>
      </template>
    </resource-display>
    

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
import { a_POST_STOCK, a_DELETE_STOCK } from '@/store/stocks/types'
import apiService from '@/util/api-service'

import ResourceDisplay from '@/components/home-page/resource/index'
export default {
  name: 'Home',
  components: {
    ResourceDisplay,
  },
  data() {
    return {
      newStockName: '',
    }
  },
  computed: {
    ...mapState('stocks', {
      stocks: s => s.list
    })
  },
  methods: {
    ...mapActions('stocks', {
      postStock: a_POST_STOCK,
      deleteStock: a_DELETE_STOCK,
    }),
    onSubmit() {
      const name = this.newStockName.trim()
      if (name) {
        this.postStock(name)
      }
    },
    onDelete(stockId) {
      if (confirm(`Are you sure you want to delete the "${this.stocks.find(s => s.id === stockId).name}" stock`)) {
        this.deleteStock(stockId)
      }
    }
  },
}
</script>
