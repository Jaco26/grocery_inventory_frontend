<template>
  <form v-on="listeners">
    <JInput type="email" label="Email" :value="email" @input="listeners['update:email']" />
    <JInput type="password" label="Password" :value="password" @input="listeners['update:password']" />
  </form>
</template>

<script>
export default {
  props: {
    email: String,
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