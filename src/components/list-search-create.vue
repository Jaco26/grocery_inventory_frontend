<template>
  <section class="resource">
    <h2 class="resource__title">{{resourceName}}</h2>
    <div class="resource__create-new">
      <form v-on:submit.prevent="$listeners.submit">
        <div class="row">
          <div class="col d-flex">
            <JInput
              :label="`Create New '${resourceName}' Item`"
              :value="newResourceItemName"
              @input="$emit('update:newResourceItemName', $event)"
            />
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
        
      </form>
    </div>
    <div class="resource__list">
      <div class="list-search">
        <JInput placeholder="Search" v-model="search" />
      </div>
      <div class="list-items">
        <ul>
          <li v-for="(item, i) in _items" :key="i">
            <slot name="list-item" v-bind="{ item, i }" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    resourceName: String,
    newResourceItemName: String,
    onCreateNew: Function,
    items: Array,
    searchKeys: Array, // array of keys to use in search of items
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    _items() {
      if (this.search) {
        const searchRe = new RegExp(`${this.search}`, 'i')
        return this.items.filter(x => {
          return this.searchKeys.some(key => searchRe.test(x[key]))
        })
      } else {
        return this.items
      }
    }
  }
}
</script>

<style scoped>
.resource {
  padding: 1rem;
  outline: 1px solid gray;
}
.list-items ul {
  list-style: none;
  padding: 0;
}
ul > li {
  display: flex;
  justify-content: space-between;
  padding: .125rem;
}
ul > li:nth-of-type(odd) {
  background: beige;
}
</style>