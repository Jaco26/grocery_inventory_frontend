<template>
  <div>
    <input type="text" v-model="email">
    <button @click="sendLink">send</button>
  </div>
</template>

<script>
import apiService from '@/util/api-service'
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    sendLink() {
      apiService.post('/account/send-pw-recovery-link', { email: this.email })
        .then(res => {
          alert('Success!')
        })
        .catch(err => {
          alert('Fail!')
        })
    }
  }
}
</script>