<template>
  <div class="commonTab specialThumb">
    <div class="header flex-between">
      <div class="title flex-start">
        <div class="left"></div>
        <div class="right">{{ props.title }}</div>
      </div>
      <div>
        <slot name="btns" />
      </div>
    </div>
    <slot name="list" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>

<style scoped lang="less">
.commonTab {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 4px;
  padding: 24px;
  padding-top: 0px;
  .header {
    height: 64px;
    padding: 12px 0px;
    .left {
      width: 4px;
      height: 12px;
      background: #007cc6;
      box-shadow: 2px 2px rgba(0, 124, 198, 0.4);
      margin-right: 6px;
    }
    .right {
      color: #333;
      font-weight: 500;
    }
  }
}
</style>
