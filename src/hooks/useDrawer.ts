import { ref } from 'vue'
import commonDrawer from '@/components/commonDrawer.vue'
const useDrawer = () => {
  const modelRef = ref<InstanceType<typeof commonDrawer>>()
  return modelRef
}

export default useDrawer
