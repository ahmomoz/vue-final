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
            <div class="row">
              <div class="mb-3">
                <label for="title" class="form-label">*優惠券名稱</label>
                <input id="title" type="text" class="form-control"
                placeholder="請輸入優惠券名稱"
                v-model="coupon.title">
              </div>
              <div class="mb-3 col-md-6">
                  <label for="due_date" class="form-label">*到期時間</label>
                  <VueDatePicker v-model="currentDate"></VueDatePicker>
              </div>
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
                  placeholder="請輸入數字(例如:折20%請填80)"
                  v-model.number="coupon.percent">
              </div>
            </div>

            <div class="mb-3">
              <label for="content" class="form-label">備註(選填)</label>
              <textarea id="content" type="text" class="form-control"
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
        <button type="button" class="btn btn-primary text-light" @click="addCoupon">
        新增
        </button>
      </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import VueDatePicker from '@vuepic/vue-datepicker' // 日曆套件
import '@vuepic/vue-datepicker/dist/main.css'
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      drag: false,
      coupon: {},
      isLoading: true, // Loading效果
      currentDate: new Date()
    }
  },
  methods: {
    addCoupon () { // 新增優惠券函式
      const currentTime = new Date()
      const currentTimeInSeconds = Math.floor(currentTime.getTime() / 1000)
      this.coupon.add_date = currentTimeInSeconds
      this.coupon.due_date = Math.floor(this.currentDate.getTime() / 1000)
      // 檢查是否有勾選，若未勾選，設置為 0
      this.coupon.is_enabled = this.coupon.is_enabled || 0
      const item = this.coupon
      this.isLoading = true
      this.$axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/coupon`, { data: item })
        .then(res => {
          this.isLoading = false
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            timer: 700
          })
          this.$router.push('/dashboard/coupons')
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
  },
  components: {
    Loading,
    VueDatePicker
  }
}
</script>

<style scoped>
</style>
