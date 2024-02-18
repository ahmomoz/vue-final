<template>
  <div id="app">
    <div class="card my-1 my-lg-4 shadow-sm">
      <div class="card-header">
        <div class="text-end">
            <button type="button" class="btn btn-info text-white mx-3"
            @click="ascending=!ascending">
            {{ascending?"降冪":"升冪"}}排序
            </button>
            <button class="btn btn-primary"
            @click="openProductModal('')">
            建立新的產品
            </button>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-hover">
            <thead class="bg-light">
            <tr class="align-middle">
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120" @click="sortBy='origin_price'">原價</th>
                <th width="120" @click="sortBy='price'">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
            </tr>
            </thead>
            <!--not sort-->
            <tbody v-if="sortBy==='default'">
            <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
            <tr v-for="product in products" :key="product.id">
                <td> {{ product.category }}</td>
                <td> {{ product.title }}</td>
                <td> {{ product.origin_price }} </td>
                <td> {{ product.price }} </td>
                <td>
                <span class="text-success" v-if="product.is_enabled">啟用</span>
                <span v-else>未啟用</span>
                </td>
                <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openProductModal(product,'edit')">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openProductModal(product,'del')">
                  刪除
                </button>
                </div>
                </td>
            </tr>
            </tbody>
            <!--sort-->
            <tbody v-else>
            <tr v-for="product in sortProducts" :key="product.name">
                <td> {{ product.category }}</td>
                <td> {{ product.title }}</td>
                <td> {{ product.origin_price }} </td>
                <td> {{ product.price }} </td>
                <td>
                <span class="text-success" v-if="product.is_enabled">啟用</span>
                <span v-else>未啟用</span>
                </td>
                <td>
                  <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm" @click="openProductModal(product,'edit')">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="openProductModal(product,'del')">
                    刪除
                  </button>
              </div>
                </td>
            </tr>
            </tbody>
        </table>
      </div>
      <div class="card-footer">
        <card-pagination :pagination="pagination" @emit-getproductslist="getProductsList"></card-pagination>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <admin-card-product-model
    :item="tempProduct"
    @hide-modal="hideModal"
    @get-products-list="getProductsList"
    @delete-img="deleteImg"
    @img-url-update="imgUrlUpdate"
    ref="productModal">
  </admin-card-product-model>
  <admin-card-delete-model
    :item="tempProduct"
    @hide-delete-modal="hideDeleteModal"
    @get-products-list="getProductsList"
    ref="delProductModal">
  </admin-card-delete-model>
  <!-- Modal -->
</template>

<script>
import CardPagination from '@/components/CardPagination.vue' // 分頁元件
import AdminCardProductModel from '@/components/AdminCardProductModel.vue' // 編輯商品元件
import AdminCardDeleteModel from '@/components/AdminCardDeleteModel.vue' // 刪除商品元件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  data () {
    return {
      sortBy: 'default',
      ascending: true,
      products: [],
      productsDetail: {},
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      isLoading: true, // Loading效果
      modal: {
        productModal: '',
        delProductModal: ''
      }
    }
  },
  methods: {
    getProductsList (page = 1) { // 取得產品資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/products?page=${page}`)
        .then(res => {
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    openProductModal (product, method) { // 開啟Modal
      if (product && method === 'del') { // 刪除
        this.tempProduct = { ...product }
        const delComponent = this.$refs.delProductModal
        delComponent.openModal()
      } else if (product && method === 'edit') { // 編輯
        this.tempProduct = { ...product }
        const productComponent = this.$refs.productModal
        productComponent.openModal()
      } else { // 新增
        this.tempProduct = {
          imagesUrl: ['']
        }
        const productComponent = this.$refs.productModal
        productComponent.openModal()
      }
    },
    deleteImg (item) { // 清除圖片
      this.tempProduct.imagesUrl = ['']
    },
    imgUrlUpdate (url) {
      if (this.tempProduct.imagesUrl[0] === '') {
        this.tempProduct.imagesUrl[0] = url
      } else {
        this.tempProduct.imagesUrl.push(url)
      }
    },
    hideModal () {
      const productComponent = this.$refs.productModal
      productComponent.hideModal()
    },
    hideDeleteModal () {
      const delComponent = this.$refs.delModal
      delComponent.hideModal()
    }
  },
  computed: {
    sortProducts () {
      const newProducts = [...this.products].sort((a, b) => {
        return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy]
      })
      return newProducts
    }
  },
  mounted () {
    this.getProductsList()
    console.log(this.$refs)
  },
  components: {
    CardPagination,
    AdminCardProductModel,
    AdminCardDeleteModel,
    Loading
  }
}
</script>

<style scoped>
</style>
