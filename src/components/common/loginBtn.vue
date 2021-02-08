<template>
  <div class="loginBtn">
    <div class="btn" @click="submitHandel" @touchstart="bgColor" @touchend="resetColor">{{btnText}}</div>
  </div>
</template>

<script>
export default {
  props: ['btnText'],
  methods: {
    submitHandel () {
      // 给父组件抛出点击事件
      this.$emit('submit')
    },
    bgColor (e) {
      e.target.style.backgroundColor = '#ee90a7'
    },
    resetColor (e) {
      e.target.style = ''
    }
  }
}
</script>

<style lang="less" scoped>
.loginBtn {
  padding: 4.167vw 2.778vw;
  .btn {
    display: flex;
    height: 12.5vw;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #ff9db5;
    border-radius: 6.25vw;
    font-size: 3.889vw;
  }
}
</style>
