<template>
  <!-- <ToastMessages></ToastMessages> -->
  <div class="container mt-5">
    <form class="row justify-content-center"
    @submit.prevent="signIn()">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
            <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
            />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
            <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
            />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
</div>
</template>

<script>
// import emitter from '@/methods/emitter'
// import ToastMessages from '@/components/ToastMessages.vue'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  // components: { ToastMessages },

  methods: {
    signIn () {
      this.isLoading = true
      // API網址寫在.env時，必須用以下寫法取得API網址變數
      const api = `${process.env.VUE_APP_API}admin/signin`
      console.log(api, ' 拿到API資料了')

      // $http 是Vue axios的寫法
      this.$http.post(api, this.user)
        .then((response) => {
          // 設判斷式，驗證ok，頁面轉到DashBoard
          if (response.data.success) {
            // 拿token跟到期日
            const token = response.data.token
            const expired = response.data.expired
            // cookie裡放token 與 到期日
            // document.cookie = `自定義名=${token}; 自定義名=${new Date(到期日)}`
            // response裡的 token 跟 到期, 是API自己命名的
            document.cookie = `hexToken=${token};  expires=${new Date(expired)}`
            console.log(response)
            // 用push, 登入成功後, 路由頁面轉到DashBoard.vue以及Products.vue
            this.$router.push('/DashBoard/Products')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  // inject: ['emitter'],

  // provide () {
  //   return {
  //     emitter
  //   }
  // }

}
</script>
