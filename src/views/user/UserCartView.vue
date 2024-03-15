<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <main class="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
    <div class="row mt-5">
      <div class="text-center">
        <img class="img-fluid" src="@/assets/images/cart-step/step1.png" alt="step-img">
      </div>
      <div class="card" v-if="cartList.length>0">
        <!--購物車-->
        <div class="card-header bg-white d-flex justify-content-between py-4 py-xl-5">
          <h2 class="my-auto">
            <i class="bi bi-cart4 me-2"></i>
            商品購物車
          </h2>
          <button class="btn btn-outline-danger fs-5" type="button" @click="deleteCart">
            清空購物車
          </button>
        </div>
        <div class="card-body p-0 my-5" v-if="cartList.length>0">
          <table class="table fs-6">
            <thead>
              <tr>
                <th>商品資訊</th>
                <th>單價</th>
                <th>數量</th>
                <th class="text-end">小計</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in cartList" :key="product.id">
                <td class="d-md-flex">
                  <img :src="product.product.imagesUrl[0]" alt="product-img" style="width: 80px;">
                  <p class="ms-md-2">{{ product.product.title }}</p>
                </td>
                <td>${{ product.product.price }}</td>
                <td style="width: 200px;">
                  <div class="input-group input-group-sm">
                    <input :min="1" type="number" class="form-control"
                      :value="product.qty"
                      @blur="updateQty(product, $event)">
                    <span class="input-group-text" id="basic-addon2">
                      {{ product.product.unit }}
                    </span>
                  </div>
                </td>
                <td class="text-end">${{ (product.final_total).toFixed(0) }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger text-end" type="button"
                    @click="deleteProduct(product)">
                  <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="input-group ms-auto" style="width: 200px;">
            <input type="text"
              class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
              placeholder="輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2"
              v-model="coupon">
            <div class="input-group-append">
              <button class="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                type="button" id="button-addon2" @click="useCoupon(coupon)">
                <i class="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end bg-white py-4">
          <div class="text-end">
            <p class="m-0">總計金額</p>
            <p class="fs-2 text-primary fw-bolder m-0">
              NT$ {{ (final_total).toFixed(0) }}
            </p>
          </div>
          <RouterLink to="/booking" class="btn btn-primary fs-5 text-white ms-3 p-3 shadow-sm">
            前往結帳
          </RouterLink>
        </div>
      </div>
      <div class="py-5" v-else>
        <h2 class="text-center">目前購物車無任何商品Q_Q<br>趕快來去選購吧</h2>
      </div>
      <div class="d-flex justify-content-end my-4">
        <RouterLink to="/products" class="fs-5 text-decoration-none link-hover">
          繼續購物
          <i class="bi bi-chevron-double-right"></i>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  data () {
    return {
      coupon: ''
    }
  },
  computed: {
    ...mapState(cartStore, ['isLoading']),
    ...mapState(cartStore, ['cart']),
    ...mapState(cartStore, ['total']),
    ...mapState(cartStore, ['cartList']),
    ...mapState(cartStore, ['final_total'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList']),
    ...mapActions(cartStore, ['updateQty']),
    ...mapActions(cartStore, ['deleteProduct']),
    ...mapActions(cartStore, ['deleteCart']),
    ...mapActions(cartStore, ['useCoupon'])
  },
  mounted () {
    this.getCartList()
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
</style>
