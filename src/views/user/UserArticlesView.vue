<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <main class="bg-white py-8 px-5 px-xl-10">
    <nav class="mb-xl-5" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink class="text-decoration-none" to="/" exact>首頁</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          最新消息
        </li>
      </ol>
    </nav>
    <section data-aos="fade-up">
      <p class="fs-xl-3 text-gray my-0 ms-5">Articles</p>
      <h2 class="lh-base fs-xl-1 text-gray">
        <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
        最新消息
      </h2>
      <ul class="list-group list-group-flush my-lg-4">
        <template v-for="article in articles" :key="article.id" >
          <RouterLink class="text-decoration-none" :to=" `/article/${article.id}`" exact>
            <li class="list-group-item py-2 border-0 border-bottom article-hover">
              <span class="lh-lg fs-5 text-gray pe-3">
                {{ formatDateString(article.create_at) }}
              </span>
              <span class="bg-gray lh-lg fs-5 text-light opacity-50 px-2">
                {{ article.tag }}
              </span>
              <p class="lh-lg fs-4 text-gray">
                {{ article.title }}
              </p>
            </li>
          </RouterLink>
        </template>
      </ul>
      <div class="d-flex justify-content-center mt-4 mt-xl-6">
        <CardPagination :pagination="pagination" @emit-getlist="getArticlesList" />
      </div>
    </section>
  </main>
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
      articles: [],
      pagination: {},
      isLoading: true
    }
  },
  methods: {
    getArticlesList (page = 1) {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/articles?page=${page}`)
        .then(res => {
          const { articles, pagination } = res.data
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
    formatDateString (date) {
      return moment.unix(date).format('YYYY-MM-DD')
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
