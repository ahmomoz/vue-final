<template>
  <loading v-if="isLoading" :active="isLoading" :can-cancel="false">
    <img style="width: 200px;" src="@/assets/images/image/loading-img2.gif" alt="to-top-btn">
  </loading>
  <main class="container-fluid pt-6 pb-5 py-xl-6 px-3 px-xl-5 px-xxl-8">
    <nav class="mb-3 mb-xl-4" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink class="text-decoration-none" to="/" exact>首頁</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">
          <RouterLink class="text-decoration-none" to="/products" exact>所有商品</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <section class="row mt-3" data-aos="fade-up">
      <div class="col-xl-12">
        <div class="mb-2">
          <h1>{{ product.nation }}｜{{ product.title }}</h1>
          <div class="d-flex justify-content-between my-3 my-xl-4">
            <div>
              <span class="fs-lg-5 bg-primary text-light rounded rounded-pill px-2 py-2 me-3">
                {{ product.category }}
              </span>
              <i class="fs-lg-4 bi bi-geo-alt"></i><span class="fs-lg-4">
                {{ product.nation }} {{ product.area }}
              </span>
            </div>
            <div class="d-flex align-items-end">
              <span class="d-none d-lg-block">
                商品ID {{ product.id }}
              </span>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :effect="'fade'"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: this.thumbsSwiper }"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide class="product-first-swiper w-100"
              v-for="img in product.imagesUrl.slice(0, 5)" :key="img">
              <div class="swiper-img-container">
                <img style="width: 100%;" class="object-fit"
                  :src="img" alt="product-img"/>
              </div>
            </swiper-slide>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper"
            :spaceBetween="10"
            :slidesPerView="5"
            :slidesPerGroup="5"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper mt-2"
          >
            <swiper-slide class="product-second-swiper"
              v-for="img in product.imagesUrl.slice(0, 5)" :key="img">
              <div class="swiper-img-container">
                <img style="width: 100%;" class="object-fit"
                  :src="img" alt="product-img"/>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <section class="row flex-column-reverse flex-xl-row" data-aos="fade-up">
      <div class="col-12 col-xl-8 mt-xl-3">
        <div class="fs-5 d-xl-flex ps-1 py-3 mb-xl-3">
          <div class="mx-xl-3 me-xl-5">
            <i class="bi bi-coin"></i>
            時限內可免費取消
          </div>
          <div class="mt-2 mt-sm-0">
            <i class="bi bi-qr-code-scan"></i>
            票券類商品請現場出示QRcode
          </div>
        </div>
        <hr>
        <div class="py-3">
          <p class="fs-5 white-space-pre-line my-auto">
            {{ product.content }}
          </p>
        </div>
        <hr>
        <div class="my-3">
          <div class="d-flex my-4">
            <i class="fs-4 text-primary me-2 bi bi-stars"></i>
            <h2 class="fs-4 my-auto fw-bolder">商品介紹</h2>
          </div>
          <p class="fs-5 lh-lg white-space-pre-line">
            {{ product.description }}
          </p>
        </div>
        <div class="my-3">
          <div class="d-flex my-5">
            <i class="fs-4 text-primary me-2 bi bi-stars"></i>
            <h2 class="fs-4 my-auto fw-bolder">使用地點</h2>
          </div>
          <div style="position: relative; padding-bottom: 56.25%; height: 0;">
            <iframe :src="product.addressEmbedCode"
              width="800" height="400"
              style="border:0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
        <hr>
        <div class="bg-light mt-4 px-3 px-xl-5 py-4 rounded-5">
          <div class="d-flex my-xl-4">
            <i class="fs-5 text-gray me-2 bi bi-pin-fill"></i>
            <h2 class="fs-5 my-auto">注意事項</h2>
          </div>
          <ul class="fs-5 lh-lg white-space-pre-line">
            ‧若購買商品為票券時
            <li>請於進入園區時，使用入口處的自動驗票閘門掃描您的QR code，以完成入園手續。</li>
            <li>
              已購買本電子票券的遊客，請務必攜帶智慧型手機，並出示您的二維碼進行掃描，
              以確保順利進入園區。請不要印製電子票券。
            </li>
            <li>如需在同一天內多次進出園區，請至出口處取得再入園手章。</li>
            <li>請留意，園區內的所有設施與表演活動可能因天候等因素而有所更改或暫停營運，故無法提前通知。</li>
            <li>此票券僅適用於園區的一般營業日，不適用於特別營業時間。</li>
            <li>旅客必須在電子券所指定的日期前往指定的園區參觀，無法自行更改入園日期或園區。</li>
            <li>
              若您在訂購後在票券有效期內需要取消訂單或變更人數、票種、園區或入園日期等資訊，
              請透過電話或電子郵件聯繫客服人員。
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-xl-4 my-3 mt-xl-3">
        <div class="card position-sticky shadow-sm p-5" style="top: 5rem;">
          <div class="mb-3 text-end">
            <span><del> NT${{ formatPrice(product.origin_price) }}元/{{ product.unit }} </del></span>
            <span class="fs-3 d-flex flex-nowrap justify-content-end">
              NT${{ formatPrice(product.price) }}元/{{ product.unit }}
            </span>
          </div>
          <div class="input-group mb-3 border mt-3">
            <input class="form-control border-0 text-center my-auto shadow-none"
              type="number" :min="1" value="1"
              oninput="value=value.replace(/[^\d]/g,'')" v-model="prodctQty">
          </div>
          <div class="d-flex flex-column flex-xxl-row justify-content-xxl-end mt-xl-3">
            <a href="#" class="btn btn-outline-primary btn-block rounded-0 py-2 ms-xxl-2"
              @click.prevent="addToCart(product,prodctQty)"
              :class="{ disabled:isAddingToCart }">
              加入購物車
            </a>
            <a href="#" class="btn btn-primary btn-block text-white rounded-0 py-2 mt-3 mt-xxl-0 ms-xxl-2"
              @click.prevent="toOrder(product,prodctQty)"
              :class="{ disabled:isAddingToCart }">
              立即訂購
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="row px-3 mt-5" data-aos="fade-up">
      <div class="d-flex my-4">
        <i class="fs-4 text-primary me-2 bi bi-stars"></i>
        <h2 class="fs-4 my-auto fw-bolder">其他推薦商品</h2>
      </div>
      <swiper
        :pagination="{
          clickable: true,
        }"
        :breakpoints="{
          '0': {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          '1024': {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }"
        :modules="modules"
        :navigation="true"
        :loop="true"
        class="mySwiper px-md-6"
        v-if="randomProducts.length>0"
      >
        <swiper-slide class="py-5" v-for="product in randomProducts" :key="product.id">
          <RouterLink class="text-decoration-none" :to=" `/product/${product.id}`">
            <div class="card h-100 mb-4 border-1 shadow-sm product-card-hover">
              <div style="position: relative;">
                <div>
                  <span class="fs-5 text-dark bg-white ps-2 opacity-75"
                    style="position: absolute; top: 15px; z-index: 2;">
                    <i class="bi bi-geo-alt-fill"></i>
                    {{ product.nation }}{{ product.area }}
                  </span>
                  <img :src="product.imagesUrl[0]" style="height: 200px; z-index: 1;"
                  class="card-img-top object-fit-cover" alt="product-img">
                </div>
              </div>
              <div class="card-body">
                <span class="fs-5 text-primary">
                  <i class="bi bi-play-fill"></i>
                  {{ product.category }}
                </span>
                <h4 class="card-text text-dark my-2">{{ product.title }}</h4>
                <p>{{ product.feature }}</p>
                <p class="fs-5 text-primary fw-bolder">
                  <del style="color: rgb(196, 196, 196);"> NT${{ formatPrice(product.origin_price) }}</del><br>
                  NT${{ formatPrice(product.price) }}
                </p>
              </div>
            </div>
          </RouterLink>
        </swiper-slide>
      </swiper>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/stores/productStore'
import cartStore from '@/stores/cartStore'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { EffectFade, FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules'

export default {
  data () {
    return {
      prodctQty: 1,
      dataLoaded: false,
      thumbsSwiper: null,
      modules: [EffectFade, FreeMode, Navigation, Thumbs, Pagination]
    }
  },
  computed: {
    ...mapState(productStore, ['products']),
    ...mapState(productStore, ['product']),
    ...mapState(productStore, ['isLoading']),
    ...mapState(cartStore, ['isAddingToCart']),
    items () {
      return ['Slide 1', 'Slide 2', 'Slide 3']
    },
    randomProducts () {
      if (!this.dataLoaded) return []
      const shuffledProducts = JSON.parse(JSON.stringify(this.products))
      for (let i = shuffledProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]]
      }
      return shuffledProducts.slice(0, 5)
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(cartStore, ['updateQty']),
    ...mapActions(productStore, ['getAllProductsList']),
    ...mapActions(productStore, ['getProductList']),
    ...mapActions(productStore, ['formatPrice']),
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    async toOrder (product, prodctQty) {
      await this.addToCart(product, prodctQty)
      this.$router.push('/cart')
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  watch: {
    $route () {
      if (this.$route.params.id != null) {
        window.scrollTo(0, 0)
        const { id } = this.$route.params
        this.getAllProductsList()
        this.getProductList(id)
        this.dataLoaded = true
      }
    }
  },
  mounted () {
    const { id } = this.$route.params
    this.getAllProductsList()
    this.getProductList(id)
    this.dataLoaded = true
  }
}
</script>

<style scoped>
.product-first-swiper {
  height: 800px;
  @media (max-width: 768px) {
    height: 200px;
  }
  @media (min-width: 768px) {
    height: 360px;
  }
  @media (min-width: 992px) {
    height: 780px;
  }
}

.product-second-swiper {
  height: 140px;
  @media (max-width: 768px) {
    height: 40px;
  }
  @media (min-width: 768px) {
    height: 56px;
  }
  @media (min-width: 992px) {
    height: 140px;
  }
}
.swiper-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.swiper-slide .swiper-img-container img {
  width: auto;
  max-width: 100%;
}
</style>
