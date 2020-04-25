<template>
  <div class="row justify-center">
    <div class="col mobile-10 tablet-6 desktop-4" style="max-width: 400px; min-width: 300px;">
      <j-card outlined>
        <j-card-text>
          <h3>Register</h3>
          <span class="divider invisible"></span>
          <username-and-pw-form v-bind.sync="credentials" @submit.prevent="onCreateAccount">
            <template v-slot:actions>
              <div class="d-flex flex-column align-center">
                <j-btn style="align-self: stretch;" class="mb-4 outlined" type="submit">Create account</j-btn>
                <j-btn class="text text--underlined" :to="{ name: 'login' }">back to login</j-btn>
              </div>
            </template>
          </username-and-pw-form>

          <div class="mt-4">
            <j-alert v-model="isCreateAccountComplete">
              <span v-if="createAccountStatus === 'ERROR'">
                {{createAccountErrorMessage}}
              </span>
              <span v-else class="text-success">
                You have successfully created your account.
              </span>
            </j-alert>
          </div>

        </j-card-text>
      </j-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as sessionTypes from '@/store/modules/session/types'
// components
import UsernameAndPwForm from '@/components/account/username-and-pw-form'
export default {
  components: {
    UsernameAndPwForm,
  },
  data() {
    return {
      isCreateAccountComplete: false,
      credentials: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters('session', {
      createAccountStatus: sessionTypes.g_REGISTER_REQ_STATUS,
      createAccountData: sessionTypes.g_REGISTER_REQ_DATA,
    }),
    createAccountErrorMessage() {
      if (this.createAccountStatus === 'ERROR' && this.createAccountData) {
        return this.createAccountData.message
      }
    }
  },
  methods: {
    ...mapActions('session', {
      createAccount: sessionTypes.a_REGISTER,
    }),
    async onCreateAccount() {
      if (this.credentials.email && this.credentials.password) {
        await this.createAccount(this.credentials)
        this.isCreateAccountComplete = true
      }
    }
  }
}
</script>