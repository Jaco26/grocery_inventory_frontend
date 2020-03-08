
<script>
export default {
  functional: true,
  render(h, ctx) {
    return h('section', { ...ctx.data, class: { 'j-card-actions': true }}, ctx.children)
  }
}
</script>