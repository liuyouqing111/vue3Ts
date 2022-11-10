<template>
  <div class="drawer-model">
    <commonDrawerVue
      :title="title"
      :showFooter="showFooter"
      tabTitle=""
      @closed="reset"
      @confirm="confirm"
      ref="commonDrawerRef"
    >
      <template #content>
        <myForm
          v-model="formValue"
          :myformCongig="myformCongig"
          ref="myformRef"
          @success="confirmSuccess"
        />
      </template>
    </commonDrawerVue>
  </div>
</template>

<script lang="ts" setup>
import commonDrawerVue from './commonDrawer.vue'
import myForm, { IMyform } from './base-ui/myForm'
import usePagesrarch from '@/hooks/usePagesearch'
import { watch, ref } from 'vue'
const commonDrawerRef = ref<InstanceType<typeof commonDrawerVue>>()
const props = defineProps<{
  title: string
  showFooter: boolean
  defaultInfo: any
  myformCongig: IMyform
}>()

const { formValue, reset } = usePagesrarch(props.myformCongig)
const emit = defineEmits<{
  (event: 'confirm', value: any): void
}>()
watch(
  () => {
    return props.defaultInfo
  },
  (newvalue) => {
    for (let key in formValue.value) {
      formValue.value[key] =
        newvalue[key] || newvalue[key] === 0 ? newvalue[key] : formValue.value[key]
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const myformRef = ref<InstanceType<typeof myForm>>()
const confirm = () => {
  myformRef.value?.submitForm()
}

const show = () => {
  commonDrawerRef.value?.show()
}

const close = () => {
  commonDrawerRef.value?.cancel()
}

const confirmSuccess = () => {
  emit('confirm', formValue.value)
}

defineExpose({
  show,
  close
})
</script>

<style scoped lang="less">
.drawer-model {
}
</style>
