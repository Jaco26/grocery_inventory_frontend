<template>
  <div>
    <h1>Home</h1>

    <form @submit.prevent="onSubmit">
      <div class="row align-center">
        <div class="col">
          <JInput label="New Stock" v-model="newStockName" />
        </div>
        <div class="col d-flex align-center shrink">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>



    <h3>Stocks:</h3>
    <ul style="list-style: none">
      <li v-for="stock in stocks" :key="stock.id">
        <router-link :to="{ path: `/@${stock.name}`, query: { stock_id: stock.id }} ">{{stock.name}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import api from '@/util/api-service'

export default {
  props: {
    stocks: Array,
    postNewStock: Function,
  },
  data() {
    return {
      newStockName: '',
    }
  },
  methods: {
    onSubmit() {
      const name = this.newStockName.trim()
      if (name) {
        this.postNewStock(name)
      }
    }
  }
}
</script>