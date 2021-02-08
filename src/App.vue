<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.name==='Home'" />
    </keep-alive>
    <router-view v-if="!($route.name==='Home')" />
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  // IE盒模型 宽度/高度 = width/height + padding + border
  box-sizing: border-box;
  background-color: #f4f4f4;
}
.van-sticky {
  // margin-right: 13.889vw;
  width: 86.111vw;
  .van-tab {
    font-size: 3.889vw;
    padding: 0 3.333vw;
  }
  .van-tabs__wrap {
    height: 12.222vw;
  }
}
</style>
