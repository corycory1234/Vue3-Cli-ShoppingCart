<template>
<div class="toast-container position-absolute pe-3 top-0 end-0">
    <ToastComponent v-for="(msg, key) in messages"
    :key="key" :msg="msg">
    </ToastComponent>
</div>
</template>

<script>
import ToastComponent from '@/components/ToastComponent.vue'

export default {
  components: { ToastComponent },

  data () {
    return {
      messages: []
    }
  },
  // 注入mitt
  inject: ['emitter'],

  // 當'push-message'事件觸發, emitter就會啟動,
  // 並且this.messages陣列就會push message訊息進來
  // message 為外部傳來之資訊
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content, category, unit, price } = message
      this.messages.push({ style, title, content, category, unit, price })
    })
  }
}
</script>
