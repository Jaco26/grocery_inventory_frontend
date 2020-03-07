<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'
import * as stocksTypes from '@/store/stocks/types'
export default {
  methods: {
    ...mapActions('stocks', {
      fetchStocks: stocksTypes.a_FETCH_STOCKS
    })
  },
  mounted() {
    this.fetchStocks()
  }
}
</script>