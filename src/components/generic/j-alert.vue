<template functional>
  <transition name="dropdown-fade">
    <j-card
      v-if="props.value"
      outlined
      class="pa-1"
      :class="staticClass"
      :style="staticStyle"
    >
      <j-card-actions class="pa-0">
        <div class="d-flex justify-end align-start">
          <j-btn style="align-self: center" class="square text outlined-hover " @click="listeners.input(false)">x</j-btn>
        </div>
      </j-card-actions>
      <j-card-text class="pa-2">
        <span :class="`text-${props.kind}`">
          <slot>{{props.message}}</slot>
        </span>
      </j-card-text>
    </j-card>
  </transition>
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