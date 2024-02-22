<template>
    <div id="app">
      <div class="card mt-lg-3 shadow-sm">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <form class="row g-2 align-items-center">
              <div class="col-auto">
                <input class="form-control" type="search" placeholder="搜尋訂單編號" aria-label="Search" v-model="searchInput">
              </div>
              <div class="col-auto">
                <button class="btn btn-outline-primary" type="submit" @click="orderSearch">搜尋</button>
              </div>
            </form>
          </div>
        </nav>
      </div>
      <div class="card my-1 my-lg-4 shadow-sm">
        <div class="card-header">
          <div class="text-end">
              <button type="button" class="btn btn-primary text-white"
              @click="ascending=!ascending">
              {{ascending?"降冪":"升冪"}}排序
              </button>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-hover">
              <thead class="bg-light">
              <tr class="align-middle">
                  <th @click="sortBy='create_at'">訂單編號
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up ms-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/></svg></th>
                  <th>訂購者</th>
                  <th>訂購商品</th>
                  <th @click="sortBy='total'">
                    金額
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up ms-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/></svg>
                  </th>
                  <th>狀態</th>
                  <th>訂單成立時間</th>
                  <th>操作</th>
              </tr>
              </thead>
              <!--not sort-->
              <tbody v-if="sortBy==='default'">
              <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
              <tr v-for="order in orders" :key="order.id">
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
                    :to="'order/'+ order.id">詳細</router-link>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteOrder(order.create_at,order.id)">
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
              <card-pagination :pagination="pagination" @emit-getlist="getOrderList"></card-pagination>
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
      allOrders: [],
      orders: [],
      searchInput: '', // 初始化搜尋框輸入字串
      pagination: {},
      isLoading: true // Loading效果
    }
  },
  methods: {
    getOrderList (page = 1) { // 取得訂單資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/orders?page=${page}`)
        .then(res => {
          const { orders, pagination } = res.data
          this.allOrders = orders
          this.orders = orders
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
    deleteOrder (title, id) {
      this.$Swal.fire({
        title: '即將刪除訂單',
        text: `確定要刪除「${title}」嗎？`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#eb5a68',
        cancelButtonColor: '#8bafd7',
        confirmButtonText: '確定刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/order/${id}`)
            .then(_res => {
              this.$Swal.fire({
                title: '已刪除',
                icon: 'success'
              })
              this.getOrderList() // 重新取得訂單列表
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
    orderSearch () { // 訂單編號搜尋
      this.orders = this.ordersFilteredResults
    },
    formatDateString (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    sortOrders () {
      const newOrders = [...this.orders].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newOrders
    },
    ordersFilteredResults () {
      const newOrders = this.allOrders.filter(order => {
        const createAt = String(order.create_at)
        return createAt.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      return newOrders
    }
  },
  mounted () {
    this.getOrderList()
  },
  components: {
    CardPagination,
    Loading
  }
}
</script>

  <style scoped>
  </style>
