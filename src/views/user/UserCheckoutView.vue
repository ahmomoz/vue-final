<template>
  <main class="container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10">
    <div class="text-center mt-5">
      <img class="img-fluid" src="@/assets/images/cart-step/step3.png" alt="step-img">
    </div>
    <div class="row text-center">
      <div class="py-5 col-md-12">
        <h2>已成功送出訂單</h2>
        <p>非常感謝您的訂購，有任何問題歡迎來信詢問。</p>
        <RouterLink to="/" class="btn btn-outline-dark me-2 rounded-0" exact>回到首頁</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true // Loading效果
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

  <style scoped>
  </style>
