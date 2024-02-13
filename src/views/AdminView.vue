<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/admin" class="navbar-brand">後台首頁</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active">返回前台首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/products" class="nav-link">後台產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/order" class="nav-link">後台訂單列表</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>

<script>
export default {
  methods: {
    checkAdmin () { // 檢驗身分函式
      // 取得token，檢查是否已有token紀錄
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1')
      this.$axios.defaults.headers.common.Authorization = `${token}`
      if (token) {
        this.$axios.post(`${import.meta.env.VITE_API_URL}/api/user/check`, { api_token: this.token })
          .then(res => {
            this.$router.push('/admin') // 有token自動跳轉
          })
          .catch(() => {
            this.$Swal.fire('身分驗證錯誤，跳轉至登入頁')
            this.$router.push('/adminLogin') // 跳轉至登入頁
          })
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
  mounted () {
    this.checkAdmin()
  }
}
</script>

<style scoped>
</style>
