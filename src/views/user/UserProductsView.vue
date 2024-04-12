<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <header class="container-fluid bg-light pt-6 pb-5 py-xl-8 px-3 px-xl-7">
    <nav class="mb-3 mb-xl-5" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink class="text-decoration-none" to="/" exact>首頁</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ category === '' || category === undefined ? '所有商品' : category }}
        </li>
      </ol>
    </nav>
    <p class="fs-xl-3 text-gray my-0 ms-5">Products</p>
    <h2 class="lh-base fs-xl-1 text-gray">
      <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
      {{ category === '' || category === undefined ? '所有商品' : `${category} 所有商品` }}
    </h2>
    <div class="w-xl-50 d-flex justify-content-between bg-white
      rounded-pill mt-4 px-3 px-lg-4 py-lg-3 shadow-sm">
      <i class="bi bi-search my-auto"></i>
      <input class="fs-5 form-control border-0" type="search"
        placeholder="想找些什麼呢？" v-model="searchInput" @keyup.enter="productSearch">
    </div>
  </header>
  <main class="container-fluid mt-4 mt-xl-5 px-xl-7">
    <section class="d-flex">
      <router-link to="/products"
        class="col nav-link link-hover border text-center shadow-sm py-3 m-2"
        @click="productCategoryFilter('')">
        <p class="fs-xl-3 my-auto"
          :class="{ 'text-hard-blue' : !$route.query.category }">所有商品</p>
      </router-link>
      <router-link :to="{ name: '產品列表', query: { category: '動物園' }}"
        class="col nav-link link-hover border text-center shadow-sm py-3 m-2"
        @click="productCategoryFilter('動物園')">
        <p class="fs-xl-3 my-auto"
          :class="{ 'text-hard-blue': $route.query.category === '動物園' }">動物園</p>
      </router-link>
      <router-link :to="{ name: '產品列表', query: { category: '動物聚落' }}"
        class="col nav-link link-hover border text-center shadow-sm py-3 m-2"
        @click="productCategoryFilter('動物聚落')">
        <p class="fs-xl-3 my-auto"
          :class="{ 'text-hard-blue': $route.query.category === '動物聚落' }">動物聚落</p>
      </router-link>
      <router-link :to="{ name: '產品列表', query: { category: '農場' }}"
        class="col nav-link link-hover border text-center shadow-sm py-3 m-2"
        @click="productCategoryFilter('農場')">
        <p class="fs-xl-3 my-auto"
          :class="{ 'text-hard-blue': $route.query.category === '農場' }">動物農場</p>
      </router-link>
      <router-link :to="{ name: '產品列表', query: { category: '水族館' }}"
        class="col nav-link link-hover border text-center shadow-sm py-3 m-2"
        @click="productCategoryFilter('水族館')">
        <p class="fs-xl-3 my-auto"
          :class="{ 'text-hard-blue': $route.query.category === '水族館' }">水族館</p>
      </router-link>
      <router-link :to="{ name: '產品列表', query: { category: '鳥園' }}"
        class="col nav-link link-hover border text-center shadow-sm py-3 m-2"
        @click="productCategoryFilter('鳥園')">
        <p class="fs-xl-3 my-auto"
          :class="{ 'text-hard-blue': $route.query.category === '鳥園' }">鳥園</p>
      </router-link>
    </section>
    <section class="row my-4 my-xl-5">
      <nav class="col-xl-3">
        <div class="position-sticky border d-none d-xl-block" style="top: 5rem;">
          <div class="p-4">
            <h3 class="fw-500">依地區篩選</h3>
            <h4 class="fw-500 mt-xl-4">台灣</h4>
            <div class="form-check" v-for="(taiwanArea,key) in taiwanAreas" :key="'taiwanArea'+key">
              <input class="form-check-input fs-5 mt-xl-3" type="checkbox"
                :value="taiwanArea" :id="taiwanArea+key"
                v-model="filterArea" @change="productAreaFilter">
              <label class="form-check-label fs-5 mt-xl-2" :for="taiwanArea+key">
                {{ taiwanArea }}
              </label>
            </div>
          </div>
          <div class="p-4">
            <h4 class="fw-500 mt-xl-4">日本</h4>
            <div class="form-check" v-for="(japanArea,key) in japanAreas" :key="'japanArea'+key">
              <input class="form-check-input fs-5 mt-xl-3" type="checkbox"
                :value="japanArea" :id="japanArea+key"
                v-model="filterArea" @change="productAreaFilter">
              <label class="form-check-label fs-5 mt-xl-2" :for="japanArea+key">
                {{ japanArea }}
              </label>
            </div>
          </div>
        </div>
      </nav>
      <main class="col-xl-9">
        <div class="dropdown d-flex justify-content-center justify-content-xl-end">
          <p class="fs-xl-5 my-auto me-3">排序方式</p>
          <button class="btn btn-outline-primary fs-xl-5 py-2 px-4 dropdown-toggle"
          type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
          aria-expanded="false" style="width: 200px;">
            {{ selectedOption }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="(option, index) in options" :key="index">
              <a class="dropdown-item fs-5" href="#"
                @click.prevent="selectOption(option)">
                {{ option }}
              </a>
            </li>
          </ul>
        </div>
        <div class="accordion px-3 mt-3 d-block d-xl-none" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed py-2" type="button"
            data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            <i class="bi bi-funnel"></i>地區篩選
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse"
              aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body d-flex justify-content-around py-4">
                <div class="">
                  <h4 class="fs-5 fw-500 mt-xl-4">台灣</h4>
                  <div class="form-check" v-for="(taiwanArea,key) in taiwanAreas" :key="'taiwanArea'+key">
                    <input class="form-check-input mt-xl-3" type="checkbox"
                      :value="taiwanArea" :id="taiwanArea+key"
                      v-model="filterArea" @change="productAreaFilter">
                    <label class="form-check-label mt-xl-2" :for="taiwanArea+key">
                      {{ taiwanArea }}
                    </label>
                  </div>
                </div>
                <div>
                  <h4 class="fs-5 fw-500 mt-xl-4">日本</h4>
                  <div class="form-check" v-for="(japanArea,key) in japanAreas" :key="'japanArea'+key">
                    <input class="form-check-input mt-xl-3" type="checkbox"
                      :value="japanArea" :id="japanArea+key"
                      v-model="filterArea" @change="productAreaFilter">
                    <label class="form-check-label mt-xl-2" :for="japanArea+key">
                      {{ japanArea }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--not sort-->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3"
          v-if="dataLoading && sortBy==='default' && products.length>0" data-aos="fade-up">
          <div class="col mt-4" v-for="product in products" :key="product.id">
            <RouterLink class="text-decoration-none" :to=" `/product/${product.id}`">
              <div class="card h-100 mb-4 border-0 shadow-sm product-card-hover">
                <div style="position: relative;">
                  <div>
                    <span class="fs-5 text-dark bg-white ps-2 opacity-75"
                      style="position: absolute; top: 15px; z-index: 2;">
                      <i class="bi bi-geo-alt-fill"></i>
                      {{ product.nation }}{{ product.area }}
                    </span>
                    <img :src="product.imagesUrl[0]" style="height: 240px; z-index: 1;"
                      class="card-img-top object-fit-cover" alt="product-img">
                  </div>
                </div>
                <div class="card-body">
                  <span class="fs-5 text-primary">
                    <i class="bi bi-play-fill"></i>
                    {{ product.category }}
                  </span>
                  <h4 class="card-text text-dark my-2 link-hover">
                    {{ product.title }}
                  </h4>
                  <p>{{ product.feature }}</p>
                  <p class="fs-5 text-primary fw-bolder">
                    <del style="color: rgb(108, 105, 105);">
                      NT${{ formatPrice(product.origin_price) }}
                    </del>
                    <br>
                    NT${{ formatPrice(product.price) }}
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!--product.length===0-->
        <div class="row"
          v-else-if="dataLoading && products.length===0" data-aos="fade-up">
          <div class="col text-center m-5 py-10 bg-light">
            <h2>此類別目前無商品</h2>
          </div>
        </div>

        <!--sort-->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3" v-else
          data-aos="fade-up">
          <div class="col mt-4" v-for="product in sortProducts" :key="product.id">
            <RouterLink class="text-decoration-none" :to=" `/product/${product.id}`">
              <div class="card h-100 mb-4 border-0 shadow-sm product-card-hover">
                <div style="position: relative;">
                  <div>
                    <span class="fs-5 text-dark bg-white ps-2 opacity-75"
                      style="position: absolute; top: 15px; z-index: 2;">
                      <i class="bi bi-geo-alt-fill"></i>
                      {{ product.nation }}{{ product.area }}
                    </span>
                    <img :src="product.imagesUrl[0]" style="height: 240px; z-index: 1;"
                      class="card-img-top object-fit-cover" alt="product-img">
                  </div>
                </div>
                <div class="card-body">
                  <span class="fs-5 text-primary">
                    <i class="bi bi-play-fill"></i>
                    {{ product.category }}
                  </span>
                  <h4 class="card-text text-dark my-2 link-hover">
                    {{ product.title }}
                  </h4>
                  <p>{{ product.feature }}</p>
                  <p class="fs-5 text-primary fw-bolder">
                    <del style="color: rgb(108, 105, 105);">
                      NT${{ formatPrice(product.origin_price) }}
                    </del>
                    <br>
                    NT${{ formatPrice(product.price) }}
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-4 mt-xl-6">
          <CardPagination :pagination="pagination" @emit-getlist="getProductsList"
            v-if="this.filterArea.length === 0 && this.category === ''" />
        </div>
      </main>
    </section>
  </main>
</template>

<script>
import CardPagination from '@/components/CardPagination.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      allProducts: [],
      categoryFilterProducts: [],
      nations: [],
      taiwanAreas: [],
      japanAreas: [],
      selectedOption: '最新上架',
      options: ['最新上架', '價格 (從低到高)', '價格 (從高到低)'],
      sortBy: 'default',
      ascending: true,
      searchInput: '',
      filterArea: [],
      category: '',
      pagination: {},
      dataLoading: false,
      isLoading: true
    }
  },
  methods: {
    getProductsList (page = 1) {
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
            this.category = this.$route.query.category
            this.productCategoryFilter(this.category)
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
    getAllProductsList () {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/products/all`)
        .then(res => {
          this.allProducts = res.data.products
          this.getAreas()
          this.getProductsList()
          this.dataLoading = true
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
    getAreas () {
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
    selectOption (option) {
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
    productSearch () {
      if (this.searchInput !== '') {
        this.products = this.productsSearchResults
      } else {
        this.getProductsList()
      }
    },
    productAreaFilter () {
      if (this.filterArea.length !== 0) {
        this.products = this.categoryFilterProducts
        this.products = this.productsAreaFilterResults
      } else {
        this.getProductsList()
      }
    },
    productCategoryFilter (category) {
      this.isLoading = true
      this.filterArea = []
      this.category = category
      if (this.category) {
        this.products = this.productsCategoryFilterResults
        this.categoryFilterProducts = this.productsCategoryFilterResults
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      } else {
        this.getProductsList()
      }
    },
    formatPrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    sortProducts () {
      const newProducts = [...this.products].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newProducts
    },
    productsSearchResults () {
      const newProducts = this.allProducts.filter(product => {
        return product.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      return newProducts
    },
    productsAreaFilterResults () {
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
    productsCategoryFilterResults () {
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
