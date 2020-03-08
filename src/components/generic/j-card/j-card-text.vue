
<script>
export default {
  functional: true,
  render(h, ctx) {
    return h('section', { ...ctx.data, class: { 'j-card-text': true }}, ctx.children)
  }
}
</script>