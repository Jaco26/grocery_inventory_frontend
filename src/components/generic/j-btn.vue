
<script>
export default {
  functional: true,
  props: {
    to: [Object, String],
    busy: Boolean,
    busyText: {
      type: Boolean,
      default: '...busy'
    }
  },
  render(h, ctx) {
    const { props, children, data } = ctx
    const { to, ...btnProps } = props

    return to
      ? h('router-link',
            {
              ...data,
              props: { to },
              domProps: {
                tabindex: 0
              },
              attrs: { ...data.attrs },
              class: { 'j-btn': true, ...data.class }
            },
          props.busy ? props.busyText : children
        )
      : h('button',
          {
            ...data,
            attrs: { type: 'button', ...data.attrs, disabled: props.busy },
            class: { 'j-btn': true, ...data.class }
          },
          props.busy ? props.busyText : children
        )
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

  &:hover {
    background: #eee;
  }

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

  &.x-small {
    min-width: 48px;
    padding: 0 .5rem;
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

  &.link {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
    // color: blue;
    text-decoration: underline;

    &:hover {
      background: #eee;
    }
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

    &:hover {
      background: #eee;
    }

    &.outlined-hover {

      &:hover, &:focus {
        background: transparent;
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

    &:hover {
      background: #eee;
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