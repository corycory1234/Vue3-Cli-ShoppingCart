import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
// 可使用漢堡選單
import 'bootstrap/dist/js/bootstrap.bundle'
// 讀取轉圈圈Overlay
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
// 全域註冊Overlay, 因為所有地方都會用到
app.component('Loading-Overlay', Loading)
app.mount('#app')
