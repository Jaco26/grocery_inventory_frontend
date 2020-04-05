<template>
  <j-card flat class="pa-0">
    <j-card-text class="px-0">
      <div class="row">
        <div class="col px-2 tablet-12 desktop-6">
          <JInput
            smallLabel
            type="number"
            step="0.1"
            label="Serving size"
            :value="foodKind.serving_size"
            @input="updateField('serving_size', $event)"
          />
        </div>
        <div class="col px-2 tablet-12 desktop-6">
          <JSelect
            smallLabel
            label="Unit of measure"
            :options="unitOfMeasureOptions"
            :value="foodKindUOM.id"
            @input="updateField('unit_of_measurement_id', $event )"
          />
        </div>
      </div>
    </j-card-text>
  </j-card>
</template>

<script>
import { makeDebouncer } from '@/util/debounce'
import { mapState, mapGetters, mapActions } from 'vuex'
import * as foodKindTypes from '@/store/modules/food-kind/types'

const servingSizeDebouncer = makeDebouncer()

export default {
  computed: {
    ...mapGetters('foodKind', {
      foodKind: foodKindTypes.g_SELECTED_FOOD_KIND,
      foodKindUOM: foodKindTypes.g_GET_SELECTED_FOOD_KIND_UOM,
    }),
    ...mapState('foodKind/unitOfMeasure', {
      unitOfMeasureOptions: s => (s.list || []).map(x => ({ text: x.name, value: x.id }))
    }),
  },
  methods: {
    ...mapActions('foodKind', {
      updateFoodKind: foodKindTypes.a_UPDATE_FOOD_KIND,
    }),
    updateField(key, value) {
      switch (key) {
        case 'serving_size':
          if (value && value !== this.foodKind.name) {
            servingSizeDebouncer.debounce(500, () => {
              this.onUpdateFoodKind({ [key]: value })
            })
          }
          break
        case 'unit_of_measurement_id':
          if (value && value !== this.foodKindUOM.id) {
            this.onUpdateFoodKind({ [key]: value })
          }
          break
      }
    },
    onUpdateFoodKind(updatedValue) {
      this.updateFoodKind({
        id: this.foodKind.id,
        name: this.foodKind.name,
        unit_of_measurement_id: this.foodKindUOM.id,
        serving_size: this.foodKind.serving_size,
        ...updatedValue
      })
    }
  }
}
</script>