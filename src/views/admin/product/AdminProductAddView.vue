<template>
  <div class="container">
    <h1 class="fs-3 mt-3">新增產品</h1>
      <div class="mx-auto">
        <!--圖片區塊-->
        <div class="card mt-4 shadow-sm">
          <div class="card-header">
            <h5 class="my-1">圖片資訊</h5>
          </div>
          <div class="card-body">
              <loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
              <div class="mb-3">
                <p>上傳圖片</p>
                <input type="file" id="file" placeholder="請輸入圖片連結"
                  @change="imgUpload($event)">
              </div>
              <!--圖片拖曳區塊-->
              <div class="border-dashed-blue mb-3">
                <p class="m-0 text-primary px-2">*第一張圖為商品主圖</p>
                <div class="py-5 bg-light" v-if="!product.imagesUrl[0]">
                  <p class="px-2">請上傳圖片</p>
                </div>
                <draggable
                  class="row px-2"
                  v-model="product.imagesUrl"
                  group="images"
                  itemKey="index"
                  @start="drag=true"
                  @end="drag=false"
                >
                  <template #item="{ element, index }">
                    <div class="mb-3" style="max-width: 160px;">
                      <div class="text-end" @click="deleteImg(index)" v-if="product.imagesUrl[0]">
                        <span class="bi bi-dash-circle-fill" style="color: rgb(180, 81, 81)"></span>
                      </div>
                      <img class="img-fluid" :src="element" alt="商品圖片"
                        style="height: 100px;"
                        @mouseover="changeCursor(true)"
                        @mouseleave="changeCursor(false)">
                    </div>
                  </template>
                </draggable>
              </div>

              <button class="btn btn-outline-primary btn-sm d-block w-100 mb-2"
                @click="deleteAllImg" v-if="product.imagesUrl[0]">
                  刪除所有圖片
                </button>
          </div>
        </div>
        <!--商品基本資訊區塊-->
        <div class="card mt-4 shadow-sm">
          <div class="card-header">
            <h5 class="my-1">基本資訊</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="title" class="form-label">*標題</label>
              <input id="title" type="text" class="form-control"
              placeholder="請輸入標題"
              v-model="product.title">
            </div>

            <div class="mb-3">
              <label for="feature" class="form-label">*特色標語</label>
              <input id="feature" type="text" class="form-control"
              placeholder="請輸入特色標語"
              v-model="product.feature">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                  <label for="nation" class="form-label">*地區</label>
                  <input id="nation" type="text" class="form-control"
                  placeholder="請輸入地區"
                  v-model="product.nation">
              </div>
              <div class="mb-3 col-md-6">
                  <label for="area" class="form-label">*縣市</label>
                  <input id="area" type="text" class="form-control"
                  placeholder="請輸入縣市"
                  v-model="product.area">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">*分類</label>
                  <input id="category" type="text" class="form-control"
                  placeholder="請輸入分類"
                  v-model="product.category">
              </div>
              <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">*單位</label>
                  <input id="unit" type="text" class="form-control"
                  placeholder="請輸入單位"
                  v-model="product.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">*原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control"
                  placeholder="請輸入原價"
                  v-model.number="product.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">*售價</label>
                <input id="price" type="number" min="0" class="form-control"
                placeholder="請輸入售價"
                v-model.number="product.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">*產品描述</label>
              <textarea id="description" type="text" class="form-control"
              placeholder="請輸入產品描述" rows="16"
              v-model="product.description">
              </textarea>
            </div>

            <div class="mb-3">
              <label for="content" class="form-label">*說明內容</label>
              <textarea id="description" type="text" class="form-control"
              placeholder="請輸入說明內容"
              v-model="product.content">
              </textarea>
            </div>

            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                :true-value="1" :false-value="0"
                v-model="product.is_enabled">
                <label class="form-check-label" for="is_enabled">是否上架</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--作用按鈕區塊-->
      <div class="text-end mt-3 mb-5">
        <button type="button" class="btn btn-outline-secondary mx-2"
          @click="goBack">
          取消
        </button>
        <button type="button" class="btn btn-primary text-light"
          @click="addProduct">
          確認
        </button>
      </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import draggable from 'vuedraggable' // 引入 draggable
const { VITE_API_URL, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      drag: false,
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
      this.$axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/product`, { data: item })
        .then(res => {
          this.isLoading = false
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            timer: 700
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
    deleteAllImg (item) { // 清除所有圖片
      this.product.imagesUrl = ['']
    },
    deleteImg (index) { // 清除單張圖片
      this.product.imagesUrl.splice(index, 1)
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
      this.$axios.post(`${VITE_API_URL}/api/${VITE_APIPATH}/admin/upload`, formData)
        .then(res => {
          const url = res.data.imageUrl
          this.imgUrlUpdate(url)
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    changeCursor (isHover) { // 滑鼠移到圖片時更改為拖動樣式
      const container = document.querySelector('.row.align-items-center')
      if (container) {
        container.style.cursor = isHover ? 'move' : 'auto'
      }
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
    draggable
  }
}
</script>

<style scoped>
</style>
