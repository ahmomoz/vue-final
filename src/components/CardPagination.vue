<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination mb-0">
            <li class="page-item" :class="{'disabled':pagination.current_page === 1}">
            <a class="page-link rounded rounded-lg" href="#" aria-label="Previous"
            @click.prevent="getList(pagination.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page">
            <a class="page-link rounded rounded-lg" :class="{'active':pagination.current_page === page}" href="#"
            @click.prevent="getList(page)">
            {{ page }}
            </a>
            </li>
            <li class="page-item" :class="{'disabled':pagination.current_page === pagination.total_pages
        }">
            <a class="page-link rounded rounded-lg" href="#" aria-label="Next"
            @click.prevent="getList(pagination.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    getList (pageNum) {
      this.$emit('emit-getlist', pageNum)
    }
  }
}
</script>

<style scoped>
</style>
