<template functional>
  <div v-if="props.value" class="j-dialog" role="dialog">
    <div class="j-dialog__content">
      <button class="btn text icon close-dialog" @click="listeners.input(false)">x</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  }
}
</script>


<style>
.j-dialog {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: #111a;
}
.j-dialog__content {
  position: relative;
  margin: 200px auto;
  background: white;
  max-width: 500px;
  min-width: 300px;
}
.j-dialog__content .close-dialog {
  position: absolute;
  top: 0;
  right: 0;
}
</style>