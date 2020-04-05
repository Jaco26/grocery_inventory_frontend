<template>
  <div class="row">
    <div class="col mobile-12 tablet-6 desktop-4">
      <j-card outlined>
        <j-card-text class="pa-0">
          <h2 class="my-0">{{foodKind.name}}</h2>
        </j-card-text>
        <j-card-text class="px-0">
          <div class="row">
            <div class="col">
              <span class="text-weight--bold">Serving size:</span> {{servingSizeText}}
            </div>
          </div>
        </j-card-text>
      </j-card>
    </div>
    <div class="col mobile-12 tablet-6 desktop-8">
      <j-card outlined>
        <j-card-title class="pa-0">
          Nutrition Info:
        </j-card-title>
        <j-card-text class="px-0">
          <FoodKindUOMFormCard :unitOfMeasureName="uomName" />
          ...more
        </j-card-text>
      </j-card>
    </div>
  </div>
</template>

<script>
import { makeDebouncer } from '@/util/debounce'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import * as foodKindTypes from '@/store/modules/food-kind/types'
// Components
import FoodKindUOMFormCard from '@/components/food-kind/food-kind-uom-form-card'

export default {
  components: {
    FoodKindUOMFormCard,
  },
  computed: {
    ...mapGetters('foodKind', {
      foodKind: foodKindTypes.g_SELECTED_FOOD_KIND,
      foodKindUOM: foodKindTypes.g_GET_SELECTED_FOOD_KIND_UOM,
    }),
    uomName() {
      let rv = this.foodKindUOM.name
      rv = rv === 'Self' ? this.foodKind.name : rv
      return rv
    },
    servingSizeText() {
      return `${this.foodKind.serving_size} ${this.uomName}`
    }
  },
  methods: {
    ...mapMutations('foodKind', {
      setSelectedFoodKindId: foodKindTypes.m_SET_SELECTED_FOOD_KIND_ID
    }),
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