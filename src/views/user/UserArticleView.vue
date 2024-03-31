<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <main class="bg-white py-8 px-3 px-xl-10">
    <nav class="mb-xl-5" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink class="text-decoration-none" to="/" exact>首頁</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <RouterLink class="text-decoration-none" to="/articles" exact>所有消息</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <section>
      <h2 class="lh-base fs-xl-1 text-gray">
        <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
        {{ article.title }}
        <span class="bg-gray lh-lg fs-5 text-light opacity-50 px-2">
          {{ article.tag }}
        </span>
      </h2>
      <div class="my-5 my-lg-0">
        <span class="lh-lg fs-5 text-gray opacity-75 pe-3">
          {{ formatDateString(article.create_at) }}
        </span>
        <div class="fs-4 mt-5" v-html="article.content"></div>
      </div>
      <div class="d-flex align-items-center justify-content-end">
        <RouterLink class="text-decoration-none" to="/articles">
          <p class="text-dark my-3 link-hover">
            回上頁
            <i class="bi bi-arrow-left-short"></i>
          </p>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import moment from 'moment'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      article: [],
      pagination: {},
      isLoading: true
    }
  },
  methods: {
    getArticleList () {
      const { id } = this.$route.params
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/article/${id}`)
        .then(res => {
          this.article = res.data.article
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
    this.getArticleList()
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
</style>
