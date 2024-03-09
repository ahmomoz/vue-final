<template>
  <!--navbar-->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top ps-lg-7 py-3 bg-white opacity-75">
    <div class="container-fluid">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <RouterLink to="/home" class="nav-link link-hover fs-5 header-nav-link" exact>首頁</RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/dashboard/home" class="nav-link link-hover fs-5 header-nav-link">後台</RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/products" class="nav-link link-hover fs-5 header-nav-link" >商品列表</RouterLink>
          </li>
          <li class="nav-item mx-3">
            <RouterLink to="/cart" class="nav-link link-hover fs-5 header-nav-link">購物車</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--main-->
  <RouterView />
  <!--footer-->
  <footer class="pt-8 pb-5 bg-light text-gray">
    <ul class="list-unstyled d-lg-flex justify-content-lg-around">
      <li class="p-3 text-center">
        <RouterLink to="/home"><img style="width: 75%;" class="object-fit" src="@/assets/images/logo/logo.png" alt="logo"></RouterLink>
      </li>
      <li class="p-3">
        <p class="h5 link-gray">聯絡我們</p>
        <p>
          電話 : (02) 1234-5678<br>
          E-mail : x5426854268@gmail.com<br>
          MON - FRI : 8:30 am - 17:30 pm
        </p>
        <ul class="list-unstyled d-flex">
          <li>
            <a class="pe-3 link-primary" href="#"><i class="h2 bi bi-facebook"></i></a>
          </li>
          <li>
            <a class="pe-3 link-primary" href="#"><i class="h2 bi bi-instagram"></i></a>
          </li>
          <li>
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
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$router.push('/home')
  }
}
</script>

<style scoped>

</style>
