<template>
<!-- Modal -->
<!-- ref="modal"是用來存取這包DIV的DOM元素 -->
<div class="modal fade" id="exampleModal" tabindex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
ref="modal">

<!-- 請同學自行新增 v-model -->
<div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>新增產品</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-3">
            <label for="image" class="form-label">輸入圖片網址</label>
            <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl">
          </div>
          <div class="mb-3">
            <label for="customFile" class="form-label">或 上傳圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <!-- ref="fileInput" 是用來取得DOM -->
            <input type="file"
            id="customFile"
            class="form-control"
            ref="fileInput"
            @change="uploadFile"
            >
          </div>
          <img class="img-fluid" alt="">
          <!-- 延伸技巧，多圖 -->
          <div class="mt-5">
            <div class="mb-3 input-group" >
              <input type="url" class="form-control form-control"
                      placeholder="請輸入連結">
              <button type="button" class="btn btn-outline-danger">
                移除
              </button>
            </div>
            <div>
              <button class="btn btn-outline-primary btn-sm d-block w-100">
                新增圖片
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title">
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類</label>
              <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input type="text" class="form-control" id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit">
            </div>
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price">
            </div>
          </div>
          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述"></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容"
                      v-model="tempProduct.description"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">取消
      </button>
      <!-- $emit出去資料 -->
      <!-- $emit('事件名稱', 存放新產品之變數) -->
      <button type="button" class="btn btn-primary"
      @click="$emit('update-product', tempProduct)">確認</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
// (2)去node_modules裡面找Bootstrap > dist >modal.js, 並import進來
import Modal from 'bootstrap/js/dist/modal'
export default {
  data () {
    return {
      // (1)掛載完，要return，故要有個modal資料
      modal: {},
      // (1)用來接收父層(ProductAll)資料
      tempProduct: {}
    }
  },
  methods: {
    showModal () {
    // 用.show()，呈現畫面，可查看BootStrap文件/互動視窗/方法
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    },

    // 上傳圖片
    uploadFile () {
      // this.$refs 也可用來取得DOM元素
      // 要看一下console, 才知道要補上.files[0]
      const uploadedFile = this.$refs.fileInput.files[0]
      console.dir(uploadedFile)
      // 自己創造formData表單格式
      const formData = new FormData()
      // append用意: 在form表單格式, 增加1個欄位
      // file-to-upload 是API裡面 真對input標籤 要求的
      formData.append('file-to-upload', uploadedFile)

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData)
        .then((response) => {
          console.log(response.data)
          if (response.data.success === true) {
            this.tempProduct.imageUrl = response.data.imageUrl
          }
        })
    }
  },
  // (1)由於彈跳視窗要「實體化」, 所以要掛載&以及DATA
  mounted () {
    // (1)指向ref=modal 這包DOM, 因此new Modal(this.$refs.modal)
    this.modal = new Modal(this.$refs.modal)
  },
  props: {
    // 接收ProductsAll.vue 的 tempProduct所prop過來的資料
    product: {
      type: Object,
      // 若父層沒正確傳遞，給預設值 空Obj
      default () {
        return {}
      }
    }
  },
  // 監聽product ↑,因為每次新增都會有變動,而且每次新增內容可能都不一樣
  // 由於單向數據流, 不可以修改父層的資料,
  // 所以DATA才又宣告1個tempProducts
  watch: {
    product () {
      // 指向父組件的product
      this.tempProduct = this.product
    }
  }
}
</script>
