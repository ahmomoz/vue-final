<template>
    <div class="container">
      <h1 class="fs-3 mt-3">訂單詳細</h1>
        <div class="mx-auto">
          <!--商品清單-->
          <div class="card mt-4 shadow-sm">
            <div class="card-header">
              <h5 class="my-1">購買商品清單</h5>
            </div>
            <div class="card-body">
                <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
                <template v-for="product in order.products" :key="product.product.id">
                    {{ product.product.title }}<br>
                </template>
            </div>
          </div>
          <!--商品基本資訊區塊-->
          <div class="card mt-4 shadow-sm">
            <div class="card-header">
              <h5 class="my-1">基本資訊</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="title" class="form-label">*標題</label>
              </div>

              <div class="mb-3">
                <label for="feature" class="form-label">*特色標語</label>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="nation" class="form-label">*地區</label>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="area" class="form-label">*縣市</label>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">*分類</label>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">*單位</label>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">*原價</label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*售價</label>
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">*產品描述</label>
              </div>

              <div class="mb-3">
                <label for="content" class="form-label">*說明內容</label>
              </div>

            </div>
          </div>
        </div>
        <!--作用按鈕區塊-->
        <div class="text-end mt-3 mb-5">
          <button type="button" class="btn btn-outline-secondary mx-2" @click="goBack">
          取消
          </button>
          <button type="button" class="btn btn-primary">
          確認
          </button>
        </div>
    </div>
  </template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  props: ['id'],
  data () {
    return {
      order: {},
      isLoading: true, // Loading效果
      currentPage: '' // 當前頁數
    }
  },
  methods: {
    getOrderList (currentPage) { // 取得訂單資料
      this.isLoading = true
      const { id } = this.$route.params
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/orders?page=${currentPage}`)
        .then(res => {
          const orders = res.data.orders
          this.order = orders.find(order => order.id.toLowerCase().includes(id.toLowerCase()))
          console.log(this.order)
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
    this.currentPage = this.$route.params.currentPage // 前頁路由傳入頁數
    this.isLoading = false
    this.getOrderList()
  },
  components: {
    Loading
  }
}
</script>

  <style scoped>
  </style>
