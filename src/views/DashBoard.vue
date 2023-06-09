<!--(3) DashBoard.vue的Template 放上 <NavBar> -->
<!--(3) DashBoard.vue 放 <router-view/>, 才會顯示朝狀路由的 "產品列表" -->
<template>
  <NavBar></NavBar>
  <div class="container-fluid">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>

import NavBar from '../components/NavBar.vue'
// emitter是js檔, 不用「區域註冊」
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
  // 區域註冊NavBar.vue
  components: {
    NavBar,
    ToastMessages
  },
  // Q:為何驗證「登入」要用created?
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    console.log('拿到Token了', token)
    // 把token賦值給headers
    this.$http.defaults.headers.common.Authorization = token
    const api = `${process.env.VUE_APP_API}api/user/check`
    console.log(api, ' 拿到API資料了')
    // $http 是Vue axios的寫法
    this.$http.post(api, this.user)
      .then((response) => {
        console.log(response)
        // 如果登入失敗, 路由就會回到「登入頁面」
        if (!response.data.success) {
          this.$router.push('/login')
        }
        // 登入成功, 這邊emit失敗報錯
        // this.emitter.emit('push-message', {
        //   style: 'success',
        //   title: '登入成功!'
        // })
      })
  },

  // 為了emitter不必在每個元件都import,
  // 所以在Dashboard用provide() {}
  // 「provide」可讓所有內層子元件 使用 外層父元件的功能
  provide () {
    return {
      emitter
    }
  }
}

</script>
