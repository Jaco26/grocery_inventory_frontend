<template>
  <div>
    <h1>Food Kind</h1>
    <pre>
      {{foodKind}}
    </pre>
  </div>
</template>

<script>
import { mapState, mapGetters, mapAction, mapMutations } from 'vuex'
import * as foodKindTypes from '@/store/modules/food-kind/types'
export default {
  computed: {
    ...mapGetters('foodKind', {
      foodKind: foodKindTypes.g_SELECTED_FOOD_KIND,
    }),
  },
  methods: {
    ...mapMutations('foodKind', {
      setSelectedFoodKindId: foodKindTypes.m_SET_SELECTED_FOOD_KIND_ID
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSelectedFoodKindId(to.params.food_kind_id)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSelectedFoodKindId(null)
    next()
  }
}
</script>