<template>
  <div> 
    <JInput
      label="URI"
      placeholder="/<some-api-endpoint>"
      :value="uri"
      @input="$emit('update:uri', $event)"
    />
    <JSelect
      label="Method"
      :options="methodOptions"
      :value="method"
      @input="$emit('update:method', $event)"
    />
    <textarea
      v-if="['POST', 'PUT'].includes(method)"
      placeholder="Enter JSON formattable text to be send as request body"
      rows="10"
      style="width: 100%; margin-top: 10px; padding: 1rem;"
      :value="payload"
      @input="$emit('update:payload', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    uri: String,
    method: String,
    payload: String
  },
  data() {
    return {
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE']
    }
  }
}
</script>