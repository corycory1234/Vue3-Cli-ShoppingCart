<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"
        :class="{disabled : currentPage <=1}">
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="goPrevious(currentPage)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item"
        v-for="(page) in pages.total_pages"
        :key="page"
        :class="{active : page === pages.current_page}">
          <a class="page-link" href="#"
          @click.prevent="updatePage(page)">
            {{ page }}
          </a>
        </li>

        <li class="page-item"
        :class="{disabled : currentPage === pgLength }">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="goNext(currentPage)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>

<script>
export default {
  // 'pages'用來v-for跑渲染
  props: ['pages', 'currentPage', 'pgLength'],
  methods: {
    updatePage (page) {
      // 因為API撈的資料, 是寫在父組件, 因此要emit出去
      this.$emit('emit-pages', page)
    },

    goNext (currentPage) {
      currentPage += 1
      console.log(currentPage)
      this.$emit('go-next', currentPage)
    },

    goPrevious (currentPage) {
      currentPage -= 1
      console.log(currentPage)
      this.$emit('go-previous', currentPage)
    }
  }
}
</script>
