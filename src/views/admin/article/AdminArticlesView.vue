<template>
  <div class="card mt-lg-3 shadow-sm">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <form class="row g-2 align-items-center">
          <div class="col-auto">
            <input
            class="form-control"
            type="search"
            placeholder="搜尋文章名稱"
            aria-label="Search"
            v-model="searchInput">
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-primary" type="button"
            @click="articleSearch">搜尋</button>
          </div>
        </form>
      </div>
    </nav>
  </div>
  <div class="card my-1 my-lg-4 shadow-sm">
    <div class="card-header">
      <div class="text-end py-2">
          <router-link class="btn btn-primary text-light"
            :to="'article/add'">
            <span class="bi bi-plus"></span>
            建立新的文章
          </router-link>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead class="bg-light">
          <tr class="align-middle">
            <th>標籤</th>
            <th>標題</th>
            <th>作者</th>
            <th>狀態</th>
            <th>建立時間</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody >
        <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
        <tr v-for="article in articles" :key="article.id">
          <td> {{ article.tag }} </td>
          <td> {{ article.title }} </td>
          <td> {{ article.author }} </td>
          <td>
          <span class="text-primary" v-if="article.isPublic">公開</span>
          <span v-else>未公開</span>
          </td>
          <td> {{ formatDateString(article.create_at) }} </td>
          <td>
          <div class="btn-group">
            <router-link class="btn btn-outline-primary btn-sm"
            :to="'article/edit/'+ article.id">詳細</router-link>
            <button type="button" class="btn btn-outline-danger btn-sm"
            @click="deleteArticle(article.title,article.id)">
              刪除
            </button>
          </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer d-flex justify-content-center">
      <CardPagination
        :pagination="pagination"
        @emit-getlist="getArticlesList" />
    </div>
  </div>
</template>

<script>
import CardPagination from '@/components/CardPagination.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import moment from 'moment'
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      allArticles: [],
      articles: [],
      searchInput: '',
      pagination: {},
      isLoading: true
    }
  },
  methods: {
    getArticlesList (page = 1) {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/articles?page=${page}`)
        .then(res => {
          const { articles, pagination } = res.data
          this.allArticles = articles
          this.articles = articles
          this.pagination = pagination
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteArticle (title, id) {
      this.$Swal.fire({
        title: '即將刪除文章',
        text: `確定要刪除「${title}」嗎？`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#eb5a68',
        cancelButtonColor: '#8bafd7',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/article/${id}`)
            .then(res => {
              this.$Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '已刪除',
                showConfirmButton: false,
                timer: 700
              })
              this.getArticlesList()
            })
            .catch(err => {
              this.$Swal.fire({
                icon: 'error',
                title: err.response.data.message
              })
            })
        }
      })
    },
    articleSearch () {
      this.articles = this.articleFilteredResults
    },
    formatDateString (date) {
      return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    articleFilteredResults () {
      const newArticles = this.allArticles.filter(article => {
        return article.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      return newArticles
    }
  },
  mounted () {
    this.getArticlesList()
  },
  components: {
    CardPagination,
    Loading
  }
}
</script>

<style scoped>
</style>
