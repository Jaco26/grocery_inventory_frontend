
<script>
export default {
  functional: true,
  props: {
    to: [Object, String],
  },
  render(h, ctx) {
    const { props, children, data } = ctx
    const { to, ...btnProps } = props

    const jBtn = h('button', { ...data, props: btnProps, class: 'j-btn' }, children)

    return to
      ? h('router-link', { style: { width: '100%' }, props: { to } }, [jBtn])
      : jBtn
  }
}
</script>

<style lang="scss">
.j-btn {
  cursor: pointer;
  font: inherit;
  padding: .25rem;
  border: 1px solid transparent;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #aaa;
  width: 96px;

  &.clr-primary {
    background-color: blue;
    color: white;
  }
  &.clr-danger {
    background-color: red;
    color: white;
  }
  &.clr-link {
    background-color: teal;
    color: white;
  }

  &.square {
    width: 30px;
    height: 30px;

    &.large {
      width: 35px;
      height: 35px;
    }

    &.small {
      width: 25px;
      height: 25px;
    }
  }

  &.small {
    width: 64px;
    padding: .125rem;
  }

  &.large {
    width: 132px;
    padding: .5rem;
  }

  &.fullwidth {
    width: 100%;
  }

  &.text {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
    color: black;

    &.outlined-hover:hover {
      border-color: gray;

      &.clr-primary {
        border-color: blue;
      }
      &.clr-danger {
        border-color: red;
      }
      &.clr-link {
        border-color: teal;
      }
    }
  }

  &.outlined {
    background: transparent;
    box-shadow: none;
    border: 1px solid gray;
    color: black;

    &.clr-primary {
      border-color: blue;
    }
    &.clr-danger {
      border-color: red;
    }
    &.clr-link {
      border-color: teal;
    }
  }



}
</style>