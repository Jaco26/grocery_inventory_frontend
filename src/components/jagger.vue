<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <j-input
          v-model="req.url"
          label="Request Url"
          placeholder="/some-endpoint"
        />
      </div>
    </div>
    <div class="col">
      <j-select
        v-model="req.method"
        :options="req.methodOptions"
        label="Request Method"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      req: {
        url: '',
        method: 'GET',
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE']
      }
    }
  },
}
</script>