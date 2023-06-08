<template>
      <Loading-Overlay :active="isLoading"></Loading-Overlay>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },

  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      // $http 是Vue axios的寫法
      this.isLoading = true
      this.$http.post(api, this.user)
        .then((response) => {
          this.isLoading = false
          console.log(response)
          // 登出成功, 跳轉到登入頁面
          if (response.data.success) {
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>
