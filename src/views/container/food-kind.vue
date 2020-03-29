<template>
  <div class="row">
    <div class="col">
      <h2>Food kind: "{{foodKind.name}}"</h2>

      <!-- <pre>{{foodKind}}</pre> -->
      <div class="row">
        <div class="col mobile-12 tablet-6 desktop-4">
          <j-card outlined>
            <j-card-title class="pa-0">
              General Info:
            </j-card-title>
            <j-card-text class="px-0">
              <ul class="pa-0 ma-0" style="list-style: none;">
                <li>
                  <JSelect
                    label="Unit of measurement:"
                    :options="unitOfMeasureOptions"
                    :value="foodKindUOM.id"
                    @input="updateField('unitOfMeasureId', $event)"
                  />
                </li>
                <li class="mt-2">
                  <JInput
                    type="number"
                    step="0.1"
                    :label="`Serving Size: ${foodKind.serving_size} ${foodKindUOM.name}`"
                    :value="foodKind.serving_size"
                    @input="updateField('servingSize', $event)"
                  />
                </li>
              </ul>
            </j-card-text>
          </j-card>
         
        </div>
        <div class="col mobile-12 tablet-6 desktop-4">
          <j-card outlined> 
            <j-card-title class="pa-0">
              Nutrition Info:
            </j-card-title>
            <j-card-text class="px-0">
              N/A
            </j-card-text>
          </j-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { makeDebouncer } from '@/util/debounce'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import * as foodKindTypes from '@/store/modules/food-kind/types'

const nameDbc = makeDebouncer()
const servingSizeDbc = makeDebouncer()

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
  watch: {
    unitOfMeasureOptions: {
      immediate: true,
      handler(val) {
        console.log('unitOfMeasureOptions', val)
      }
    }
  },
  methods: {
    updateField(key, value) {
      switch (key) {
        case 'name':
          if (value && value !== this.foodKind.name) {
            nameDbc.debounce(500, () => {
              this.onUpdateFoodKind({
                name: value
              })
            })
          }
          break
        case 'servingSize':
          if (value && value !== this.foodKind.serving_size) {
            servingSizeDbc.debounce(500, () => {
              this.onUpdateFoodKind({
                serving_size: value
              })
            })
          }
          break
        case 'unitOfMeasureId':
          if (value && value !== this.foodKindUOM.id) {
            this.onUpdateFoodKind({
              unit_of_measurement_id: value
            })
          }
          break
      }
    },
    ...mapActions('foodKind', {
      updateFoodKind: foodKindTypes.a_UPDATE_FOOD_KIND
    }),
    ...mapMutations('foodKind', {
      setSelectedFoodKindId: foodKindTypes.m_SET_SELECTED_FOOD_KIND_ID
    }),
    onUpdateFoodKind(updatedValue) {
      this.updateFoodKind({
        id: this.foodKind.id,
        name: this.foodKind.name,
        unit_of_measurement_id: this.foodKindUOM.id,
        serving_size: this.foodKind.serving_size,
        ...updatedValue
      })
    }
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