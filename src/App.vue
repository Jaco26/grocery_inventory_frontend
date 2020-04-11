<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col tablet-12 desktop-10">
        <TheBreadcrumbs />
        <button @click="$store.dispatch('session/LOGOUT')">logout</button>
        <router-view/>
      </div>
    </div>
  </div>
</template>


<script>
import TheBreadcrumbs from '@/components/the-breadcrumbs'
export default {
  components: {
    TheBreadcrumbs
  },
}
</script>

