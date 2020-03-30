<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
import * as foodKindTypes from '@/store/modules/food-kind/types'
import * as unitOfMeasureTypes from '@/store/modules/food-kind/modules/unit-of-measure/types'
import * as packagingTypes from '@/store/modules/packaging/types'
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
    }),
    ...mapActions('foodKind/unitOfMeasure', {
      fetchUnitOfMeasureList: unitOfMeasureTypes.a_FETCH_UNIT_OF_MEASURE_LIST,
    }),
    ...mapActions('packaging', {
      fetchPackagingKindList: packagingTypes.a_FETCH_PACKAGING_KIND_LIST,
      fetchPackagingStateList: packagingTypes.a_FETCH_PACKAGING_STATE_LIST,
    })
  },
  mounted() {
    this.fetchStocks()
    this.fetchFoodCategoryList()
    this.fetchFoodKindList()
    this.fetchPackagingKindList()
    this.fetchPackagingStateList()
    this.fetchUnitOfMeasureList()
  }
}
</script>