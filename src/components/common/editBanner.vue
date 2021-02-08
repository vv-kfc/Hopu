<template>
  <div class="editBanner" :style="{borderBottom:bottom}" @click="$emit('showEditDialog',left)">
    <div class="left">{{left}}</div>
    <div class="right">
      <slot name="content"></slot>
      <slot name="imgSrc"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['left', 'right', 'bottom', 'imgSrc']
}
</script>

<style lang="less" scoped>
.editBanner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  .left {
    color: #666;
    font-size: 3.333vw;
  }
  .right {
    font-size: 3.889vw;
    color: #999;
  }
}
</style>
