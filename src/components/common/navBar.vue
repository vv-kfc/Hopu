<template>
  <div class="navBar">
    <div class="logo" @click="$router.push('/home')">
      <img src="../../assets/logo.png" alt="logo" />
    </div>
    <div class="search">
      <van-icon name="search" size="3.889vw" color="#666" />
      <div>什么？他入驻B站了？！</div>
    </div>
    <div class="download">
      <img v-if="imgSrc" :src="imgSrc" alt="头像" />
      <img v-else src="../../assets/default_img.jpg" alt="默认头像" @click="toClick" />
      <div>下载 App</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['imgSrc'],
  methods: {
    toClick () {
      if (localStorage.getItem('id') && localStorage.getItem('token')) {
        this.$router.push('/userinfo')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navBar {
  height: 12.5vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  .logo {
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .search {
    flex: 1;
    position: relative;
    .van-icon-search {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 1.389vw;
    }
    div {
      width: 36.111vw;
      height: 6.944vw;
      border-radius: 3.333vw;
      background-color: #f4f4f4;
      font-size: 2.333vw;
      line-height: 6.944vw;
      color: #666;
      padding-left: 5.556vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .download {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2.778vw;
    img {
      width: 6.667vw;
      height: 6.667vw;
      margin-right: 1.389vw;
      border-radius: 50%;
    }
    div {
      width: 26.667vw;
      height: 7.778vw;
      text-align: center;
      line-height: 7.778vw;
      border-radius: 0.833vw;
      background-color: #ff9db5;
      color: #fff;
      font-size: 3.889vw;
    }
  }
}
</style>
