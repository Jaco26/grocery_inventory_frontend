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
    <j-card-text class="pa-2">
      <span :class="`text-${props.kind}`">
        <slot>{{props.message}}</slot>
      </span>
    </j-card-text>
  </j-card>
</template>

<script>
export default {
  props: {
    value: Boolean,
    message: String,
    kind: {
      type: String,
      default: 'danger'
    }
  }
}
</script>