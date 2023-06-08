<template>
  <Loading-Overlay :active="isLoading"></Loading-Overlay>
  <div class="text-end">
    <!-- 「$refs」是父組件用來呼叫子組件的語法 -->
    <!-- <button class="btn btn-primary" type="button"
    @click="$refs.ProductModal.showModal()">新增商品</button> -->
    <button class="btn btn-primary" type="button"
    @click="openModal(true)">新增商品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">圖片</th>
        <th width="120">分類</th>
        <th width="120">產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="120">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td><img :src="item.imageUrl" alt="" width="120"></td>
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-right">
            {{item.origin_price}}
        </td>
        <td class="text-right">
            {{item.price}}
        </td>
        <td>
            <!-- 老師的 v-if/v-else寫法 -->
            <!-- <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-success" v-else>未啟用</span> -->
            <!-- 也可用三元運算子「寫啟用/未啟用」 -->
            <span :class="{'text-success' : item.is_enabled === 1, 'text-warning' :  item.is_enabled === 0 }">
            {{ item.is_enabled === 1 ? '啟用' : '未啟用' }}
            </span>
        </td>
        <td class="btn-group">
          <!-- false意旨「非新增商品」, item為「當前」編輯的商品 -->
            <button class="btn btn-outline-primary btn-sm"
            @click="openModal(false, item)">編輯</button>

            <!-- 打開刪除Modal視窗 -->
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelModal(item)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- :前內="後外:, produc來自ProductModal.vue的props裡的變數 -->
  <!-- tempProduct是ProductsAll.vue的DATA變數 -->
  <!-- @子層元件="父層所接收之函式" -->
  <ProductModal ref="ProductModal"
  :product="tempProduct"
  @update-product="updateProduct">
  </ProductModal>

  <!-- 刪除商品之標籤 -->
  <DelModal
  :item="tempProduct"
  @del-item="delProduct"
  ref="delModal">
  </DelModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      // 判斷是否為「新增」,因為「新增商品按鈕」 & 「編輯」 會共用OpenModal彈跳視窗
      // 因此要寫個判斷是否為「新增商品」
      isNew: false,
      // 轉圈圈Overlay, 預設false
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      // ${process.env...}：取得環境變數的API PATH
      // 分頁還沒寫，所以「?page=:page」從網址先拿掉
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`
      // 抓資料前, 先跑Overlay
      this.isLoading = true
      this.$http.get(api)
        .then((response) => {
          // 抓到資料後, 結束Overlay
          this.isLoading = false

          if (response.data.success) {
            console.log(response)
            this.products = response.data.products
            this.pagination = response.data.pagination
          }
        })
    },

    // isNew參數:看是否為新增, item參數:把編輯的v-for商品丟進來
    openModal (isNew, item) {
      console.log('是否為新增按鈕之商品?? ' + isNew, item)
      if (isNew) {
        // 清空
        this.tempProduct = {}
      } else {
        // 若不是新增商品按鈕, 則tempProduct被賦值當下編輯商品的DATA(見)
        this.tempProduct = { ...item }
        console.log(this.tempProduct, item)
      }
      this.isNew = isNew
      const productComponent = this.$refs.ProductModal
      // 清空完, 再開啟Modal視窗
      productComponent.showModal()
    },

    // 接收$emit過來的資料
    updateProduct (item) {
      console.log(item)
      this.isLoading = true
      this.tempProduct = item

      // 新增商品 程式碼
      // const api >> let api ,主要是API Post/Put因為新增/編輯發出請求會變動
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯商品 程式碼
      // 如果不是「新增商品按鈕」, API就改路徑
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }

      // 原本$http.post >> $http[httpMethod] 因應新增/編輯的API方法變動
      const productComponent = this.$refs.ProductModal
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          this.isLoading = false
          console.log(response)
          // 新增完，必須關Modal彈跳視窗
          productComponent.hideModal()
          // 並且重新從API取得商品資料
          // this.getProducts()

          // emitter相關程式碼
          if (response.data.success) {
            this.getProducts()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功!'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: 'title 欄位為必填',
              category: 'category 欄位為必填',
              unit: 'unit 欄位為必填',
              origin_price: 'origin_price 欄位為必填',
              price: 'price 欄位為必填'
              // content: response.data.messages.join('、')
            })
          }
        })
    },

    // 刪除商品按鈕
    // 刪除完 >> 關掉Modal >> 重新渲染Product List
    delProduct () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url)
        .then((response) => {
          this.isLoading = false
          console.log(response)
          // $refs：把 <DelModal>整包先存在變數delComponent,
          // 然後 關掉視窗 >> 重新渲染產品頁面
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getProducts()
        })
    },

    // 打開「刪除」視窗
    openDelModal (item) {
      this.tempProduct = { ...item }
      // 目前只有delModal 輸入mixins,
      // 因此需要個變數 抓子元件標籤的ref
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    }
  },
  // 注入「mitt」
  inject: ['emitter'],

  created () {
    this.getProducts()
  },
  // 區域註冊，讓ProductModal載進來
  components: {
    ProductModal,
    DelModal
  }
}
</script>
