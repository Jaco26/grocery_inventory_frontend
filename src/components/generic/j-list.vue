<template>
  <div>
    <div class="d-flex align-end">
      <JInput :label="searchLabel" v-model.trim="search" />
    </div>

    <ul class="j-list">
      <li class="j-list__item" v-for="(item, i) in currentPageItems" :key="i" :title="``">
        <slot name="item" v-bind="{ i, item }" />
      </li>
    </ul>

    <JPagination
      :items="searchedListItems"
      :itemsPerPage="itemsPerPage"
      :currentPage.sync="currentPage"
      :currentPageItems.sync="currentPageItems"
    />
    
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
      itemsPerPage: 5,
      currentPage: 1,
      currentPageItems: [],
    }
  },
  watch: {
    searchedListItems(items) {
      const minNumberOfItemsForCurrentPageToBeRequired = this.itemsPerPage * (this.currentPage - 1) + 1
      if (minNumberOfItemsForCurrentPageToBeRequired > items.length) {
        this.currentPage = Math.floor(minNumberOfItemsForCurrentPageToBeRequired / this.itemsPerPage) || 1
      }
    }
  },
  computed: {
    sortedListItems() {
      if (!this.sort) return this.items
      const letterIndexed = this.indexAlphabetically(this.items)
      const sortedKeys = Object.keys(letterIndexed)
        .sort((a, b) => (
          this.ascending
            ? a > b ? -1 : 1
            : a > b ? 1 : -1
        ))
      return sortedKeys.reduce((acc, key) => ([ ...acc, ...letterIndexed[key]]), [])
    },
    searchedListItems() {
      if (this.search) {
        const regex = new RegExp(`${this.search}`, 'i')
        return this.sortedListItems.filter(x => this.searchKeys.some(key => regex.test(x[key])))
      }
      return this.sortedListItems
    },
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

<style lang="scss">
.j-list {
  list-style: none;
  padding: 0;
}
.j-list .j-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
}
.j-list .j-list__item:nth-of-type(odd) {
  background: #eee;
  background: #def;
}
.j-list .j-list__item:nth-of-type(even) {
  background: #fafafa;
}
</style>