<template>
  <div class="card mt-lg-3 shadow-sm">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <form class="row g-2 align-items-center">
          <div class="col-auto">
            <input class="form-control" type="search" placeholder="搜尋商品名稱"
              aria-label="Search" v-model="searchInput">
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-primary" type="submit"
              @click="productSearch">搜尋
            </button>
          </div>
        </form>
      </div>
    </nav>
  </div>
  <div class="card my-1 my-lg-4 shadow-sm">
    <div class="card-header">
      <div class="text-end py-2">
          <button type="button" class="btn btn-primary text-white mx-3"
            @click="ascending=!ascending">
            {{ascending?"降冪":"升冪"}}排序
          </button>
          <router-link class="btn btn-primary text-light"
            :to="'product/add'">
            <span class="bi bi-plus"></span>
            建立新的產品
          </router-link>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead class="bg-light">
          <tr class="align-middle">
            <th>分類</th>
            <th>地區</th>
            <th>產品名稱</th>
            <th @click="sortBy='price'">
              售價
              <span class="bi bi-arrow-down-up ms-1"></span>
            </th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>

        <!--not sort-->
        <tbody v-if="sortBy==='default'">
        <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
        <tr v-for="product in products" :key="product.id">
          <td> {{ product.category }} </td>
          <td> {{ product.nation }} </td>
          <td> {{ product.title }} </td>
          <td> NT${{ product.price }} <br>
            <del style="color: rgb(196, 196, 196);"> NT${{ product.origin_price }} </del></td>
          <td>
            <span class="text-primary" v-if="product.is_enabled">上架中</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <router-link class="btn btn-outline-primary btn-sm"
                :to="'product/edit/'+ product.id">
                編輯
              </router-link>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="deleteProduct(product.title,product.id)">
                刪除
              </button>
            </div>
          </td>
        </tr>
        </tbody>

        <!--sort-->
        <tbody v-else>
        <tr v-for="product in sortProducts" :key="product.name">
          <td> {{ product.category }} </td>
          <td> {{ product.nation }} </td>
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
                :to="'product/edit/'+ product.id">
                編輯
              </router-link>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(product.title,product.id)">
                刪除
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer d-flex justify-content-center">
      <CardPagination :pagination="pagination" @emit-getlist="getProductsList" />
    </div>
  </div>
</template>

<script>
import CardPagination from '@/components/CardPagination.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      sortBy: 'default',
      ascending: true,
      allProducts: [],
      products: [],
      searchInput: '',
      pagination: {},
      isLoading: true
    }
  },
  methods: {
    getProductsList (page = 1) {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/products?page=${page}`)
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
        confirmButtonColor: '#eb5a68',
        cancelButtonColor: '#8bafd7',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/product/${id}`)
            .then(res => {
              this.$Swal.fire({
                position: 'top-end',
                title: '已刪除',
                icon: 'success',
                showConfirmButton: false,
                timer: 700
              })
              this.getProductsList()
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
