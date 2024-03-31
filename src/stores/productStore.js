import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default defineStore('productStore', {
  state: () => ({
    products: [],
    product: {
      imagesUrl: [],
      origin_price: 0,
      price: 0
    },
    isLoading: true
  }),
  actions: {
    getProductList (productId) {
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
    getAllProductsList () {
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
    },
    formatPrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  components: {
    Loading
  }
})
