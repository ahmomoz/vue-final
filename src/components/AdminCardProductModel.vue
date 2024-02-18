<template>
    <div id="productModal" ref="productModal" class="modal hide" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                <span v-if="!item.id">新增產品</span>
                <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
                </button>
                <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      url: 'https://ec-course-api.hexschool.io/v2',
      path: 'ahmomoz'
    }
  },
  methods: {
    updateProduct () { // 新增產品函式
      const item = this.item
      let url = `${this.url}/api/${this.path}/admin/product`
      let way = 'post'
      if (item.id) {
        url = `${this.url}/api/${this.path}/admin/product/${item.id}`
        way = 'put'
      };
      this.$axios[way](url, { data: item })
        .then(res => {
          alert('更新成功')
          this.$emit('hide-modal') // 更新動作結束，關掉modal
          this.$emit('get-products-list') // 再次取得產品列表，重新渲染頁面
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    deleteImg (item) { // 清除圖片
      this.$emit('delete-img', item)
    },
    imgUpload (e) { // 上傳圖片功能
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$axios.post(`${this.url}/api/${this.path}/admin/upload`, formData)
        .then(res => {
          const url = res.data.imageUrl
          this.$emit('img-url-update', url)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
