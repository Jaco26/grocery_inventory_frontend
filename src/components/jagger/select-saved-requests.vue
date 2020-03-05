<template>
  <j-select
    label="Saved Requests"
    :options="requests"
    :value="value"
    v-on="$listeners"
  ></j-select>
</template>

<script>
export default {
  props: {
    requests: Array,
    value: String
  }
}
</script>