<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <header class="container-fluid">
    <!--Header區塊-->
    <div class="row d-flex justify-content-between my-lg-5">
      <div class="col-lg-2">
        <h1 class="lh-base fs-1 text-gray letter-spacing-7 text-vrl pt-7 py-lg-7 mx-auto"
          data-aos="zoom-out">
          和<span class="text-primary">小動物</span>們相遇，<br>
          &nbsp;&nbsp;&nbsp;&nbsp;來場<span class="text-primary">治癒身心</span>的輕旅行。
        </h1>
      </div>
      <div class="col-lg-10">
        <div class="text-end">
          <RouterLink to="/">
            <img class="img-fluid" src="@/assets/images/logo/logo.png" alt="logo" data-aos="zoom-out">
          </RouterLink>
        </div>
        <swiper
          data-aos="zoom-out"
          class="mySwiper"
          :spaceBetween="30"
          :effect="'fade'"
          :fadeEffect="{
            crossFade: true,
          }"
          :navigation="false"
          :pagination="false"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :modules="modules"
        >
          <swiper-slide><img src="@/assets/images/banner/indexBanner-1.jpg" alt="banner"></swiper-slide>
          <swiper-slide><img src="@/assets/images/banner/indexBanner-4.jpg" alt="banner"></swiper-slide>
          <swiper-slide><img src="@/assets/images/banner/indexBanner-5.jpg" alt="banner"></swiper-slide>
        </swiper>
      </div>
    </div>
  </header>
  <section class="container-fluid about-fixed-background shadow-bottom rounded-5">
    <!--About區塊-->
    <div class="row mt-5 py-lg-7 gradient-border">
      <div class="col py-7 py-lg-10" data-aos="fade-up">
        <p class="fs-3 text-gray text-center m-0">About</p>
        <h2 class="lh-base fs-1 text-gray text-center">
          <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
          關於療遇
        </h2>
        <p class="text-center lh-lg fs-3 text-gray mt-5 mt-lg-7 px-lg-5">
          小動物 x 旅行 = 治癒身心<br>
          療遇是一個專為喜愛動物的人們打造各種動物旅遊方案的團隊<br>
          我們準備了動物村、動物園、鳥園、海生館、水族館等旅遊方案<br>
          並以實惠的價格提供給各位<br>
          如果您也覺得生活沒有趣味、日子過得有些疲憊<br>
          不妨來場與動物之間的約會
        </p>
      </div>
    </div>
  </section>
  <section class="container mt-8 mt-lg-10 p-lg-0" data-aos="fade-up">
    <!--News區塊-->
    <div class="row">
      <div class="col-lg-4">
        <div class="text-gray text-center">
          <p class="fs-3 m-0">News</p>
          <h2 class="lh-base fs-1 text-gray">
            <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid pe-2">
            最新消息
          </h2>
        </div>
      </div>
      <div class="col-lg-8">
        <ul class="list-group list-group-flush my-5 my-lg-0">
          <li class="list-group-item mt-2 py-0 article-hover"
            v-for="article in articles.slice(0, 6)" :key="article.id">
            <span class="lh-lg fs-5 text-gray opacity-75 pe-3">{{ formatDateString(article.create_at) }}</span>
            <span class="bg-gray lh-lg fs-5 text-light opacity-50 px-2">{{ article.tag }}</span>
            <p class="lh-lg fs-4 text-gray">{{ article.title }}</p>
          </li>
        </ul>
        <div class="d-flex align-items-center justify-content-end">
          <RouterLink class="text-decoration-none" to="/articles">
            <p class="text-dark my-3 link-hover">
              view all
              <i class="bi bi-arrow-right-short"></i>
            </p>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
  <section class="container-fluid mt-6 mt-lg-7 px-lg-1" data-aos="fade-up">
    <!--Category區塊-->
    <p class="fs-3 text-gray text-center m-0">Category</p>
    <h2 class="lh-base fs-1 text-gray text-center">
        <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
        商品分類
    </h2>
    <div class="row g-2 mt-5">
        <div class="col-lg-6 col-12 category-hover">
          <router-link class="text-decoration-none"
            :to="{ name: '產品列表', query: { category: '動物園' }}">
            <div>
                <img style="width: 100%;" class="object-fit"
                  src="@/assets/images/image/zoo.jpg" alt="zoo">
            </div>
            <div class="text-center py-4 p-lg-5 bg-light">
              <h3 class="text-gray fs-2 fw-bolder m-0">動物園</h3>
              <p class="text-gray mt-4">
                有各式各樣的動物可供觀賞。<br>
                透過展示動物、舉辦教育活動和培訓，提升對動物保育的認識。</p>
            </div>
          </router-link>
        </div>
        <div class="col-lg-6 col-12 category-hover">
          <router-link class="text-decoration-none"
            :to="{ name: '產品列表', query: { category: '動物聚落' }}">
            <div>
                <img style="width: 100%;" class="object-fit"
                  src="@/assets/images/image/settlement.jpg" alt="settlement">
            </div>
            <div class="text-center py-4 p-lg-5 bg-light">
              <h3 class="text-gray fs-2 fw-bolder m-0">動物村 / 動物聚落</h3>
              <p class="text-gray mt-4">
                通常以單一動物為主題，提供與動物近距離互動的機會。<br>
                透過遊覽和互動體驗，讓遊客更深入地了解動物的生活和行為。</p>
            </div>
          </router-link>
        </div>
    </div>
    <div class="row g-2 mt-lg-1">
        <div class="col-lg-4 col-12 category-hover">
          <router-link class="text-decoration-none"
            :to="{ name: '產品列表', query: { category: '農場' }}">
            <div>
              <img style="width: 100%;" class="object-fit"
                src="@/assets/images/image/animalsfarm.jpg" alt="animals-farm">
            </div>
            <div class="text-center py-4 p-lg-5 bg-light">
              <h3 class="text-gray fs-2 fw-bolder m-0">動物農場</h3>
              <p class="text-gray mt-4">
                結合農業和觀光，<br>
                提供小動物觀賞和參與農業活動的機會。<br>
                可以體驗農場活動，同時欣賞可愛的小動物。</p>
            </div>
          </router-link>
        </div>
        <div class="col-lg-4 col-12 category-hover">
          <router-link class="text-decoration-none"
            :to="{ name: '產品列表', query: { category: '水族館' }}">
            <div>
              <img style="width: 100%;" class="object-fit"
                src="@/assets/images/image/aquarium.jpg" alt="aquarium">
            </div>
            <div class="text-center py-4 p-lg-5 bg-light">
              <h3 class="text-gray fs-2 fw-bolder m-0">水族館</h3>
              <p class="text-gray mt-4">
                專門展示各種水生生物和水域生態的場所。<br>
                是一個可以了解水生生物、<br>
                水域生態系統和海洋保護的地方。</p>
            </div>
          </router-link>
        </div>
        <div class="col-lg-4 col-12 category-hover">
          <router-link class="text-decoration-none"
            :to="{ name: '產品列表', query: { category: '鳥園' }}">
            <div>
              <img style="width: 100%;" class="object-fit"
                src="@/assets/images/image/birdpark.jpg" alt="bird-park">
            </div>
            <div class="text-center py-4 p-lg-5 bg-light">
              <h3 class="text-gray fs-2 fw-bolder m-0">鳥園</h3>
              <p class="text-gray mt-4">
                專門保護、展示各種鳥類的場所。<br>
                可以在這裡近距離觀察各種鳥類，<br>
                了解它們的生活習性。</p>
            </div>
          </router-link>
        </div>
    </div>
  </section>
  <section class="container my-7 p-lg-0" data-aos="fade-up">
    <!--Products區塊-->
    <p class="fs-3 text-gray text-center m-0">Products</p>
    <h2 class="lh-base fs-1 text-gray text-center">
      <img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">
      熱門商品
    </h2>
    <div class="row mt-5">
      <div class="col-md-4 col-sm-6" v-for="product in products.slice(0, 6)" :key="product.id">
        <RouterLink class="text-decoration-none" :to=" `/product/${product.id}`">
          <div class="card mb-4 border-0 shadow-sm">
            <div style="position: relative;">
                <div class="image-container" >
                  <span class="fs-5 text-dark bg-white ps-2 opacity-75"
                    style="position: absolute; top: 15px; z-index: 2;">
                    <i class="bi bi-geo-alt-fill"></i>
                    {{ product.nation }}{{ product.area }}
                  </span>
                  <img :src="product.imagesUrl[0]" style="height: 280px;
                    z-index: 1;" class="card-img-top object-fit-cover" alt="product-img">
                </div>
            </div>
            <div class="card-body">
              <span class="fs-5 text-primary">
                <i class="bi bi-play-fill"></i> {{ product.category }}
              </span>
              <h4 class="card-text text-dark my-2 link-hover">{{ product.title }}</h4>
              <p>{{ product.feature }}</p>
              <p class="fs-5 text-primary fw-bolder">
                <del style="color: rgb(196, 196, 196);">NT${{ product.origin_price }}</del><br>
                NT${{ product.price }}
              </p>
            </div>
          </div>
        </RouterLink>
      </div>
      <div class="d-flex align-items-center justify-content-end">
        <RouterLink class="text-decoration-none" to="/products">
          <p class="text-dark my-3 link-hover">
            view all
            <i class="bi bi-arrow-right-short"></i>
          </p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/stores/productStore'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules'

// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// 日期轉換
import moment from 'moment'

const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      articles: [], // 文章列表
      modules: [EffectFade, Autoplay, Navigation, Pagination],
      isLoading: true, // Loading效果
      loader: 'bars'
    }
  },
  computed: {
    ...mapState(productStore, ['products'])
  },
  methods: {
    ...mapActions(productStore, ['getAllProductsList']),
    getArticlesList (page = 1) { // 取得文章資料
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/articles?page=${page}`)
        .then(res => {
          this.articles = res.data.articles
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
    formatDateString (date) { // 日期轉換
      return moment.unix(date).format('YYYY-MM-DD')
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  mounted () {
    this.getArticlesList()
    this.getAllProductsList()
  }
}
</script>
<style scoped>
.swiper {
    height: 600px;
}
.swiper-slide {
    background-position: center;
    background-size: cover;
    position: relative;
}
.swiper-slide img {
    width: 100%;
    height: 99.83vh;
    object-fit: cover;
    transition: 1s linear 2s;
    transform: scale(1.1, 1.1);
}
.swiper-slide-active img,
.swiper-slide-duplicate-active img {
    transition: 8s linear;
    transform: scale(1, 1);
}

</style>
