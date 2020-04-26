<template>
  <div class="row justify-center">
    <div class="col mobile-10 tablet-6 desktop-4" style="max-width: 400px; min-width: 300px">
      <form @submit.prevent="onResetPassword">
        <j-card outlined>
          <j-card-text>
            <h3>Reset your password</h3>
            <p>
              Enter your new password for your account registered to <span class="text--underlined">{{registeredEmail}}</span>.
            </p>
            <JInput
              placeholder="Enter password"
              type="password"
              v-model.trim="newPassword"
            />
          </j-card-text>
          <j-card-actions class="d-flex flex-column align-center">
            <j-btn
              style="align-self: stretch;"
              class="outlined mb-4"
              type="submit"
              :disabled="!newPassword.length || resetPasswordStatus === 'WAITING'"
            >
              Reset password
            </j-btn>
            <j-btn class="text text--underlined" :to="{ name: 'login' }">Go to login</j-btn>
          </j-card-actions>

          <j-card-text>
            <j-alert :class="alertClass" v-model="showAlert">
              {{alertMessage}}
            </j-alert>
          </j-card-text>

        </j-card>
      </form>
    </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import { mapGetters, mapActions } from 'vuex'
import * as accountTypes from '@/store/modules/account/types'
export default {
  data() {
    return {
      newPassword: '',
      registeredEmail: '',
      showAlert: false,
    }
  },
  mounted() {
    const token = jwt.decode(this.$route.params.nonce)
    if (token && token.user_claims) {
      this.registeredEmail = token.user_claims.email
    }
  },
  watch: {
    resetPasswordStatus(val) {
      if (['ERROR', 'SUCCESS'].includes(val)) {
        this.showAlert = true
      }
    }
  },
  computed: {
    ...mapGetters('account', {
      resetPasswordStatus: accountTypes.g_RESET_PASSWORD_REQ_STATUS,
      resetPasswordData: accountTypes.g_RESET_PASSWORD_REQ_DATA,
    }),
    alertClass() {
      switch (this.resetPasswordStatus) {
        case 'ERROR': return 'text-danger'
        case 'SUCCESS': return 'text-success'
        default: return ''
      }
    },
    alertMessage() {
      if (this.resetPasswordData && this.resetPasswordData.pub_msg) {
        return this.resetPasswordData.pub_msg
      }
      switch (this.resetPasswordStatus) {
        case 'ERROR': return 'Uh oh! There was an error.'
        case 'SUCCESS': return 'Success!'
        default: return ''
      }
    }
  },
  methods: {
    ...mapActions('account', {
      resetPassword: accountTypes.a_RESET_PASSWORD,
    }),
    onResetPassword() {
      this.resetPassword({ password: this.newPassword, token: this.$route.params.nonce })
    }
  }
}
</script>