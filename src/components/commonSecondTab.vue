<template>
  <div class="second-tab cbg">
    <div class="title flex-start cp" @click="add">
      <img src="@/assets/images/home/add2.png" alt="" />
      <div>{{ title }}</div>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{ (event: 'add'): void }>()

const add = () => {
  emit('add')
}
</script>

<style scoped lang="less">
.second-tab {
  width: 100%;
  height: 100%;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  .title {
    color: #0b31ba;
    height: 20px;
    margin-bottom: 24px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
  .content {
    flex: 1;
    height: 0px;
  }
}
</style>
