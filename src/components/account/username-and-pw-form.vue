<template functional>
  <form v-on="listeners" class="d-flex flex-column">
    <JInput class="mb-4" type="email" label="Email" :value="props.email" @input="listeners['update:email']" />
    <JInput class="mb-4" type="password" label="Password" :value="props.password" @input="listeners['update:password']" />
    <slot name="actions"></slot>
  </form>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
}
</script>