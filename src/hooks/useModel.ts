import myModel from '@/components/base-ui/myModel'
import { ref } from 'vue'

const useModel = () => {
  const modelRef = ref<InstanceType<typeof myModel>>()
  return modelRef
}

export default useModel
