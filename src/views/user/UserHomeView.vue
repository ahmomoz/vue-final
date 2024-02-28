<template>
  <!--Header區塊-->
  <header class="container-fluid">
    <div class="row d-flex justify-content-between my-lg-7">
      <div class="col-lg-2">
        <h1 class="lh-base fs-1 text-gray letter-spacing-7 text-vrl py-7 m-auto">和<span class="text-primary">小動物</span>們相遇，<br>
          &nbsp;&nbsp;&nbsp;&nbsp;來場<span class="text-primary">治癒身心</span>的輕旅行。</h1>
      </div>
      <div class="col-lg-10 mb-lg-2">
        <div class="text-end">
          <RouterLink to="/home"><img class="img-fluid" src="@/assets/images/logo/logo.png" alt="logo"></RouterLink>
        </div>
        <swiper
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
          <swiper-slide><img src="@/assets/images/banner/indexBanner-3.jpg" alt="banner"></swiper-slide>
        </swiper>
      </div>
    </div>
  </header>
  <!--About區塊-->
  <section class="container-fluid about-fixed-background rounded-5">
    <div class="row mb-lg-7 gradient-border">
      <div class="col px-5">
        <div class="text-gray d-lg-flex justify-content-lg-center py-7 py-lg-10">
          <h2 class="lh-base fs-1 text-gray letter-spacing-7 text-lg-vrl py-5"><img src="@/assets/images/image/leaf-white.png" alt="logo" class="img-fluid">關於療遇</h2>
          <p class="text-center lh-lg fs-3 text-gray my-auto px-lg-5">小動物 x 旅行 = 治癒身心<br>療遇是一個專為喜愛動物的人們打造各種動物旅遊方案的團隊<br>我們準備了動物村、動物園、鳥園、海生館、水族館等旅遊方案<br>並以最實惠的價格提供給各位<br>如果您也覺得生活沒有趣味、日子過得有些疲憊<br>不妨來場與動物之間的約會</p>
        </div>
      </div>
    </div>
  </section>
  <!--Category區塊-->
  <section class="container mt-5 p-lg-0">
    <h2 class="lh-base fs-2 text-gray text-center mb-lg-5"><img src="@/assets/images/image/leaf-primary.png" alt="logo" class="img-fluid">以心儀的種類進行搜尋</h2>
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="image-container">
          <img style="width: 100%;height: 100%;" class="object-fit" src="@/assets/images/image/zoo.jpg" alt="zoo">
          <div class="overlay"></div>
          <div class="hover-card">
            <p class="fs-3 m-0">動物園</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="image-container">
          <img style="width: 100%;height: 100%;" class="object-fit" src="@/assets/images/image/settlement.jpg" alt="settlement">
          <div class="overlay"></div>
          <div class="hover-card">
            <p class="fs-3 m-0">動物村 / 動物聚落</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-lg-3">
      <div class="col-lg-4 col-12">
        <div class="image-container">
        <img style="width: 100%;height: 100%;" class="object-fit" src="@/assets/images/image/animalsfarm.jpg" alt="animals-farm">
        <div class="overlay"></div>
          <div class="hover-card">
            <p class="fs-3 m-0">動物農場</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="image-container">
          <img style="width: 100%;height: 100%;" class="object-fit" src="@/assets/images/image/aquarium.jpg" alt="aquarium">
          <div class="overlay"></div>
          <div class="hover-card">
            <p class="fs-3 m-0">水族館</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="image-container">
        <img style="width: 100%;height: 100%;" class="object-fit" src="@/assets/images/image/birdpark.jpg" alt="bird-park">
        <div class="overlay"></div>
          <div class="hover-card">
            <p class="fs-3 m-0">鳥園</p>
          </div>
      </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules'

export default {
  data () {
    return {
      modules: [EffectFade, Autoplay, Navigation, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<style scoped>
</style>
