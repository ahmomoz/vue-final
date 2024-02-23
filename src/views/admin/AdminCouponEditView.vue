<template>
  <div class="container">
    <h1 class="fs-3 mt-3">新增優惠券</h1>
      <div class="mx-auto">
        <!--基本資訊區塊-->
        <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
        <div class="card mt-4 shadow-sm">
          <div class="card-header">
            <h5 class="my-1">基本資訊</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="title" class="form-label">*優惠券名稱</label>
              <input id="title" type="text" class="form-control"
              placeholder="請輸入優惠券名稱"
              v-model="coupon.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="code" class="form-label">*折扣碼</label>
                <input id="code" type="text" class="form-control"
                placeholder="請輸入折扣碼(例如:HAPPY800)"
                v-model="coupon.code">
              </div>
              <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">*折扣數</label>
                  <input id="origin_price" type="number" min="0" class="form-control"
                  placeholder="請輸入數字(例如:80%請填80)"
                  v-model.number="coupon.percent">
              </div>
            </div>

            <div class="mb-3">
              <label for="content" class="form-label">備註(選填)</label>
              <textarea id="description" type="text" class="form-control"
              placeholder="請輸入備註"
              v-model="coupon.content">
              </textarea>
            </div>

            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                :true-value="1" :false-value="0"
                v-model="coupon.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--作用按鈕區塊-->
      <div class="text-end mt-3 mb-5">
        <button type="button" class="btn btn-outline-secondary mx-2" @click="goBack">
        取消
        </button>
        <button type="button" class="btn btn-primary" @click="addCoupon">
        更新
        </button>
      </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  props: ['id'],
  data () {
    return {
      drag: false,
      coupon: {},
      currentPage: '',
      isLoading: true // Loading效果
    }
  },
  methods: {
    getCouponList (currentPage) { // 取得優惠券資料
      this.isLoading = true
      const { id } = this.$route.params
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/coupons?page=${currentPage}`)
        .then(res => {
          const coupons = res.data.coupons
          this.coupon = coupons.find(coupon => coupon.id.toLowerCase().includes(id.toLowerCase()))
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    addCoupon () { // 更新優惠券函式
      const currentTime = new Date()
      const currentTimeInSeconds = Math.floor(currentTime.getTime() / 1000)
      this.coupon.due_date = currentTimeInSeconds
      const item = this.coupon
      this.isLoading = true
      this.$axios.put(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/coupon/${this.coupon.id}`, { data: item })
        .then(res => {
          this.isLoading = false
          this.$Swal.fire({
            icon: 'success',
            title: '更新成功'
          })
          this.$router.push('/admin/conpons')
        })
        .catch(err => {
          this.isLoading = false
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.isLoading = false
    this.getCouponList(this.$route.query.currentPage)
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
</style>
