<template>
    <div class="row justify-center">
    <div class="col mobile-10 tablet-6 desktop-4" style="max-width: 400px; min-width: 300px">
      <j-card outlined>
        <j-card-text>
          <h2>Login</h2>
          <username-and-pw-form v-bind.sync="credentials" @submit.prevent="onLogin">
            <template v-slot:actions>
              <div class="d-flex flex-column justify-center">
                <j-btn style="align-self: stretch" class="mb-2 outlined" type="submit">Login</j-btn>
                <router-link :to="{ name: 'create-account' }">Create an account</router-link>
              </div>
            </template>
          </username-and-pw-form>
        </j-card-text>
      </j-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as sessionTypes from '@/store/modules/session/types'
// Components
import UsernameAndPwForm from '@/components/account/username-and-pw-form'
export default {
  components: {
    UsernameAndPwForm,
  },
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      }
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
          this.$router.push({ name: 'home'})
        }
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>