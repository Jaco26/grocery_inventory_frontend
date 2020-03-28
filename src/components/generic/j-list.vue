<template>
  <div>
    <div class="d-flex align-end">
      <JInput :label="searchLabel" v-model.trim="search" />
      <button class="btn icon" style="font-size: 2rem;">&#9881;</button>
    </div>

    <ul class="j-list">
      <li class="j-list__item" v-for="(item, i) in currentPageItems" :key="i" :title="``">
        <slot name="item" v-bind="{ i, item }" />
      </li>
    </ul>

    <template v-if="numPages > 1">
      <button
        v-for="n in numPages"
        :key="n" class="pagination-btn"
        :class="{ 'active' : currentPage === n }"
        :title="`Page ${n}`"
        @click="currentPage = n"
      >
        {{n}}
      </button>
    </template>
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
      itemsPerPage: 10,
      currentPage: 1
    }
  },
  watch: {
    searchedListItems(val) {
      if (val.length < this.itemsPerPage * this.currentPage) {
        this.currentPage = 1
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
    currentPageItems() {
      const start = this.itemsPerPage * (this.currentPage - 1)
      const end = start + this.itemsPerPage
      return this.searchedListItems.slice(start, end)
    },
    numPages() {
      return Math.floor(this.searchedListItems.length / this.itemsPerPage) + 1
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

<style>
.j-list {
  list-style: none;
  padding: 0;
}
.j-list .j-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 4px; */
  border-radius: 2px;
}
.j-list .j-list__item:nth-of-type(odd) {
  background: #eee;
  background: #def;
}
.j-list .j-list__item:nth-of-type(even) {
  background: #fdfdfd;
}

.pagination-btn {
  width: 30px;
  height: 30px;
  font: inherit;
  text-align: center;
  border: none;
  border-radius: 2px;
  margin: .25rem;
  cursor: pointer;
  background-color: transparent;
}
.pagination-btn:hover {
  background-color: #eee;
}
.pagination-btn.active {
  font-weight: 700;
  border-bottom: 2px solid blue;
  border-right: 1px solid purple;
}
</style>