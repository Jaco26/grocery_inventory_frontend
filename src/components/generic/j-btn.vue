
<script>
export default {
  functional: true,
  props: {
    to: [Object, String],
  },
  render(h, ctx) {
    const { props, children, data } = ctx
    const { to, ...btnProps } = props

    const jBtn = h('button', { ...data, props: btnProps, class: { 'j-btn': true, ...data.class }}, children)

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
  min-width: 96px;

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
    min-width: 30px;
    height: 30px;

    &.large {
      width: 35px;
      height: 35px;
    }

    &.small {
      min-width: 25px;
      height: 25px;
    }
  }

  &.circle {
    min-width: 30px;
    height: 30px;
    border-radius: 50% 50%;

    &.large {
      width: 35px;
      height: 35px;
    }

    &.small {
      min-width: 25px;
      height: 25px;
    }
  }

  &.small {
    min-width: 64px;
    padding: .25rem .5rem;
  }

  &.large {
    min-width: 132px;
    padding: .75rem;
  }

  &.fullwidth {
    width: 100%;
  }

  &.text {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
    color: black;

    &.clr-primary:not(.outlined-hover) {
      color: blue;

      &:disabled {
        color: #aaa;
      }
    }
    &.clr-danger:not(.outlined-hover) {
      color: #f58;
      &:disabled {
        color: #aaa;
      }
    }
    &.clr-link:not(.outlined-hover) {
      color: teal;
      &:disabled {
        color: #aaa;
      }
    }

    &:disabled {
      border-color: transparent;
    }


    &.outlined-hover {

      &:hover, &:focus {
        border-color: gray;

        &.clr-primary {
          border-color: blue;
          color: blue;
        }
        &.clr-danger {
          border-color: #f9a;
          color: #f58;
        }
        &.clr-link {
          border-color: teal;
          color: teal;
        }
      }
        
      &:disabled {
        &:hover {
          border-color: transparent;
          color: #aaa;
        }
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
      color: blue;
    }
    &.clr-danger {
      border-color: #f9a;
      color: #f58;
    }
    &.clr-link {
      border-color: teal;
      color: teal;
    }
  }

  &:disabled {
    border-color: #aaa;
    color: #aaa;
    cursor: default;

    &:hover {
      background: transparent;
      color: #aaa;
    }
  }

}
</style>