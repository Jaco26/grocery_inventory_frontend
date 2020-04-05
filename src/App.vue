<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col tablet-12 desktop-10">
        <TheBreadcrumbs class="" />
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
  }
}
</script>

