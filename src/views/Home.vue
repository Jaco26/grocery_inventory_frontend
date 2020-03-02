<template>
  <div class="home">
    <Fetcher
      uri="/account/login"
      method="post"
      :payload="{
        username: 'jacobBBB',
        password: '1234',
      }"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Fetcher from '../components/fetcher'

export default {
  name: 'Home',
  components: {
    Fetcher
  }
}
</script>
