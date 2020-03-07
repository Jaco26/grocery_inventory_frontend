<template>
  <div>
    <h1>Food Category</h1>
    <pre>
      {{foodCategory}}
    </pre>
  </div>
</template>

<script>
import { mapState, mapGetters, mapAction, mapMutations } from 'vuex'
import * as foodCategoryTypes from '@/store/modules/food-category/types'
export default {
  computed: {
    ...mapGetters('foodCategory', {
      foodCategory: foodCategoryTypes.g_SELECTED_FOOD_CATEGORY,
    }),
  },
  methods: {
    ...mapMutations('foodCategory', {
      setSelectedFoodCategoryId: foodCategoryTypes.m_SET_SELECTED_FOOD_CATEGORY_ID
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSelectedFoodCategoryId(to.params.food_category_id)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedFoodCategoryId(null)
    next()
  }
}
</script>