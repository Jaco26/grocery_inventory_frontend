<template>
  <div class="row justify-center">
    <div class="col mobile-10 tablet-6 desktop-4" style="max-width: 400px; min-width: 300px">
      <j-card outlined>
        <j-card-text>
          <h3>Login</h3>
          <span class="divider invisible"></span>
          <username-and-pw-form v-bind.sync="credentials" @submit.prevent="onLogin">
            <template v-slot:actions>
              <div class="d-flex flex-column align-center">
                <j-btn style="align-self: stretch" class="mb-4 outlined" type="submit">Login</j-btn>
                <j-btn class="mb-2 text text--underlined" :to="{ name: 'create-account' }">Create an account</j-btn>
                <j-btn class="text text--caption text--underlined" :to="{ name: 'recover' }">Forgot password</j-btn>
              </div>
            </template>
          </username-and-pw-form>
          
          <div class="mt-4">
            <j-alert v-model="isLoginComplete">
              {{loginStatusMessage}}
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
// Components
import UsernameAndPwForm from '@/components/account/username-and-pw-form'
export default {
  components: {
    UsernameAndPwForm,
  },
  data() {
    return {
      isLoginComplete: false,
      credentials: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters('session', {
      sessionLoginStatus: sessionTypes.g_LOGIN_REQ_STATUS,
      sessionLoginData: sessionTypes.g_LOGIN_REQ_DATA,
    }),
    loginStatusMessage() {
      if (this.sessionLoginData) {
        return this.sessionLoginData.message
      }
      return ''
    }
  },
  methods: {
    ...mapActions('session', {
      sessionLogin: sessionTypes.a_LOGIN,
    }),
    async onLogin() {
      try {
        if (this.credentials.email && this.credentials.password) {
          await this.sessionLogin(this.credentials)
          if (this.sessionLoginStatus !== 'ERROR') {
            this.$router.push({ name: 'home'})
          }
          this.isLoginComplete = true
        }
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>