<template>
  <div id="app">
    <div class="card mt-lg-3 shadow-sm">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <form class="row g-2 align-items-center">
            <div class="col-auto">
              <input class="form-control" type="search" placeholder="搜尋商品名稱" aria-label="Search" v-model="searchInput">
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-primary" type="submit" @click="productSearch">搜尋</button>
            </div>
          </form>
        </div>
      </nav>
    </div>
    <div class="card my-1 my-lg-4 shadow-sm">
      <div class="card-header">
        <div class="text-end">
            <button type="button" class="btn btn-info text-white mx-3"
            @click="ascending=!ascending">
            {{ascending?"降冪":"升冪"}}排序
            </button>
            <router-link class="btn btn-primary"
                  :to="'product/add'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="4 4 12 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
                  建立新的產品
            </router-link>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-hover">
            <thead class="bg-light">
            <tr class="align-middle">
                <th>地區</th>
                <th>分類</th>
                <th>產品名稱</th>
                <th @click="sortBy='price'">
                  售價
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up ms-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/></svg>
                </th>
                <th>狀態</th>
                <th>操作</th>
            </tr>
            </thead>
            <!--not sort-->
            <tbody v-if="sortBy==='default'">
            <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
            <tr v-for="product in products" :key="product.id">
                <td> {{ product.nation }} </td>
                <td> {{ product.category }} </td>
                <td> {{ product.title }} </td>
                <td> NT${{ product.price }} <br>
                <del style="color: rgb(196, 196, 196);"> NT${{ product.origin_price }} </del></td>
                <td>
                <span class="text-success" v-if="product.is_enabled">上架中</span>
                <span v-else>未上架</span>
                </td>
                <td>
                <div class="btn-group">
                  <router-link class="btn btn-outline-primary btn-sm"
                  :to="'product/edit/'+ product.id">編輯</router-link>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(product.title,product.id)">
                  刪除
                </button>
                </div>
                </td>
            </tr>
            </tbody>
            <!--sort-->
            <tbody v-else>
            <tr v-for="product in sortProducts" :key="product.name">
              <td> {{ product.nation }} </td>
                <td> {{ product.category }} </td>
                <td> {{ product.title }} </td>
                <td> NT${{ product.price }} <br>
                <del style="color: rgb(196, 196, 196);"> NT${{ product.origin_price }} </del></td>
                <td>
                <span class="text-success" v-if="product.is_enabled">上架中</span>
                <span v-else>未上架</span>
                </td>
                <td>
                <div class="btn-group">
                  <router-link class="btn btn-outline-primary btn-sm"
                  :to="'product/edit/'+ product.id">編輯</router-link>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(product.title,product.id)">
                  刪除
                  </button>
                </div>
                </td>
            </tr>
            </tbody>
        </table>
      </div>
      <div class="card-footer">
        <card-pagination :pagination="pagination" @emit-getproductslist="getProductsList"></card-pagination>
      </div>
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
      allProducts: [],
      products: [],
      productsDetail: {},
      tempProduct: {
        imagesUrl: []
      },
      searchInput: '', // 初始化搜尋框輸入字串
      pagination: {},
      isLoading: true, // Loading效果
      modal: {
        productModal: '',
        delProductModal: ''
      }
    }
  },
  methods: {
    getProductsList (page = 1) { // 取得產品資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/products?page=${page}`)
        .then(res => {
          const { products, pagination } = res.data
          this.allProducts = products
          this.products = products
          this.pagination = pagination
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteProduct (title, id) {
      this.$Swal.fire({
        title: '即將刪除商品',
        text: `確定要刪除「${title}」嗎？`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/product/${id}`)
            .then(res => {
              this.$Swal.fire({
                title: '已刪除',
                icon: 'success'
              })
              this.getProductsList() // 重新取得產品列表
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
    productSearch () {
      this.products = this.productsFilteredResults
    }
  },
  watch: {
    searchInput (newVal, oldVal) {
    // 當搜尋輸入值發生變化時觸發
      this.productSearch()
    }
  },
  computed: {
    sortProducts () {
      const newProducts = [...this.products].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newProducts
    },
    productsFilteredResults () {
      const newProducts = this.allProducts.filter(product => {
        return product.title.toLowerCase().includes(this.searchInput.toLowerCase())
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
