import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    cart: [],
    final_total: 0,
    total: 0,
    cartList: {},
    cartListTotalQty: '',
    isLoading: true // Loading效果
  }),
  actions: {
    getCartList () { // 取得購物車產品資料
      this.isLoading = true
      axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/cart`)
        .then(res => {
          this.cart = res.data.data.cart
          this.final_total = res.data.data.final_total
          this.total = res.data.data.total
          this.cartList = res.data.data.carts
          this.cartListTotalQty = res.data.data.carts.reduce((total, cart) => total + cart.qty, 0)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    addToCart (product, productQty) { // 加入購物車
      this.isLoading = true
      const item = {
        data: {
          product_id: product.id,
          qty: productQty
        }
      }
      axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/cart`, item)
        .then(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功加入購物車',
            showConfirmButton: false,
            timer: 700
          })
          this.getCartList()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    useCoupon (coupon) {
      this.isLoading = true
      const item = {
        data: {
          code: coupon
        }
      }
      axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/coupon`, item)
        .then(res => {
          this.getCartList()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    updateQty (product, event) { // 更新商品數量
      this.isLoading = true
      const newQty = parseInt(event.target.value, 10)
      const item = {
        data: {
          product_id: product.id,
          qty: newQty
        }
      }
      axios.put(`${VITE_API_URL}/api/${VITE_APIPATH}/cart/${product.id}`, item)
        .then(res => {
          this.getCartList()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteProduct (product) { // 刪除某項產品
      this.isLoading = true
      axios.delete(`${VITE_API_URL}/api/${VITE_APIPATH}/cart/${product.id}`)
        .then(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '已刪除',
            showConfirmButton: false,
            timer: 700
          })
          this.getCartList()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteCart () { // 清空購物車
      Swal.fire({
        title: '確定要清空購物車嗎？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true
          axios.delete(`${VITE_API_URL}/api/${VITE_APIPATH}/carts`)
            .then(res => {
              Swal.fire({
                title: '已清空購物車',
                icon: 'success'
              })
              this.getCartList()
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: err.response.data.message
              })
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      })
    }
  },
  components: {
    Loading
  }
})
