<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-sm-4">
                <div class="mb-2">
                    <div class="mb-3">
                        <h5>主要圖片</h5>
                        <img class="img-fluid" :src="product.imageUrl">
                        <h5 class="mt-3">更多圖片</h5>
                        <template v-for="(img, key) in product.imagesUrl" :key="'image_' + key">
                            <img class="img-fluid w-50" :src="img">
                        </template>
                    </div>
                </div>
            </div>
        <div class="col-sm-8">
            <div class="mb-3">
                <span class="badge bg-primary mb-1">{{ product.category }}</span>
                <h5 class="card-title">{{ product.title }}</h5>
            </div>
            <div class="row">
                <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label"><del>原價$ {{ product.origin_price }}</del></label>
                </div>
                <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">特價$ {{ product.price }}</label>
                </div>
            </div>
            <hr>
            <div class="mb-3">
                <h5>產品描述</h5>
                {{ product.description }}
            </div>
            <div class="mb-3">
                <h5>產品說明</h5>
                {{ product.content }}
            </div>
            <div class="mb-3">
            </div>
        </div>
        </div>
    </div>
    <div class="text-end mb-5">
        <button type="button" class="btn btn-primary mx-3" @click="toPrePage">
        返回前頁
        </button>
        <button type="button" class="btn btn-primary" @click="addToCart(product)">
        加入購物車
        </button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProductsList () { // 取得單一產品資料
      const { id } = this.$route.params
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    addToCart (product) { // 加入購物車
      const item = {
        data: {
          product_id: product.id,
          qty: 1
        }
      }
      this.$axios.post(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/cart`, item)
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '成功加入購物車',
            showConfirmButton: false,
            timer: 700
          })
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response
          })
        })
    },
    toPrePage () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.getProductsList()
  }
}
</script>

<style scoped>
</style>
