<template>
  <div class="container">
    <h1 class="fs-3 mt-3">編輯文章</h1>
    <div class="mx-auto">
      <loading
        v-if="isLoading"
        :active="isLoading"
        :can-cancel="false"/>
      <div class="card mt-4 shadow-sm">
        <div class="card-header">
          <h5 class="my-1">基本資訊</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="title" class="form-label">*文章名稱</label>
            <input id="title" type="text" class="form-control"
              placeholder="請輸入文章名稱"
              v-model="article.title">
          </div>

          <div class="row">
            <div class="mb-3 col-md-4">
              <label for="tag" class="form-label">*標籤</label>
              <input id="tag" type="text" class="form-control"
                placeholder="請輸入標籤"
                v-model="article.tag">
            </div>
            <div class="mb-3 col-md-4">
              <label for="author" class="form-label">*作者</label>
              <input id="author" type="text" class="form-control"
                placeholder="請輸入文章作者"
                v-model="article.author">
            </div>
            <div class="mb-3 col-md-4">
              <label for="create_at" class="form-label">*建立時間</label>
              <VueDatePicker v-model="currentDate"></VueDatePicker>
            </div>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label">*文章內容</label>
            <ckeditor
              :editor="editor"
              v-model="article.content"
              :config="editorConfig" />
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input id="isPublic" class="form-check-input" type="checkbox"
                :true-value="true" :false-value="false"
                v-model="article.isPublic">
              <label class="form-check-label" for="isPublic">是否公開</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-end mt-3 mb-5">
      <button type="button" class="btn btn-outline-secondary mx-2" @click="goBack">
      取消
      </button>
      <button type="button" class="btn btn-primary text-light" @click="updateArticle">
      更新
      </button>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      drag: false,
      article: {},
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        dataProcessor: {
          writer: {
            enter: '<br>'
          }
        }
      },
      isLoading: false,
      currentDate: new Date()
    }
  },
  methods: {
    getArticlesList () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/article/${id}`)
        .then(res => {
          this.article = res.data.article
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    updateArticle () {
      this.article.create_at = Math.floor(this.currentDate.getTime() / 1000)
      const { id } = this.$route.params
      const item = this.article
      this.isLoading = true
      this.$axios.put(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/article/${id}`, { data: item })
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '更新成功',
            showConfirmButton: false,
            timer: 700
          })
          this.$router.push('/dashboard/articles')
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
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getArticlesList()
  },
  components: {
    Loading,
    VueDatePicker
  }
}
</script>

<style scoped>
</style>
