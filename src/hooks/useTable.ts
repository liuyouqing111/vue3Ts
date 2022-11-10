import myTable from '@/components/base-ui/myTable'
import { ref } from 'vue'

const useTable = () => {
  const tabelRef = ref<InstanceType<typeof myTable>>()
  return tabelRef
}

export default useTable
