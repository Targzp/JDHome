<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Toast',
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({ showToast: false, toastMessage: '' })

  const changeToast = (message) => {
    toastData.showToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }

  const { showToast, toastMessage } = toRefs(toastData)

  return {
    showToast,
    toastMessage,
    changeToast
  }
}
</script>

<style lang="scss" scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0, 0, 0, .35);
    padding: .1rem;
    border-radius: .05rem;
    color: #FFF
}
</style>
