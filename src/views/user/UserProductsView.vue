<template>
    <div class="container">
        <div class="mt-3">
            <h2>商品列表</h2>
            <table class="table">
                <thead>
                <tr>
                    <th class="w-25">圖片</th>
                    <th>商品</th>
                    <th>價格</th>
                    <th>特價</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <loading v-model:active="isLoading"/>
                <tr v-for="product in products" :key="product.id">
                    <td><img
                    :src="product.imageUrl"
                    class="card-img-top img-fluid"
                    alt="product.title"
                    /></td>
                    <td>
                        <RouterLink :to="'/product/' + product.id" class="nav-link">{{ product.title }}</RouterLink>
                    </td>
                    <td><del>$ {{ product.origin_price }}</del></td>
                    <td>$ {{ product.price }}</td>
                    <td>
                    <button class="btn btn-outline-secondary" type="button" @click="openProductModal(product)">查看更多</button>
                    <button class="btn btn-outline-danger" @click="addToCart(product)" type="button">加到購物車</button></td>
                </tr>
                </tbody>
            </table>
            <Product-Model-Component
            :item="tempProduct"
            @add-to-cart="addToCart"></Product-Model-Component>
        </div>
    </div>
</template>

<script>
import ProductModelComponent from '@/components/UserCardProductModel.vue'
import Modal from 'bootstrap/js/dist/modal'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

let myProductModal = ''
export default {
  data () {
    return {
      products: [], // 產品列表
      tempProduct: [],
      isLoading: true // Loading效果
    }
  },
  methods: {
    getProductsList () { // 取得產品資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/products/all`)
        .then(res => {
          this.products = res.data.products
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
    openProductModal (product) { // 開啟Modal
      this.tempProduct = { ...product }
      myProductModal.show()
    },
    addToCart (product) { // 加入購物車
      const item = {
        data: {
          product_id: product.id,
          qty: 1
        }
      }
      this.isLoading = true
      this.$axios.post(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/cart`, item)
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功加入購物車',
            showConfirmButton: false,
            timer: 700
          })
          myProductModal.hide()
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProductsList()
    myProductModal = new Modal(document.getElementById('productModal'))
  },
  components: {
    ProductModelComponent,
    Loading
  }
}
</script>

<style scoped>
</style>
