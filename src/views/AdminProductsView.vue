<template>
    <div id="app">
    <div class="container">
    <div class="text-end mt-4">
        <button type="button" class="btn btn-light" @click="ascending=!ascending">{{ascending?"降冪":"升冪"}}排序</button>
    </div>
    <table class="table mt-4">
        <thead>
        <tr>
            <th width="120">
            分類
            </th>
            <th>
            產品名稱
            </th>
            <th width="120" @click="sortBy='origin_price'">
            原價
            </th>
            <th width="120" @click="sortBy='price'">
            售價
            </th>
            <th width="100">
            是否啟用
            </th>
            <th width="120">
            編輯
            </th>
        </tr>
        </thead>
        <!--not sort-->
        <tbody v-if="sortBy==='default'">
        <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
        <tr v-for="product in products" :key="product.id">
            <td> {{ product.category }}</td>
            <td> {{ product.title }}</td>
            <td> {{ product.origin_price }} </td>
            <td> {{ product.price }} </td>
            <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
            </td>
            <td>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
                </button>
            </div>
            </td>
        </tr>
        </tbody>
        <!--sort-->
        <tbody v-else>
        <tr v-for="product in sortProducts" :key="product.name">
            <td> {{ product.category }}</td>
            <td> {{ product.title }}</td>
            <td> {{ product.origin_price }} </td>
            <td> {{ product.price }} </td>
            <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
            </td>
            <td>
            </td>
        </tr>
        </tbody>
    </table>
    <card-pagination :pagination="pagination" @emit-getproductslist="getProductsList"></card-pagination>
    </div>
</div>
</template>

<script>
import CardPagination from '@/components/CardPagination.vue' // 分頁元件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  data () {
    return {
      sortBy: 'default',
      ascending: true,
      products: [],
      productsDetail: {},
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      isLoading: true // Loading效果
    }
  },
  methods: {
    getProductsList (page = 1) { // 取得產品資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/products?page=${page}`)
        .then(res => {
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  computed: {
    sortProducts () {
      const newProducts = [...this.products].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newProducts
    }
  },
  mounted () {
    this.getProductsList()
  },
  components: {
    CardPagination,
    Loading
  }
}
</script>

<style scoped>
</style>
