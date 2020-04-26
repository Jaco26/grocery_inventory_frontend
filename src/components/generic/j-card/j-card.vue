<script>
export default {
  functional: true,
  props: {
    flat: Boolean,
    outlined: Boolean,
  },
  render(h, ctx) {
    return h(
      'article',
      {
        ...ctx.data,
        staticClass: `j-card ${ctx.data.class}`,
        class: {
          flat: ctx.props.flat,
          outlined: ctx.props.outlined
        }
      },
      ctx.children
    )
  }
}
</script>

<style lang="scss">
.j-card {
  display: block;
  box-shadow: 1px 1px 2px #aaa;
  border-radius: 2px;
  border: 1px solid transparent;
  padding: 1rem;
  height: 100%;

  &.flat {
    box-shadow: none;
  }

  &.outlined {
    box-shadow: none;
    border: 1px solid #ccc;
  }

  > .j-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    padding: 1rem;
  }

  > .j-card-text {
    padding: .5rem 1rem 1rem;
  }

  > .j-card-actions {
    padding: .25rem 1rem;
  }
}
</style>