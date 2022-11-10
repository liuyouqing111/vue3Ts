import { ref } from 'vue'

const useTimer = (time = 0, cb?: () => void) => {
  const initTime = ref(time)
  const timer = ref<NodeJS.Timer>()
  const obj = {
    start() {
      if (timer.value) {
        clearInterval(timer.value)
      }
      initTime.value = time
      timer.value = setInterval(() => {
        if (initTime.value === 1) {
          cb && cb()
          clearInterval(timer.value)
          initTime.value = time
        } else {
          initTime.value--
        }
      }, 1000)
    },
    getTime() {
      return initTime.value
    }
  }

  return obj
}

export default useTimer
