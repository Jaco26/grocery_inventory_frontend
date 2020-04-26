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
import { mapGetters, mapActions } from 'vuex'
import * as accountTypes from '@/store/modules/account/types'
export default {
  data() {
    return {
      email: '',
    }
  },
  computed: {
    ...mapGetters('account', {
      sendLinkStatus: accountTypes.g_SEND_RESET_LINK_REQ_STATUS,
      sendLinkData: accountTypes.g_SEND_RESET_LINK_REQ_DATA
    }),
    sendLinkMessage() {
      if (this.sendLinkData && this.sendLinkData.pub_msg) {
        return this.sendLinkData.pub_msg
      }
      const errorMsg = 'Oops, there was an error. Try again and if the issue persists, try again later.'
      const successMsg = 'Success! An email with a link to reset your password has been sent to the address provided.'
      switch (this.sendLinkStatus) {
        case 'ERROR': return errorMsg
        case 'SUCCESS': return successMsg
        default: return ''
      }
    },
  },
  methods: {
    ...mapActions('account', {
      sendLink: accountTypes.a_SEND_RESET_LINK,
    }),
    onSendLink() {
      this.sendLink({ email: this.email })
    }
  }
}
</script>