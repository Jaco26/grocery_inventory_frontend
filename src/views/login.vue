<template>
  <div class="row">
    <div class="col">
      <UsernameAndPWForm v-bind.sync="credentials" @submit.prevent="onLogin" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as sessionTypes from '@/store/modules/session/types'
// Components
import UsernameAndPWForm from '@/components/account/username-and-pw-form'
export default {
  components: {
    UsernameAndPWForm,
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
    async nLogin() {
      if ()
    }
  }
}
</script>