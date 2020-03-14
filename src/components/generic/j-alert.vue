<template functional>
  <j-card
    v-if="props.value"
    outlined
    class="pa-1"
    :class="staticClass"
    :style="staticStyle"
  >
    <j-card-actions class="pa-0">
      <div class="d-flex justify-end">
        <button @click="listeners.input(false)">x</button>
      </div>
    </j-card-actions>
    <j-card-text class="pa-0">
      <slot>{{props.message}}</slot>
    </j-card-text>
  </j-card>
</template>

<script>
export default {
  props: {
    value: Boolean,
    message: String,
  }
}
</script>