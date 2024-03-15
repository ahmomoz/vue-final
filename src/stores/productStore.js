import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default defineStore('productStore', {
  state: () => ({
    products: [], // 所有產品
    product: { // 單一產品
      imagesUrl: []
    },
    isLoading: true // Loading效果
  }),
  actions: {
    getProductList (productId) { // 取得單一產品資料
      this.isLoading = true
      axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/product/${productId}`)
        .then(res => {
          this.product = res.data.product
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
    getAllProductsList () { // 取得產品資料
      this.isLoading = true
      axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/products/all`)
        .then(res => {
          this.products = res.data.products
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
  },
  components: {
    Loading
  }
})
