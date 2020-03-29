

<script>
export default {
  functional: true,
  props: {
    label: String,
    smallLabel: Boolean,
    value: [String, Number, Object],
    options: Array,
    horizontal: Boolean
  },
  render(h, ctx) {

    const label = h('label',
      {
        class: {
          'j-input__label': true,
          'small': ctx.props.smallLabel
        }
      },
      ctx.props.label
    )

    const options = ctx.props.options.map(opt => (
      h('option', 
        {
          attrs: {
            value: opt.value || opt,
            selected: (opt.value || opt) === ctx.props.value
          }
        },
        opt.text || opt
      )
    ))

    const select = h('select',
      {
        class: 'j-input__input',
        attrs: { value: ctx.props.value },
        on: {
          input: e => ctx.listeners.input(e.target.value)
        }
      },
      options
    )

    return h('div',
      {
        class: {
          'j-input': true,
          'label-beside': ctx.props.horizontal
        }
      },
      [
        label,
        select
      ]
    )
  }
}
</script>
