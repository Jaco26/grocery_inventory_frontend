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

    <template v-if="numPages > 1">
      <div class="d-flex align-center justify-between">
        <div>
          <j-btn
            :disabled="prevBtnDisabled"
            :title="prevBtnDisabled ? '' : 'Prev page'"
            @click="prevPage"
            class="square text outlined-hover pagination-btn"
          >
            <span class="arrow left"></span>
          </j-btn>
          <j-btn
            v-for="n in numPages"
            :key="n"
            class="square text outlined-hover pagination-btn"
            :class="{ 'active' : n === currentPage }"
            :title="`Page ${n}`"
            @click="currentPage = n"
          >
            {{n}}
          </j-btn>
          <j-btn
            @click="nextPage"
            :disabled="nextBtnDisabled"
            :title="nextBtnDisabled ? '' : 'Next page'"
            class="square text outlined-hover pagination-btn"
          >
            <span class="arrow right"></span>
          </j-btn>
        </div>
        <small>{{paginationMessage}}</small>
      </div>
      
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
      itemsPerPage: 5,
      currentPage: 1
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
    currentPageStart() {
      return this.itemsPerPage * (this.currentPage - 1)
    },
    currentPageEnd() {
      return this.currentPageStart + this.itemsPerPage
    },
    currentPageItems() {
      return this.searchedListItems.slice(this.currentPageStart, this.currentPageEnd)
    },
    numPages() {
      return Math.ceil(this.searchedListItems.length / this.itemsPerPage)
    },
    paginationMessage() {
      return `${this.currentPageStart + 1}-${this.currentPageStart + this.currentPageItems.length} of ${this.searchedListItems.length} items`
    },
    nextBtnDisabled() {
      return this.currentPage + 1 > this.numPages
    },
    prevBtnDisabled() {
      return this.currentPage - 1 < 1
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage - 1 >= 1) {
        this.currentPage -= 1
      }
    },
    nextPage() {
      if (this.currentPage + 1 <= this.numPages) {
        this.currentPage += 1
      }
    },
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

.pagination-btn {
  margin: 2px;
}

.pagination-btn:hover {
  background-color: #eee;
}
.pagination-btn.active {
  font-weight: 700;
  border: 1px solid #888;
}

.arrow {
  border-style: solid;
  border-color: black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  position: relative;
  top: -1px;

  &.right {
    transform: rotate(-45deg);
    left: -2px;
  }
  &.left {
    transform: rotate(135deg);
    left: 2px;
  }
}
</style>