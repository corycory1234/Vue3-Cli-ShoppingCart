<template>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <span>刪除 {{ item.title }}</span>
            </h5>
            <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
                    data-bs-dismiss="modal">取消
            </button>
            <button type="button" class="btn btn-danger"
                    @click="$emit('del-item')">確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  // 父元件傳item進來
  // 問：這個item應該是 openDelModal (item) {} 解構後 的item 嗎?
  // 問：「item: {}」, 傳進來的 item, 仍是要給它個空陣列, 不然無法props傳進來
  props: {
    item: {}
  },
  data () {
    return {
    // 問：這邊的modal是??
      modal: ''
    }
  },
  // mixins是包陣列
  mixins: [modalMixin]
}
</script>
