<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
import * as foodKindTypes from '@/store/modules/food-kind/types'
export default {
  methods: {
    ...mapActions('stock', {
      fetchStocks: stockTypes.a_FETCH_STOCKS
    }),
    ...mapActions('foodCategory', {
      fetchFoodCategoryList: foodCategoryTypes.a_FETCH_FOOD_CATEGORY_LIST
    }),
    ...mapActions('foodKind', {
      fetchFoodKindList: foodKindTypes.a_FETCH_FOOD_KIND_LIST
    })
  },
  mounted() {
    this.fetchStocks()
    this.fetchFoodCategoryList()
    this.fetchFoodKindList()
  }
}
</script>