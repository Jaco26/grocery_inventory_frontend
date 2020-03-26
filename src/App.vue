<template>
  <div class="container">
    <TheBreadcrumbs />
    <router-view/>
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

