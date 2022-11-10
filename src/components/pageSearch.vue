<template>
  <div class="pageSearch">
    <commonTabVue :title="title">
      <template #list>
        <div class="list">
          <div class="left">
            <myForm :myformCongig="myformCongig" v-model="formData" />
          </div>
          <div class="right flex-start">
            <div class="search-btn" @click="search">查询</div>
            <div class="reset-btn" @click="reset">重置</div>
          </div>
        </div>
      </template>
    </commonTabVue>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import myForm, { IMyform } from './base-ui/myForm'
import commonTabVue from './commonTab.vue'

const props = defineProps<{
  myformCongig: IMyform
  modelValue: any
  title: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
  (event: 'search'): void
  (event: 'reset'): void
}>()

const obj = JSON.parse(JSON.stringify(props.modelValue))
const formData = ref(obj)

watch(
  () => formData.value,
  (newvalue) => {
    emit('update:modelValue', newvalue)
  },
  {
    deep: true
  }
)

const search = () => {
  emit('search')
}

const reset = () => {
  emit('reset')
}
</script>

<style scoped lang="less">
.pageSearch {
  width: 100%;
  height: 128px;
  margin-bottom: 24px;
  .list {
    width: 100%;
    display: flex;
  }
  .left {
    ::v-deep(.el-form) {
      .el-input__wrapper {
        height: 40px !important;
        width: 300px !important;
        flex-grow: 0;
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form-item__label {
        height: 40px !important;
        line-height: 40px !important;
      }
    }
  }

  .right {
    padding-left: 46px;
    .reset-btn {
      margin-left: 20px;
    }
  }
}
</style>
