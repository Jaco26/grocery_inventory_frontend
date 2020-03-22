<template>
  <div>
    <JInput :label="searchLabel" v-model.trim="search" />
    <ul class="j-list">
      <li class="j-list__item" v-for="(item, i) in sortedListItems" :key="i" :title="``">
        <slot name="item" v-bind="{ i, item }" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sort: {
      type: Boolean,
      default: true,
    },
    ascending: Boolean,
    items: {
      type: Array,
      default: () => [],
    },
    searchLabel: String,
    searchKeys: { // array of keys to use in search of items
      type: Array,
      default: () => ['text']
    },
    indexKey: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    searchedListItems() {
      if (this.search) {
        const regex = new RegExp(`${this.search}`, 'i')
        return this.items.filter(x => this.searchKeys.some(key => regex.test(x[key])))
      }
      return this.items
    },
    sortedListItems() {
      if (!this.sort) return this.searchedListItems
      const letterIndexed = this.indexAlphabetically(this.searchedListItems)
      const sortedKeys = Object.keys(letterIndexed)
        .sort((a, b) => (
          this.ascending
            ? a > b ? -1 : 1
            : a > b ? 1 : -1
        ))
      return sortedKeys.reduce((acc, key) => ([ ...acc, ...letterIndexed[key]]), [])
    }
  },
  methods: {
    indexAlphabetically(items) {
      return items.reduce((acc, x) => {
        const firstLetter = x[this.indexKey][0].toLowerCase()
        if (!acc[firstLetter]) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(x)
        return acc
      }, {})
    }
  }
}
</script>

<style>
.j-list {
  list-style: none;
  padding: 0;
}
.j-list .j-list__item {
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 2px;
}
.j-list .j-list__item:nth-of-type(odd) {
  background: #eee;
  background: #def;
}
.j-list .j-list__item:nth-of-type(even) {
  background: #fdfdfd;
}
</style>