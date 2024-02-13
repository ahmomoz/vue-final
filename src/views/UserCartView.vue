<template>
    <div class="row mt-5">
        <!--購物車-->
        <div class="col-md-5">
            <h2>商品購物車</h2>
            <div class="mb-2" v-if="cartList.length>0"><button class="btn btn-outline-danger" type="button" @click="deleteCart">清空購物車</button></div>
            <table class="table">
                <thead>
                <tr>
                    <th></th>
                    <th>品名</th>
                    <th>數量/單位</th>
                    <th class="text-end">單價</th>
                    <th class="text-end">小計</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="product in cartList" :key="product.id">
                    <td><button class="btn btn-sm btn-outline-danger text-end" type="button" @click="deleteProduct(product)">X</button></td>
                    <td>{{ product.product.title }}</td>
                    <td class="w-25">
                        <div class="input-group input-group-sm">
                            <input :min="1" type="number" class="form-control"
                            :value="product.qty"
                            @blur="updateQty(product, $event)">
                            <span class="input-group-text" id="basic-addon2">{{ product.product.unit }}</span>
                        </div>
                    </td>
                    <td class="text-end">{{ product.product.price }}</td>
                    <td class="text-end">{{ product.final_total }}</td>
                </tr>
                </tbody>
                <tfoot v-if="cartList.length>0">
                    <tr>
                    <td colspan="4" class="text-end">總計</td>
                    <td class="text-end">{{ totalPrice }}</td>
                    </tr>
                </tfoot>
            </table>
            <div v-if="cartList.length===0" class="text-white d-flex align-items-center justify-content-center" style="height:300px; background-color: rgba(94, 94, 94, 0.65); z-index: 100;">購物車目前沒有商品</div>
        </div>
        <!--表單驗證-->
        <div class="col-md-6 mb-5">
            <h2>建立訂單</h2>
            <VeeForm ref="form" v-slot="{ errors }" @submit="''">
                <div class="mb-3">
                    <label for="email" class="form-label">*Email</label>
                    <VeeField id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"
                    ></VeeField>
                    <error-message name="email" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">*收件人姓名</label>
                    <VeeField id="name" name="姓名" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VeeField>
                    <error-message name="姓名" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">*收件人電話</label>
                    <VeeField id="tel" name="電話" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></VeeField>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">*收件人地址</label>
                    <VeeField id="address" name="地址" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model="form.user.address"></VeeField>
        <error-message name="地址" class="invalid-feedback"></error-message>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-danger" @click="addOrder">送出訂單</button>
                </div>
            </VeeForm>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cartList: [], // 購物車列表
      tempProduct: [],
      tempCartList: [],
      totalPrice: 0,
      isLoading: true, // Loading效果
      form: { // 送出訂單資訊用表格資料
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      createOrder: {}
    }
  },
  methods: {
    getCartList () { // 取得購物車產品資料
      this.isLoading = true
      this.$axios.get(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/cart`)
        .then(res => {
          this.cartList = res.data.data.carts
          this.totalPrice = res.data.data.total
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    updateQty (product, event) { // 更新商品數量
      const newQty = parseInt(event.target.value, 10)
      const item = {
        data: {
          product_id: product.id,
          qty: newQty
        }
      }
      this.$axios.put(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/cart/${product.id}`, item)
        .then(res => {
          this.getCartList()
        })
        .catch(err => {
          this.$Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    deleteProduct (product) { // 刪除某項產品
      this.isLoading = true
      this.$axios.delete(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/cart/${product.id}`)
        .then(res => {
          this.$Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '已刪除',
            showConfirmButton: false,
            timer: 700
          })
          this.getCartList()
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
    deleteCart () { // 清空購物車
      this.$Swal.fire({
        title: '確定要清空購物車嗎？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/carts`)
            .then(res => {
              this.$Swal.fire({
                title: '已清空購物車',
                icon: 'success'
              })
              this.getCartList()
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
    addOrder () { // 送出訂單
      if (this.cartList.length > 0) {
        const item = this.form
        this.isLoading = true
        this.$axios.post(`${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_APIPATH}/order`, { data: item })
          .then(res => {
            this.$Swal.fire({
              title: '訂單送出成功',
              icon: 'success'
            })
            this.getCartList()
            this.cartList = ''
            this.form =
                    {
                      user: {
                        email: '',
                        name: '',
                        tel: '',
                        address: ''
                      },
                      message: ''
                    }
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
      } else {
        this.$Swal.fire({
          icon: 'error',
          title: '購物車不得為空'
        })
      }
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

<style scoped>
</style>
