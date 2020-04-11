<template>
  <ul class="breadcrumbs">
    <template v-for="(crumb, i) in breadcrumbs">
      <li :key="crumb.to">
        <template v-if="crumb.to">
          <router-link :to="{ name: crumb.to }">{{crumb.text}}</router-link>
          <span v-if="i < breadcrumbs.length" class="seperator">-</span>
        </template>
        <template v-else>
          <span class="text-weight--bold">{{ crumb.text }}</span>
        </template>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return (this.$route.meta.breadcrumbs || []).map(x => ({
        to: x.to,
        text: typeof x.text === 'function' ? x.text(this.$store.getters) : x.text
      }))
    }
  }
}
</script>

<style>
.breadcrumbs {
  list-style: none;
  display: flex;
  padding: 0;

}
.breadcrumbs a {
  text-decoration: underline;
  color: black;

}
.breadcrumbs .seperator {
  margin: 0 .5rem;
}
</style>