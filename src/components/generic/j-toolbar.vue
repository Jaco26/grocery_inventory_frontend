<template functional>
  <div class="j-toolbar" :style="[data.style, data.staticStyle]" :class="[data.class, data.staticClass]">
    <section class="j-toolbar__title">
      <slot name="title">{{props.title}}</slot>
    </section>
    <section class="j-toolbar__actions">
      <slot name="actions"></slot>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  }
}
</script>

<style lang="scss">
.j-toolbar {
  width: 100%;
  height: 48px;
  padding: .25rem .5rem;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  box-shadow: 1px 1px 2px #aaa;

  &.flat {
    box-shadow: none;
  }

  &.outlined {
    box-shadow: none;
    border: 1px solid #ccc;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    text-align: start;
    flex: 0;
  }

  &__actions {
    text-align: right;
    flex: 1;
  }
}
</style>