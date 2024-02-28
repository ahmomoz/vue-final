<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top ps-lg-7 pt-4" :class="{ 'bg-light opacity-75': isMenuOpen, 'bg-transparent': !isMenuOpen }">
    <div class="container-fluid">
      <!--<a class="navbar-brand" href="#">
        <img height="30" src="" alt="">
      </a>-->
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <RouterLink to="/home" class="nav-link fs-5 header-nav-link" exact>首頁</RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/dashboard/home" class="nav-link fs-5 header-nav-link">後台</RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/products" class="nav-link fs-5 header-nav-link" >商品列表</RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/cart" class="nav-link fs-5 header-nav-link">購物車</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script>
export default {
  data () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped>

</style>
