<template>
  <div class="my-editdrawer">
    <commonDrawerVue
      title="新建项目"
      tabTitle="项目信息"
      :showFooter="true"
      ref="editDrawerRef"
      @closed="reset"
      @confirm="editConfirm"
    >
      <template #content>
        <myForm
          :myformCongig="drawerConfig"
          v-model="formValue"
          ref="myformRef"
          @success="handleConfirm"
        />
      </template>
    </commonDrawerVue>
  </div>
</template>

<script lang="ts" setup>
import commonDrawerVue from '@/components/commonDrawer.vue'
import usePagesrarch from '@/hooks/usePagesearch'
import { IMyform } from '../../myForm'
import myForm from '../../myForm'
import { ref, watch } from 'vue'

const myformRef = ref<InstanceType<typeof myForm>>()

const editDrawerRef = ref<InstanceType<typeof commonDrawerVue>>()
const props = defineProps<{
  title: string
  tabTitle: string
  drawerConfig: IMyform
  defaultInfo: any
}>()

const { formValue, reset } = usePagesrarch(props.drawerConfig)
const emit = defineEmits<{
  (event: 'confirm', value: any): void
}>()

watch(
  () => {
    return props.defaultInfo
  },
  (newvalue) => {
    if (newvalue) {
      for (let key in formValue.value) {
        formValue.value[key] = newvalue[key] ? newvalue[key] : formValue.value[key]
      }
    }
  },
  {
    deep: true
  }
)

const show = () => {
  editDrawerRef.value?.show()
}

const editConfirm = () => {
  myformRef.value?.submitForm()
}

const handleConfirm = () => {
  emit('confirm', formValue.value)
}

defineExpose({
  show
})
</script>

<style scoped lang="less"></style>
