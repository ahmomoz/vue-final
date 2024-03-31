<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <main class="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
    <div class="text-center mt-5">
      <img class="img-fluid" src="@/assets/images/cart-step/step2.png" alt="step-img">
    </div>
    <div class="row flex-row-reverse justify-content-center pb-5"
      v-if="cartList.length>0" data-aos="fade-up">
      <div class="col-md-4">
        <div class="border bg-white p-4 mb-4">
          <div class="d-flex mt-2" v-for="product in cartList" :key="product.id">
            <img :src="product.product.imagesUrl[0]" alt="product-img"
              class="me-2" style="width: 48px; height: 48px; object-fit: cover">
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 fw-bold">{{ product.product.title }}</p>
                <p class="mb-0">NT${{ product.product.price }}</p>
              </div>
              <p class="mb-0 fw-bold">x{{ product.qty }}</p>
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                <td class="text-end border-0 px-0 pt-4">NT${{ (total).toFixed(0) }}</td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">折扣金額</th>
                <td class="text-end border-0 px-0 pt-0 pb-4">
                  -NT${{ (final_total - total).toFixed(0) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 fw-bold">總計金額</p>
            <p class="mb-0 h4 fw-bold">NT${{ (final_total).toFixed(0) }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h2 class="mb-3">填寫訂購人資料</h2>
        <VeeForm ref="form" v-slot="{ errors }" @submit="''">
          <div class="mb-3">
            <label for="email" class="form-label">*Email</label>
            <VeeField id="email" name="email" type="email" class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
            <error-message name="email" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">*收件人姓名</label>
            <VeeField id="name" name="姓名" type="text" class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="form.user.name" />
            <error-message name="姓名" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">*收件人電話</label>
            <VeeField id="tel" name="電話" type="text" class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel" />
            <error-message name="電話" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">*收件人地址</label>
            <VeeField id="address" name="地址" type="text" class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="form.user.address" />
            <error-message name="地址" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="" id="message" class="form-control" cols="30" rows="10"
              v-model="form.message">
            </textarea>
        </div>
          <div class="d-flex flex-column-reverse flex-md-row mt-4
            justify-content-between align-items-md-center align-items-end w-100">
            <RouterLink to="/cart" class="text-dark mt-md-0 mt-3">
              <i class="bi bi-chevron-left"></i>
              返回上一步
            </RouterLink>
            <button type="submit" class="btn btn-primary py-3 px-5 rounded-0"
              @click="addOrder(form)" :disabled="isFormIncomplete">
              送出訂單
            </button>
          </div>
        </VeeForm>
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
      form: { // 送出訂單資訊用表格資料
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
          date: ''
        },
        message: ''
      },
      createOrder: {}
    }
  },
  computed: {
    ...mapState(cartStore, ['isLoading']),
    ...mapState(cartStore, ['cart']),
    ...mapState(cartStore, ['total']),
    ...mapState(cartStore, ['cartList']),
    ...mapState(cartStore, ['final_total']),
    isFormIncomplete () {
      return !this.form.user.email || !this.form.user.name || !this.form.user.tel || !this.form.user.address
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCartList']),
    ...mapActions(cartStore, ['addOrder'])
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
