<template functional>
  <div class="j-input">
    <label>{{props.label}}</label>
    <select
      class="j-input__input"
      :value="props.value"
      @input="listeners.input($event.target.value)"
    >
      <template v-for="(opt, i) in props.options">
        <option :key="i" :value="opt.value || opt">{{opt.text || opt}}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number, Object],
    options: Array
  }
}
</script>