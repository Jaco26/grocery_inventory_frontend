<template>
  <div class="row justify-center">
    <div class="col mobile-10 tablet-6 desktop-4" style="max-width: 400px; min-width: 300px">
      <form @submit.prevent="onResetPassword">
        <j-card outlined>
          <j-card-text>
            <h3>Reset your password</h3>
            <p>
              Enter your new password for your account registered to {{registeredEmail}}.
            </p>
            <JInput
              placeholder="Enter password"
              type="password"
              v-model="newPassword"
            />
          </j-card-text>
          <j-card-actions class="d-flex flex-column align-center">
            <j-btn style="align-self: stretch;" class="outlined mb-4" type="submit">Reset password</j-btn>
            <j-btn class="text text--underlined" :to="{ name: 'login' }">Go to login</j-btn>
          </j-card-actions>
        </j-card>
      </form>
    </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import apiService from '@/util/api-service'
const INIT = 'INIT'
const FETCHING = 'FETCHING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'
export default {
  data() {
    return {
      newPassword: '',
      registeredEmail: '',
      resetPwStatus: INIT,
    }
  },
  mounted() {
    const token = jwt.decode(this.$route.params.nonce)
    if (token && token.user_claims) {
      this.registeredEmail = token.user_claims.email
    }
  },
  methods: {
    statusIs(status) {
      return this.reqStatus === status
    },
    async onResetPassword() {
      try {
        
      } catch (error) {
        
      }
    }
  }
}
</script>