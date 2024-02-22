<template>
  <h5>新增產品</h5>
  <div>
    <div>
        <div class="row">
        <div class="col-sm-4">
            <div class="mb-2">
            <div class="mb-3">
                <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="text" class="form-control mb-3" placeholder="請輸入圖片連結" v-model="product.imageUrl">
                <img class="img-fluid" :src="product.imageUrl" alt="商品主要圖片">
            </div>
            <h4 class="mb-3">新增多張圖片</h4>
                <div class="mb-3">
                  <h5>上傳圖片</h5>
                  <input type="file" id="file" placeholder="請輸入圖片連結" @change="imgUpload($event)">
                </div>
                <div class="mb-1">
                <div class="mb-3">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input type="text" class="form-control"
                    placeholder="請輸入圖片連結" v-model="product.imagesUrl[key]"
                    v-for="(img, key) in product.imagesUrl" :key="'image_' + key">
                </div>
                <template v-for="(img, key) in product.imagesUrl" :key="'image_' + key">
                    <img class="img-fluid w-50" :src="img" alt="商品圖片">
                </template>
                </div>
            </div>
            <div>
            <button class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImg">
                刪除圖片
            </button>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="product.title">
            </div>

            <div class="mb-3">
            <label for="feature" class="form-label">特色標語</label>
            <input id="feature" type="text" class="form-control" placeholder="請輸入特色標語" v-model="product.feature">
            </div>

            <div class="row">
            <div class="mb-3 col-md-6">
                <label for="nation" class="form-label">地區</label>
                <input id="nation" type="text" class="form-control"
                placeholder="請輸入地區" v-model="product.nation">
            </div>
            <div class="mb-3 col-md-6">
                <label for="area" class="form-label">縣市</label>
                <input id="area" type="text" class="form-control" placeholder="請輸入縣市" v-model="product.area">
            </div>
            </div>

            <div class="row">
            <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control"
                placeholder="請輸入分類" v-model="product.category">
            </div>
            <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
            </div>
            </div>

            <div class="row">
            <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="product.origin_price">
            </div>
            <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control"
                placeholder="請輸入售價" v-model.number="product.price">
            </div>
            </div>
            <hr>

            <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea id="description" type="text" class="form-control"
                        placeholder="請輸入產品描述" rows="8" v-model="product.description">
            </textarea>
            </div>
            <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea id="description" type="text" class="form-control"
                        placeholder="請輸入說明內容" v-model="product.content">
            </textarea>
            </div>
            <div class="mb-3">
            <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                :true-value="1" :false-value="0" v-model="product.is_enabled">
                <label class="form-check-label" for="is_enabled">是否上架</label>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="text-end mb-5">
        <button type="button" class="btn btn-outline-secondary mx-2" @click="goBack">
        取消
        </button>
        <button type="button" class="btn btn-primary" @click="addProduct">
        新增
        </button>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default {
  data () {
    return {
      product: {
        imagesUrl: []
      },
      isLoading: true // Loading效果
    }
  },
  methods: {
    addProduct () { // 上傳產品函式
      const item = this.product
      this.isLoading = true
      this.$axios.post(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/product`, { data: item })
        .then(res => {
          this.isLoading = false
          this.$Swal.fire({
            icon: 'success',
            title: '新增成功'
          })
          this.$router.push('/admin/products')
        })
        .catch(err => {
          this.isLoading = false
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    deleteImg (item) { // 清除圖片
      this.product.imagesUrl = ['']
    },
    imgUrlUpdate (url) { // 上傳圖片
      if (this.product.imagesUrl[0] === '') {
        this.product.imagesUrl[0] = url
      } else {
        this.product.imagesUrl.push(url)
      }
    },
    imgUpload (e) { // 上傳圖片功能
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$axios.post(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/admin/upload`, formData)
        .then(res => {
          const url = res.data.imageUrl
          this.imgUrlUpdate(url)
        })
        .catch(err => {
          alert(err.response.data.message)
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
    Loading
  }
}
</script>

<style scoped>
</style>
