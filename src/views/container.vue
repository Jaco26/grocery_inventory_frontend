<template>
  <div>
    <header class="app-bar">
      <div>
        <TheBreadcrumbs />
      </div>
      <div>
        <j-btn class="text outlined-hover" @click="$store.dispatch('session/LOGOUT')">logout</j-btn>
      </div>
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as stockTypes from '@/store/modules/stock/types'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
import * as foodKindTypes from '@/store/modules/food-kind/types'
import * as unitOfMeasureTypes from '@/store/modules/food-kind/modules/unit-of-measure/types'
import * as packagingTypes from '@/store/modules/packaging/types'

// Components
import TheBreadcrumbs from '@/components/the-breadcrumbs'

export default {
  components: {
    TheBreadcrumbs,
  },
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

<style scoped>
.app-bar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 42px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid powderblue;
  background-color: whitesmoke;
  /* box-shadow: 1px 1px 2px #bbb;  */
  /* background: #5bb772; */
}
.main-content {
  position: relative;
  top: 42px;
  padding-top: 16px;
}
</style>