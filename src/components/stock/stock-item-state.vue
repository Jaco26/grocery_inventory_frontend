<template>
  <div>

    <template v-if="isEditing">
      <div class="row">
        <div class="col">
          <div>
            <strong>Previous State</strong>
            <button class="ml-4" @click="isEditing = false">&times; Cancel</button>
            <div> Date: {{state.date_created}} </div>
            <div> Servings: {{state.number_of_servings}} </div>
            <div> Weight: {{state.weight}} </div>
            <div> Packaging Kind: {{state.packaging_kind.name}} </div>
            <div> Packaging State: {{state.packaging_state.name}} </div>
          </div>
        </div>
        <div class="col">
          <h4 class="ma-0">New State</h4>
          <form @submit.prevent="$listeners.submit(newStatePayload)">
            <JInput label="Number of servings" type="number" v-model.number="nServings" />
            <JInput label="Weight" type="number" v-model.number="weight" />
            <JSelect label="Packaging Kind" :options="mockPackagingKindOptions" v-model="packagingKindId" />
            <JSelect label="Packaging State" :options="mockPackagingStateOptions" v-model="packagingStateId" />

            <button type="submit">Submit New State</button>
          </form>
        </div>
      </div>
      
    </template>

    <template v-else>
      <div class="row">
        <div class="col">
          <div> <strong>State</strong> <button class="ml-4" @click="isEditing = true">&#9998; Create New</button></div>
          <div> Date: {{state.date_created}} </div>
          <div> Servings: {{state.number_of_servings}} </div>
          <div> Weight: {{state.weight}} </div>
          <div> Packaging Kind: {{state.packaging_kind.name}} </div>
          <div> Packaging State: {{state.packaging_state.name}} </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    state: Object,
  },
  data() {
    return {
      isEditing: false,
      nServings: 0,
      weight: 0,
      packagingKindId: '',
      packagingStateId: '',

      mockPackagingKindOptions: [
        {
          text: 'N/A',
          value: 'abc'
        },
        {
          text: 'Glass Jar',
          value: 'efg'
        },
        {
          text: 'Plastic Produce Bag',
          value: 'hij'
        },
      ],
      mockPackagingStateOptions: [
        {
          text: 'N/A',
          value: 'abc'
        },
        {
          text: 'Opened',
          value: 'efg'
        },
        {
          text: 'Sealed',
          value: 'hij'
        },
      ]
    }
  },
  methods: {
    initFormFields() {
      this.nServings = this.state.number_of_servings
      this.weight = this.state.weight
      this.packagingKindId = this.state.packaging_kind.id
      this.packagingStateId = this.state.packaging_state.id
    }
  },
  watch: {
    isEditing(newVal) {
      if (!newVal) {
        this.initFormFields()
      }
    },
  },
  computed: {
    newStatePayload() {
      return {
        food_item_id: this.state.food_item_id,
        packaging_kind_id: this.packagingKindId,
        packaging_state_id: this.packagingStateId,
        number_of_servings: this.nServings,
        weight: this.weight,
      }
    }
  }
}
</script>