<template>
  <div>
    <pre v-if="response">
      {{response}}
    </pre>
    <pre v-else-if="error">
      {{error}}
    </pre>
  </div>
</template>

<script>
export default {
  props: {
    uri: String,
    method: String,
    payload: Object
  },
  data() {
    return {
      response: null,
      error: null,
    }
  },
  async mounted() {
    try {
      console.log(this.payload)
      const res = await fetch(`http://localhost:5000/api/v1${this.uri}`, {
        method: this.method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.payload),
      })
      this.response = await res.json()
    } catch (error) {
      this.error = error
    }
  }
}
</script>
