<template>
  <div id="app">
    <div class="card my-1 my-lg-4 shadow-sm">
      <div class="card-header">
        <div class="text-end py-2">
          <router-link class="btn btn-primary text-light ms-2"
            :to="'coupon/add'">
            <span class="bi bi-plus"></span>
            建立優惠券
          </router-link>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="bg-light">
            <tr class="align-middle">
              <th @click="sortBy='create_at'">折扣碼</th>
              <th>名稱</th>
              <th>折扣數</th>
              <th>狀態</th>
              <th>到期時間</th>
              <th>操作</th>
            </tr>
          </thead>

          <!--not sort-->
          <tbody v-if="sortBy==='default'">
          <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td> {{ coupon.code }} </td>
            <td> {{ coupon.title }} </td>
            <td> {{ 100-coupon.percent }}%</td>
            <td>
            <span class="text-primary" v-if="coupon.is_enabled">已啟用</span>
            <span v-else>未啟用</span>
            </td>
            <td> {{ formatDateString(coupon.due_date) }} </td>
            <td>
            <div class="btn-group">
              <router-link class="btn btn-outline-primary btn-sm"
                :to="{ name: '優惠券單一編輯頁面',
                params: { id: coupon.id }, query: { currentPage: pagination.current_page } }">詳細</router-link>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCoupon(coupon.title,coupon.id)">
                刪除
              </button>
            </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <CardPagination :pagination="pagination" @emit-getlist="getCouponList" />
      </div>
    </div>
  </div>
</template>

<script>
import CardPagination from '@/components/CardPagination.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import moment from 'moment'
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      sortBy: 'default',
      ascending: true,
      allCoupons: [],
      coupons: [],
      pagination: {},
      isLoading: true
    }
  },
  methods: {
    getCouponList (page = 1) {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/coupons?page=${page}`)
        .then(res => {
          const { coupons, pagination } = res.data
          this.allCoupons = coupons
          this.coupons = coupons
          this.pagination = pagination
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
    deleteCoupon (title, id) {
      this.$Swal.fire({
        title: '即將刪除優惠券',
        text: `確定要刪除「${title}」嗎？`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#eb5a68',
        cancelButtonColor: '#8bafd7',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/coupon/${id}`)
            .then(_res => {
              this.$Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '已刪除',
                showConfirmButton: false,
                timer: 700
              })
              this.getCouponList()
            })
            .catch(err => {
              this.$Swal.fire({
                icon: 'error',
                title: err.response.data.message
              })
            })
        }
      })
    },
    formatDateString (date) {
      return moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    sortOrders () {
      const newOrders = [...this.orders].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newOrders
    }
  },
  mounted () {
    this.getCouponList()
  },
  components: {
    CardPagination,
    Loading
  }
}
</script>

  <style scoped>
  </style>
