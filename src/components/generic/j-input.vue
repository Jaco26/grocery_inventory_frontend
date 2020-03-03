<template functional>
  <div class="j-input">
    <label>{{props.label}}</label>
    <input
      class="j-input__input"
      v-bind="data.attrs"
      @input="listeners.input($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number],
  },
}
</script>
