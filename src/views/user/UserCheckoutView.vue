<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <main class="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
    <div class="text-center mt-5">
      <img class="img-fluid" src="@/assets/images/cart-step/step2.png" alt="step-img">
    </div>
    <div class="row justify-content-center pb-5" data-aos="fade-up">
      <div class="col-md-4">
        <div class="card bg-white p-4 mb-4">
          <div class="d-flex mt-2" v-for="product in orderList" :key="product.id">
            <img :src="product.product.imagesUrl[0]" alt="product-img"
              class="me-2" style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 fw-bold">{{ product.product.title }}</p>
                <p class="mb-0">NT${{ formatPrice(product.product.price) }}</p>
              </div>
              <p class="mb-0 fw-bold">x{{ product.qty }}</p>
            </div>
          </div>
          <hr>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 fw-bold">總計金額</p>
            <p class="mb-0 h4 fw-bold">NT${{ formatPrice((total).toFixed(0)) }}</p>
          </div>
        </div>
        <button type="button" class="btn btn-primary py-3 px-5 w-100 rounded-0"
          @click="addPay(this.$route.params.id)">
          送出結帳
        </button>
      </div>
      <div class="col-md-8 card">
        <div class="card-header bg-white">
            <h5 class="my-1">收件人資訊</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label fw-bold">姓名</label>
            <p class="fs-5">{{ order.name }}</p>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label fw-bold">電話</label>
            <p class="fs-5">{{ order.tel }}</p>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label fw-bold">地址</label>
            <p class="fs-5">{{ order.address }}</p>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label fw-bold">E-mail</label>
            <p class="fs-5">{{ order.email }}</p>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label fw-bold">備註</label>
            <p class="fs-5" v-if="order.message">{{ order.message }}</p>
            <p class="fs-5" v-else>無填寫備註</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end my-4">
      <RouterLink to="/booking" class="fs-5 text-decoration-none link-hover">
        返回前一頁
        <i class="bi bi-chevron-double-right"></i>
      </RouterLink>
    </div>
  </main>
</template>

<script>
import { mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      order: [],
      orderList: [],
      total: 0,
      final_total: 0,
      isLoading: true
    }
  },
  computed: {
    ...mapState(cartStore, ['cart']),
    ...mapState(cartStore, ['cartList'])
  },
  methods: {
    getOrderList (orderId) {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/order/${orderId}`)
        .then(res => {
          this.total = res.data.order.total
          this.order = res.data.order.user
          this.orderList = res.data.order.products
        })
        .catch(() => {
          this.$Swal.fire({
            icon: 'error',
            title: '查不到此訂單，將跳轉回購物車'
          })
          this.$router.push('/cart')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    addPay (orderId) {
      this.isLoading = true
      this.$axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/pay/${orderId}`)
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '結帳成功',
            showConfirmButton: false,
            timer: 700
          })
          this.$router.push('/checkout-success')
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response
          })
          this.$router.push('/cart')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    formatPrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  mounted () {
    this.getOrderList(this.$route.params.id)
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
</style>
