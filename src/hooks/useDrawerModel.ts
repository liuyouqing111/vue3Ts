import { ref } from 'vue'
import commonDrawerModelVue from '@/components/commonDrawerModel.vue'
const useDrawerModel = () => {
  const modelRef = ref<InstanceType<typeof commonDrawerModelVue>>()
  return modelRef
}

export default useDrawerModel
