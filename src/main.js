import './assets/main.css'

import axios from 'axios'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// sweetalert套件
import Swal from 'sweetalert2'
// 表單驗證套件
import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
// i18n多國語系
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// 文字編輯器套件
import CKEditor from '@ckeditor/ckeditor5-vue'

/**
 * 這裡是將所有 vee-validate 的規則載入
 */
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
/**
 * 這裡是設定 vee-validate 的語系
 */
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 輸入內容直接驗證
})
setLocale('zh_TW') // 設定預設語系

const app = createApp(App)
app.use(CKEditor)
app.use(router)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$Swal = Swal
app.component('VeeForm', Form)
app.component('VeeField', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(createPinia())

app.mount('#app')
