<template>
    <div id="app">
      <div class="card my-1 my-lg-4 shadow-sm">
        <div class="card-header">
          <div class="text-end">
              <button type="button" class="btn btn-primary text-white"
              @click="ascending=!ascending">
              {{ascending?"降冪":"升冪"}}排序
              </button>
              <router-link class="btn btn-primary text-light ms-2"
                  :to="'coupon/add'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="4 4 12 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
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
                  <th>最後更新時間<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up ms-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/></svg></th>
                  <th>操作</th>
              </tr>
              </thead>
              <!--not sort-->
              <tbody v-if="sortBy==='default'">
              <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
              <tr v-for="coupon in coupons" :key="coupon.id">
                  <td> {{ coupon.code }} </td>
                  <td> {{ coupon.title }} </td>
                  <td> {{ coupon.percent }}%</td>
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
              <!--sort-->
              <tbody v-else>
                <tr v-for="order in sortOrders" :key="order.id">
                  <td> {{ order.create_at }} </td>
                  <td> {{ order.user.name}} </td>
                  <td>
                    <template v-for="product in order.products" :key="product.id">
                        {{ product.product.title }} x{{ product.qty }}<br>
                    </template>
                    </td>
                  <td> NT${{ order.total }} </td>
                  <td>
                  <span class="text-primary" v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                  </td>
                  <td> {{ formatDateString(order.user.date) }} </td>
                  <td>
                  <div class="btn-group">
                    <router-link class="btn btn-outline-primary btn-sm"
                    :to="{ name: 'order-details', params: { id: order.id, currentPage: $route.fullPath } }">詳細</router-link>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteOrder(order.create_at,order.id)">
                      刪除
                    </button>
                  </div>
                  </td>
              </tr>
              </tbody>
          </table>
        </div>
        <div class="card-footer d-flex justify-content-center">
              <card-pagination :pagination="pagination" @emit-getlist="getCouponList"></card-pagination>
        </div>
      </div>
    </div>
  </template>

<script>
import CardPagination from '@/components/CardPagination.vue' // 分頁元件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import moment from 'moment' // 日期轉換套件

export default {
  data () {
    return {
      sortBy: 'default',
      ascending: true,
      allCoupons: [],
      coupons: [],
      pagination: {},
      isLoading: true // Loading效果
    }
  },
  methods: {
    getCouponList (page = 1) { // 取得優惠券資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/coupons?page=${page}`)
        .then(res => {
          const { coupons, pagination } = res.data
          this.allCoupons = coupons
          this.coupons = coupons
          this.pagination = pagination
          console.log(this.coupons)
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
          this.$axios.delete(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/coupon/${id}`)
            .then(_res => {
              this.$Swal.fire({
                title: '已刪除',
                icon: 'success'
              })
              this.getCouponList() // 重新取得優惠券列表
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
