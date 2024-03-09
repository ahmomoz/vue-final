<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
  <div class="container-fluid bg-light py-8 px-5 px-xl-10">
    <nav class="mb-5" aria-label="breadcrumb">
      <!--麵包屑-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink class="text-decoration-none" to="/home" exact>首頁</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ category === '' || category === undefined ? '所有商品' : category }}
        </li>
      </ol>
    </nav>
    <p class="fs-3 text-gray my-0 ms-5">Products</p>
    <h2 class="lh-base fs-1 text-gray">
      <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
      {{ category === '' || category === undefined ? '所有商品' : `${category} 所有商品` }}
    </h2>
    <div class="w-50 d-flex justify-content-between bg-white shadow-sm rounded-pill mt-4 px-lg-4 py-lg-3">
      <i class="bi bi-search my-auto"></i>
      <input class="fs-5 form-control border-0" type="search"
        placeholder="想找些什麼呢？" v-model="searchInput" @keyup.enter="productSearch">
    </div>
  </div>
  <div class="container-fluid px-xl-10 mt-5 mt-xl-5">
      <div class="d-flex flex-wrap justify-content-center">
        <router-link to="/products"
          class="w-100 card nav-link link-hover p-xl-2 shadow-sm me-xl-3"
          @click="productCategoryFilter('')">
          <p class="fs-3 m-auto" :class="{ 'text-primary' : !$route.query.category }">所有商品</p>
        </router-link>
        <router-link :to="{ name: '產品列表', query: { category: '動物園' }}"
          class="w-100 card nav-link link-hover p-xl-2 shadow-sm me-xl-3"
          @click="productCategoryFilter('動物園')">
          <p class="fs-3 m-auto" :class="{ 'text-primary': $route.query.category === '動物園' }">動物園</p>
        </router-link>
        <router-link :to="{ name: '產品列表', query: { category: '動物聚落' }}"
          class="w-100 card nav-link link-hover p-xl-2 shadow-sm me-xl-3"
          @click="productCategoryFilter('動物聚落')">
          <p class="fs-3 m-auto" :class="{ 'text-primary': $route.query.category === '動物聚落' }">動物村/<br>動物聚落</p>
        </router-link>
        <router-link :to="{ name: '產品列表', query: { category: '農場' }}"
          class="w-100 card nav-link link-hover p-xl-2 shadow-sm me-xl-3"
          @click="productCategoryFilter('農場')">
          <p class="fs-3 m-auto" :class="{ 'text-primary': $route.query.category === '農場' }">動物農場</p>
        </router-link>
        <router-link :to="{ name: '產品列表', query: { category: '水族館' }}"
          class="w-100 card nav-link link-hover p-xl-2 shadow-sm me-xl-3"
          @click="productCategoryFilter('水族館')">
          <p class="fs-3 m-auto" :class="{ 'text-primary': $route.query.category === '水族館' }">水族館</p>
        </router-link>
        <router-link :to="{ name: '產品列表', query: { category: '鳥園' }}"
          class="w-100 card nav-link link-hover p-xl-2 shadow-sm me-xl-3"
          @click="productCategoryFilter('鳥園')">
          <p class="fs-3 m-auto" :class="{ 'text-primary': $route.query.category === '鳥園' }">鳥園</p>
        </router-link>
      </div>
    <div class="row my-4 my-xl-5">
      <div class="col-3 card d-none d-xl-block">
        <!--左邊類別選擇欄-->
        <div class="position-sticky card-body" style="top: 5rem;">
          <div class="p-4">
            <h3 class="fw-500">依地區篩選</h3>
            <h4 class="fw-500 mt-xl-4">台灣</h4>
            <div class="form-check" v-for="(taiwanArea,key) in taiwanAreas" :key="'taiwanArea'+key">
              <input class="form-check-input fs-5 mt-xl-3" type="checkbox" :value="taiwanArea" :id="taiwanArea+key" v-model="filterArea" @change="productAreaFilter">
              <label class="form-check-label fs-5 mt-xl-2" :for="taiwanArea+key">
                  {{ taiwanArea }}
              </label>
            </div>
          </div>

          <div class="p-4">
            <h4 class="fw-500 mt-xl-4">日本</h4>
            <div class="form-check" v-for="(japanArea,key) in japanAreas" :key="'japanArea'+key">
              <input class="form-check-input fs-5 mt-xl-3" type="checkbox" :value="japanArea" :id="japanArea+key" v-model="filterArea" @change="productAreaFilter">
              <label class="form-check-label fs-5 mt-xl-2" :for="japanArea+key">
                  {{ japanArea }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9">
        <!--商品卡片-->
        <div class="container-fluid">
          <div class="dropdown d-flex justify-content-end">
            <p class="fs-5 my-auto me-3">排序方式</p>
            <button class="btn btn-outline-primary fs-5 py-2 px-4 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style="width: 200px;">
              {{ selectedOption }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(option, index) in options" :key="index">
                <a class="dropdown-item fs-5" href="#" @click.prevent="selectOption(option)">{{ option }}</a>
              </li>
            </ul>
          </div>
          <!--not sort-->
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3" v-if="sortBy==='default'">
            <div class="col mt-4" v-for="product in products" :key="product.id">
              <RouterLink class="text-decoration-none" :to=" `/product/${product.id}`">
                <div class="card h-100 mb-4 border-0 shadow-sm product-card-hover">
                  <div style="position: relative;">
                    <div>
                      <span class="fs-5 text-dark bg-white ps-2 opacity-75" style="position: absolute; top: 15px; z-index: 2;">
                        <i class="bi bi-geo-alt-fill"></i>
                        {{ product.nation }}{{ product.area }}
                      </span>
                      <img :src="product.imagesUrl[0]" style="height: 240px; z-index: 1;" class="card-img-top object-fit-cover" alt="product-img">
                    </div>
                  </div>
                  <div class="card-body">
                    <span class="fs-5 text-primary"><i class="bi bi-play-fill"></i> {{ product.category }}</span>
                      <h4 class="card-text text-dark my-2 link-hover">{{ product.title }}</h4>
                    <p>{{ product.feature }}</p>
                    <p class="fs-5 text-primary fw-bolder">
                      <del style="color: rgb(196, 196, 196);"> NT${{ product.origin_price }}</del><br>
                      NT${{ product.price }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
          <!--not sort-->
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3" v-else>
            <div class="col mt-4" v-for="product in sortProducts" :key="product.id">
              <RouterLink class="text-decoration-none" :to=" `/product/${product.id}`">
                <div class="card h-100 mb-4 border-0 shadow-sm product-card-hover">
                  <div style="position: relative;">
                    <div>
                      <span class="fs-5 text-dark bg-white ps-2 opacity-75" style="position: absolute; top: 15px; z-index: 2;">
                        <i class="bi bi-geo-alt-fill"></i>
                        {{ product.nation }}{{ product.area }}
                      </span>
                      <img :src="product.imagesUrl[0]" style="height: 240px; z-index: 1;" class="card-img-top object-fit-cover" alt="product-img">
                    </div>
                  </div>
                  <div class="card-body">
                    <span class="fs-5 text-primary"><i class="bi bi-play-fill"></i> {{ product.category }}</span>
                      <h4 class="card-text text-dark my-2 link-hover">{{ product.title }}</h4>
                    <p>{{ product.feature }}</p>
                    <p class="fs-5 text-primary fw-bolder">
                      <del style="color: rgb(196, 196, 196);"> NT${{ product.origin_price }}</del><br>
                      NT${{ product.price }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4 mt-xl-6">
          <card-pagination :pagination="pagination" @emit-getlist="getProductsList" v-if="this.filterArea.length === 0 && this.category === ''"></card-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardPagination from '@/components/CardPagination.vue' // 分頁元件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      products: [], // 產品列表
      allProducts: [],
      nations: [],
      taiwanAreas: [], // 台灣地區清單
      japanAreas: [], // 日本地區清單
      selectedOption: '最新上架',
      options: ['最新上架', '價格 (從低到高)', '價格 (從高到低)'],
      sortBy: 'default',
      ascending: true, // 是否降冪
      searchInput: '', // 初始化搜尋框輸入字串
      filterArea: [], // 篩選的地區
      category: '', // 篩選的種類
      pagination: {},
      isLoading: true // Loading效果
    }
  },
  methods: {
    getProductsList (page = 1) { // 取得產品資料
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/products?page=${page}`)
        .then(res => {
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
          this.sortBy = 'default'
          this.selectedOption = '最新上架'
          this.searchInput = ''
          if (this.$route.query.category) {
            this.category = this.$route.query.category // 取得前頁路由
            this.productCategoryFilter(this.category) // 更新類別篩選
          }
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
    getAllProductsList () { // 取得所有產品資料
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/products/all`)
        .then(res => {
          this.allProducts = res.data.products
          this.getAreas()
          this.getProductsList()
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
    getRouterCategory () {
      this.category = this.$route.query.category // 取得前頁路由
      this.productCategoryFilter(this.category) // 更新類別篩選
    },
    getAreas () { // 取得地區清單，用來渲染於篩選選項
      this.allProducts.forEach(item => {
        if (item.nation === '台灣' && !this.taiwanAreas.includes(item.area)) {
          this.taiwanAreas.push(item.area)
        } else if (item.nation === '日本' && !this.japanAreas.includes(item.area)) {
          this.japanAreas.push(item.area)
        }
      })
      this.taiwanAreas = Array.from(this.taiwanAreas).sort()
      this.japanAreas = Array.from(this.japanAreas).sort()
    },
    selectOption (option) { // 切換排序選項
      this.selectedOption = option
      if (this.selectedOption === '價格 (從低到高)') {
        this.sortBy = 'price'
        this.ascending = true
      } else if (this.selectedOption === '價格 (從高到低)') {
        this.sortBy = 'price'
        this.ascending = false
      } else {
        this.sortBy = 'default'
      }
    },
    addToCart (product) { // 加入購物車
      const item = {
        data: {
          product_id: product.id,
          qty: 1
        }
      }
      this.isLoading = true
      this.$axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/cart`, item)
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功加入購物車',
            showConfirmButton: false,
            timer: 700
          })
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
    },
    productSearch () { // 商品搜尋
      if (this.searchInput !== '') {
        this.products = this.productsSearchResults
      } else {
        this.getProductsList()
      }
    },
    productAreaFilter () { // 商品地區篩選
      if (this.filterArea.length !== 0) {
        this.products = this.productsAreaFilterResults
      } else {
        this.getProductsList()
      }
    },
    productCategoryFilter (category) { // 商品種類篩選
      this.filterArea = []
      this.category = category
      if (this.category) {
        this.products = this.productsCategoryFilterResults
      } else {
        this.getProductsList()
      }
    }
  },
  computed: {
    sortProducts () { // 排序商品
      const newProducts = [...this.products].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newProducts
    },
    productsSearchResults () { // 搜尋商品
      const newProducts = this.allProducts.filter(product => {
        return product.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      return newProducts
    },
    productsAreaFilterResults () { // 篩選商品地區
      if (this.sortBy !== 'default' || this.searchInput !== '' || this.category !== '') {
        const newProducts = this.products.filter(product => {
          return this.filterArea.some(area => product.area.toLowerCase().includes(area.toLowerCase()))
        })
        return newProducts
      } else {
        const newProducts = this.allProducts.filter(product => {
          return this.filterArea.some(area => product.area.toLowerCase().includes(area.toLowerCase()))
        })
        return newProducts
      }
    },
    productsCategoryFilterResults () { // 篩選商品種類
      const newProducts = this.allProducts.filter(product => {
        return product.category.toLowerCase().includes(this.category.toLowerCase())
      })
      return newProducts
    }
  },
  mounted () {
    this.getAllProductsList()
  },
  components: {
    CardPagination,
    Loading
  }
}
</script>

<style scoped>
</style>
