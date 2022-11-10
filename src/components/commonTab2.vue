<template>
  <div class="common-tab2 cbg">
    <div class="btns">
      <slot name="btns" />
    </div>

    <div class="content specialThumb">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.common-tab2 {
  width: 100%;
  height: 100%;
  padding: 32px;
  .btns {
    height: 40px;
    margin-bottom: 32px;
  }
  .content {
    height: calc(100% - 72px);
  }
}
</style>
