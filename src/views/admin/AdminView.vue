<template>
  <header class="navbar navbar-dark sticky-top flex-wrap flex-md-nowrap shadow bg-primary">
    <RouterLink to="/dashboard/home" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 ">療遇 - 後台</RouterLink>
    <button class="navbar-toggler d-md-none me-2 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
  </header>
  <div class="container">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <RouterLink to="/dashboard/home" class="nav-link active">
              <i class="bi bi-house fs-4 me-2"></i>
              首頁
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/orders" class="nav-link">
              <i class="bi bi-filter-square fs-4 me-2"></i>
              訂單列表
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/products" class="nav-link">
              <i class="bi bi-handbag fs-4 me-2"></i>
              商品管理
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/articles" class="nav-link">
              <i class="bi bi-card-text fs-4 me-2"></i>
              貼文管理
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/coupons" class="nav-link">
              <i class="bi bi-tags fs-4 me-2"></i>
              優惠券管理
          </RouterLink>
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
          this.$router.push('/dashboard') // 有token自動跳轉
        }
      } else {
        this.$router.push('/adminLogin')
      }
    },
    signOut () { // 登出函式
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
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    width: 200px;
    z-index: 1000;
    height: 100vh;
}
</style>
