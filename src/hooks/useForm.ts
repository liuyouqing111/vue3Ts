import { ref } from 'vue'
import myForm from '@/components/base-ui/myForm'

const useForm = () => {
  const modelRef = ref<InstanceType<typeof myForm>>()
  return modelRef
}

export default useForm
