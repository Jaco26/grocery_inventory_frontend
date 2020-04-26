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
                :disabled="!email.length || sendLinkStatus === 'WAITING'"
              >
                {{sendLinkStatus === 'WAITING' ? '...sending' : 'Send link' }}
              </j-btn>
              <j-btn
                class="text text--underlined"
                :to="{ name: 'login' }"
              >
                Back to login
              </j-btn>
            </div>
          </form>

          <div class="mt-4">
            <j-alert :class="sendLinkMessageClass" :kind="alertKind" v-model="showAlert">
              {{sendLinkMessage}}
            </j-alert>
          </div>
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
      showAlert: false,
    }
  },
  watch: {
    sendLinkStatus(val) {
      if (['ERROR', 'SUCCESS'].includes(val)) {
        this.showAlert = true
      }
    }
  },
  computed: {
    ...mapGetters('account', {
      sendLinkStatus: accountTypes.g_SEND_RESET_LINK_REQ_STATUS,
      sendLinkData: accountTypes.g_SEND_RESET_LINK_REQ_DATA
    }),
    alertKind() {
      switch (this.sendLinkStatus) {
        case 'ERROR': return 'danger'
        case 'SUCCESS': return 'success'
        default: return ''
      }
    },
    sendLinkMessageClass() {
      switch (this.sendLinkStatus) {
        case 'ERROR': return 'text-danger'
        case 'SUCCESS': return 'text-success'
        default: return ''
      }
    },
    sendLinkMessage() {
      if (this.sendLinkData && this.sendLinkData.pub_msg) {
        return this.sendLinkData.pub_msg
      }
      switch (this.sendLinkStatus) {
        case 'ERROR': return 'Uh oh! There was an error.'
        case 'SUCCESS': return 'Success!'
        default: return ''
      }
    },
  },
  methods: {
    ...mapActions('account', {
      sendLink: accountTypes.a_SEND_RESET_LINK,
    }),
    onSendLink() {
      this.sendLink(this.email)
    }
  }
}
</script>