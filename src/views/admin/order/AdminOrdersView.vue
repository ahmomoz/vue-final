<template>
  <div id="app">
    <div class="card mt-lg-3 shadow-sm">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <form class="row g-2 align-items-center">
            <div class="col-auto">
              <input
                class="form-control"
                type="search"
                placeholder="搜尋訂單編號"
                aria-label="Search"
                v-model="searchInput">
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-primary" type="button"
                @click="orderSearch">搜尋
              </button>
            </div>
          </form>
        </div>
      </nav>
    </div>
    <div class="card my-1 my-lg-4 shadow-sm">
      <div class="card-header">
        <div class="text-end py-2">
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
                <span class="bi bi-arrow-down-up ms-1"></span>
              </th>
              <th>訂購者</th>
              <th>訂購商品</th>
              <th @click="sortBy='total'">
                金額
                <span class="bi bi-arrow-down-up ms-1"></span>
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
                <td> NT${{ (order.total).toFixed(0) }} </td>
                <td>
                  <span class="text-primary" v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </td>
                <td> {{ formatDateString(order.user.date) }} </td>
                <td>
                <div class="btn-group">
                  <router-link class="btn btn-outline-primary btn-sm"
                    :to="{ name: '訂單詳細頁面',
                    params: { id: order.id }, query: { currentPage: pagination.current_page } }">
                    詳細
                  </router-link>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="deleteOrder(order.create_at,order.id)">
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
                  :to="{ name: '訂單詳細頁面',
                  params: { id: order.id }, query: { currentPage: pagination.current_page } }">
                  詳細
                </router-link>
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="deleteOrder(order.create_at,order.id)">
                  刪除
                </button>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <CardPagination :pagination="pagination" @emit-getlist="getOrderList" />
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
      allOrders: [],
      orders: [],
      searchInput: '',
      pagination: {},
      isLoading: true
    }
  },
  methods: {
    getOrderList (page = 1) {
      this.isLoading = true
      this.$axios.get(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/orders?page=${page}`)
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
          this.$axios.delete(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/order/${id}`)
            .then(_res => {
              this.$Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '已刪除',
                showConfirmButton: false,
                timer: 700
              })
              this.getOrderList()
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
    orderSearch () {
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
