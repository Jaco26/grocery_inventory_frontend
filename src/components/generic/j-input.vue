<template functional>
  <div class="j-input" :class="{ 'label-beside' : props.horizontal }">
    <label class="j-input__label">{{props.label}}</label>
    <input
      class="j-input__input"
      v-bind="data.attrs"
      :value="props.value"
      @input="listeners.input($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number],
    horizontal: Boolean
  },
}
</script>
