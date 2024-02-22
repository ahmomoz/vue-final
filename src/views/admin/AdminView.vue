<template>
  <header class="navbar navbar-dark sticky-top flex-wrap flex-md-nowrap shadow bg-primary">
    <RouterLink to="/admin" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 ">療遇 - 後台</RouterLink>
    <button class="navbar-toggler d-md-none me-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
  </header>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <RouterLink to="/admin" class="nav-link active">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 2 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1 feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              首頁
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 2 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1 feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              訂單列表
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/products" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="2 2 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1 feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              商品管理
            </RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-tags me-1 feather feather-shopping-cart" viewBox="0 0 16 16"><path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/><path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/></svg>
              優惠券管理
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
          </li>
        </ul>
      </div>
      </nav>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <RouterView v-if="status" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: false
    }
  },
  methods: {
    checkAdmin () { // 檢驗身分函式
      // 取得token，檢查是否已有token紀錄
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1')
      this.$axios.defaults.headers.common.Authorization = `${token}`
      if (token) {
        if (!this.status) {
          this.$axios.post(`${import.meta.env.VITE_API_URL}/api/user/check`, { api_token: token })
            .then(res => {
              this.status = true
            })
            .catch(() => {
              this.$Swal.fire('身分驗證錯誤，跳轉至登入頁')
              this.$router.push('/adminLogin') // 跳轉至登入頁
            })
        } else {
          this.$router.push('/admin') // 有token自動跳轉
        }
      } else {
        this.$router.push('/adminLogin')
      }
    },
    signOut () {
      this.$Swal.fire('已登出')
      document.cookie = 'hexToken=;expires=;'
      this.$router.push('/adminLogin')
    }
  },
  created () {
    this.checkAdmin()
  }
}
</script>

<style scoped>
#sidebarMenu {
    min-height: 100vh;
}
</style>
