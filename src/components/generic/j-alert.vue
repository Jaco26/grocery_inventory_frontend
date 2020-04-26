<template functional>
  <transition name="dropdown-fade">
    <j-card
      v-if="props.value"
      outlined
      class="pa-1"
      :class="[...(data.class || []), data.staticClass]"
      :style="[...(data.style || []), data.staticStyle]"
    >
      <j-card-actions class="pa-0">
        <div class="d-flex justify-end align-start">
          <j-btn style="align-self: center" class="square text outlined-hover" @click="listeners.input(false)">x</j-btn>
        </div>
      </j-card-actions>
      <j-card-text class="pa-2">
        <span>
          <slot>{{props.message}}</slot>
        </span>
      </j-card-text>
    </j-card>
  </transition>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: Boolean,
    message: String,
    kind: String,
  }
}
</script>