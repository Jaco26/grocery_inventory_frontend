<template>
  <div class="d-flex align-center justify-between">
    <div>
      <j-btn
        class="square text outlined-hover pagination-btn"
        :disabled="prevBtnDisabled"
        :title="prevBtnDisabled ? '' : 'Previous page'"
        @click="goPrevPage"
      >
        <span class="arrow left"></span>
      </j-btn>
      <j-btn
        v-for="n in totalPages"
        :key="n"
        class="square text outlined-hover pagination-btn"
        :class="{ 'active' : n === currentPage }"
        :title="`Page ${n}`"
        @click="update('currentPage', n)"
      >
        {{n}}
      </j-btn>
      <j-btn
        class="square text outlined-hover pagination-btn"
        :disabled="nextBtnDisabled"
        :title="nextBtnDisabled ? '' : 'Next page'"
        @click="goNextPage"
      >
        <span class="arrow right"></span>
      </j-btn>
    </div>

    <small>{{message}}</small>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    itemsPerPage: Number,
    currentPage: Number,
    currentPageItems: Array,
  },
  methods: {
    update(key, value) {
      this.$emit(`update:${key}`, value)
    },
    goPrevPage() {
      if (this.currentPage - 1 >= 1) {
        this.update('currentPage', this.currentPage - 1)
      }
    },
    goNextPage() {
      if (this.currentPage + 1 <= this.totalPages) {
        this.update('currentPage', this.currentPage + 1)
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    prevBtnDisabled() {
      return this.currentPage - 1 < 1
    },
    nextBtnDisabled() {
      return this.currentPage + 1 > this.totalPages
    },
    currentPageStart() {
      return this.itemsPerPage * (this.currentPage - 1)
    },
    currentPageEnd() {
      return this.currentPageStart + this.itemsPerPage
    },
    message() {
      return this.items.length
        ? `${this.currentPageStart + 1}-${this.currentPageStart + this.currentPageItems.length} of ${this.items.length} items`
        : 'no items'
    }
  },
  watch: {
    items(items) {
      const minNumberOfItemsForCurrentPageToBeRequired = this.itemsPerPage * (this.currentPage - 1) + 1
      if (minNumberOfItemsForCurrentPageToBeRequired > items.length) {
        this.update('currentPage',  Math.floor(minNumberOfItemsForCurrentPageToBeRequired / this.itemsPerPage) || 1)
      }
      this.update('currentPageItems', items.slice(this.currentPageStart, this.currentPageEnd))
    },
    currentPageStart: {
      handler(startIndex) {
        this.update('currentPageItems', this.items.slice(startIndex, this.currentPageEnd))
      }
    },
  }
}
</script>

<style lang="scss">
.pagination-btn {
  margin: 2px;

  &:hover {
    background-color: #eee;
  }

  &.active {
    font-weight: 700;
    border: 1px solid #888;
  }
}
</style>