<template v-if="!isLoading">
  <nav class="navbar navbar-expand-lg navbar-light fixed-top ps-lg-7 py-3 bg-white opacity-75">
    <div class="container-fluid">
      <button class="navbar-toggler collapsed" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <RouterLink to="/" class="nav-link link-hover text-dark fs-5" exact>
              首頁
            </RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/articles" class="nav-link link-hover text-dark fs-5 header-nav-link">
              最新消息
            </RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/products" class="nav-link link-hover text-dark fs-5 header-nav-link">
              商品列表
            </RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/cart" class="nav-link link-hover text-dark fs-5 header-nav-link">
              購物車
              <span class="text-primary">
                ({{ cartListTotalQty!==0 ?  cartListTotalQty : '0' }})
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
  <footer class="pt-8 pb-5 bg-light text-primary">
    <ul class="list-unstyled d-lg-flex justify-content-lg-around">
      <li class="p-3 text-center">
        <RouterLink to="/"><img style="width: 75%;" class="object-fit footer-link-hover"
          src="@/assets/images/logo/logo.png" alt="logo">
        </RouterLink>
      </li>
      <li class="p-3">
        <p class="h5">聯絡我們</p>
        <p>
          電話 :
          <a href="tel:(02) 1234-5678" class="footer-link-hover">
          (02) 1234-5678
          </a><br>
          E-mail :
          <a href="mailto:x5426854268@gmail.com" class="footer-link-hover">
          x5426854268@gmail.com
          </a><br>
          MON - FRI : 8:30 am - 17:30 pm
        </p>
        <ul class="list-unstyled d-flex">
          <li class="footer-link-hover">
            <a class="pe-3 link-primary" href="#"><i class="h2 bi bi-facebook"></i></a>
          </li>
          <li class="footer-link-hover">
            <a class="pe-3 link-primary" href="#"><i class="h2 bi bi-instagram"></i></a>
          </li>
          <li class="footer-link-hover">
            <a class="pe-3 link-primary" href="#"><i class="h2 bi bi-envelope"></i></a>
          </li>
        </ul>
      </li>
    </ul>
    <div class="text-center mt-7">
      <p class="small text-secondary m-0">本網站僅供作品參考，並非商品真實營運販售，若有侵權請來信告知，將立即處理</p>
      <p class="small text-secondary m-0">Copyright ©Liaoyu All Rights Reserved. Designed by ahmomoz</p>
    </div>
  </footer>
  <button type="button" class="scroll-to-top-btn" @click="scrollToTop">
    <img src="@/assets/images/image/bird-to-top.png" alt="to-top-btn">
  </button>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  computed: {
    ...mapState(cartStore, ['cartList']),
    ...mapState(cartStore, ['cartListTotalQty'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList']),
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

<style scoped>
</style>
