<template>
  <div class="row justify-center">
    <div class="col mobile-10 tablet-6 desktop-4" style="max-width: 400px; min-width: 300px">
      <j-card outlined>
        <j-card-text>
          <h3>Send password reset email</h3>
          <p>
            Enter your email address and we'll send you a link where you can change your password.
          </p>
          <form @submit.prevent="onSendLink">
            <JInput
              class="mb-4"
              placeholder="jane.shmane@wayne.com"
              v-model.trim="email"
            />
            <div class="d-flex flex-column align-center">
              <j-btn
                style="align-self: stretch"
                class="outlined mb-3"
                type="submit"
                :disabled="!email.length"
              >
                Send link
              </j-btn>
              <j-btn
                class="text text--underlined"
                :to="{ name: 'login' }"
              >
                Back to login
              </j-btn>
            </div>
          </form>
        </j-card-text>
      </j-card>
    </div>
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
    onSendLink() {
      apiService.post('/account/send-reset-link', { email: this.email })
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