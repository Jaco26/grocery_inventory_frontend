<template functional>
  <div class="j-dialog" :style=" `display: ${props.value ? 'block' : 'none'}`">
    <div class="j-dialog__content">
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
  margin: 200px auto;
  background: white;
  max-width: 500px;
  min-width: 300px;
}
</style>