<template functional>
  <div class="j-input" :class="{ 'label-beside' : props.horizontal }">
    <label class="j-input__label" :class="{ 'small' : props.smallLabel }">
      <slot name="label">
        {{props.label}}
      </slot>
    </label>
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
    smallLabel: Boolean,
    value: [String, Number],
    horizontal: Boolean
  },
}
</script>

<style>
.j-input {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
}
.j-input__input {
  font: inherit;
  width: 100%;
}

.j-input__label {
  flex: 0;
}
.j-input__label.small {
  font-size: 14px;
}

.j-input.label-beside {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>