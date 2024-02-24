<template>
  <div class="container">
    <div class="d-flex justify-content-between my-3">
      <h1 class="fs-3">訂單詳情</h1>
      <button type="button" class="btn btn-primary text-light"
        @click="togglePaymentStatus" v-if="order.is_paid">
        切換成未付款
      </button>
      <button type="button" class="btn btn-primary text-light"
        @click="togglePaymentStatus" v-else>
        切換成已付款
      </button>
    </div>
        <!--訂單摘要-->
        <dl class="row rounded border-2 border-dashed-blue p-2">
            <dt class="col-sm-3 text-truncate text-primary">訂單編號</dt>
            <dd class="col-sm-9 text-primary">{{ order.create_at }}</dd>
            <dt class="col-sm-3 text-truncate text-primary">訂單金額</dt>
            <dd class="col-sm-9 text-primary">NT ${{ order.total }}</dd>
            <dt class="col-sm-3 text-truncate text-primary">訂單狀態</dt>
            <dd class="col-sm-9 text-primary" v-if="order.is_paid">訂單已付款完成</dd>
            <dd class="col-sm-9 text-primary" v-else>訂單尚未付款</dd>
            <dt class="col-sm-3 text-truncate text-primary">發票狀態</dt>
            <dd class="col-sm-9 text-primary">未開立</dd>
        </dl>
        <!--訂購商品清單-->
        <div class="row card mt-4 shadow-sm">
            <div class="card-header">
                <h5 class="my-1">購買商品</h5>
            </div>
            <div class="card-body">
                <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
                <template v-for="product in order.products" :key="product.product.id">
                    <div class="d-flex align-items-center m-2">
                        <img :src="product.product.imagesUrl[0]" alt="商品圖片" style="width: 100px;">
                        <p class="mx-2 my-auto">
                          {{ product.product.title }} x {{ product.qty }}
                        </p>
                        <p class="text-end mx-2 my-auto">
                          NT$ {{ product.product.price }}
                        </p>
                    </div>
                </template>
            </div>
            <div class="card-footer">
                <p class="text-end fs-5 m-0">總金額 NT$ {{ order.total }}  </p>
            </div>
        </div>
        <!--訂購人資訊區塊-->
        <div class="row card mt-4 shadow-sm">
          <div class="card-header">
                <h5 class="my-1">收件人資訊</h5>
            </div>
          <div class="card-body">
            <div class="mb-3">
                    <label for="name" class="form-label fw-bold">姓名</label>
                    <p class="fs-5">{{ order.user.name }}</p>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label fw-bold">電話</label>
                    <p class="fs-5">{{ order.user.tel }}</p>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label fw-bold">地址</label>
                    <p class="fs-5">{{ order.user.address }}</p>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label fw-bold">E-mail</label>
                    <p class="fs-5">{{ order.user.email }}</p>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label fw-bold">備註</label>
                    <p class="fs-5" v-if="order.user.message">{{ order.user.message }}</p>
                    <p class="fs-5" v-else>無填寫備註</p>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label fw-bold">訂單成立時間</label>
                    <p class="fs-5">{{ formatDateString(order.user.date) }}</p>
                </div>
          </div>
        </div>
        <!--作用按鈕區塊-->
        <div class="text-end mt-3 mb-5">
          <button type="button" class="btn btn-outline-secondary mx-2"
            @click="goBack">
            返回前頁
          </button>
          <button type="button" class="btn btn-danger text-light"
            @click="deleteOrder">
            刪除訂單
          </button>
        </div>
      </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import moment from 'moment' // 日期轉換套件
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

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
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/orders?page=${currentPage}`)
        .then(res => {
          const orders = res.data.orders
          this.order = orders.find(order => order.id.toLowerCase().includes(id.toLowerCase()))
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
      this.$router.push('/dashboard/orders')
    },
    togglePaymentStatus () { // 切換付款狀態
      this.isLoading = true
      this.order.is_paid = !this.order.is_paid
      const { id } = this.$route.params
      this.$axios.put(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/order/${id}`, { data: this.order })
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '更新成功',
            showConfirmButton: false,
            timer: 700
          })
          this.getOrderList(this.currentPage)
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
    deleteOrder () { // 刪除訂單
      this.$Swal.fire({
        title: '即將刪除商品',
        text: `確定要刪除「${this.order.create_at}」嗎？`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#eb5a68',
        cancelButtonColor: '#8bafd7',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/order/${this.order.id}`)
            .then(res => {
              this.$Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '已刪除',
                showConfirmButton: false,
                timer: 700
              })
              this.$router.push('/dashboard/orders') // 返回前頁
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
    formatDateString (date) { // 時間格式
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.isLoading = false
    this.currentPage = this.$route.query.currentPage
    this.getOrderList(this.currentPage) // 前頁路由傳入頁數
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
</style>
