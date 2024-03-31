<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-4 mt-5">
        <h1 class="h3 mb-3 font-weight-normal">
        請先登入
        </h1>
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
              placeholder="name@example.com"
              v-model="user.username" @keyup.enter="login"
              required autofocus>
            <label for="username">Email address</label>
          </div>

          <div class="form-floating">
            <input type="password" class="form-control" id="password"
              placeholder="Password"
              v-model="user.password" @keyup.enter="login"
              required >
            <label for="password">Password</label>
          </div>
          <div class="d-flex">
            <button class="btn btn-lg btn-dark w-100 mt-3" type="button" @click="goPrePage">
              返回首頁
            </button>
            <button class="btn btn-lg btn-primary w-100 mt-3 ms-3" type="button" @click="login">
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.user.username && this.user.password) {
        this.$axios.post(`${import.meta.env.VITE_API_URL}/admin/signin`, this.user)
          .then(res => {
            const { token, expired } = res.data
            document.cookie = `hexToken = ${token}; expires=${new Date(expired)};`
            this.$Swal.fire('登入成功')
            this.$router.push('/dashboard/home')
          })
          .catch(() => {
            this.$Swal.fire('請檢查帳號密碼是否有誤')
          })
      } else {
        this.$Swal.fire('請填入正確資料')
      }
    },
    goPrePage () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
