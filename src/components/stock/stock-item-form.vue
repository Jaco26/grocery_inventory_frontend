<template functional>
  <form v-bind="data.attrs" v-on="listeners">
    <div class="row mb-4">
      <div class="col">
        <template v-if="props.overrideFoodKind">
          <h3>Add more</h3>
        </template>
        <template v-else>
          <JSelect
            smallLabel
            label="What kind of food item is this?"
            :options="props.foodKindOptions"
            :value="props.foodKindId"
            @input="listeners['update:foodKindId']($event)"
          />
        </template>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <JInput
          smallLabel
          label="When was this item new?"
          type="date"
          :value="props.dateItemWasNew"
          @input="listeners['update:dateItemWasNew']($event)"
        />
      </div>
      <div class="col">
        <JInput
          smallLabel
          label="When will this item expire?"
          type="date"
          :value="props.expirationDate"
          @input="listeners['update:expirationDate']($event)"
        />
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-end">
        <j-btn type="submit" class="outlined">Submit</j-btn>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    overrideFoodKind: String,
    foodKindOptions: {
      type: Array,
      default: () => [],
      validator(opts) {
        return opts.every(x => x.text && x.value)
      }
    },
    foodKindId: String,
    dateItemWasNew: String,
    expirationDate: String,
  },
}
</script>